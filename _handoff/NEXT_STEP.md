# الخطوة التالية — نشر Helper + بناء Partner Portal + اختبار E2E

## الوضع الحالي
- Web:     ✅ https://euro-store-web.vercel.app
- Admin:   ✅ https://euro-store-admin-seven.vercel.app — login + dashboard يعملان
- Helper:  ✅ مُصلح محلياً — ⏳ يحتاج نشر على Vercel
- Partner: ❌ لم يُبنَ بعد — يحتاج إنشاء apps/partner من الصفر

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

## الخطوة 2 — بناء Partner Portal (apps/partner)
تطبيق Next.js 14 + shadcn/ui جديد — بسيط جداً (3 صفحات فقط)

### الصفحات:
1. /login                ← تسجيل دخول بسيط (email + password)
2. /dashboard            ← طلبات اليوم + عداد الاستلامات
3. /dashboard/scan       ← مسح QR الزبون (الصفحة الرئيسية والأهم)
4. /dashboard/history    ← سجل الاستلامات السابقة

### صفحة المسح /dashboard/scan (الأهم):
- زر "مسح QR جديد" — expo-barcode-scanner أو كاميرا المتصفح
- عند المسح يظهر:
  - اسم الزبون (مختصر: الاسم الأول فقط)
  - صور المنتجات المراد استلامها + المقاس والعدد
  - قائمة تحقق: ☐ منتجات موجودة | ☐ بدون تلف | ☐ وسوم موجودة
- زر [✅ تأكيد الاستلام] — يُرسل PATCH /api/partner/exchanges/:id/confirm
- زر [❌ رفض] — يختار سبباً من قائمة + يُرسل مع السبب

### API endpoints للـ Partner:
POST   /api/partner/scan              ← {qrToken} → تفاصيل الطلب
POST   /api/partner/exchanges/:id/confirm
POST   /api/partner/exchanges/:id/reject  ← {reason}
GET    /api/partner/history

### DB — جدول جديد:
model PartnerUser {
  id        String   @id @default(cuid())
  userId    String   @unique
  shopName  String
  area      String
  phone     String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  user      User     @relation(...)
}

### نشر Partner على Vercel:
- Root Directory: apps/partner
- Project Name: euro-store-partner
- نفس ENV vars

---

## الخطوة 3 — إضافة DELETE_PRODUCT لاقتراحات الهيلبر
- apps/helper/dashboard/products: إضافة زر "اقتراح حذف" لكل منتج
- HelperSubmission type: ADD_PRODUCT | EDIT_PRODUCT | DELETE_PRODUCT | UPDATE_STOCK
- Admin pending-reviews: عرض طلبات الحذف مع تحذير واضح

---

## الخطوة 4 — اختبار E2E كامل
### Web (https://euro-store-web.vercel.app)
[ ] تصفح منتجات + فلاتر + بحث
[ ] تسجيل دخول / إنشاء حساب
[ ] إضافة للسلة + Checkout
[ ] كود خصم + نقاط ولاء
[ ] طلب استبدال + QR (مساران: in-store + partner)

### Admin (https://euro-store-admin-seven.vercel.app)
[ ] تسجيل دخول بـ eurostore.private@gmail.com
[ ] عرض dashboard + إحصائيات
[ ] CRUD منتجات
[ ] إدارة طلبات + استبدال
[ ] أكواد خصم
[ ] مراجعة اقتراحات الهيلبر (pending-reviews)
[ ] إدارة الشركاء (partner-shops)

### Helper (https://euro-store-helper.vercel.app)
[ ] تسجيل دخول بـ eurostore.helper@gmail.com
[ ] مسح QR استبدال (in-store)
[ ] تسجيل نقاط ولاء
[ ] اقتراح منتج / تعديل / حذف
[ ] عرض طلباتي + حالتها

### Partner (https://euro-store-partner.vercel.app)
[ ] تسجيل دخول
[ ] مسح QR زبون
[ ] تأكيد استلام
[ ] رفض مع سبب
[ ] عرض سجل اليوم

---

## ⚠️ تحذيرات PowerShell الحرجة
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file", $content, $utf8NoBom)

## تشغيل محلياً
cd "D:\Files\Programming_Projects\Euro Store\apps\web"     → npx next dev       → :3000
cd "D:\Files\Programming_Projects\Euro Store\apps\admin"   → npx next dev -p 3001
cd "D:\Files\Programming_Projects\Euro Store\apps\helper"  → npx next dev -p 3002
cd "D:\Files\Programming_Projects\Euro Store\apps\partner" → npx next dev -p 3003