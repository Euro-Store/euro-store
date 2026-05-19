# الخطوة التالية — إكمال Deploy + إصلاح Helper + اختبار Admin

## الوضع الحالي
- Web: ✅ يعمل على https://euro-store-web.vercel.app
- Admin: ✅ منشور على https://euro-store-admin-seven.vercel.app (login يحتاج اختبار)
- Helper: ⏳ لم يُنشر بعد

---

## الخطوة 1 — نشر Helper على Vercel (يدوي)
اذهب إلى vercel.com/new → Import Euro-Store/euro-store
- Root Directory: apps/helper
- Project Name: euro-store-helper
- أضف ENV vars:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
  DATABASE_URL
  DIRECT_URL
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
- Deploy

---

## الخطوة 2 — إصلاح Helper login (PowerShell)
ملف apps/helper/app/login/page.tsx يستخدم localhost:5000 قديم.
يجب إعادة كتابته مثل Admin الجديد:
- يستخدم @/lib/supabase/client (تحتاج إنشاء apps/helper/lib/supabase/client.ts)
- يستخدم supabase.auth.signInWithPassword
- يتحقق من role === 'HELPER' عبر /api/auth/me

---

## الخطوة 3 — تشغيل SQL في Supabase
Supabase Dashboard → SQL Editor → شغّل بالترتيب:
1. supabase/rls-policies.sql
2. supabase/storage-policies.sql
3. supabase/initial-data.sql

---

## الخطوة 4 — اختبار Admin
- اذهب إلى https://euro-store-admin-seven.vercel.app/login
- سجّل دخول بـ eurostore.private@gmail.com
- تأكد من الوصول للـ dashboard

---

## ⚠️ تحذيرات PowerShell الحرجة

### BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file", $content, $utf8NoBom)

### الأقواس المربعة
Get-Content -LiteralPath "$A\app\[locale]\page.tsx"

### تشغيل محلياً
cd "D:\Files\Programming_Projects\Euro Store\apps\web"    → npx next dev → :3000
cd "D:\Files\Programming_Projects\Euro Store\apps\admin"  → npx next dev -p 3001
cd "D:\Files\Programming_Projects\Euro Store\apps\helper" → npx next dev -p 3002