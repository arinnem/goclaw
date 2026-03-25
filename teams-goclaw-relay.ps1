<#
.SYNOPSIS
    MS Teams → GoClaw Relay — receives a message payload from Power Automate
    and forwards it to a GoClaw agent via the wake API.

.DESCRIPTION
    This script is designed to be called from Power Automate's "Run a script"
    action or deployed as an Azure Function. It:
      1. Strips HTML formatting from Teams messages
      2. Resolves the agent key → UUID
      3. Calls GoClaw's wake endpoint with session tracking
      4. Returns the AI response formatted for Teams

    Can also be run standalone for testing:
      .\teams-goclaw-relay.ps1 -Message "Hello" -Agent "research-analyst"

.PARAMETER Message
    The message text to send (can contain HTML from Teams).

.PARAMETER Agent
    Agent key or ID. Default: "research-analyst".

.PARAMETER SessionKey
    Session key for conversation continuity. Default: auto-generated.

.PARAMETER UserId
    User identifier (from Teams). Default: "teams-user".

.PARAMETER GatewayUrl
    GoClaw gateway URL. Default: http://localhost:18790.

.PARAMETER Token
    Gateway token. If not provided, reads from GOCLAW_GATEWAY_TOKEN env var.

.PARAMETER OutputFormat
    Output format: "text" (plain text), "json" (raw JSON), "teams" (Teams HTML).
    Default: "text".

.EXAMPLE
    # Standalone test
    .\teams-goclaw-relay.ps1 -Message "What is AI?" -Agent "research-analyst"

    # Simulating Teams input with HTML
    .\teams-goclaw-relay.ps1 -Message "<p>What is <b>AI</b>?</p>" -Agent "research-analyst"

    # JSON output (for Power Automate parsing)
    .\teams-goclaw-relay.ps1 -Message "Hello" -OutputFormat "json"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Message,

    [string]$Agent = "research-analyst",

    [string]$SessionKey = "",

    [string]$UserId = "teams-user",

    [string]$GatewayUrl = "http://localhost:18790",

    [string]$Token = "",

    [ValidateSet("text", "json", "teams")]
    [string]$OutputFormat = "text"
)

$ErrorActionPreference = "Stop"

# ============================================================
# Helper: Strip HTML tags from Teams messages
# ============================================================
function Remove-HtmlTags {
    param([string]$Html)

    if (-not $Html) { return "" }

    # Decode common HTML entities
    $text = $Html
    $text = $text -replace '&nbsp;', ' '
    $text = $text -replace '&amp;', '&'
    $text = $text -replace '&lt;', '<'
    $text = $text -replace '&gt;', '>'
    $text = $text -replace '&quot;', '"'
    $text = $text -replace '&#39;', "'"

    # Replace <br> and </p> with newlines
    $text = $text -replace '<br\s*/?>', "`n"
    $text = $text -replace '</p>', "`n"
    $text = $text -replace '</div>', "`n"
    $text = $text -replace '</li>', "`n"

    # Strip all remaining HTML tags
    $text = $text -replace '<[^>]+>', ''

    # Clean up whitespace
    $text = $text -replace "(\r?\n){3,}", "`n`n"
    $text = $text.Trim()

    return $text
}

# ============================================================
# Helper: Convert markdown-ish text to basic Teams HTML
# ============================================================
function ConvertTo-TeamsHtml {
    param([string]$Text)

    if (-not $Text) { return "<p><em>No response</em></p>" }

    # Escape HTML entities
    $html = $Text
    $html = $html -replace '&', '&amp;'
    $html = $html -replace '<', '&lt;'
    $html = $html -replace '>', '&gt;'

    # Convert markdown bold **text** → <b>text</b>
    $html = $html -replace '\*\*(.+?)\*\*', '<b>$1</b>'

    # Convert markdown italic *text* → <i>text</i>
    $html = $html -replace '\*(.+?)\*', '<i>$1</i>'

    # Convert markdown code `text` → <code>text</code>
    $html = $html -replace '`(.+?)`', '<code>$1</code>'

    # Convert newlines to <br>
    $html = $html -replace "`n", '<br>'

    return "<p>$html</p>"
}

# ============================================================
# Main logic
# ============================================================

# --- Resolve token ---
if (-not $Token) {
    $Token = $env:GOCLAW_GATEWAY_TOKEN
}
if (-not $Token) {
    Write-Error "[ERROR] No token. Use -Token param or set GOCLAW_GATEWAY_TOKEN env var."
    exit 1
}

