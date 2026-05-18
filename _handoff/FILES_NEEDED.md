# ما يحتاجه الـ AI الجديد — دليل التسليم v5

## الملفات الأساسية (أعطها دائماً)
1. _handoff/CONTEXT.md              — من نحن وهدفنا
2. _handoff/PROGRESS.md             — ما تم وما لم يتم
3. _handoff/NEXT_STEP.md            — الخطوة التالية حرفياً
4. _handoff/STACK.md                — التقنيات والألوان وبنية المجلدات

## الملفات المرجعية (أعطها عند الحاجة)
5. _handoff/ARCHITECTURE.md         — مخططات UML كاملة (أشجار + تدفقات + ERD)
6. _handoff/DESIGN_SYSTEM.md        — نظام التصميم التفصيلي
7. _handoff/ZALANDO_ANALYSIS.md     — تحليل Zalando A–Z

## قالب الرسالة القياسية للـ AI الجديد
---
سياق المشروع:
[محتوى CONTEXT.md]

ما تم إنجازه:
[محتوى PROGRESS.md]

الخطوة التالية:
[محتوى NEXT_STEP.md]

التقنيات:
[محتوى STACK.md]

للمزيد من التفاصيل: ARCHITECTURE.md + DESIGN_SYSTEM.md + ZALANDO_ANALYSIS.md

المطلوب: أعطني أمر PowerShell واحداً كبيراً لإنجاز الخطوة التالية
---

## قواعد التسليم
- لا تعطِ الكود المصدري للملفات — الـ AI سيعيد كتابته من الـ handoff
- لا تعطِ ملفات node_modules أو .next
- أعطِ ARCHITECTURE.md عند العمل على صفحة جديدة أو component جديد
- أعطِ ZALANDO_ANALYSIS.md عند العمل على UX أو filters أو PDP

---

## ⚠️ تحذير 1 — Set-Content والأقواس المربعة في PowerShell

### المشكلة
Next.js App Router يستخدم مجلدات بأسماء تحتوي أقواساً مربعة مثل:
`[id]`, `[slug]`, `[locale]`, `[orderId]` ... إلخ

PowerShell يُعامل الأقواس المربعة كـ wildcard characters في الـ globbing،
فعندما تُمرَّر كـ positional argument لـ `Set-Content` يفشل parameter binding
ويظهر الخطأ التالي:

```
Set-Content : A parameter cannot be found that matches parameter name 'Encoding'.
```

### الحل الإلزامي
```powershell
# ❌ يفشل
Set-Content "$A\app\dashboard\orders\[id]\page.tsx" -Encoding UTF8 @'...'@

# ✅ يعمل دائماً
Set-Content -LiteralPath "$A\app\dashboard\orders\[id]\page.tsx" -Encoding UTF8 @'...'@
```

### المسارات المتأثرة في هذا المشروع
```
apps/admin/app/dashboard/products/[id]/edit/page.tsx
apps/admin/app/dashboard/orders/[id]/page.tsx
apps/admin/app/dashboard/exchanges/[id]/page.tsx
apps/admin/app/dashboard/discounts/[id]/page.tsx
apps/web/app/[locale]/products/[slug]/page.tsx
apps/web/app/[locale]/orders/[id]/page.tsx
apps/helper/app/dashboard/exchanges/[id]/page.tsx
```

---

## ⚠️ تحذير 2 — BOM في ملفات JSON (حرج جداً — اكتُشف في M9)

### المشكلة
`Set-Content -Encoding UTF8` في PowerShell يكتب UTF-8 **مع BOM**.
هذا يكسر ملفات JSON ويُنتج:
```
SyntaxError: Unexpected token '﻿', "﻿{ "name"... is not valid JSON
```
ويُعطّل Next.js و Webpack و npm workspaces و turbo كلها.

### الحل الإلزامي لجميع ملفات JSON
```powershell
# ❌ خطأ — يضيف BOM
Set-Content -Path "$A\package.json" -Value $content -Encoding UTF8

# ✅ صحيح — بدون BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("$A\package.json", $content, $utf8NoBom)
```

الملفات المتأثرة: `package.json`, `tsconfig.json`, `turbo.json`, `*.json` أي ملف JSON.
لا تستخدم `Set-Content -Encoding UTF8` لأي JSON — استخدم `WriteAllText` دائماً.

---

## ⚠️ تحذير 3 — Turbo recursive loop

### المشكلة
إذا كان root `package.json` يحتوي script بنفس اسم turbo task (مثل `dev`):
```json
{ "scripts": { "dev": "turbo run dev" } }
```
يحدث recursive loop: turbo يشغّل الـ script، الـ script يشغّل turbo... إلخ.

### الحل
استخدم أسماء مختلفة للـ scripts في الـ root:
```json
{
  "scripts": {
    "dev:web":    "turbo run dev --filter=@euro/web",
    "dev:admin":  "turbo run dev --filter=admin",
    "dev:helper": "turbo run dev --filter=helper"
  }
}
```
أو شغّل turbo مباشرة: `npx turbo run dev --filter=@euro/web`

---

## تشغيل المشروع محلياً
```powershell
# Web (الموقع الرئيسي) — http://localhost:3000
cd "D:\Files\Programming_Projects\Euro Store\apps\web"
npx next dev

# Admin — http://localhost:3001
cd "D:\Files\Programming_Projects\Euro Store\apps\admin"
npx next dev -p 3001

# Helper — http://localhost:3002
cd "D:\Files\Programming_Projects\Euro Store\apps\helper"
npx next dev -p 3002
```