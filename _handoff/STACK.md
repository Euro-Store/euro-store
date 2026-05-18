# Tech Stack — التقنيات الكاملة v5

## جدول التقنيات

| الجزء            | التقنية                        | الإصدار   | الغرض                           |
|------------------|-------------------------------|-----------|--------------------------------|
| Web Framework    | Next.js App Router            | 14.x      | SSR/SSG/ISR للموقع الرئيسي      |
| Mobile           | Expo React Native             | SDK 51    | iOS + Android                  |
| Admin Panel      | Next.js 14                    | 14.x      | لوحة إدارة منفصلة              |
| Helper Portal    | Next.js 14                    | 14.x      | بوابة الهيلبر المنفصلة         |
| Language         | TypeScript                    | 5.x       | كل الكود                       |
| Styling Web      | Tailwind CSS                  | 3.x       | utility-first                  |
| Styling Mobile   | NativeWind                    | 4.x       | Tailwind للموبايل              |
| Admin UI Kit     | shadcn/ui + Recharts          | latest    | مكونات الأدمن والرسوم           |
| Helper UI Kit    | shadcn/ui                     | latest    | مكونات بوابة الهيلبر           |
| State Management | Zustand                       | 4.x       | مشترك Web+Mobile               |
| Backend          | Next.js API Routes            | 14.x      | Serverless عبر Netlify Functions |
| Database         | PostgreSQL (Supabase)         | 15.x      | البيانات الأساسية               |
| ORM              | Prisma                        | 5.x       | DB access layer                |
| Auth             | JWT + Refresh Tokens          | -         | httpOnly cookies               |
| Storage          | Supabase Storage              | -         | صور المنتجات والبنرات           |
| Search           | pg_search (Supabase)          | -         | بحث سريع + autosuggest — بلا Meilisearch |
| Social Auth      | Supabase Auth (Google OAuth)  | -         | JWT + Social Login + Sessions  |
| QR Code (Web)    | qrcode.react                  | latest    | توليد QR للاستبدال والولاء     |
| QR Scan (Mobile) | expo-barcode-scanner          | latest    | مسح QR في تطبيق الهيلبر        |
| Monorepo         | Turborepo                     | 2.x       | إدارة packages                 |
| i18n             | next-intl                     | 3.x       | ar/en                          |
| Fonts            | Google Fonts: Tajawal         | -         | RTL عربي احترافي               |
| Hosting (تجريبي) | Netlify                       | -         | web + admin + helper deploy    |
| API Functions    | Netlify Functions (Serverless)| -         | API Routes تُنشر تلقائياً مع Next.js |
| Hosting (إنتاج)  | Hostinger Business            | -         | النشر الحقيقي عند الإطلاق الفعلي|
| Analytics        | Plausible                     | -         | privacy-first analytics        |

## ملاحظة الاستضافة
```
مرحلة التطوير والاختبار:
  → Netlify     : apps/web + apps/admin + apps/helper (Next.js static/SSR)
  → Supabase    : PostgreSQL + Storage + Auth (مجاني: 500MB DB + 1GB Storage + Auth)
  → Netlify Fns : API Routes تُنشر تلقائياً كـ Serverless Functions (مع كل تطبيق)

مرحلة الإنتاج الحقيقي (عند الإطلاق الفعلي):
  → Hostinger Business : hosting شامل — domain + SSL + email
  → نقل DB وBackend تدريجياً حسب متطلبات الحمل
```

## متطلبات الجهاز
Node.js: 20+ | npm: 10+ | PowerShell: 5+

