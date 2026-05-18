# Ø§Ù„Ø®Ø·ÙˆØ© Ø§Ù„ØªØ§Ù„ÙŠØ© â€” M9 (Ù…ØªØ§Ø¨Ø¹Ø©): Ø¥Ø¹Ø¯Ø§Ø¯ Supabase + Netlify Deploy

## Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ø­Ø§Ù„ÙŠ
- âœ… Web ÙŠØ¹Ù…Ù„ Ù…Ø­Ù„ÙŠØ§Ù‹ Ø¹Ù„Ù‰ http://localhost:3000
- âœ… API Routes (34 Ù…Ù„Ù) Ø¬Ø§Ù‡Ø²Ø©
- âœ… Prisma Schema ÙƒØ§Ù…Ù„ (15 model)
- â³ Supabase Ù„Ù… ÙŠÙØ¹Ø¯Ù‘ Ø¨Ø¹Ø¯ (Ù„Ø§ DB Ø­Ù‚ÙŠÙ‚ÙŠØŒ Ù„Ø§ Auth)
- â³ Netlify Ù„Ù… ÙŠÙÙ†Ø´Ø± Ø¨Ø¹Ø¯

## Ø§Ù„Ø®Ø·ÙˆØ§Øª Ø§Ù„Ù…ØªØ¨Ù‚ÙŠØ© Ø¨Ø§Ù„ØªØ±ØªÙŠØ¨

### Ø§Ù„Ø®Ø·ÙˆØ© 1 â€” ØªØ«Ø¨ÙŠØª @supabase/ssr ÙÙŠ admin Ùˆ helper
```powershell
$A = "D:\Files\Programming_Projects\Euro Store"

cd "$A\apps\admin"
npm install @supabase/ssr @supabase/supabase-js

cd "$A\apps\helper"
npm install @supabase/ssr @supabase/supabase-js
```

### Ø§Ù„Ø®Ø·ÙˆØ© 2 â€” Ø¥Ø¹Ø¯Ø§Ø¯ Supabase (ÙŠØ¯ÙˆÙŠ)
```
1. Ø§Ø°Ù‡Ø¨ Ø¥Ù„Ù‰ https://supabase.com â†’ New Project
2. Ø§Ø®ØªØ± Region: EU West (Frankfurt)
3. Ù…Ù† Settings > API Ø§Ù†Ø³Ø®:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
4. Ù…Ù† Settings > Database > Connection String (Nodejs):
   DATABASE_URL  â† port 6543 (pgBouncer)
   DIRECT_URL    â† port 5432 (migrations)
```

### Ø§Ù„Ø®Ø·ÙˆØ© 3 â€” ØªØ´ØºÙŠÙ„ Prisma
```powershell
$A = "D:\Files\Programming_Projects\Euro Store"
cd "$A\packages\db"

# Ø£Ø¶Ù DATABASE_URL Ùˆ DIRECT_URL ÙÙŠ packages/db/.env Ø£ÙˆÙ„Ø§Ù‹
npx prisma generate
npx prisma db push
```

### Ø§Ù„Ø®Ø·ÙˆØ© 4 â€” ØªØ¹Ø¨Ø¦Ø© .env.local
Ø£Ù†Ø´Ø¦ Ù‡Ø°Ù‡ Ø§Ù„Ù…Ù„ÙØ§Øª ÙÙŠ apps/web + apps/admin + apps/helper:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_URL=postgresql://postgres:[PASS]@db.[REF].supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Ø§Ù„Ø®Ø·ÙˆØ© 5 â€” ØªØ´ØºÙŠÙ„ SQL ÙÙŠ Supabase SQL Editor
Ø´ØºÙ‘Ù„ Ø¨Ø§Ù„ØªØ±ØªÙŠØ¨:
1. supabase/rls-policies.sql
2. supabase/storage-policies.sql
3. supabase/initial-data.sql

### Ø§Ù„Ø®Ø·ÙˆØ© 6 â€” Google OAuth
```
1. console.cloud.google.com â†’ APIs & Services â†’ Credentials
2. Create OAuth 2.0 Client ID â†’ Web application
3. Authorized redirect URI: https://[PROJECT-REF].supabase.co/auth/v1/callback
4. Supabase â†’ Auth â†’ Providers â†’ Google â†’ Enable + Client ID + Secret
5. Supabase â†’ Auth â†’ URL Config:
   Site URL: http://localhost:3000 (ØªØ·ÙˆÙŠØ±) Ø£Ùˆ https://[site].netlify.app (Ø¥Ù†ØªØ§Ø¬)
   Redirect URLs: http://localhost:3000/api/auth/callback
```

