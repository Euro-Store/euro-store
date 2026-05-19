# ما يحتاجه الـ AI الجديد — دليل التسليم v6

## الملفات الأساسية (أعطها دائماً)
1. _handoff/CONTEXT.md      — من نحن وهدفنا والقرارات التقنية
2. _handoff/PROGRESS.md     — ما تم وما لم يتم
3. _handoff/NEXT_STEP.md    — الخطوة التالية حرفياً
4. _handoff/STACK.md        — التقنيات والألوان وبنية المجلدات

## الملفات المرجعية (أعطها عند الحاجة)
5. _handoff/ARCHITECTURE.md      — مخططات UML كاملة
6. _handoff/DESIGN_SYSTEM.md     — نظام التصميم التفصيلي
7. _handoff/ZALANDO_ANALYSIS.md  — تحليل Zalando A–Z

## قالب الرسالة القياسية للـ AI الجديد
---
سياق المشروع: [محتوى CONTEXT.md]
ما تم إنجازه: [محتوى PROGRESS.md]
الخطوة التالية: [محتوى NEXT_STEP.md]
التقنيات: [محتوى STACK.md]
المطلوب: أعطني أمر PowerShell واحداً كبيراً لإنجاز الخطوة التالية
---

---

## ⚠️ تحذير 1 — BOM في أي ملف نصي (حرج جداً)
Set-Content -Encoding UTF8 يكتب BOM ويكسر JSON وTOML وكل شيء.
الحل الإلزامي لجميع الملفات:
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("full\path\file", $content, $utf8NoBom)

## ⚠️ تحذير 2 — الأقواس المربعة في المسارات
Set-Content -LiteralPath "$A\app\[locale]\page.tsx" -Encoding UTF8 @'...'@

## ⚠️ تحذير 3 — Turbo recursive loop
لا تسمّ scripts الجذر بنفس أسماء turbo tasks.
استخدم: npx turbo run dev --filter=@euro/web

## ⚠️ تحذير 4 — Netlify مُهجور
لا تحاول النشر على Netlify مجدداً.
السبب: bug مزمن في @netlify/plugin-nextjs v5 مع monorepos (styled-jsx).
الحل: Vercel فقط — يدعم monorepo natively وهو المنصة الرسمية لـ Next.js.

## تشغيل المشروع محلياً
cd "D:\Files\Programming_Projects\Euro Store\apps\web"     → npx next dev       → :3000
cd "D:\Files\Programming_Projects\Euro Store\apps\admin"   → npx next dev -p 3001
cd "D:\Files\Programming_Projects\Euro Store\apps\helper"  → npx next dev -p 3002
cd "D:\Files\Programming_Projects\Euro Store\apps\partner" → npx next dev -p 3003