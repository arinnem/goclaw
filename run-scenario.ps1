<#
.SYNOPSIS
    GoClaw Scenario Runner - feed instructions to GoClaw via API, one by one.

.DESCRIPTION
    Reads a scenario file (one instruction per line) and sends each line to
    a GoClaw agent via the wake API. Maintains a single session so the agent
    remembers all previous instructions.

    Lines starting with # are comments. Blank lines are ignored.

.PARAMETER ScenarioFile
    Path to the scenario .txt file.

.PARAMETER Agent
    Agent ID or key to send instructions to. Default: "helpful-assistant".

.PARAMETER Session
    Session key for conversation continuity. Default: auto-generated from filename + timestamp.

.PARAMETER Delay
    Seconds to wait between instructions. Default: 2.

.PARAMETER GatewayUrl
    GoClaw gateway URL. Default: http://localhost:18790.

.PARAMETER Token
    Gateway token for authentication. If not provided, reads from GOCLAW_GATEWAY_TOKEN env var.

.EXAMPLE
    .\run-scenario.ps1 -ScenarioFile scenarios\example.txt
    .\run-scenario.ps1 -ScenarioFile scenarios\example.txt -Agent "my-agent" -Delay 5
    .\run-scenario.ps1 -ScenarioFile scenarios\example.txt -Token "my-token" -GatewayUrl "http://myserver:18790"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$ScenarioFile,

    [string]$Agent = "helpful-assistant",

    [string]$Session = "",

    [int]$Delay = 2,

    [string]$GatewayUrl = "http://localhost:18790",

    [string]$Token = ""
)

# --- Setup ---
$ErrorActionPreference = "Stop"

# Resolve token
if (-not $Token) {
    $Token = $env:GOCLAW_GATEWAY_TOKEN
}
if (-not $Token) {
    Write-Host ""
    Write-Host "[ERROR] No token provided. Use -Token or set GOCLAW_GATEWAY_TOKEN env var." -ForegroundColor Red
    exit 1
}

# Resolve scenario file
if (-not (Test-Path $ScenarioFile)) {
    Write-Host ""
    Write-Host "[ERROR] Scenario file not found: $ScenarioFile" -ForegroundColor Red
    exit 1
}

# Generate session key if not provided
if (-not $Session) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($ScenarioFile)
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $Session = "scenario-${baseName}-${timestamp}"
}

# Read and filter lines
$lines = Get-Content $ScenarioFile | Where-Object {
    $trimmed = $_.Trim()
    $trimmed -ne "" -and -not $trimmed.StartsWith("#")
}

if ($lines.Count -eq 0) {
    Write-Host ""
    Write-Host "[ERROR] No instructions found in scenario file." -ForegroundColor Yellow
    exit 1
}

# --- Resolve agent ID (wake endpoint needs the UUID, not the agent_key) ---
Write-Host ""
Write-Host "[*] Resolving agent..." -ForegroundColor DarkGray
$resolveHeaders = @{
    "Authorization"    = "Bearer $Token"
    "X-GoClaw-User-Id" = "scenario-runner"
}
try {
    $agentInfo = Invoke-RestMethod -Uri "${GatewayUrl}/v1/agents/${Agent}" -Method Get -Headers $resolveHeaders -TimeoutSec 10
    $agentId = $agentInfo.id
    $agentName = $agentInfo.display_name
    Write-Host "[OK] Agent: $agentName ($agentId)" -ForegroundColor Green
}
catch {
    Write-Host "[ERROR] Could not resolve agent '${Agent}': $($_)" -ForegroundColor Red
    exit 1
}

