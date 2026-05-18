# Ã˜Â³Ã˜Â¬Ã™â€ž Ã˜Â§Ã™â€žÃ˜ÂªÃ™â€šÃ˜Â¯Ã™â€¦ Ã¢â‚¬â€ Euro Store v5

## M1 Ã¢Å“â€œ | M2 Ã¢Å“â€œ | M2.5 Ã¢Å“â€œ | Mobile Foundation Ã¢Å“â€œ
## M3 Ã¢Å“â€œ | M4 Ã¢Å“â€œ | M5 Ã¢Å“â€œ | M6 Ã¢Å“â€œ | M7 Ã¢Å“â€œ | M8 Ã¢Å“â€œ

## M9 Ã¢â‚¬â€ Deploy [Ã˜Â¬Ã˜Â§Ã˜Â±Ã™Â Ã¢Å“â€œ Ã¢â‚¬â€ API Routes + Config Ã˜Â¬Ã˜Â§Ã™â€¡Ã˜Â²Ã˜Â© Ã¢â‚¬â€ Ã™Å Ã˜Â­Ã˜ÂªÃ˜Â§Ã˜Â¬ Ã˜Â®Ã˜Â·Ã™Ë†Ã˜Â§Ã˜Âª Ã™Å Ã˜Â¯Ã™Ë†Ã™Å Ã˜Â©]

### Ã¢Å“â€¦ Ã™â€¦Ã˜Â§ Ã˜ÂªÃ™â€¦ Ã˜Â¥Ã™â€ Ã˜Â¬Ã˜Â§Ã˜Â²Ã™â€¡ Ã™ÂÃ™Å  M9

#### Ã˜Â§Ã™â€žÃ˜Â¨Ã™â€ Ã™Å Ã˜Â© Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â­Ã˜ÂªÃ™Å Ã˜Â©
- [x] packages/db/prisma/schema.prisma (Schema Ã™Æ’Ã˜Â§Ã™â€¦Ã™â€ž Ã¢â‚¬â€ 15 model)
- [x] packages/db/src/client.ts (Prisma Singleton Ã¢â‚¬â€ serverless-safe)
- [x] packages/db/package.json
- [x] packages/shared/src/types/index.ts (TypeScript types Ã™â€¦Ã˜Â´Ã˜ÂªÃ˜Â±Ã™Æ’Ã˜Â©)
- [x] apps/web/lib/supabase/server.ts
- [x] apps/web/lib/supabase/client.ts
- [x] apps/web/lib/auth/middleware.ts (Auth + Role guards)
- [x] apps/web/middleware.ts (Route Protection)

#### API Routes (34 Ã™â€¦Ã™â€žÃ™Â Ã¢â‚¬â€ Next.js Ã¢â€ â€™ Netlify Functions)
- [x] /api/auth/login + register + logout + me + callback
- [x] /api/products + /api/products/[slug]
- [x] /api/categories + /api/search + /api/cart + /api/wishlist
- [x] /api/reviews/[productId]
- [x] /api/orders + /api/orders/[id]
- [x] /api/exchange + /api/exchange/[id]
- [x] /api/loyalty + /api/loyalty/earn + redeem + qr
- [x] /api/discounts/validate
- [x] /api/admin/products + [id] + orders + [id] + customers
- [x] /api/admin/discounts + [id] + exchanges + [id]
- [x] /api/admin/loyalty + helpers + partner-shops + analytics
- [x] /api/helper/scan-qr + inventory + loyalty-earn

#### Netlify + Supabase Config
- [x] apps/web/netlify.toml
- [x] apps/admin/netlify.toml
- [x] apps/helper/netlify.toml
- [x] supabase/rls-policies.sql
- [x] supabase/storage-policies.sql
- [x] supabase/initial-data.sql
- [x] deploy/DEPLOY_GUIDE.md (9 Ã˜Â®Ã˜Â·Ã™Ë†Ã˜Â§Ã˜Âª Ã™â€¦Ã™ÂÃ˜ÂµÃ™â€˜Ã™â€žÃ˜Â©)

#### Ã™â€¦Ã˜Â´Ã˜Â§Ã™Æ’Ã™â€ž Ã˜Â­Ã™ÂÃ™â€žÃ™â€˜Ã˜Âª Ã™ÂÃ™Å  M9
- [x] Ã˜Â®Ã˜Â·Ã˜Â£ BOM Ã™ÂÃ™Å  package.json Ã¢â‚¬â€ Ã˜Â§Ã™â€žÃ˜Â­Ã™â€ž: `[System.IO.File]::WriteAllText()` Ã˜Â¨Ã˜Â¯Ã™â€ž `Set-Content`
- [x] Turbo recursive loop Ã¢â‚¬â€ Ã˜Â§Ã™â€žÃ˜Â­Ã™â€ž: Ã˜Â£Ã˜Â³Ã™â€¦Ã˜Â§Ã˜Â¡ Ã™â€¦Ã˜Â®Ã˜ÂªÃ™â€žÃ™ÂÃ˜Â© Ã™â€žÃ™â€žÃ™â‚¬ root scripts
- [x] @supabase/ssr Ã˜ÂºÃ™Å Ã˜Â± Ã™â€¦Ã˜Â«Ã˜Â¨Ã™â€˜Ã˜Âª Ã¢â‚¬â€ Ã˜Â§Ã™â€žÃ˜Â­Ã™â€ž: `npm install @supabase/ssr @supabase/supabase-js`
- [x] turbo ls Ã™Å Ã˜Â¸Ã™â€¡Ã˜Â± 0 packages Ã¢â‚¬â€ Ã˜Â§Ã™â€žÃ˜Â³Ã˜Â¨Ã˜Â¨: BOM Ã™ÂÃ™Å  package.jsonÃ˜Å’ Ã˜Â­Ã™ÂÃ™â€žÃ™â€˜

