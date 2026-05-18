# Euro Store — Design System v3
# نظام التصميم الكامل: ألوان، طباعة، مسافات، مكونات

════════════════════════════════════════════════════════════════
## 1. COLOR SYSTEM — نظام الألوان
════════════════════════════════════════════════════════════════

### Primary — الذهبي (لا يتغير بين الثيمين) ← اللون القيادي الدائم
```
--color-gold:        #c9961a   ← primary actions, key borders  (أغمق قليلاً — أكثر فخامة)
--color-gold-light:  #e8b84b   ← hover, glow, highlight
--color-gold-deep:   #9c7213   ← pressed, active, dark badge
--color-gold-alpha:  rgba(201,150,26,0.12) ← خلفية شبه شفافة للـ badges
```

### Secondary Accent — الأحمر الفاشن (جديد)
```
--color-accent:      #c0282d   ← Sale badges, urgent states, offers
--color-accent-light:#e05257   ← hover on accent
--color-accent-soft: #fff0f0   ← light background for sale areas
--color-accent-dark: #8b1a1d   ← deep accent for dark theme
```

### Dark Theme — الثيم الغامق (محدّث — أكثر عمقاً وفخامة)
```
background:   #0d0d0d    ← rich deep black — body
surface:      #161616    ← بطاقات، panels (أكثر دفئاً من #121212)
elevated:     #1f1f1f    ← hover backgrounds
border:       #2c2c2c    ← حدود البطاقات
border-light: #383838    ← حدود خفيفة
text-primary: #f0eeeb    ← warm white — أريح للعين من #f5f5f5 النقي
text-secondary:#9e9e9e
text-muted:   #5a5a5a
```

### Light Theme — الثيم الفاتح (محدّث — أنقى وأكثر احترافية)
```
background:   #fafaf8    ← crisp neutral white — body (أنظف من #f7f5ef)
surface:      #ffffff    ← بطاقات، panels
elevated:     #f3f0e8    ← hover backgrounds (دفء خفيف)
border:       #e8e8e8    ← حدود البطاقات (أنعم)
border-light: #f0f0f0    ← حدود خفيفة
text-primary: #0d0d0d    ← أغمق وأثرى من #111111
text-secondary:#4a4a4a
text-muted:   #939393
```

### Semantic Colors
```
success: #15803d   ← متوفر، طلب مكتمل، نقاط مكتسبة (أعمق وأوضح)
warning: #d97706   ← تحذير، كمية محدودة، نقاط منتهية الصلاحية
error:   #b91c1c   ← خطأ، نفذ المخزون، كود خصم غير صالح (أعمق)
info:    #0369a1   ← معلومات، حالة الاستبدال
muted:   #737373   ← disabled, coming-soon elements
```

════════════════════════════════════════════════════════════════
## 2. TYPOGRAPHY — الطباعة
════════════════════════════════════════════════════════════════

```
Font Family: Tajawal (Google Fonts) — لكل الواجهة العربية
Fallback: system-ui, -apple-system, sans-serif

Scale:
┌──────────┬────────┬────────┬─────────────────────────────┐
│ Name     │ Size   │ Weight │ Usage                       │
├──────────┼────────┼────────┼─────────────────────────────┤
│ display  │ 48px   │ 700    │ Hero headlines               │
│ h1       │ 36px   │ 700    │ Page titles                 │
│ h2       │ 28px   │ 600    │ Section headers             │
│ h3       │ 22px   │ 600    │ Card titles                 │
│ h4       │ 18px   │ 600    │ Sub-sections                │
│ body-lg  │ 16px   │ 400    │ Main body text              │
│ body     │ 14px   │ 400    │ Default UI text             │
│ small    │ 12px   │ 400    │ Captions, labels            │
│ xs       │ 11px   │ 400    │ Legal, metadata             │
└──────────┴────────┴────────┴─────────────────────────────┘

Line Heights:
- headings: 1.2
- body:     1.6
- compact:  1.3 (cards, small UI)
```

════════════════════════════════════════════════════════════════
## 3. SPACING SYSTEM — نظام المسافات
════════════════════════════════════════════════════════════════

```
Base unit: 4px (Tailwind default)

Scale: 1=4px | 2=8px | 3=12px | 4=16px | 6=24px | 8=32px
       10=40px | 12=48px | 16=64px | 20=80px | 24=96px

Usage:
- Component padding:  px-4 py-3  (button)
- Card padding:       p-4 (mobile) / p-6 (desktop)
- Section padding:    py-12 (mobile) / py-20 (desktop)
- Gap between cards:  gap-4 (mobile) / gap-6 (desktop)
- Container max:      max-w-7xl mx-auto px-4 md:px-8
```

