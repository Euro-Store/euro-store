# سجل التقدم — Euro Store v8

## M1 ✓ | M2 ✓ | M2.5 ✓ | Mobile Foundation ✓
## M3 ✓ | M4 ✓ | M5 ✓ | M6 ✓ | M7 ✓ | M8 ✓ | M9 ✓ | M9-Deploy ✅ Vercel | M10 ✅ Auth+UI Fix

---

## M10 — Auth Fix + Responsive UI

### ✅ Admin — مكتمل بالكامل
- apps/admin/app/api/auth/login/route.ts — أُنشئ (Supabase + Prisma + SignJWT → httpOnly cookie)
- apps/admin/app/login/page.tsx — يستدعي /api/auth/login مباشرة (لا Supabase client)
- apps/admin/app/api/auth/me/route.ts — يقرأ Bearer token من Authorization header
- apps/admin/package.json → build: prisma generate && next build ✅
- apps/admin/components/layout/AdminSidebar.tsx — responsive: hamburger على موبايل + drawer + overlay
- apps/admin/app/dashboard/layout.tsx — pt-14 على موبايل / mr-60 على desktop
- apps/admin/components/dashboard/StatsCards.tsx — toLocaleString("en-US") لإصلاح hydration mismatch

### ✅ Helper — مكتمل بالكامل
- apps/helper/app/api/auth/login/route.ts — أُنشئ (نفس نهج Admin، role: HELPER)
- apps/helper/app/login/page.tsx — يستدعي /api/auth/login + responsive mobile
- apps/helper/package.json → build: prisma generate && next build ✅
- apps/helper/components/layout/HelperSidebar.tsx — responsive: hamburger على موبايل + drawer + overlay
- apps/helper/app/dashboard/layout.tsx — pt-14 على موبايل / mr-56 على desktop

### ✅ Supabase SQL — مكتمل
- rls-policies.sql ✅
- storage-policies.sql ✅
- initial-data.sql ✅
- User: eurostore.private@gmail.com → role: ADMIN ✅
- User: eurostore.helper@gmail.com → role: HELPER ✅

### ✅ Vercel Deploy
- Web:    https://euro-store-web.vercel.app ✅
- Admin:  https://euro-store-admin-seven.vercel.app ✅ login يعمل ✅
- Helper: ⏳ لم يُنشر بعد على Vercel

---

## ⏳ متبقي
1. نشر Helper على Vercel:
   vercel.com/new → Root: apps/helper → euro-store-helper
   ENV vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
             SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL, DIRECT_URL,
             GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET

2. اختبار E2E كامل:
   [ ] تصفح منتجات + فلاتر
   [ ] إضافة للسلة + Checkout
   [ ] كود خصم + نقاط ولاء
   [ ] طلب استبدال + QR
   [ ] Admin dashboard CRUD
   [ ] Helper portal QR scan

## URLs الفعلية على Vercel
- Web:    https://euro-store-web.vercel.app
- Admin:  https://euro-store-admin-seven.vercel.app
- Helper: ⏳ لم يُنشر بعد

## آخر تحديث: 2026-05-19
## الحالة: Web ✅ | Admin ✅ | Helper ✅ (محلي) ⏳ (Vercel) | E2E ⏳