## نظام الألوان الرسمي (v2 — محدّث)
```
PRIMARY GOLD      #c9961a    ← اللون الرئيسي الدائم (محدّث — أغمق وأفخم)
GOLD LIGHT        #e8b84b    ← hover states, highlights
GOLD DEEP         #9c7213    ← active states, badges
GOLD MUTED        rgba(201,150,26,0.12) ← خلفيات شبه شفافة

ACCENT RED        #c0282d    ← Sale badges, urgent states (جديد)
ACCENT LIGHT      #e05257    ← hover on accent
ACCENT SOFT       #fff0f0    ← background for sale sections

DARK BASE         #0d0d0d    ← أعمق خلفية داكنة (محدّث)
DARK SURFACE      #161616    ← بطاقات وpanels داكنة
DARK ELEVATED     #1f1f1f    ← hover على dark
DARK BORDER       #2c2c2c    ← حدود في الداكن
DARK TEXT MAIN    #f0eeeb    ← warm white (أريح للعين)
DARK TEXT MUTED   #9e9e9e

LIGHT BASE        #fafaf8    ← crisp white (محدّث — أنظف)
LIGHT SURFACE     #ffffff    ← بطاقات
LIGHT ELEVATED    #f3f0e8    ← hover على light
LIGHT BORDER      #e8e8e8
LIGHT TEXT MAIN   #0d0d0d    ← أثرى من الأسود النقي
LIGHT TEXT MUTED  #4a4a4a

SUCCESS           #15803d
WARNING           #d97706
ERROR             #b91c1c
INFO              #0369a1
```

