# dashboard.ps1 — запуск ops-дашборда (Task Scheduler / вручную)
Set-Location $PSScriptRoot
& ".\.venv\Scripts\python.exe" "scripts\dashboard.py" 2>&1 |
    Out-File -Append -Encoding utf8 ".\dashboard.log"
