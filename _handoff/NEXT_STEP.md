# الخطوة التالية — M9 (متابعة): إعداد Supabase + Netlify Deploy

## الوضع الحالي
- ✅ Web يعمل محلياً على http://localhost:3000
- ✅ API Routes (34 ملف) جاهزة
- ✅ Prisma Schema كامل (15 model)
- ⏳ Supabase لم يُعدّ بعد (لا DB حقيقي، لا Auth)
- ⏳ Netlify لم يُنشر بعد

## الخطوات المتبقية بالترتيب

### الخطوة 1 — تثبيت @supabase/ssr في admin و helper
```powershell
$A = "D:\Files\Programming_Projects\Euro Store"

cd "$A\apps\admin"
npm install @supabase/ssr @supabase/supabase-js

cd "$A\apps\helper"
npm install @supabase/ssr @supabase/supabase-js
```

### الخطوة 2 — إعداد Supabase (يدوي)
```
1. اذهب إلى https://supabase.com → New Project
2. اختر Region: EU West (Frankfurt)
3. من Settings > API انسخ:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
4. من Settings > Database > Connection String (Nodejs):
   DATABASE_URL  ← port 6543 (pgBouncer)
   DIRECT_URL    ← port 5432 (migrations)
```

### الخطوة 3 — تشغيل Prisma
```powershell
$A = "D:\Files\Programming_Projects\Euro Store"
cd "$A\packages\db"

# أضف DATABASE_URL و DIRECT_URL في packages/db/.env أولاً
npx prisma generate
npx prisma db push
```

### الخطوة 4 — تعبئة .env.local
أنشئ هذه الملفات في apps/web + apps/admin + apps/helper:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_URL=postgresql://postgres:[PASS]@db.[REF].supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### الخطوة 5 — تشغيل SQL في Supabase SQL Editor
شغّل بالترتيب:
1. supabase/rls-policies.sql
2. supabase/storage-policies.sql
3. supabase/initial-data.sql

### الخطوة 6 — Google OAuth
```
1. console.cloud.google.com → APIs & Services → Credentials
2. Create OAuth 2.0 Client ID → Web application
3. Authorized redirect URI: https://[PROJECT-REF].supabase.co/auth/v1/callback
4. Supabase → Auth → Providers → Google → Enable + Client ID + Secret
5. Supabase → Auth → URL Config:
   Site URL: http://localhost:3000 (تطوير) أو https://[site].netlify.app (إنتاج)
   Redirect URLs: http://localhost:3000/api/auth/callback
```

### الخطوة 7 — Deploy على Netlify
```
1. ارفع المشروع على GitHub (إذا لم يكن موجوداً)
2. netlify.com → Add new site → Import from GitHub
3. Site 1 (Web):
   Base: apps/web | Build: next build | Publish: .next
4. Site 2 (Admin):
   Base: apps/admin | Build: next build | Publish: .next
5. Site 3 (Helper):
   Base: apps/helper | Build: next build | Publish: .next
6. أضف ENV vars لكل site من Netlify Dashboard
7. تثبيت @netlify/plugin-nextjs في كل site
```

### الخطوة 8 — اختبار E2E
```
✅ تسجيل + تسجيل دخول (Email + Google)
✅ تصفح منتجات + فلاتر
✅ سلة + Checkout + كود خصم + نقاط
✅ طلب استبدال + QR
✅ Admin dashboard
✅ Helper portal + مسح QR
```

---

### الخطوة 9 — Auth Guard + زر تسجيل الخروج
```
[ ] useAuthGuard() hook على:
    - AddToCartButton → /auth/login?return=[current-page]
    - WishlistButton  → /auth/login?return=[current-page]
    - Checkout        → محمي تلقائياً بـ middleware.ts
    - Exchange create → /auth/login?return=/account/exchange
    - Review submit   → /auth/login?return=[product-page]

[ ] LogoutButton:
    - Header (ويب) — يظهر فقط إذا authStore.isLoggedIn === true
    - Account tab (موبايل) — في قائمة الحساب
    - POST /api/auth/logout + تصفير authStore + redirect /
```

### الخطوة 10 — اختبار شامل للأزرار والإجراءات
```
[ ] Cart:     إضافة + تعديل كمية + حذف + مسح كامل
[ ] Wishlist: إضافة + إزالة + تزامن مع API
[ ] Checkout: address → shipping → payment → confirm (4 خطوات)
[ ] Discount: صالح + منتهي + فوق مبلغ معين + أول استخدام + قسم محدد
[ ] Loyalty:  كسب نقاط (Helper QR) + استخدام (Checkout toggle)
[ ] Exchange: اختيار منتجات + QR + تأكيد Helper + تحديث status
[ ] Admin:    CRUD منتجات + طلبات + عملاء + خصومات + هيلبرز + محلات
[ ] Helper:   مسح QR استبدال + تسجيل ولاء + اقتراح منتج + تحديث مخزون
```

## ⚠️ تحذيرات PowerShell — مهم جداً

### 1. BOM في JSON
```powershell
# ❌ خطأ — يكسر JSON
Set-Content -Path "file.json" -Value $content -Encoding UTF8

# ✅ صحيح دائماً
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file.json", $content, $utf8NoBom)
```

### 2. الأقواس المربعة في المسارات
```powershell
# ❌ خطأ مع [id] أو [slug]
Set-Content "$A\app\[locale]\page.tsx" -Encoding UTF8 @'...'@

# ✅ صحيح
Set-Content -LiteralPath "$A\app\[locale]\page.tsx" -Encoding UTF8 @'...'@
```

### 3. Turbo recursive loop
```powershell
# لا تستخدم "dev" كاسم script في root package.json
# استخدم بدلاً:
npx turbo run dev --filter=@euro/web
# أو
npm run dev:web  # إذا كان مُعرَّفاً بهذا الاسم
```

### تشغيل المشروع محلياً الآن
```powershell
cd "D:\Files\Programming_Projects\Euro Store\apps\web"
npx next dev
# → http://localhost:3000 ✅
```