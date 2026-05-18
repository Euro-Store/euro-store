# الخطوة التالية — Deploy على Vercel (بدلاً من Netlify)

## لماذا Vercel؟
Netlify فشل بسبب bug مزمن في @netlify/plugin-nextjs v5 مع monorepos:
"Cannot find module styled-jsx/package.json" — لا حل متاح.
Vercel = المنصة الرسمية لـ Next.js، صفر إعداد، monorepo natively.

---

## الخطوة 1 — تأكد من حالة الـ repo

```powershell
$A = "D:\Files\Programming_Projects\Euro Store"
Set-Location $A
git status
git log --oneline -5
```

تأكد أن:
- لا يوجد netlify.toml في أي من الثلاثة apps (أو يمكن إبقاؤه — Vercel يتجاهله)
- next.config.js في الثلاثة apps موجود (لا يحتاج output: standalone مع Vercel)

---

## الخطوة 2 — Deploy على Vercel (يدوي — 15 دقيقة)

### اذهب إلى: https://vercel.com/new

### مشروع 1: Web
1. Import Git Repository → Euro-Store/euro-store
2. Root Directory → اضغط Edit → اكتب: apps/web
3. Framework: Next.js (يُكتشف تلقائياً)
4. Build Command: next build (الافتراضي)
5. أضف ENV vars (انظر أدناه)
6. Deploy

### مشروع 2: Admin
1. Import Git Repository → Euro-Store/euro-store (نفس الـ repo)
2. Root Directory: apps/admin
3. أضف ENV vars
4. Deploy

### مشروع 3: Helper
1. Import Git Repository → Euro-Store/euro-store
2. Root Directory: apps/helper
3. أضف ENV vars
4. Deploy

---

## ENV vars لكل مشروع Vercel
NEXT_PUBLIC_SUPABASE_URL        = https://xxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   = eyJ...
SUPABASE_SERVICE_ROLE_KEY       = eyJ...
DATABASE_URL                    = postgresql://postgres:[PASS]@db.[REF].supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL                      = postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres
NEXT_PUBLIC_APP_URL             = https://euro-store-web.vercel.app  (فقط في web)
NODE_ENV                        = production
GOOGLE_CLIENT_ID                = ...
GOOGLE_CLIENT_SECRET            = ...
---

## الخطوة 3 — بعد Vercel Deploy

### 3.1 تشغيل SQL في Supabase
Supabase Dashboard → SQL Editor → شغّل بالترتيب:

supabase/rls-policies.sql
supabase/storage-policies.sql
supabase/initial-data.sql
### 3.2 إعداد Google OAuth
console.cloud.google.com → APIs & Services → Credentials
OAuth 2.0 Client ID → Web application
Authorized redirect URI: https://[REF].supabase.co/auth/v1/callback
Supabase → Auth → Google → Enable → Client ID + Secret
Supabase → Auth → URL Config:
Site URL: https://euro-store-web.vercel.app
Redirect URLs:
https://euro-store-web.vercel.app/api/auth/callback
https://euro-store-admin.vercel.app/api/auth/callback
https://euro-store-helper.vercel.app/api/auth/callback
### 3.3 اختبار E2E
[ ] تسجيل حساب جديد (Email)
[ ] تسجيل دخول (Google OAuth)
[ ] تصفح منتجات + فلاتر
[ ] إضافة للسلة + Checkout كامل
[ ] كود خصم (صالح + منتهي)
[ ] نقاط ولاء (كسب + استخدام)
[ ] طلب استبدال + QR
[ ] Admin dashboard (CRUD كامل)
[ ] Helper portal (مسح QR + تسجيل ولاء)
---

## ⚠️ تحذيرات PowerShell — مهم جداً

### BOM في أي ملف نصي
```powershell
# ❌ خطأ — يكسر JSON وTOML وكل شيء
Set-Content -Path "file.json" -Encoding UTF8 $content

# ✅ صحيح دائماً
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file", $content, $utf8NoBom)
```

### الأقواس المربعة في المسارات
```powershell
# ✅ استخدم -LiteralPath دائماً مع [id] و [slug]
Set-Content -LiteralPath "$A\app\[locale]\page.tsx" -Encoding UTF8 @'...'@
```

### تشغيل محلياً
```powershell
cd "D:\Files\Programming_Projects\Euro Store\apps\web"
npx next dev   # → http://localhost:3000
```