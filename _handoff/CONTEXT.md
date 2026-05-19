# Euro Store — سياق المشروع الكامل v6

## ما هو المشروع؟
منصة أزياء رقمية متكاملة مستوحاة من منطق Zalando — مصممة للسوق السورية.
الاسم: Euro Store
المنصات: Web (Next.js) + Mobile App (Expo RN — iOS & Android) + Admin Panel (Next.js) + Helper Portal (Next.js) + Partner Portal (Next.js)
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
HELPER    ← موظف داخل محل Euro Store الفعلي — يدير المخزون، يقترح منتجات، يستلم استبدال في المحل، يسجّل نقاط ولاء. كل اقتراح يحتاج موافقة الأدمن. بوابته: apps/helper
PARTNER   ← صاحب محل تجاري مستقل (بقالة، صيدلية...) وقّع اتفاقية ليكون نقطة استلام فقط. لا يرى مخزوناً ولا يقترح شيئاً — فقط يمسح QR الزبون ويؤكد استلام المنتجات المُرجعة/المستبدلة. بوابته: apps/partner
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
مسارين:
أ) في المحل مباشرة — الهيلبر:
   الزبون يأتي للمحل بنفسه → يفتح التطبيق → يختار "استبدال" → يظهر QR خاص بالطلب
   الهيلبر يمسح QR → يرى صور المنتجات → يفحصها → يضغط "تأكيد الاستلام"
   الهيلبر يسلّم البديل فوراً من المخزون (لا يوجد شحن) → "IN_STORE_EXCHANGE"

ب) عبر نقطة استلام خارجية — الشريك (PARTNER):
   الزبون يختار أقرب نقطة استلام من موقعه في التطبيق
   يظهر له QR خاص + تعليمات → يتوجه للمحل الشريك → الشريك يمسح QR
   يرى الشريك: صور المنتجات + قائمة تحقق → يؤكد أو يرفض مع السبب
   شركة التوصيل تستلم من نقطة الاستلام وتوصل البديل للزبون

### الاسترجاع (قريباً — disabled في الـ UI)
- نفس آلية الاستبدال (مسار المحل الشريك أو مباشرة) لكن مع إعادة المبلغ
- في الـ UI: زر رمادي + "يتوفر قريباً" + غير قابل للضغط

### حالات الطلب (Order States)
EXCHANGE:
  PENDING → CONFIRMED_BY_HELPER | CONFIRMED_BY_PARTNER → IN_TRANSIT → DELIVERED → COMPLETED
                                                       ↓
                                                    REJECTED (مع سبب)

IN_STORE_EXCHANGE (استبدال مباشر مع الهيلبر):
  PENDING → CONFIRMED_IN_STORE → NEW_ORDER_CREATED → COMPLETED (لا transit)

RETURN:
  PENDING → RECEIVED_BY_HELPER | RECEIVED_BY_PARTNER → ADMIN_REVIEW → REFUND_APPROVED → REFUNDED
                                                      ↓              ↓
                                                   REJECTED      REFUND_REJECTED

## نظام الولاء — نقاط
- كل مستخدم عنده QR-Code ثابت وفريد لحسابه
- عند الشراء داخل المحل: Helper يصور الـ QR ويدخل قيمة الفاتورة → تُضاف نقاط تلقائياً
- النقاط قابلة للاستبدال بخصومات عند الشراء عبر المنصة

## أكواد الخصم
أنواع: عامة | فوق مبلغ معين | أول استخدام | مرة واحدة | لأقسام معينة | نسبة/قيمة ثابتة
الأدمن يتحكم بكل الأكواد من لوحة الإدارة كاملاً

## بوابة الهيلبر (apps/helper)
تطبيق ويب منفصل — الهيلبر هو موظف داخل المحل الفعلي لـ Euro Store
صلاحياته: عرض المخزون + اقتراح تعديل مخزون + اقتراح إضافة/تعديل/حذف منتج + استلام استبدال في المحل + تسجيل نقاط ولاء بـ QR
كل اقتراح (مخزون/منتج) يُرسل للأدمن → يحتاج موافقة قبل التطبيق
الاستلام في المحل: الزبون يأتي بنفسه → هيلبر يمسح QR → يسلّم البديل فوراً
تسجيل النقاط: الزبون يعرض QR الولاء → هيلبر يدخل قيمة الفاتورة → نقاط تُضاف فوراً

## بوابة الشريك — Partner Portal (apps/partner) ← جديد
تطبيق ويب منفصل تماماً — الشريك صاحب محل مستقل لا علاقة له ببضاعة Euro Store
صلاحياته محدودة جداً: مسح QR الزبون فقط + رؤية تفاصيل الطلب + تأكيد/رفع الاستلام + سجل يوم
لا يرى مخزوناً — لا يقترح شيئاً — لا يُجري أي عملية مالية — لا يسجّل نقاط
الصفحات: /login | /dashboard | /dashboard/scan | /dashboard/history

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
- تجريبي:        Vercel — web + admin + helper + partner (تم التحول من Netlify بسبب bug مزمن)
- DB/Auth/Storage: Supabase يبقى كما هو
- إنتاج مستقبلاً: Hostinger Business — Next.js standalone

## سبب التحول من Netlify إلى Vercel
@netlify/plugin-nextjs v5 يعاني bug مزمن في بيئات الـ monorepo:
لا يبندل styled-jsx في الـ Netlify Function رغم وجوده في node_modules.
الخطأ: "Cannot find module styled-jsx/package.json" عند runtime.
Vercel = المنصة الرسمية لـ Next.js، صفر إعداد، تدعم monorepo natively.

## URLs المتوقعة بعد Vercel Deploy
- Web:     https://euro-store-web.vercel.app   (أو دومين مخصص لاحقاً)
- Admin:   https://euro-store-admin-seven.vercel.app
- Helper:  https://euro-store-helper.vercel.app
- Partner: https://euro-store-partner.vercel.app

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
cd "D:\Files\Programming_Projects\Euro Store\apps\web"     → npx next dev      → :3000
cd "D:\Files\Programming_Projects\Euro Store\apps\admin"   → npx next dev -p 3001
cd "D:\Files\Programming_Projects\Euro Store\apps\helper"  → npx next dev -p 3002
cd "D:\Files\Programming_Projects\Euro Store\apps\partner" → npx next dev -p 3003

## ملاحظات حساسة
- لا إشارة لأي موقع جغرافي في الواجهة — online-only brand
- لا ذكر حمص أو سوريا في UI
- الأدمن والهيلبر مخفيان تماماً عن الزوار العاديين