════════════════════════════════════════════════════════════════
## 4. COMPONENT SPECS — مواصفات المكونات
════════════════════════════════════════════════════════════════

### Button
```
Variants:
┌──────────────┬────────────────────────────────────────────┐
│ primary      │ bg-gold text-dark-base font-semibold       │
│              │ hover:bg-gold-light transition             │
│              │ px-6 py-3 rounded-btn                      │
├──────────────┼────────────────────────────────────────────┤
│ secondary    │ border border-gold text-gold               │
│              │ hover:bg-gold-alpha                        │
│              │ px-6 py-3 rounded-btn                      │
├──────────────┼────────────────────────────────────────────┤
│ ghost        │ text-text-primary hover:bg-elevated        │
│              │ px-4 py-2                                   │
├──────────────┼────────────────────────────────────────────┤
│ danger       │ bg-error text-white hover:bg-red-700       │
├──────────────┼────────────────────────────────────────────┤
│ disabled     │ opacity-40 cursor-not-allowed              │
│ coming soon  │ opacity-40 cursor-not-allowed              │
│              │ + tooltip "يتوفر قريباً"                   │
└──────────────┴────────────────────────────────────────────┘

Sizes: sm(px-3 py-1.5 text-sm) | md(px-6 py-3) | lg(px-8 py-4 text-lg)
```

### Product Card
```
┌──────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────┐   │
│  │                                          │   │
│  │          Product Image                   │   │
│  │       (hover: swap to img2)              │   │
│  │                                          │   │
│  │  [DISCOUNT BADGE]              [♡ btn]  │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  Brand Name             ●●● (color dots)         │
│  Product Name (2 lines max)                      │
│                                                  │
│  ~~original~~    Sale Price    [-30%]            │
│                                                  │
└──────────────────────────────────────────────────┘

Dimensions:
- Mobile:  calc(50vw - 24px) width, auto height
- Tablet:  calc(33vw - 24px)
- Desktop: 280px fixed or grid auto-fill

Interaction:
- hover → show secondary image + subtle shadow
- wishlist btn → scale pulse animation
- quick add → slide up from bottom of card (optional M3+)
```

### Header Layout
```
┌─────────────────────────────────────────────────────────────┐
│ TOP BAR: [شحن مجاني للطلبات فوق ...]        [AR | EN]     │  h=36px
├─────────────────────────────────────────────────────────────┤
│ [LOGO]    [Nav: رجالي نسائي ولادي أحذية شنط]              │  h=64px
│           [              SEARCH BAR              ]          │
│           [🌙][♡ 2][🛍 3][👤 ▾]                           │
│                          ↑                                  │
│              Account Dropdown (عند الضغط):                 │
│              ┌──────────────────────────────┐              │
│              │  مرحباً، [اسم المستخدم]       │              │
│              │  ─────────────────────────── │              │
│              │  حسابي                        │              │
│              │  طلباتي                       │              │
│              │  نقاطي                        │              │
│              │  المفضلة                      │              │
│              │  ─────────────────────────── │              │
│              │  🚪 تسجيل الخروج  ← [واضح]   │              │
│              └──────────────────────────────┘              │
│                                                             │
│ [GUEST STATE]: يظهر "تسجيل الدخول | إنشاء حساب" بدل 👤    │
├─────────────────────────────────────────────────────────────┤
│ MEGA MENU (on hover nav item):                              │
│  ┌──────────────┬──────────────┬──────────────────────┐   │
│  │ أقسام        │ براندات      │ [صورة ترويجية]       │   │
│  │ • تي شيرتات  │ • Zara       │                      │   │
│  │ • بناطيل     │ • H&M        │  [عنوان] + [CTA]    │   │
│  │ • جاكيتات    │ • Pull&Bear  │                      │   │
│  └──────────────┴──────────────┴──────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Filter System
```
DESKTOP (Sidebar — right side in RTL):
┌──────────────────────────────────────────────────────────┐
│ الفلاتر                              [مسح الكل]         │
├──────────────────────────────────────────────────────────┤
│ ▼ السعر                                                  │
│   ════════●══════════════════  (slider)                 │
│   0 SYP ─────────────── 500,000 SYP                    │
├──────────────────────────────────────────────────────────┤
│ ▼ اللون                                                  │
│   ● أسود (34)   ● أبيض (21)   ● أزرق (18)             │
├──────────────────────────────────────────────────────────┤
│ ▼ المقاس                                                 │
│   [XS] [S] [M] [L] [XL] [XXL]                          │
├──────────────────────────────────────────────────────────┤
│ ▼ البراند                                                │
│   ☑ Zara (45)     ☐ H&M (38)                           │
├──────────────────────────────────────────────────────────┤
│ ▼ الخصم                                                  │
│   ☐ عروض فقط                                            │
└──────────────────────────────────────────────────────────┘

