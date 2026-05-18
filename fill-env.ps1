# ===== fill-env.ps1 =====
# شغّل هذا الملف بعد ما تاخذ القيم من Supabase
# مثال: .\fill-env.ps1

$A = "D:\Files\Programming_Projects\Euro Store"

$SUPABASE_URL    = Read-Host "NEXT_PUBLIC_SUPABASE_URL"
$ANON_KEY        = Read-Host "NEXT_PUBLIC_SUPABASE_ANON_KEY"
$SERVICE_KEY     = Read-Host "SUPABASE_SERVICE_ROLE_KEY"
$DATABASE_URL    = Read-Host "DATABASE_URL (port 6543)"
$DIRECT_URL      = Read-Host "DIRECT_URL (port 5432)"

$content = @"
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY
DATABASE_URL=$DATABASE_URL
DIRECT_URL=$DIRECT_URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
"@

Set-Content -Path "$A\apps\web\.env.local"    -Value $content -Encoding UTF8
Set-Content -Path "$A\apps\admin\.env.local"  -Value $content -Encoding UTF8
Set-Content -Path "$A\apps\helper\.env.local" -Value $content -Encoding UTF8

Write-Host "All .env.local files updated!" -ForegroundColor Green