#### Ã˜Â­Ã˜Â§Ã™â€žÃ˜Â© Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â´Ã˜ÂºÃ™Å Ã™â€ž Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â­Ã™â€žÃ™Å  Ã¢Å“â€¦
- Web Ã™Å Ã˜Â¹Ã™â€¦Ã™â€ž: `cd apps/web && npx next dev` Ã¢â€ â€™ http://localhost:3000
- Ã˜Â§Ã™â€žÃ˜ÂµÃ™ÂÃ˜Â­Ã˜Â§Ã˜Âª Ã˜ÂªÃ™ÂÃ˜Â­Ã™â€¦Ã™Å½Ã™â€˜Ã™â€ž: /ar Ã¢Å“â€œ | /ar/[category] Ã¢Å“â€œ | /ar/product/[slug] Ã¢Å“â€œ | /ar/auth/login Ã¢Å“â€œ | /ar/cart Ã¢Å“â€œ

---

### Ã¢ÂÂ³ Ã˜Â®Ã˜Â·Ã™Ë†Ã˜Â§Ã˜Âª Ã™Å Ã˜Â¯Ã™Ë†Ã™Å Ã˜Â© Ã™â€¦Ã˜ÂªÃ˜Â¨Ã™â€šÃ™Å Ã˜Â© (Ã˜Â¨Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â±Ã˜ÂªÃ™Å Ã˜Â¨)

1. **Ã˜ÂªÃ˜Â«Ã˜Â¨Ã™Å Ã˜Âª @supabase/ssr Ã™ÂÃ™Å  admin Ã™Ë† helper**
   ```powershell
   cd "D:\Files\Programming_Projects\Euro Store\apps\admin"
   npm install @supabase/ssr @supabase/supabase-js
   cd "..\helper"
   npm install @supabase/ssr @supabase/supabase-js
   ```

2. **Ã˜Â¥Ã˜Â¹Ã˜Â¯Ã˜Â§Ã˜Â¯ Supabase**
   - Ã˜Â¥Ã™â€ Ã˜Â´Ã˜Â§Ã˜Â¡ project Ã˜Â¹Ã™â€žÃ™â€° supabase.com
   - Ã™â€ Ã˜Â³Ã˜Â®: URL + ANON_KEY + SERVICE_ROLE_KEY + JWT_SECRET
   - `cd packages/db && npx prisma generate && npx prisma db push`
   - Ã˜ÂªÃ˜Â´Ã˜ÂºÃ™Å Ã™â€ž SQL files Ã™ÂÃ™Å  Supabase SQL Editor (rls + storage + initial-data)

3. **Ã˜ÂªÃ˜Â¹Ã˜Â¨Ã˜Â¦Ã˜Â© Ã™â€¦Ã™â€žÃ™ÂÃ˜Â§Ã˜Âª .env.local**
   - apps/web/.env.local + apps/admin/.env.local + apps/helper/.env.local

4. **Ã˜Â¥Ã˜Â¹Ã˜Â¯Ã˜Â§Ã˜Â¯ Google OAuth**
   - Google Cloud Console Ã¢â€ â€™ OAuth 2.0 Credentials
   - Supabase Auth Providers Ã¢â€ â€™ Google Ã¢â€ â€™ Ã˜ÂªÃ™ÂÃ˜Â¹Ã™Å Ã™â€ž

5. **Ã˜Â§Ã™â€žÃ™â€ Ã˜Â´Ã˜Â± Ã˜Â¹Ã™â€žÃ™â€° Netlify**
   - 3 sites Ã™â€¦Ã™â€ Ã™ÂÃ˜ÂµÃ™â€žÃ˜Â© (web / admin / helper)
   - ENV vars Ã™â€žÃ™Æ’Ã™â€ž site
   - @netlify/plugin-nextjs Ã™ÂÃ™Å  Ã™Æ’Ã™â€ž site

6. **Ã˜Â§Ã˜Â®Ã˜ÂªÃ˜Â¨Ã˜Â§Ã˜Â± E2E Ã™Æ’Ã˜Â§Ã™â€¦Ã™â€ž** (8 Ã˜Â³Ã™Å Ã™â€ Ã˜Â§Ã˜Â±Ã™Å Ã™Ë†Ã™â€¡Ã˜Â§Ã˜Âª Ã™ÂÃ™Å  deploy/DEPLOY_GUIDE.md)

---

## Ã˜Â¢Ã˜Â®Ã˜Â± Ã˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â«: 2026-05-18
## Ã˜Â§Ã™â€žÃ˜Â­Ã˜Â§Ã™â€žÃ˜Â©: Web Ã™Å Ã˜Â¹Ã™â€¦Ã™â€ž Ã™â€¦Ã˜Â­Ã™â€žÃ™Å Ã˜Â§Ã™â€¹ Ã¢Å“â€¦ | API Routes Ã˜Â¬Ã˜Â§Ã™â€¡Ã˜Â²Ã˜Â© Ã¢Å“â€¦ | Supabase + Netlify Ã¢ÂÂ³