MOBILE (Bottom Sheet):
╔═══════════════════════════════════╗
║          ━━━━━ (handle)           ║
║  الفلاتر              [×]         ║
╠═══════════════════════════════════╣
║  [السعر] [اللون] [المقاس] [براند] ║
╠═══════════════════════════════════╣
║  [محتوى الـ tab المحدد]           ║
╠═══════════════════════════════════╣
║   [مسح]      [عرض 124 منتج]      ║
╚═══════════════════════════════════╝
```

### Discount Code Input — مدخل كود الخصم
```
┌──────────────────────────────────────────────────────────┐
│ كود الخصم (اختياري)                                      │
│                                                          │
│ ┌────────────────────────────────┐  ┌──────────────────┐│
│ │  أدخل الكود هنا                │  │   تطبيق الكود   ││
│ └────────────────────────────────┘  └──────────────────┘│
│                                                          │
│ ✓ [SUCCESS STATE]: تم تطبيق خصم 15% (-5,250 ل.س)       │
│ ✕ [ERROR STATE]:   كود غير صالح أو منتهي الصلاحية        │
└──────────────────────────────────────────────────────────┘

States:
- idle:    border-border, text-muted placeholder
- loading: spinner داخل الزر
- success: border-success, text-success + قيمة الخصم
- error:   border-error, text-error + رسالة الخطأ

Rules:
- يقبل حرف + رقم فقط (لا مسافات)
- Auto-uppercase عند الكتابة
- لا يمكن تطبيق كودين في نفس الطلب
```

### Payment Options — خيارات الدفع
```
┌──────────────────────────────────────────────────────────┐
│ طريقة الدفع                                               │
│                                                          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  ● كاش عند الاستلام          [✓ متاح]               │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  ● شام كاش                   [✓ متاح]               │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  ○ بطاقة ائتمان / Visa / MC  [يتوفر قريباً]         │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘

States:
- كاش COD + شام كاش : active — قابل للاختيار
- بطاقات:              disabled + coming-soon tooltip
```

### Loyalty Points Toggle — استخدام النقاط
```
┌──────────────────────────────────────────────────────────┐
│ نقاطي                                                    │
│                                                          │
│ رصيد: 2,500 نقطة ≈ 250 ل.س خصم                        │
│                                                          │
│ [●══════════] استخدام النقاط في هذا الطلب               │
│                                                          │
│ [ON STATE]: سيُخصم 250 ل.س من المجموع                  │
│ [OFF STATE]: حفظ النقاط للمرة القادمة                    │
└──────────────────────────────────────────────────────────┘

Rules:
- يظهر فقط إذا كان لدى المستخدم نقاط
- النقاط لا تتجاوز 50% من قيمة الطلب
- يمكن الجمع مع كود الخصم
```

### QR Code Display — عرض الـ QR
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│           ┌─────────────────────────┐                   │
│           │  ▓▓▓ ░░░ ▓▓░░▓▓░ ▓▓▓  │                   │
│           │  ░░░ ▓▓▓ ░░▓▓░░▓ ░░░  │                   │
│           │  ▓▓░ ░░▓ ▓▓░░▓▓░ ░▓▓  │                   │
│           │  ░▓▓ ▓░░ ░░▓▓░░▓ ▓░░  │                   │
│           │  ▓░░ ░▓▓ ▓░░▓▓░░ ░▓▓  │                   │
│           └─────────────────────────┘                   │
│                                                          │
│        [اعرض هذا الكود في المحل الشريك]                │
│                 ينتهي بعد: 48 ساعة                      │
│                                                          │
│  [زر: تنزيل QR]    [زر: مشاركة]                       │
└──────────────────────────────────────────────────────────┘

Props: token (string), size (px), label (string), expiresAt?
Library: qrcode.react → <QRCodeSVG value={token} size={size} />
Colors: dark: #d4a017 (gold) على خلفية #121212
        light: #0a0a0a على خلفية #ffffff
```

### Loyalty QR Card — بطاقة نقاط الولاء
```
┌──────────────────────────────────────────────────────────┐
│  نقاطي                              2,500 نقطة           │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│     ┌──────────────┐    للكسب: اعرضه للمحاسب            │
│     │   [QR Code]  │    عند كل عملية شراء               │
│     │   200×200    │                                     │
│     └──────────────┘    قيمة النقطة: 0.1 ل.س            │
│                                                          │
│  ════════════════════════════════════════════════════   │
│  إجمالي المكتسب: 5,000 نقطة                            │
│  إجمالي المستخدم: 2,500 نقطة                           │
└──────────────────────────────────────────────────────────┘
```

