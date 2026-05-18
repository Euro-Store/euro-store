# Euro Store — سياق المشروع الكامل v5

## ما هو المشروع؟
منصة أزياء رقمية متكاملة مستوحاة من منطق Zalando — مصممة للسوق السورية.
الاسم: Euro Store
المنصات: Web (Next.js) + Mobile (Expo RN) + Admin Panel (Next.js) + Helper Portal (Next.js)
الهدف: منافسة الشركات العالمية في جودة UX والهوية البصرية والأداء.

## مسار المشروع
D:\Files\Programming_Projects\Euro Store

## الرؤية
- منصة fashion discovery وليس فقط متجر
- Light/Dark theme — الذهبي هو اللون القيادي الدائم
- RTL عربي أولاً — ثم إنجليزي
- تجربة تنافسية: سرعة، وضوح، اكتشاف، ثقة بالمقاس، إلهام
- بنية قابلة للتوسع لأي سوق مجاور

## الأقسام الرئيسية
رجالي | نسائي | ولادي | أحذية | شنط | إكسسوار | جمال (مستقبلاً)

## الأدوار في المنصة
```
CUSTOMER  ← المستخدم العادي — تسوق، طلبات، مفضلة، نقاط
HELPER    ← دور وسيط — يدير المخزون ويقترح تعديلات تحتاج موافقة الأدمن
ADMIN     ← كامل الصلاحيات — يرى ويتحكم بكل شيء
```

## طرق الدفع
- الآن: كاش عند الاستلام + شام كاش
- قريباً: بطاقات + محافظ رقمية أخرى (UI موجود لكنه disabled + "يتوفر قريباً")

## حماية الإجراءات — Auth Guard
الإجراءات التالية تتطلب تسجيل الدخول. الزوار غير المسجلين يُحوَّلون إلى `/auth/login`
مع حفظ `returnUrl` في sessionStorage للعودة إليها تلقائياً بعد تسجيل الدخول:
- إضافة منتج للسلة أو للمفضلة
- إتمام أي خطوة من خطوات Checkout
- إنشاء طلب استبدال
- استخدام نقاط الولاء
- كتابة تقييم منتج

## زر تسجيل الخروج
- يظهر في: Header (ويب) | قائمة Account (موبايل) | صفحة account/settings
- لا يظهر للزوار غير المسجلين — يختفي كلياً بدون تسجيل دخول
- عند الضغط: `POST /api/auth/logout` → مسح JWT + httpOnly cookie + تصفير Zustand authStore → redirect الصفحة الرئيسية

## خدمات ما بعد البيع

### الاستبدال (نشط ✓)
آلية العمل:
1. الزبون يختار المنتجات المراد استبدالها من صفحة الطلب
2. يظهر له QR-Code خاص بطلب الاستبدال
3. يتوجه إلى أي محل شريك معتمد في منطقته
4. صاحب المحل (Helper) يصور الـ QR → تظهر له صور ومعلومات المنتجات بالتفصيل
5. يفحص المنتجات ويضغط "تأكيد الاستلام" إذا كانت بحالة ممتازة
6. سائق التوصيل يوصل المنتجات البديلة للزبون خلال أيام قليلة

### الاسترجاع (قريباً — disabled في الـ UI)
- نفس آلية الاستبدال لكن مع إعادة المبلغ
- شرط 1: الاسترجاع خلال 24 ساعة فقط من المحلات الشريكة حصراً
- شرط 2: رد المبلغ عبر شام كاش أو رصيد داخلي في المحفظة — لا كاش نقدي
- في الـ UI: زر رمادي + "يتوفر قريباً" + غير قابل للضغط

## نظام الولاء — نقاط
- كل مستخدم عنده QR-Code ثابت وفريد لحسابه
- عند الشراء داخل المحل الفعلي: المحاسب (Helper) يصور الـ QR ويدخل قيمة الفاتورة
  → تُضاف نقاط للحساب تلقائياً بناءً على قيمة الفاتورة
- النقاط قابلة للاستبدال بخصومات عند الشراء عبر المنصة
- يمكن للزبون استخدام QR آخر عند المحاسب لاستخدام نقاطه مباشرةً في الفاتورة
  → يحسب النظام تلقائياً المبلغ المتبقي بعد خصم النقاط

## أكواد الخصم
- خانة كود خصم في كل عملية شراء
- أنواع الأكواد:
  * عامة — تعمل على كل المنتجات
  * فوق مبلغ معين — minOrderAmount
  * أول استخدام للتطبيق — isFirstOrder
  * استخدام مرة واحدة فقط — maxUses: 1
  * لأقسام معينة فقط — categoryIds
  * نسبة مئوية أو قيمة ثابتة
- الأدمن يتحكم بكل الأكواد من لوحة الإدارة كاملاً

## بوابة الهيلبر (Helper Portal)
- تطبيق ويب منفصل على مسار مخفي
- صلاحيات الهيلبر:
  * تحديث مخزون المنتجات (يجعل منتجاً "نفذت الكمية" أو يحدث الكمية)
  * اقتراح إضافة أو تعديل منتج — يذهب للأدمن للموافقة قبل النشر
  * استقبال طلبات الاستبدال من الزبائن وتأكيد الاستلام
  * تسجيل مشتريات الزبائن داخل المحل لإضافة نقاط الولاء
- لا يُنشر أي تعديل مباشرة — كل شيء يحتاج موافقة الأدمن أولاً

## اللغات
العربية (ar) — أولوية | الإنجليزية (en) — next-intl

