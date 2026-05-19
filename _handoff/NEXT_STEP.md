# الخطوة التالية — نشر Helper على Vercel + اختبار E2E

## الوضع الحالي
- Web:    ✅ https://euro-store-web.vercel.app
- Admin:  ✅ https://euro-store-admin-seven.vercel.app — login + dashboard يعملان
- Helper: ✅ مُصلح محلياً — ⏳ يحتاج نشر على Vercel

---

## الخطوة 1 — نشر Helper على Vercel (يدوي)
vercel.com/new → Import Euro-Store/euro-store
- Root Directory: apps/helper
- Project Name: euro-store-helper
- ENV vars المطلوبة:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
  DATABASE_URL
  DIRECT_URL
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
  JWT_SECRET

---

## الخطوة 2 — اختبار E2E كامل
### Web (https://euro-store-web.vercel.app)
[ ] تصفح منتجات + فلاتر + بحث
[ ] تسجيل دخول / إنشاء حساب
[ ] إضافة للسلة + Checkout
[ ] كود خصم + نقاط ولاء
[ ] طلب استبدال + QR

### Admin (https://euro-store-admin-seven.vercel.app)
[ ] تسجيل دخول بـ eurostore.private@gmail.com
[ ] عرض dashboard + إحصائيات
[ ] CRUD منتجات
[ ] إدارة طلبات + استبدال
[ ] أكواد خصم

### Helper (https://euro-store-helper.vercel.app)
[ ] تسجيل دخول بـ eurostore.helper@gmail.com
[ ] مسح QR استبدال
[ ] تسجيل نقاط ولاء
[ ] اقتراح منتج

---

## ⚠️ تحذيرات PowerShell الحرجة
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file", $content, $utf8NoBom)

## تشغيل محلياً
cd "D:\Files\Programming_Projects\Euro Store\apps\web"    → npx next dev       → :3000
cd "D:\Files\Programming_Projects\Euro Store\apps\admin"  → npx next dev -p 3001
cd "D:\Files\Programming_Projects\Euro Store\apps\helper" → npx next dev -p 3002