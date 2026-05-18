Write-Host ""
Write-Host "JWT_SECRET:" -ForegroundColor Green
Write-Host ([System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(48)))
Write-Host ""
Write-Host "REFRESH_TOKEN_SECRET:" -ForegroundColor Green
Write-Host ([System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(48)))
Write-Host ""
