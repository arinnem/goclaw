<#
.SYNOPSIS
    Test the MS Teams → GoClaw bridge locally.

.DESCRIPTION
    Simulates what Power Automate would do: sends a message to GoClaw's wake API
    and displays the response. Use this to verify the API relay works before
    setting up Power Automate.

.PARAMETER Message
    The test message to send. Default: "Hello! Giới thiệu bạn là ai."

.PARAMETER Agent
    Agent key. Default: "research-analyst".

.PARAMETER GatewayUrl
    GoClaw gateway URL. Default: http://localhost:18790.

.PARAMETER Token
    Gateway token. Reads from GOCLAW_GATEWAY_TOKEN if not provided.

.PARAMETER TestHtml
    If set, wraps the message in Teams-style HTML to test HTML stripping.

.PARAMETER TestTunnel
    If set, also tests through the Cloudflare tunnel URL.

.PARAMETER TunnelUrl
    Cloudflare tunnel URL (e.g. https://abc123.trycloudflare.com).

.EXAMPLE
    .\test-teams-bridge.ps1
    .\test-teams-bridge.ps1 -Message "What is 2+2?" -Agent "my-assistant"
    .\test-teams-bridge.ps1 -TestHtml
    .\test-teams-bridge.ps1 -TestTunnel -TunnelUrl "https://abc123.trycloudflare.com"
#>

param(
    [string]$Message = "Hello! Giới thiệu bạn là ai.",
    [string]$Agent = "research-analyst",
    [string]$GatewayUrl = "http://localhost:18790",
    [string]$Token = "",
    [switch]$TestHtml,
    [switch]$TestTunnel,
    [string]$TunnelUrl = ""
)

$ErrorActionPreference = "Stop"

# --- Header ---
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  MS Teams → GoClaw Bridge Test" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# --- Resolve token ---
if (-not $Token) {
    $Token = $env:GOCLAW_GATEWAY_TOKEN
}
if (-not $Token) {
    Write-Host "[ERROR] No token. Use -Token or set GOCLAW_GATEWAY_TOKEN." -ForegroundColor Red
    exit 1
}

# ============================================================
# Test 1: Health Check
# ============================================================
Write-Host "--- Test 1: Health Check ---" -ForegroundColor Yellow
Write-Host ""

try {
    $health = Invoke-RestMethod -Uri "${GatewayUrl}/health" -Method Get -TimeoutSec 5
    if ($health.status -eq "ok") {
        Write-Host "[PASS] Gateway healthy (protocol v$($health.protocol))" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Unexpected health: $($health | ConvertTo-Json -Compress)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[FAIL] Cannot reach gateway at $GatewayUrl" -ForegroundColor Red
    Write-Host "       Is GoClaw running? (docker compose up)" -ForegroundColor DarkRed
    exit 1
}
Write-Host ""

# ============================================================
# Test 2: Agent Resolution
# ============================================================
Write-Host "--- Test 2: Agent Resolution ---" -ForegroundColor Yellow
Write-Host ""

$headers = @{
    "Authorization"    = "Bearer $Token"
    "X-GoClaw-User-Id" = "test-bridge"
}

try {
    $agentInfo = Invoke-RestMethod -Uri "${GatewayUrl}/v1/agents/${Agent}" `
        -Method Get -Headers $headers -TimeoutSec 10
    $agentId = $agentInfo.id
    $agentName = $agentInfo.display_name
    Write-Host "[PASS] Agent: $agentName" -ForegroundColor Green
    Write-Host "       ID:    $agentId" -ForegroundColor Gray
    Write-Host "       Model: $($agentInfo.model)" -ForegroundColor Gray
} catch {
    Write-Host "[FAIL] Cannot resolve agent '${Agent}': $($_)" -ForegroundColor Red
    exit 1
}
Write-Host ""

# ============================================================
# Test 3: Plain Text Relay
# ============================================================
Write-Host "--- Test 3: Wake API Relay (plain text) ---" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Message: $Message" -ForegroundColor White
Write-Host ""

& "$PSScriptRoot\teams-goclaw-relay.ps1" `
    -Message $Message `
    -Agent $Agent `
    -SessionKey "test-bridge-$(Get-Date -Format 'yyyyMMdd-HHmmss')" `
    -UserId "test-bridge" `
    -GatewayUrl $GatewayUrl `
    -Token $Token `
    -OutputFormat "text"

Write-Host ""

# ============================================================
# Test 4: HTML Stripping (optional)
# ============================================================
if ($TestHtml) {
    Write-Host "--- Test 4: HTML Stripping ---" -ForegroundColor Yellow
    Write-Host ""

    $htmlMessage = "<div><p>This is a <b>bold</b> test with <i>italic</i> and a <a href='https://example.com'>link</a>.</p><p>Second paragraph.</p></div>"
    Write-Host "  HTML Input:  $htmlMessage" -ForegroundColor Gray
    Write-Host ""

    & "$PSScriptRoot\teams-goclaw-relay.ps1" `
        -Message $htmlMessage `
        -Agent $Agent `
        -SessionKey "test-html-$(Get-Date -Format 'yyyyMMdd-HHmmss')" `
        -UserId "test-html" `
        -GatewayUrl $GatewayUrl `
        -Token $Token `
        -OutputFormat "text"

    Write-Host ""
}

# ============================================================
# Test 5: JSON Output (for Power Automate)
# ============================================================
Write-Host "--- Test 5: JSON Output Format ---" -ForegroundColor Yellow
Write-Host ""

$jsonResult = & "$PSScriptRoot\teams-goclaw-relay.ps1" `
    -Message "Reply in exactly 5 words." `
    -Agent $Agent `
    -SessionKey "test-json-$(Get-Date -Format 'yyyyMMdd-HHmmss')" `
    -UserId "test-json" `
    -GatewayUrl $GatewayUrl `
    -Token $Token `
    -OutputFormat "json"

Write-Host $jsonResult -ForegroundColor Cyan
Write-Host ""

# ============================================================
# Test 6: Tunnel (optional)
# ============================================================
if ($TestTunnel) {
    if (-not $TunnelUrl) {
        Write-Host "[SKIP] No -TunnelUrl provided" -ForegroundColor Yellow
    } else {
        Write-Host "--- Test 6: Cloudflare Tunnel ---" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  Tunnel: $TunnelUrl" -ForegroundColor Gray

        # Health check through tunnel
        try {
            $tunnelHealth = Invoke-RestMethod -Uri "${TunnelUrl}/health" -Method Get -TimeoutSec 10
            Write-Host "[PASS] Tunnel health OK" -ForegroundColor Green
        } catch {
            Write-Host "[FAIL] Tunnel unreachable: $($_)" -ForegroundColor Red
            Write-Host "       Is cloudflared running?" -ForegroundColor DarkRed
            exit 1
        }

        # Relay through tunnel
        & "$PSScriptRoot\teams-goclaw-relay.ps1" `
            -Message "Hello through the tunnel!" `
            -Agent $Agent `
            -SessionKey "test-tunnel-$(Get-Date -Format 'yyyyMMdd-HHmmss')" `
            -UserId "test-tunnel" `
            -GatewayUrl $TunnelUrl `
            -Token $Token `
            -OutputFormat "text"

        Write-Host ""
    }
}

# --- Summary ---
Write-Host "================================================" -ForegroundColor Green
Write-Host "  All tests passed!" -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host "  Next steps:" -ForegroundColor Gray
Write-Host "  1. Start Cloudflare tunnel:" -ForegroundColor Gray
Write-Host "     cloudflared tunnel --url http://localhost:18790" -ForegroundColor White
Write-Host "  2. Test through tunnel:" -ForegroundColor Gray
Write-Host "     .\test-teams-bridge.ps1 -TestTunnel -TunnelUrl <URL>" -ForegroundColor White
Write-Host "  3. Set up Power Automate flow (see TEAMS-BRIDGE-GUIDE.md)" -ForegroundColor Gray
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
