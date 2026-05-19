# الخطوة التالية — إصلاح Partner Build + نشر Helper + E2E

## الوضع الحالي
- Web:     ✅ https://euro-store-web.vercel.app
- Admin:   ✅ https://euro-store-admin-seven.vercel.app
- Helper:  ✅ محلياً — ⏳ يحتاج نشر Vercel
- Partner: ⏳ مبني محلياً + push — يحتاج build fix (تم)

---

## الخطوة 1 — تأكيد نجاح Partner Build ✅ (تم الإصلاح)
المشكلة كانت: `product: { select: { name: true, images: true } }`
الحل: `product: true` في scan/route.ts + types مرنة في scan/page.tsx
بعد push → Vercel يُعيد البناء تلقائياً → تحقق من build log

---

## الخطوة 2 — نشر Helper على Vercel (يدوي)
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

## الخطوة 3 — اختبار Partner Portal
بعد نجاح build:
- https://euro-store-partner.vercel.app/login
- email: eurostore.partner@gmail.com
- password: (كلمة المرور اللي سجلت بها في Supabase)
اختبارات:
[ ] تسجيل دخول → redirect إلى /dashboard
[ ] صفحة /dashboard/scan — إدخال QR يدوي
[ ] صفحة /dashboard/history — سجل اليوم (فارغ)

---

## الخطوة 4 — إضافة DELETE_PRODUCT لاقتراحات الهيلبر
- apps/helper/dashboard/products: زر "اقتراح حذف" لكل منتج
- HelperSubmission types: ADD_PRODUCT | EDIT_PRODUCT | DELETE_PRODUCT | UPDATE_STOCK
- Admin pending-reviews: عرض طلبات الحذف مع تحذير واضح

---

## الخطوة 5 — اختبار E2E كامل
### Web
[ ] تصفح + فلاتر + بحث
[ ] login + checkout + كود خصم + نقاط
[ ] طلب استبدال + QR

### Admin
[ ] login → dashboard → CRUD منتجات
[ ] إدارة طلبات + مراجعة اقتراحات الهيلبر

### Helper
[ ] login → مسح QR استبدال + نقاط ولاء + اقتراحات

### Partner
[ ] login → مسح QR → تأكيد / رفض → سجل

---

## ⚠️ تحذيرات PowerShell الحرجة
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file", $content, $utf8NoBom)

## تشغيل محلياً
cd "D:\Files\Programming_Projects\Euro Store\apps\web"     → npx next dev       → :3000
cd "D:\Files\Programming_Projects\Euro Store\apps\admin"   → npx next dev -p 3001
cd "D:\Files\Programming_Projects\Euro Store\apps\helper"  → npx next dev -p 3002
cd "D:\Files\Programming_Projects\Euro Store\apps\partner" → npx next dev -p 3003