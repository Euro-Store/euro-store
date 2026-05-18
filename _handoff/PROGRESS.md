# سجل التقدم — Euro Store v6

## M1 ✓ | M2 ✓ | M2.5 ✓ | Mobile Foundation ✓
## M3 ✓ | M4 ✓ | M5 ✓ | M6 ✓ | M7 ✓ | M8 ✓ | M9 ✓ | M9-Deploy ⚠️→Vercel

---

## M9 — Infrastructure & Deploy

### ✅ مكتمل
- packages/db/prisma/schema.prisma (15 model)
- packages/db/src/client.ts (Prisma Singleton serverless-safe)
- packages/shared/src/types/index.ts (TypeScript types مشتركة)
- apps/web/lib/supabase/server.ts + client.ts
- apps/web/lib/auth/middleware.ts + apps/web/middleware.ts
- @supabase/ssr مثبَّت في admin و helper
- API Routes (34 ملف):
  /api/auth/* | /api/products/* | /api/categories | /api/search
  /api/cart | /api/wishlist | /api/reviews/* | /api/orders/*
  /api/exchange/* | /api/loyalty/* | /api/discounts/validate
  /api/admin/* | /api/helper/*
- supabase/rls-policies.sql + storage-policies.sql + initial-data.sql
- hooks/useAuthGuard.ts + components/shared/LogoutButton.tsx
- components/product/AddToCartButton.tsx + WishlistButton.tsx (مع auth guard)
- store/authStore.ts (مع clearAuth())
- app/[locale]/auth/login/page.tsx (مع returnUrl handling)
- Prisma generate + db push ✅
- next.config.js في الثلاثة apps يحتوي output: standalone

### ❌ Netlify — فشل (موثق ومُغلق)
- Bug مزمن: @netlify/plugin-nextjs v5 لا يبندل styled-jsx في Function
- الخطأ: "Cannot find module styled-jsx/package.json" عند runtime
- جُرِّبت 8+ محاولات إصلاح — البنية الأساسية خاطئة في monorepo
- القرار: التحول إلى Vercel

### ⏳ Vercel Deploy — الخطوة التالية الآن
- [ ] Web:    vercel.com/new → Root: apps/web    → euro-store-web
- [ ] Admin:  vercel.com/new → Root: apps/admin  → euro-store-admin
- [ ] Helper: vercel.com/new → Root: apps/helper → euro-store-helper
- [ ] ENV vars في كل مشروع (Supabase + Google OAuth)

### ⏳ خطوات يدوية متبقية بعد Vercel
1. تشغيل SQL في Supabase SQL Editor (بالترتيب):
   supabase/rls-policies.sql → storage-policies.sql → initial-data.sql

2. إعداد Google OAuth:
   Google Cloud Console → OAuth 2.0 Client ID
   Redirect URI: https://[PROJECT-REF].supabase.co/auth/v1/callback
   Supabase → Auth → Providers → Google → تفعيل
   Supabase → Auth → URL Config:
     Site URL: https://euro-store-web.vercel.app
     Redirect URLs: https://euro-store-web.vercel.app/api/auth/callback
                    https://euro-store-admin.vercel.app/api/auth/callback
                    https://euro-store-helper.vercel.app/api/auth/callback

3. إضافة LogoutButton في Header:
   apps/web/components/layout/Header.tsx
   import { LogoutButton } from '@/components/shared/LogoutButton'

4. اختبار E2E:
   تسجيل + دخول (Email + Google) | تصفح + فلاتر | سلة + Checkout
   كود خصم + نقاط | استبدال + QR | Admin dashboard | Helper + QR

---

## آخر تحديث: 2026-05-19
## الحالة: Code ✅ | Netlify ❌ (مُهجور) | Vercel ⏳ | Supabase SQL ⏳ | E2E ⏳