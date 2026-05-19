# سجل التقدم — Euro Store v7

## M1 ✓ | M2 ✓ | M2.5 ✓ | Mobile Foundation ✓
## M3 ✓ | M4 ✓ | M5 ✓ | M6 ✓ | M7 ✓ | M8 ✓ | M9 ✓ | M9-Deploy ✅ Vercel

---

## M9 — Infrastructure & Deploy

### ✅ مكتمل بالكامل
- packages/db/prisma/schema.prisma (15 model)
- packages/db/src/client.ts (Prisma Singleton serverless-safe)
- packages/shared/src/types/index.ts (TypeScript types مشتركة)
- apps/web/lib/supabase/server.ts + client.ts
- apps/web/lib/auth/middleware.ts + apps/web/middleware.ts
- API Routes (34 ملف) — كاملة
- supabase/rls-policies.sql + storage-policies.sql + initial-data.sql
- turbo.json → globalEnv يحتوي كل ENV vars
- apps/web/package.json → build: "prisma generate --schema=../../packages/db/prisma/schema.prisma && next build"

### ✅ Vercel Deploy — مكتمل
- Web:    https://euro-store-web.vercel.app ✅ يعمل
- Admin:  https://euro-store-admin-seven.vercel.app ✅ يعمل (الاسم الفعلي على Vercel)
- Helper: ⏳ لم يُنشر بعد

### ✅ Auth — مكتمل ومُصلح
- تسجيل حساب جديد (Email) ✅
- تسجيل دخول (Email) ✅
- تسجيل دخول (Google OAuth) ✅
- تسجيل الخروج ✅
- LogoutButton: يستخدم supabase.auth.signOut() مباشرة (لا يعتمد على Zustand)
- Header: يتحقق من الـ session عبر supabase.auth.getSession() مباشرة
- apps/web/app/[locale]/auth/login/page.tsx — مُعاد كتابته بالكامل
- apps/web/components/shared/LogoutButton.tsx — مُصلح

### ✅ Admin Login — مُصلح جزئياً
- apps/admin/app/login/page.tsx — يستخدم Supabase مباشرة (لا localhost:5000)
- apps/admin/lib/supabase/client.ts — أُنشئ
- apps/admin/app/api/auth/me/route.ts — أُنشئ (يتحقق من role في DB)
- المشكلة المتبقية: Admin login لا يزال يحتاج اختبار بعد آخر deploy

### ⏳ متبقي للشات القادم
1. نشر Helper على Vercel:
   vercel.com/new → نفس repo → Root: apps/helper → euro-store-helper
   + نفس ENV vars السبعة + NEXT_PUBLIC_APP_URL

2. إصلاح Helper login (نفس مشكلة Admin القديمة — localhost:5000)
   apps/helper/app/login/page.tsx → نفس نهج Admin الجديد

3. تشغيل SQL في Supabase SQL Editor (بالترتيب):
   supabase/rls-policies.sql → storage-policies.sql → initial-data.sql

4. اختبار Admin dashboard بعد login

5. اختبار E2E كامل:
   [ ] تصفح منتجات + فلاتر
   [ ] إضافة للسلة + Checkout
   [ ] كود خصم + نقاط ولاء
   [ ] طلب استبدال + QR
   [ ] Admin dashboard CRUD
   [ ] Helper portal QR

---

## URLs الفعلية على Vercel
- Web:    https://euro-store-web.vercel.app
- Admin:  https://euro-store-admin-seven.vercel.app
- Helper: لم يُنشر بعد

## آخر تحديث: 2026-05-19
## الحالة: Web ✅ | Admin ✅ (login يحتاج اختبار) | Helper ⏳ | SQL ⏳ | E2E ⏳