# --- Header ---
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  GoClaw Scenario Runner" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  File      : $ScenarioFile" -ForegroundColor Gray
Write-Host "  Agent     : $agentName ($Agent)" -ForegroundColor Gray
Write-Host "  Session   : $Session" -ForegroundColor Gray
Write-Host "  Gateway   : $GatewayUrl" -ForegroundColor Gray
Write-Host "  Steps     : $($lines.Count)" -ForegroundColor Gray
Write-Host "  Delay     : ${Delay}s between steps" -ForegroundColor Gray
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# --- Health check ---
Write-Host "[*] Checking gateway health..." -ForegroundColor DarkGray
try {
    $health = Invoke-RestMethod -Uri "${GatewayUrl}/health" -Method Get -TimeoutSec 5
    if ($health.status -eq "ok") {
        Write-Host "[OK] Gateway is healthy (protocol v$($health.protocol))" -ForegroundColor Green
    }
    else {
        $healthJson = $health | ConvertTo-Json -Compress
        Write-Host "[WARN] Unexpected health response: $healthJson" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "[ERROR] Cannot reach gateway at $GatewayUrl. Is GoClaw running?" -ForegroundColor Red
    Write-Host "        $($_)" -ForegroundColor DarkRed
    exit 1
}

Write-Host ""

# --- Run scenario using wake endpoint (supports session_key) ---
$headers = @{
    "Authorization"    = "Bearer $Token"
    "Content-Type"     = "application/json"
    "X-GoClaw-User-Id" = "scenario-runner"
}

$wakeUrl = "${GatewayUrl}/v1/agents/${agentId}/wake"
$stepNum = 0
$totalSteps = $lines.Count

foreach ($instruction in $lines) {
    $stepNum++

    # --- Print instruction ---
    Write-Host "-----------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host " STEP $($stepNum) / $($totalSteps)" -ForegroundColor Yellow
    Write-Host "-----------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host ""
    Write-Host " > $instruction" -ForegroundColor White
    Write-Host ""

    # --- Build wake request body ---
    $escapedMsg = $instruction.Replace('\', '\\').Replace('"', '\"').Replace("`n", '\n').Replace("`r", '\r').Replace("`t", '\t')
    $body = @"
{
  "message": "${escapedMsg}",
  "session_key": "${Session}",
  "user_id": "scenario-runner"
}
"@

    # --- Send to GoClaw ---
    Write-Host " [sending...]" -ForegroundColor DarkGray -NoNewline

    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()

    try {
        $response = Invoke-RestMethod -Uri $wakeUrl -Method Post -Headers $headers -Body $body -TimeoutSec 300

        $stopwatch.Stop()
        $elapsed = [math]::Round($stopwatch.Elapsed.TotalSeconds, 1)

        # Extract response content
        $content = $response.content

        # Usage info
        $usageStr = ""
        if ($response.usage) {
            $tokIn = $response.usage.prompt_tokens
            $tokOut = $response.usage.completion_tokens
            $usageStr = " (tokens: ${tokIn} in / ${tokOut} out)"
        }

        Write-Host "`r [done in ${elapsed}s${usageStr}]      " -ForegroundColor Green
        Write-Host ""

        # Print response (truncate if very long)
        if ($content.Length -gt 2000) {
            Write-Host $content.Substring(0, 2000) -ForegroundColor Cyan
            $charLen = $content.Length
            Write-Host "... [truncated, ${charLen} chars total]" -ForegroundColor DarkGray
        }
        else {
            Write-Host $content -ForegroundColor Cyan
        }

    }
    catch {
        $stopwatch.Stop()
        Write-Host "`r [FAILED]      " -ForegroundColor Red
        Write-Host ""
        Write-Host " Error: $($_)" -ForegroundColor Red

        # Try to extract error body
        if ($_.Exception.Response) {
            try {
                $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
                $errBody = $reader.ReadToEnd()
                Write-Host " Response: $errBody" -ForegroundColor DarkRed
            }
            catch { }
        }

        Write-Host ""
        $cont = Read-Host " Continue with next step? (y/N)"
        if ($cont -ne "y" -and $cont -ne "Y") {
            Write-Host ""
            Write-Host "[ABORTED] Scenario stopped at step $($stepNum)." -ForegroundColor Yellow
            exit 1
        }
    }

    Write-Host ""

    # Delay before next step (skip after last step)
    if ($stepNum -lt $totalSteps -and $Delay -gt 0) {
        Write-Host " [waiting ${Delay}s before next step...]" -ForegroundColor DarkGray
        Start-Sleep -Seconds $Delay
    }
}

# --- Summary ---
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Scenario complete! $($stepNum) / $($totalSteps) steps" -ForegroundColor Green
Write-Host "  Session: $Session" -ForegroundColor Gray
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