## القرارات التقنية الثابتة
- Monorepo: Turborepo
- Web: Next.js 14 App Router + TypeScript + Tailwind CSS
- Mobile: Expo React Native SDK 51 + NativeWind 4
- Admin: Next.js 14 + shadcn/ui — على دومين مخفي منفصل تماماً
- Helper Portal: Next.js 14 + shadcn/ui — على مسار مخفي منفصل
- Backend: Next.js API Routes → تُنشر تلقائياً كـ Netlify Functions (Serverless — بلا Railway)
- DB: PostgreSQL عبر Supabase + Prisma ORM
- Auth: Supabase Auth + JWT + Social Login (Google OAuth) + httpOnly cookies
- Storage: Supabase Storage — صور المنتجات
- State: Zustand — مشترك Web+Mobile
- QR Code: qrcode.react (web) + expo-barcode-scanner (mobile)
- Search: pg_search (Supabase) — بلا Meilisearch خارجي
- Cache: Supabase Auth Sessions + in-memory middleware — بلا Redis أو Railway
- Hosting (تجريبي):     Netlify كاملاً — web + admin + helper + API كـ Functions + Supabase (DB + Storage + Auth)
- Hosting (إنتاج مستقبلاً): Hostinger Business — انتقال سلس: Next.js standalone + Supabase يبقى أو DB محلي

## قواعد العمل مع AI
- كل خطوة = أمر PowerShell واحد ضخم
- كل أمر يحدّث PROGRESS.md تلقائياً في نهايته
- الـ AI يحتاج فقط ملفات _handoff/ ليكمل العمل
- يوجد ملف ARCHITECTURE.md للمخططات الكاملة
- يوجد ملف DESIGN_SYSTEM.md للهوية البصرية التفصيلية

---

## ⚠️ تحذيرات PowerShell الحرجة — اقرأها قبل كتابة أي سكريبت

### تحذير 1 — الأقواس المربعة في المسارات
المشكلة: Next.js يستخدم مجلدات بأسماء تحتوي أقواساً مربعة مثل `[id]` و`[slug]` و`[locale]`.
PowerShell يفسّر الأقواس المربعة كـ wildcard pattern، مما يُعطّل parameter binding
في `Set-Content` ويُنتج الخطأ: "A parameter cannot be found that matches parameter name 'Encoding'"

الحل الإلزامي: استخدام `-LiteralPath` بدلاً من الـ positional path:

```powershell
# ❌ خطأ — يفشل مع [id]
Set-Content "$A\app\dashboard\orders\[id]\page.tsx" -Encoding UTF8 @'...'@

# ✅ صحيح — يعمل دائماً
Set-Content -LiteralPath "$A\app\dashboard\orders\[id]\page.tsx" -Encoding UTF8 @'...'@
```

القاعدة: أي مسار يحتوي `[` أو `]` → استخدم `-LiteralPath` حتماً.

---

### تحذير 2 — BOM في ملفات JSON (حرج جداً)
المشكلة: `Set-Content -Encoding UTF8` في PowerShell يكتب UTF-8 **مع BOM** (Byte Order Mark).
هذا يكسر أي ملف JSON ويُنتج الخطأ:
```
SyntaxError: Unexpected token '﻿', "﻿{ "name"... is not valid JSON
```
وهذا يُعطّل Next.js و Webpack و npm workspaces كلها.

الحل الإلزامي: استخدم `[System.IO.File]::WriteAllText()` لكل ملفات JSON:

```powershell
# ❌ خطأ — يكتب BOM ويكسر JSON
Set-Content -Path "$A\package.json" -Value $content -Encoding UTF8

# ✅ صحيح — بدون BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("$A\package.json", $content, $utf8NoBom)
```

القاعدة: **أي ملف JSON** (package.json, tsconfig.json, turbo.json, ...إلخ)
يجب كتابته بـ `[System.IO.File]::WriteAllText()` وليس `Set-Content`.

---

### تحذير 3 — Turbo والـ scripts في root package.json
المشكلة: Turbo 2.x يعتبر أي script في الـ root package.json بنفس اسم task
(مثل `dev`) كـ root task وينفّذه كجزء من الـ pipeline فيحدث recursive loop:
```
recursive_turbo_invocations: This script calls `turbo`, which calls the script...
```

الحل: لا تسمّي scripts الجذر بنفس أسماء turbo tasks. استخدم أسماء مختلفة:
```json
// ❌ خطأ — يسبب loop
{ "scripts": { "dev": "turbo run dev" } }

// ✅ صحيح — أسماء مختلفة
{ "scripts": { "dev:web": "turbo run dev --filter=@euro/web" } }
```

أو شغّل turbo مباشرة بدون npm:
```powershell
npx turbo run dev --filter=@euro/web
```

---

### تشغيل المشروع محلياً (الطريقة الصحيحة الآن)
```powershell
# Web app
cd "D:\Files\Programming_Projects\Euro Store\apps\web"
npx next dev
# → يعمل على http://localhost:3000

# Admin app
cd "D:\Files\Programming_Projects\Euro Store\apps\admin"
npx next dev -p 3001

# Helper app
cd "D:\Files\Programming_Projects\Euro Store\apps\helper"
npx next dev -p 3002
```

---

## ملاحظات حساسة
- لا إشارة لأي موقع جغرافي في الواجهة — online-only brand
- لا ذكر حمص أو سوريا في UI
- الأدمن والهيلبر مخفيان تماماً عن الزوار العاديين
- التصميم الحالي يُستبدل كلياً في M2.5