### Exchange Status Badge — شارة حالة الاستبدال
```
PENDING   → [🕐 قيد المعالجة]  bg-warning/10  text-warning
CONFIRMED → [✓ تم الاستلام]   bg-info/10     text-info
SHIPPED   → [🚚 في الطريق]     bg-info/10     text-info
DONE      → [✅ مكتمل]         bg-success/10  text-success
CANCELLED → [✕ ملغى]          bg-error/10    text-error
```

### Coming Soon Element — عنصر "يتوفر قريباً"
```
تطبق على: زر الاسترجاع، بطاقات الدفع الإلكتروني (Visa/MC/PayPal)
```css
.coming-soon {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  position: relative;
}
.coming-soon::after {
  content: 'يتوفر قريباً';
  position: absolute;
  /* tooltip positioning */
  background: #1a1a1a;
  color: #a0a0a0;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
}
```

### Auth Guard — الحماية وإعادة التوجيه للزوار
```
قاعدة: أي إجراء يستدعي تسجيل البيانات في حساب المستخدم
       يتطلب تسجيل الدخول أولاً — لا تنفّذ الإجراء بدونه.

الإجراءات المحمية:
┌─────────────────────────────────────────────────────────┐
│ الإجراء                   → التصرف إذا لم يُسجّل دخول │
├─────────────────────────────────────────────────────────┤
│ ♡ إضافة للمفضلة           → redirect: /auth/login      │
│ 🛍 إضافة للسلة            → redirect: /auth/login      │
│ ✓ تأكيد الطلب (Checkout) → redirect: /auth/login      │
│ ⭐ كتابة تقييم            → redirect: /auth/login      │
│ 🔄 طلب استبدال           → redirect: /auth/login      │
│ 🏷 استخدام نقاط الولاء   → redirect: /auth/login      │
│ 📍 حفظ عنوان              → redirect: /auth/login      │
└─────────────────────────────────────────────────────────┘

التطبيق:
- Web:    middleware.ts يحمي /account/* و /checkout/*
          Actions (wishlist/cart) تفحص authStore.isLoggedIn
          إذا false → router.push('/auth/login?redirect=[currentPath]')
- Mobile: AuthStack يحجب TabNavigator بالكامل إذا لم يكن مُسجَّلاً
          Tabs المحمية (Wishlist/Cart/Account) → navigate('Login') أولاً

بعد تسجيل الدخول:
  → إعادة التوجيه تلقائياً للصفحة التي كان فيها (redirectParam)
  → الإجراء المطلوب يُنفَّذ فوراً دون إعادة تكرار

Toast عند الإعادة:
  "سجّل دخولك لإضافة المنتجات إلى المفضلة"
  style: info — مدة: 3 ثوانٍ
```

════════════════════════════════════════════════════════════════
## 5. ANIMATION PRINCIPLES — مبادئ الحركة
════════════════════════════════════════════════════════════════

```
- Theme toggle: transition-all duration-200 ease-in-out
- Hover states: transition duration-150
- Modal/Sheet open: slide-in + fade 200ms
- Skeleton loading: pulse animation
- Cart badge count: scale bounce on update
- Card hover image: opacity transition 300ms
- Mega menu: fade + slide-down 150ms
- Page transitions: fade 100ms
- Toast notifications: slide-in from bottom 200ms
- QR Code appear: fade-in + scale 300ms
- Discount success: checkmark scale + color 200ms
- Points toggle: smooth slide 150ms

Rule: لا أنيمشن بطيء أو مبالغ فيه
      السرعة أهم من الزخرفة
```

════════════════════════════════════════════════════════════════
## 6. RESPONSIVE BREAKPOINTS — نقاط الكسر
════════════════════════════════════════════════════════════════

```
Mobile:   < 640px    (sm)  ← الأولوية الأولى
Tablet:   640-1023px (md)
Desktop:  1024-1279px(lg)
Wide:     ≥ 1280px   (xl)

Grid Columns:
- Cards: 2 cols (mobile) | 3 cols (tablet) | 4 cols (desktop)
- Listing: sidebar hidden (mobile) | 1/4 + 3/4 (desktop)
- Checkout: single col (mobile) | 2/3 + 1/3 (desktop)

Container:
- max-w-7xl (1280px) على كل الصفحات
- padding: px-4 (mobile) px-6 (tablet) px-8 (desktop)
```