### Ø§Ù„Ø®Ø·ÙˆØ© 7 â€” Deploy Ø¹Ù„Ù‰ Netlify
```
1. Ø§Ø±ÙØ¹ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø¹Ù„Ù‰ GitHub (Ø¥Ø°Ø§ Ù„Ù… ÙŠÙƒÙ† Ù…ÙˆØ¬ÙˆØ¯Ø§Ù‹)
2. netlify.com â†’ Add new site â†’ Import from GitHub
3. Site 1 (Web):
   Base: apps/web | Build: next build | Publish: .next
4. Site 2 (Admin):
   Base: apps/admin | Build: next build | Publish: .next
5. Site 3 (Helper):
   Base: apps/helper | Build: next build | Publish: .next
6. Ø£Ø¶Ù ENV vars Ù„ÙƒÙ„ site Ù…Ù† Netlify Dashboard
7. ØªØ«Ø¨ÙŠØª @netlify/plugin-nextjs ÙÙŠ ÙƒÙ„ site
```

### Ø§Ù„Ø®Ø·ÙˆØ© 8 â€” Ø§Ø®ØªØ¨Ø§Ø± E2E
```
âœ… ØªØ³Ø¬ÙŠÙ„ + ØªØ³Ø¬ÙŠÙ„ Ø¯Ø®ÙˆÙ„ (Email + Google)
âœ… ØªØµÙØ­ Ù…Ù†ØªØ¬Ø§Øª + ÙÙ„Ø§ØªØ±
âœ… Ø³Ù„Ø© + Checkout + ÙƒÙˆØ¯ Ø®ØµÙ… + Ù†Ù‚Ø§Ø·
âœ… Ø·Ù„Ø¨ Ø§Ø³ØªØ¨Ø¯Ø§Ù„ + QR
âœ… Admin dashboard
âœ… Helper portal + Ù…Ø³Ø­ QR
```

---

## âš ï¸ ØªØ­Ø°ÙŠØ±Ø§Øª PowerShell â€” Ù…Ù‡Ù… Ø¬Ø¯Ø§Ù‹

### 1. BOM ÙÙŠ JSON
```powershell
# âŒ Ø®Ø·Ø£ â€” ÙŠÙƒØ³Ø± JSON
Set-Content -Path "file.json" -Value $content -Encoding UTF8

# âœ… ØµØ­ÙŠØ­ Ø¯Ø§Ø¦Ù…Ø§Ù‹
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file.json", $content, $utf8NoBom)
```

### 2. Ø§Ù„Ø£Ù‚ÙˆØ§Ø³ Ø§Ù„Ù…Ø±Ø¨Ø¹Ø© ÙÙŠ Ø§Ù„Ù…Ø³Ø§Ø±Ø§Øª
```powershell
# âŒ Ø®Ø·Ø£ Ù…Ø¹ [id] Ø£Ùˆ [slug]
Set-Content "$A\app\[locale]\page.tsx" -Encoding UTF8 @'...'@

# âœ… ØµØ­ÙŠØ­
Set-Content -LiteralPath "$A\app\[locale]\page.tsx" -Encoding UTF8 @'...'@
```

### 3. Turbo recursive loop
```powershell
# Ù„Ø§ ØªØ³ØªØ®Ø¯Ù… "dev" ÙƒØ§Ø³Ù… script ÙÙŠ root package.json
# Ø§Ø³ØªØ®Ø¯Ù… Ø¨Ø¯Ù„Ø§Ù‹:
npx turbo run dev --filter=@euro/web
# Ø£Ùˆ
npm run dev:web  # Ø¥Ø°Ø§ ÙƒØ§Ù† Ù…ÙØ¹Ø±ÙŽÙ‘ÙØ§Ù‹ Ø¨Ù‡Ø°Ø§ Ø§Ù„Ø§Ø³Ù…
```

### ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ù…Ø­Ù„ÙŠØ§Ù‹ Ø§Ù„Ø¢Ù†
```powershell
cd "D:\Files\Programming_Projects\Euro Store\apps\web"
npx next dev
# â†’ http://localhost:3000 âœ…
```