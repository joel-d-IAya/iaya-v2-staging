$ports = @(3000, 5173)
foreach ($port in $ports) {
    $process = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "Cleaning port $port (PID: $($process.OwningProcess))..." -ForegroundColor Yellow
        Stop-Process -Id $process.OwningProcess -Force
    } else {
        Write-Host "Port $port is already free." -ForegroundColor Green
    }
}