## Design Tokens — بنية Tailwind
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      gold: {
        DEFAULT: '#c9961a',    // محدّث
        light:   '#e8b84b',
        deep:    '#9c7213',
        muted:   'rgba(201,150,26,0.12)',
      },
      accent: {
        DEFAULT: '#c0282d',    // جديد — Sale / Urgent
        light:   '#e05257',
        soft:    '#fff0f0',
        dark:    '#8b1a1d',
      },
      dark: {
        base:    '#0d0d0d',    // محدّث
        surface: '#161616',
        elevated:'#1f1f1f',
        border:  '#2c2c2c',
      },
      light: {
        base:    '#fafaf8',    // محدّث
        surface: '#ffffff',
        elevated:'#f3f0e8',
        border:  '#e8e8e8',
      }
    },
    fontFamily: {
      sans: ['Tajawal', 'system-ui', 'sans-serif'],
    },
    spacing: {
      'section': '4rem',
      'card-gap': '1.5rem',
    },
    borderRadius: {
      'card': '12px',
      'btn':  '8px',
      'pill': '9999px',
    }
  }
}
```

## بنية المجلدات الكاملة
```
Euro Store/
├── apps/
│   ├── web/                    ← الموقع الرئيسي
│   │   ├── app/
│   │   │   ├── [locale]/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [category]/
│   │   │   │   │   ├── page.tsx        ← PLP
│   │   │   │   │   └── [subcategory]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── product/
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx    ← PDP
│   │   │   │   ├── cart/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── checkout/
│   │   │   │   │   └── page.tsx        ← + كود خصم + نقاط
│   │   │   │   ├── account/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── orders/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── [orderId]/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── exchange/       ← جديد: طلب استبدال
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── [requestId]/
│   │   │   │   │   │       └── page.tsx ← تفاصيل + QR Code
│   │   │   │   │   ├── returns/        ← جديد: استرجاع (disabled)
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── loyalty/        ← جديد: نقاط الولاء
│   │   │   │   │   │   └── page.tsx    ← QR Code + رصيد + تاريخ
│   │   │   │   │   ├── wishlist/
│   │   │   │   │   ├── addresses/
│   │   │   │   │   └── settings/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── register/
│   │   │   │   │   ├── otp/
│   │   │   │   │   └── forgot-password/
│   │   │   │   ├── search/
│   │   │   │   ├── brands/
│   │   │   │   │   └── [brand]/
│   │   │   │   └── support/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── faq/
│   │   │   │       └── contact/
│   │   │   └── api/
│   │   │       └── [...route]/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── MegaMenu.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── ThemeToggle.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── TopBanner.tsx
│   │   │   │   └── MobileNav.tsx
│   │   │   ├── home/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── CategoryStrip.tsx
│   │   │   │   ├── TrendingSection.tsx
│   │   │   │   ├── BrandHighlights.tsx
│   │   │   │   ├── PromoBlock.tsx
│   │   │   │   ├── NewArrivals.tsx
│   │   │   │   ├── EditorialBanner.tsx
│   │   │   │   └── TrustBar.tsx
│   │   │   ├── product/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Grid.tsx
│   │   │   │   ├── Filters.tsx
│   │   │   │   ├── FilterSheet.tsx
│   │   │   │   ├── SortBar.tsx
│   │   │   │   ├── Gallery.tsx
│   │   │   │   ├── VariantPicker.tsx
│   │   │   │   ├── SizeGuide.tsx
│   │   │   │   ├── ReviewsSection.tsx
│   │   │   │   ├── DeliveryInfo.tsx
│   │   │   │   └── RelatedProducts.tsx
│   │   │   ├── cart/
│   │   │   │   ├── CartDrawer.tsx
│   │   │   │   ├── CartItem.tsx
│   │   │   │   └── CartSummary.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── StepIndicator.tsx
│   │   │   │   ├── AddressForm.tsx
│   │   │   │   ├── ShippingOptions.tsx
│   │   │   │   ├── PaymentOptions.tsx
│   │   │   │   ├── OrderSummary.tsx
│   │   │   │   ├── DiscountCodeInput.tsx  ← جديد
│   │   │   │   └── LoyaltyPointsToggle.tsx ← جديد
│   │   │   ├── account/
│   │   │   │   ├── OrderCard.tsx
│   │   │   │   ├── WishlistGrid.tsx
│   │   │   │   ├── AddressCard.tsx
│   │   │   │   ├── ExchangeRequestCard.tsx ← جديد
│   │   │   │   └── LoyaltyQRCard.tsx       ← جديد
│   │   │   └── shared/
│   │   │       ├── Button.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Skeleton.tsx
│   │   │       ├── Modal.tsx
│   │   │       ├── Drawer.tsx
│   │   │       ├── Toast.tsx
│   │   │       ├── Breadcrumb.tsx
│   │   │       ├── Pagination.tsx
│   │   │       ├── RatingStars.tsx
│   │   │       ├── EmptyState.tsx
│   │   │       └── QRCodeDisplay.tsx      ← جديد
│   │   ├── lib/
│   │   │   ├── theme.ts
│   │   │   ├── design-tokens.ts
│   │   │   ├── i18n.ts
│   │   │   ├── constants.ts
│   │   │   ├── formatters.ts
│   │   │   └── analytics.ts
│   │   ├── hooks/
│   │   │   ├── useWishlist.ts
│   │   │   ├── useCart.ts
│   │   │   ├── useFilters.ts
│   │   │   ├── useTheme.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── useLoyalty.ts             ← جديد
│   │   │   └── useDiscount.ts            ← جديد
│   │   └── store/
│   │       ├── cartStore.ts
│   │       ├── wishlistStore.ts
│   │       ├── authStore.ts
│   │       ├── uiStore.ts
│   │       └── loyaltyStore.ts           ← جديد
│   ├── mobile/
│   │   ├── app/
│   │   ├── components/
│   │   ├── screens/
│   │   │   └── LoyaltyScreen.tsx         ← جديد: QR + نقاط
│   │   ├── navigation/
│   │   ├── store/
│   │   ├── theme/
│   │   └── lib/
│   ├── admin/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── products/
│   │   │       ├── orders/
│   │   │       ├── customers/
│   │   │       ├── categories/
│   │   │       ├── brands/
│   │   │       ├── exchanges/            ← جديد
│   │   │       ├── returns/              ← جديد
│   │   │       ├── loyalty/              ← جديد
│   │   │       │   ├── page.tsx
│   │   │       │   ├── transactions/
│   │   │       │   └── settings/
│   │   │       ├── discounts/            ← جديد
│   │   │       │   ├── page.tsx
│   │   │       │   └── new/
│   │   │       ├── helpers/              ← جديد
│   │   │       ├── partner-shops/        ← جديد
│   │   │       ├── pending-reviews/      ← جديد
│   │   │       └── analytics/
│   │   └── components/
│   │       ├── layout/
│   │       │   ├── AdminSidebar.tsx
│   │       │   └── AdminHeader.tsx
│   │       ├── dashboard/
│   │       │   ├── StatsCards.tsx
│   │       │   ├── RevenueChart.tsx
│   │       │   ├── OrdersChart.tsx
│   │       │   └── RecentActivity.tsx
│   │       ├── products/
│   │       │   ├── ProductsTable.tsx
│   │       │   ├── ProductForm.tsx
│   │       │   └── InventoryBadge.tsx
│   │       ├── orders/
│   │       │   ├── OrdersTable.tsx
│   │       │   ├── OrderStatusBadge.tsx
│   │       │   └── OrderTimeline.tsx
│   │       ├── exchanges/
│   │       │   ├── ExchangeTable.tsx
│   │       │   └── ExchangeStatusBadge.tsx
│   │       ├── returns/
│   │       │   └── ReturnsTable.tsx
│   │       ├── loyalty/
│   │       │   ├── LoyaltyStats.tsx
│   │       │   ├── TransactionsTable.tsx
│   │       │   └── LoyaltySettingsForm.tsx
│   │       ├── discounts/
│   │       │   ├── DiscountsTable.tsx
│   │       │   ├── DiscountForm.tsx
│   │       │   └── DiscountTypeBadge.tsx
│   │       ├── helpers/
│   │       │   ├── HelpersTable.tsx
│   │       │   └── SubmissionsTable.tsx
│   │       ├── partner-shops/
│   │       │   ├── PartnerShopsTable.tsx
│   │       │   └── PartnerShopForm.tsx
│   │       └── customers/
│   │           └── CustomersTable.tsx
│   └── helper/                   ← جديد: بوابة الهيلبر
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── login/page.tsx
│       │   └── dashboard/
│       │       ├── layout.tsx
│       │       ├── page.tsx
│       │       ├── inventory/page.tsx     ← تحديث مخزون
│       │       ├── products/
│       │       │   ├── page.tsx
│       │       │   └── new/page.tsx       ← اقتراح منتج جديد
│       │       ├── exchanges/page.tsx     ← طلبات الاستبدال
│       │       └── loyalty/page.tsx       ← تسجيل مشتريات داخل المحل
│       └── components/
│           ├── layout/
│           │   ├── HelperSidebar.tsx
│           │   └── HelperHeader.tsx
│           ├── inventory/
│           │   └── InventoryTable.tsx
│           ├── exchanges/
│           │   └── ExchangeScanner.tsx    ← مسح QR
│           └── loyalty/
│               └── LoyaltyEarnForm.tsx    ← تسجيل نقاط
├── backend/
│   └── src/
│       ├── modules/
│       │   ├── auth/
│       │   ├── users/
│       │   ├── products/
│       │   ├── categories/
│       │   ├── orders/
│       │   ├── cart/
│       │   ├── wishlist/
│       │   ├── reviews/
│       │   ├── search/
│       │   ├── media/
│       │   ├── notifications/
│       │   ├── exchange/          ← جديد
│       │   ├── returns/           ← جديد
│       │   ├── loyalty/           ← جديد
│       │   ├── discounts/         ← جديد
│       │   ├── helper/            ← جديد
│       │   └── partner-shops/     ← جديد
│       ├── middleware/
│       ├── services/
│       ├── utils/
│       └── config/
├── packages/
│   ├── shared/         ← TypeScript types مشتركة
│   ├── ui/             ← مكونات UI مشتركة
│   └── api-client/     ← دوال API مشتركة
└── _handoff/           ← هذا المجلد
```