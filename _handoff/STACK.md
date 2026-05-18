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

## نظام الألوان الرسمي
```
PRIMARY GOLD      #d4a017    ← اللون الرئيسي دائماً
GOLD LIGHT        #f2c94c    ← hover states, highlights
GOLD DEEP         #a87400    ← active states, badges
GOLD MUTED        #c9961440  ← خلفيات شبه شفافة

DARK BASE         #0a0a0a    ← أعمق خلفية داكنة
DARK SURFACE      #121212    ← بطاقات وpanels داكنة
DARK ELEVATED     #1a1a1a    ← hover على dark
DARK BORDER       #2a2a2a    ← حدود في الداكن
DARK TEXT MAIN    #f5f5f5
DARK TEXT MUTED   #a0a0a0

LIGHT BASE        #f7f5ef    ← warm white — body
LIGHT SURFACE     #ffffff    ← بطاقات
LIGHT ELEVATED    #f0ede4    ← hover على light
LIGHT BORDER      #e5e7eb
LIGHT TEXT MAIN   #111111
LIGHT TEXT MUTED  #6b7280

SUCCESS           #16a34a
WARNING           #f59e0b
ERROR             #dc2626
INFO              #0284c7
```

## Design Tokens — بنية Tailwind
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      gold: {
        DEFAULT: '#d4a017',
        light:   '#f2c94c',
        deep:    '#a87400',
        muted:   '#c9961440',
      },
      dark: {
        base:    '#0a0a0a',
        surface: '#121212',
        elevated:'#1a1a1a',
        border:  '#2a2a2a',
      },
      light: {
        base:    '#f7f5ef',
        surface: '#ffffff',
        elevated:'#f0ede4',
        border:  '#e5e7eb',
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
