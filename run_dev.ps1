param(
    [switch]$UseFasterWhisper = $false,
    [string]$WhisperModel = "small",
    [switch]$UseWhisperX = $false,
    [string]$N8nWebhookUrl = "",
    [int]$BackendPort = 8000,
    [int]$FrontendPort = 5173,
    [switch]$OpenBrowser = $true
)

$ErrorActionPreference = 'Stop'

function Ensure-Backend {
    Write-Host "[backend] Ensuring venv and dependencies..." -ForegroundColor Cyan
    Push-Location "$PSScriptRoot/backend"
    if (-not (Test-Path .venv)) {
        python -m venv .venv
    }
    & .\.venv\Scripts\python -m pip install --upgrade pip | Out-Null
    & .\.venv\Scripts\pip install -r requirements.txt | Out-Null
    if (-not (Test-Path uploads)) { New-Item -ItemType Directory uploads | Out-Null }
    Pop-Location
}

function Ensure-Frontend {
    Write-Host "[frontend] Installing dependencies if needed..." -ForegroundColor Cyan
    Push-Location "$PSScriptRoot/frontend"
    if (-not (Test-Path node_modules)) {
        npm install | Out-Null
    }
    Pop-Location
}

function Start-Backend {
    $envLines = @()
    if ($UseFasterWhisper) { $envLines += '$env:USE_FASTER_WHISPER="true"' }
    if ($WhisperModel) { $envLines += ("$" + 'env:WHISPER_MODEL' + "=\"$WhisperModel\"") }
    if ($UseWhisperX) { $envLines += '$env:USE_WHISPERX="true"' }
    if ($N8nWebhookUrl) { $envLines += ("$" + 'env:N8N_WEBHOOK_URL' + "=\"$N8nWebhookUrl\"") }

    $cmd = @(
        "cd `"$PSScriptRoot/backend`"",
        "& .\.venv\Scripts\python -m uvicorn app.main:app --reload --host 0.0.0.0 --port $BackendPort"
    ) -join ' ; '
    if ($envLines.Count -gt 0) { $cmd = ($envLines -join ' ; ') + ' ; ' + $cmd }

    Write-Host "[backend] Starting at http://127.0.0.1:$BackendPort ..." -ForegroundColor Green
    Start-Process -WindowStyle Normal -FilePath powershell.exe -ArgumentList "-NoExit","-Command", $cmd | Out-Null
}

function Start-Frontend {
    $cmd = "cd `"$PSScriptRoot/frontend`" ; npm run dev -- --host --port $FrontendPort"
    Write-Host "[frontend] Starting at http://localhost:$FrontendPort ..." -ForegroundColor Green
    Start-Process -WindowStyle Normal -FilePath powershell.exe -ArgumentList "-NoExit","-Command", $cmd | Out-Null
}

Ensure-Backend
Ensure-Frontend
Start-Backend
Start-Frontend

if ($OpenBrowser) {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:$FrontendPort/"
}

Write-Host "\nSpeakinsights-V2.0 is launching:" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:$FrontendPort" -ForegroundColor Yellow
Write-Host "  Backend:  http://127.0.0.1:$BackendPort (health: /health)" -ForegroundColor Yellow
Write-Host "\nClose the individual windows to stop servers." -ForegroundColor DarkYellow


