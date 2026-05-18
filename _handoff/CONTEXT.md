# Euro Store — سياق المشروع الكامل v6

## ما هو المشروع؟
منصة أزياء رقمية متكاملة مستوحاة من منطق Zalando — مصممة للسوق السورية.
الاسم: Euro Store
المنصات: Web (Next.js) + Mobile (Expo RN) + Admin Panel (Next.js) + Helper Portal (Next.js)
الهدف: منافسة الشركات العالمية في جودة UX والهوية البصرية والأداء.

## مسار المشروع
D:\Files\Programming_Projects\Euro Store

## GitHub
https://github.com/Euro-Store/euro-store

## الرؤية
- منصة fashion discovery وليس فقط متجر
- Light/Dark theme — الذهبي هو اللون القيادي الدائم
- RTL عربي أولاً — ثم إنجليزي
- تجربة تنافسية: سرعة، وضوح، اكتشاف، ثقة بالمقاس، إلهام
- بنية قابلة للتوسع لأي سوق مجاور

## الأقسام الرئيسية
رجالي | نسائي | ولادي | أحذية | شنط | إكسسوار | جمال (مستقبلاً)

## الأدوار في المنصة
CUSTOMER  ← المستخدم العادي — تسوق، طلبات، مفضلة، نقاط
HELPER    ← دور وسيط — يدير المخزون ويقترح تعديلات تحتاج موافقة الأدمن
ADMIN     ← كامل الصلاحيات — يرى ويتحكم بكل شيء

## طرق الدفع
- الآن: كاش عند الاستلام + شام كاش
- قريباً: بطاقات + محافظ رقمية أخرى (UI موجود لكنه disabled + "يتوفر قريباً")

## حماية الإجراءات — Auth Guard
الإجراءات التالية تتطلب تسجيل الدخول. الزوار غير المسجلين يُحوَّلون إلى /auth/login
مع حفظ returnUrl في sessionStorage للعودة إليها تلقائياً بعد تسجيل الدخول:
- إضافة منتج للسلة أو للمفضلة
- إتمام أي خطوة من خطوات Checkout
- إنشاء طلب استبدال
- استخدام نقاط الولاء
- كتابة تقييم منتج

## زر تسجيل الخروج
- يظهر في: Header (ويب) | قائمة Account (موبايل) | صفحة account/settings
- لا يظهر للزوار غير المسجلين
- عند الضغط: POST /api/auth/logout → مسح JWT + httpOnly cookie + تصفير Zustand authStore → redirect /

## خدمات ما بعد البيع

### الاستبدال (نشط ✓)
1. الزبون يختار المنتجات المراد استبدالها من صفحة الطلب
2. يظهر له QR-Code خاص بطلب الاستبدال
3. يتوجه إلى أي محل شريك معتمد في منطقته
4. صاحب المحل (Helper) يصور الـ QR → تظهر له صور ومعلومات المنتجات
5. يفحص المنتجات ويضغط "تأكيد الاستلام" إذا كانت بحالة ممتازة
6. سائق التوصيل يوصل المنتجات البديلة للزبون خلال أيام قليلة

### الاسترجاع (قريباً — disabled في الـ UI)
- نفس آلية الاستبدال لكن مع إعادة المبلغ
- في الـ UI: زر رمادي + "يتوفر قريباً" + غير قابل للضغط

## نظام الولاء — نقاط
- كل مستخدم عنده QR-Code ثابت وفريد لحسابه
- عند الشراء داخل المحل: Helper يصور الـ QR ويدخل قيمة الفاتورة → تُضاف نقاط تلقائياً
- النقاط قابلة للاستبدال بخصومات عند الشراء عبر المنصة

## أكواد الخصم
أنواع: عامة | فوق مبلغ معين | أول استخدام | مرة واحدة | لأقسام معينة | نسبة/قيمة ثابتة
الأدمن يتحكم بكل الأكواد من لوحة الإدارة كاملاً

## بوابة الهيلبر
تطبيق ويب منفصل — صلاحيات: تحديث مخزون + اقتراح منتج + استقبال استبدال + تسجيل ولاء
كل تعديل يحتاج موافقة الأدمن أولاً

## اللغات
العربية (ar) — أولوية | الإنجليزية (en) — next-intl

## القرارات التقنية الثابتة
- Monorepo: Turborepo
- Web: Next.js 14 App Router + TypeScript + Tailwind CSS
- Mobile: Expo React Native SDK 51 + NativeWind 4
- Admin: Next.js 14 + shadcn/ui — على دومين مخفي منفصل تماماً
- Helper Portal: Next.js 14 + shadcn/ui — على مسار مخفي منفصل
- Backend: Next.js API Routes (Serverless)
- DB: PostgreSQL عبر Supabase + Prisma ORM
- Auth: Supabase Auth + JWT + Social Login (Google OAuth) + httpOnly cookies
- Storage: Supabase Storage — صور المنتجات
- State: Zustand — مشترك Web+Mobile
- QR Code: qrcode.react (web) + expo-barcode-scanner (mobile)
- Search: pg_search (Supabase) — بلا Meilisearch خارجي

## الاستضافة (محدّث v6)
- تجريبي:        Vercel — web + admin + helper (تم التحول من Netlify بسبب bug مزمن)
- DB/Auth/Storage: Supabase يبقى كما هو
- إنتاج مستقبلاً: Hostinger Business — Next.js standalone

## سبب التحول من Netlify إلى Vercel
@netlify/plugin-nextjs v5 يعاني bug مزمن في بيئات الـ monorepo:
لا يبندل styled-jsx في الـ Netlify Function رغم وجوده في node_modules.
الخطأ: "Cannot find module styled-jsx/package.json" عند runtime.
Vercel = المنصة الرسمية لـ Next.js، صفر إعداد، تدعم monorepo natively.

## URLs المتوقعة بعد Vercel Deploy
- Web:    https://euro-store-web.vercel.app   (أو دومين مخصص لاحقاً)
- Admin:  https://euro-store-admin.vercel.app
- Helper: https://euro-store-helper.vercel.app

## قواعد العمل مع AI
- كل خطوة = أمر PowerShell واحد ضخم
- كل أمر يحدّث PROGRESS.md تلقائياً في نهايته
- الـ AI يحتاج فقط ملفات _handoff/ ليكمل العمل

---

## ⚠️ تحذيرات PowerShell الحرجة

### تحذير 1 — الأقواس المربعة في المسارات
أي مسار يحتوي [ أو ] → استخدم -LiteralPath حتماً:
Set-Content -LiteralPath "$A\app\[locale]\page.tsx" -Encoding UTF8 @'...'@

### تحذير 2 — BOM في أي ملف نصي (JSON + TOML + كل شيء)
Set-Content -Encoding UTF8 يكتب BOM ويكسر JSON و TOML.
الحل الإلزامي لكل الملفات:
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file", $content, $utf8NoBom)

### تحذير 3 — Turbo recursive loop
لا تسمّ scripts الجذر بنفس أسماء turbo tasks.
استخدم: npx turbo run dev --filter=@euro/web

### تشغيل المشروع محلياً
cd "D:\Files\Programming_Projects\Euro Store\apps\web"  → npx next dev      → :3000
cd "D:\Files\Programming_Projects\Euro Store\apps\admin" → npx next dev -p 3001
cd "D:\Files\Programming_Projects\Euro Store\apps\helper"→ npx next dev -p 3002

## ملاحظات حساسة
- لا إشارة لأي موقع جغرافي في الواجهة — online-only brand
- لا ذكر حمص أو سوريا في UI
- الأدمن والهيلبر مخفيان تماماً عن الزوار العاديين