# --- Strip HTML from message ---
$cleanMessage = Remove-HtmlTags -Html $Message
if (-not $cleanMessage) {
    Write-Error "[ERROR] Message is empty after stripping HTML."
    exit 1
}

# --- Generate session key if empty ---
if (-not $SessionKey) {
    $SessionKey = "teams-relay-$(Get-Date -Format 'yyyyMMdd')"
}

# --- Resolve agent key → UUID ---
Write-Host "[*] Resolving agent '$Agent'..." -ForegroundColor DarkGray

$resolveHeaders = @{
    "Authorization"    = "Bearer $Token"
    "X-GoClaw-User-Id" = $UserId
}

try {
    $agentInfo = Invoke-RestMethod `
        -Uri "${GatewayUrl}/v1/agents/${Agent}" `
        -Method Get `
        -Headers $resolveHeaders `
        -TimeoutSec 10

    $agentId = $agentInfo.id
    $agentName = $agentInfo.display_name
    Write-Host "[OK] Agent resolved: $agentName ($agentId)" -ForegroundColor Green
}
catch {
    $errMsg = "Cannot resolve agent '${Agent}': $($_)"
    Write-Error "[ERROR] $errMsg"

    if ($OutputFormat -eq "json") {
        @{ error = $true; message = $errMsg } | ConvertTo-Json
    }
    exit 1
}

# --- Call wake endpoint ---
Write-Host "[*] Sending message to GoClaw..." -ForegroundColor DarkGray
Write-Host "    Message: $cleanMessage" -ForegroundColor Gray
Write-Host "    Session: $SessionKey" -ForegroundColor Gray

$wakeHeaders = @{
    "Authorization"    = "Bearer $Token"
    "Content-Type"     = "application/json"
    "X-GoClaw-User-Id" = $UserId
}

$wakeUrl = "${GatewayUrl}/v1/agents/${agentId}/wake"

# Build JSON body manually to handle special characters
$escapedMsg = $cleanMessage.Replace('\', '\\').Replace('"', '\"').Replace("`n", '\n').Replace("`r", '\r').Replace("`t", '\t')
$escapedSession = $SessionKey.Replace('\', '\\').Replace('"', '\"')
$escapedUser = $UserId.Replace('\', '\\').Replace('"', '\"')

$body = @"
{
  "message": "${escapedMsg}",
  "session_key": "${escapedSession}",
  "user_id": "${escapedUser}"
}
"@

$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

try {
    $response = Invoke-RestMethod `
        -Uri $wakeUrl `
        -Method Post `
        -Headers $wakeHeaders `
        -Body $body `
        -TimeoutSec 300

    $stopwatch.Stop()
    $elapsed = [math]::Round($stopwatch.Elapsed.TotalSeconds, 1)

    $content = $response.content

    # Usage info
    $usageStr = ""
    if ($response.usage) {
        $tokIn = $response.usage.prompt_tokens
        $tokOut = $response.usage.completion_tokens
        $usageStr = " (tokens: ${tokIn}→${tokOut})"
    }

    Write-Host "[OK] Response received in ${elapsed}s${usageStr}" -ForegroundColor Green

    # --- Output based on format ---
    switch ($OutputFormat) {
        "json" {
            @{
                success  = $true
                content  = $content
                agent    = $agentName
                elapsed  = $elapsed
                session  = $SessionKey
                usage    = @{
                    prompt_tokens     = if ($response.usage) { $response.usage.prompt_tokens } else { 0 }
                    completion_tokens = if ($response.usage) { $response.usage.completion_tokens } else { 0 }
                }
            } | ConvertTo-Json -Depth 3
        }
        "teams" {
            ConvertTo-TeamsHtml -Text $content
        }
        default {
            Write-Host ""
            Write-Host "───── AI Response ($agentName) ─────" -ForegroundColor Cyan
            Write-Host $content -ForegroundColor White
            Write-Host "────────────────────────────────────" -ForegroundColor Cyan
        }
    }
}
catch {
    $stopwatch.Stop()
    $errMsg = "GoClaw wake failed: $($_)"
    Write-Host "[ERROR] $errMsg" -ForegroundColor Red

    if ($_.Exception.Response) {
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $errBody = $reader.ReadToEnd()
            Write-Host "Response body: $errBody" -ForegroundColor DarkRed
        }
        catch { }
    }

    if ($OutputFormat -eq "json") {
        @{ error = $true; message = $errMsg } | ConvertTo-Json
    }

    exit 1
}
