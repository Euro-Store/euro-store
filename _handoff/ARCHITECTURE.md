# Euro Store — Architecture & UML Diagrams v3
# المخططات الكاملة: أشجار + ERD + Flowcharts + Sequence Diagrams

════════════════════════════════════════════════════════════════
## 1. SITE MAP — خريطة الموقع الكاملة (شجرة)
════════════════════════════════════════════════════════════════

```
eurostore.sy/
│
├── [ar | en]/                            ← locale root
│   │
│   ├── (home)                            ← الصفحة الرئيسية
│   │   └── page.tsx
│   │
│   ├── [category]/                       ← PLP — صفحة القائمة
│   │   ├── page.tsx                      ← /ar/rjaly / /ar/nsaiy
│   │   └── [subcategory]/
│   │       └── page.tsx                  ← /ar/rjaly/tshirts
│   │
│   ├── product/[slug]/                   ← PDP — صفحة المنتج
│   │   └── page.tsx
│   │
│   ├── search/                           ← صفحة البحث
│   │   └── page.tsx?q=&category=&sort=
│   │
│   ├── brands/[brand]/                   ← صفحة البراند
│   │   └── page.tsx
│   │
│   ├── cart/                             ← سلة التسوق
│   │   └── page.tsx
│   │
│   ├── checkout/                         ← الدفع (4 خطوات) + كود خصم + نقاط
│   │   ├── page.tsx   (step=address)
│   │   ├── page.tsx   (step=shipping)
│   │   ├── page.tsx   (step=payment)
│   │   └── page.tsx   (step=confirm)
│   │
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   ├── otp/
│   │   └── forgot-password/
│   │
│   ├── account/                          ← لوحة الحساب
│   │   ├── page.tsx                      ← overview
│   │   ├── orders/
│   │   │   ├── page.tsx                  ← قائمة الطلبات
│   │   │   └── [orderId]/
│   │   │       └── page.tsx              ← تفاصيل الطلب
│   │   ├── exchange/                     ← جديد: طلب استبدال
│   │   │   ├── page.tsx                  ← اختيار المنتجات للاستبدال
│   │   │   └── [requestId]/
│   │   │       └── page.tsx              ← تفاصيل الطلب + QR Code
│   │   ├── returns/                      ← جديد: استرجاع (disabled — يتوفر قريباً)
│   │   │   └── page.tsx
│   │   ├── loyalty/                      ← جديد: نقاط الولاء
│   │   │   └── page.tsx                  ← QR Code الشخصي + رصيد + تاريخ المعاملات
│   │   ├── wishlist/
│   │   │   └── page.tsx
│   │   ├── addresses/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   │
│   └── support/
│       ├── page.tsx
│       ├── faq/
│       └── contact/
│
├── admin.[domain]/                       ← دومين مخفي منفصل
│   ├── login/
│   └── dashboard/
│       ├── page.tsx                      ← إحصائيات عامة
│       ├── products/
│       │   ├── list/
│       │   ├── new/
│       │   └── [id]/edit/
│       ├── categories/
│       ├── brands/
│       ├── orders/
│       │   ├── list/
│       │   └── [id]/
│       ├── customers/
│       ├── exchanges/                    ← جديد: طلبات الاستبدال
│       │   ├── list/
│       │   └── [id]/
│       ├── returns/                      ← جديد: طلبات الاسترجاع
│       │   └── list/
│       ├── loyalty/                      ← جديد: نظام النقاط
│       │   ├── page.tsx                  ← إحصائيات النقاط
│       │   ├── transactions/             ← كل المعاملات
│       │   └── settings/                 ← إعداد قيمة النقاط والنسب
│       ├── discounts/                    ← جديد: أكواد الخصم
│       │   ├── list/
│       │   ├── new/
│       │   └── [id]/
│       ├── helpers/                      ← جديد: إدارة الهيلبرز
│       ├── partner-shops/                ← جديد: المحلات الشريكة
│       │   ├── list/
│       │   └── new/
│       ├── pending-reviews/              ← جديد: اقتراحات الهيلبر
│       ├── banners/
│       ├── analytics/
│       └── settings/
│
└── helper.[domain]/                      ← جديد: بوابة الهيلبر المنفصلة
    ├── login/
    └── dashboard/
        ├── page.tsx                      ← ملخص سريع (إحصائيات اليوم)
        ├── inventory/                    ← إدارة مخزون المنتجات + اقتراح تعديل
        ├── products/
        │   ├── page.tsx                  ← اقتراح إضافة/تعديل/حذف منتج
        │   └── new/                      ← اقتراح منتج جديد للأدمن
        ├── exchanges/                    ← استقبال استبدال/إرجاع في المحل بـ QR
        ├── loyalty/                      ← تسجيل مشتريات داخل المحل
        └── my-requests/                  ← اقتراحاتي + حالتها (معلقة/موافق/مرفوض)

└── partner.[domain]/                     ← جديد: بوابة الشريك (نقطة الاستلام)
    ├── login/
    └── dashboard/
        ├── page.tsx                      ← طلبات اليوم + إحصائيات الاستلام
        ├── scan/                         ← مسح QR الزبون (الصفحة الرئيسية)
        └── history/                      ← سجل الاستلامات السابقة
```

════════════════════════════════════════════════════════════════
## 2. DATABASE ERD — نموذج العلاقات (Entity-Relationship)
════════════════════════════════════════════════════════════════

```
┌─────────────┐        ┌──────────────┐        ┌─────────────┐
│    User     │        │    Order     │        │  OrderItem  │
├─────────────┤        ├──────────────┤        ├─────────────┤
│ id (PK)     │──┐     │ id (PK)      │──┐     │ id (PK)     │
│ email       │  │     │ userId (FK)  │◄─┘     │ orderId(FK) │◄─┐
│ phone       │  └────►│ status       │        │ productId   │  │
│ name        │        │ totalAmount  │        │ variantId   │  │
│ passwordHash│        │ deliveryAddr │        │ qty         │  │
│ role        │        │ paymentMethod│        │ price       │  │
│ isVerified  │        │ discountCode │        └─────────────┘  │
│ createdAt   │        │ discountAmt  │──────────────────────────┘
└─────────────┘        │ loyaltyPts   │
       │               │ notes        │
       │ 1:N           │ createdAt    │
       ▼               └──────────────┘
┌─────────────┐
│  Address    │        ┌──────────────┐        ┌─────────────┐
├─────────────┤        │   Wishlist   │        │  CartItem   │
│ id (PK)     │        ├──────────────┤        ├─────────────┤
│ userId (FK) │        │ id (PK)      │        │ id (PK)     │
│ label       │        │ userId (FK)  │        │ userId (FK) │
│ city        │        │ productId(FK)│        │ productId   │
│ area        │        │ variantId    │        │ variantId   │
│ street      │        │ addedAt      │        │ qty         │
│ isDefault   │        └──────────────┘        │ addedAt     │
└─────────────┘                                └─────────────┘

┌─────────────┐        ┌──────────────┐        ┌─────────────┐
│  Product    │        │ProductVariant│        │  Category   │
├─────────────┤        ├──────────────┤        ├─────────────┤
│ id (PK)     │──┐     │ id (PK)      │        │ id (PK)     │
│ slug        │  │     │ productId(FK)│◄───────│ slug        │
│ nameAr      │  └────►│ size         │        │ nameAr      │
│ nameEn      │        │ color        │        │ nameEn      │
│ descAr      │        │ colorHex     │        │ parentId(FK)│◄─┐
│ descEn      │        │ stock        │        │ imageUrl    │  │
│ price       │        │ sku          │        │ sortOrder   │  │
│ salePrice   │        └──────────────┘        └─────────────┘  │
│ brandId(FK) │                                      └───────────┘
│ categoryId  │                                   (self-referential)
│ images[]    │
│ tags[]      │        ┌──────────────┐        ┌─────────────┐
│ status      │        │    Brand     │        │   Review    │
│ createdAt   │        ├──────────────┤        ├─────────────┤
└─────────────┘        │ id (PK)      │        │ id (PK)     │
       │               │ slug         │        │ productId   │
       └──────────────►│ nameAr       │        │ userId (FK) │
                       │ nameEn       │        │ rating 1-5  │
                       │ logoUrl      │        │ comment     │
                       │ isActive     │        │ isVerified  │
                       └──────────────┘        │ createdAt   │
                                               └─────────────┘

── جداول الميزات الجديدة ──────────────────────────────────────

┌──────────────────┐      ┌───────────────────┐
│   PartnerShop    │      │  ExchangeRequest  │
├──────────────────┤      ├───────────────────┤
│ id (PK)          │      │ id (PK)           │
│ nameAr           │      │ userId (FK)       │
│ area             │◄─────│ orderId (FK)      │
│ phone            │      │ status            │
│ isActive         │      │  PENDING          │
│ createdAt        │      │  CONFIRMED_BY_HELPER│
└──────────────────┘      │  CONFIRMED_BY_PARTNER│
                          │  CONFIRMED_IN_STORE │
                          │  IN_TRANSIT        │
                          │  DELIVERED         │
                          │  COMPLETED         │
                          │  REJECTED          │
                          │ source             │
                          │  IN_STORE|PARTNER  │
                          │ qrToken (unique)   │
                          │ partnerShopId(FK)? │
                          │ rejectionReason?   │
                          │ confirmedAt        │
                          │ createdAt          │
                          └───────────────────┘
                                   │ 1:N
                                   ▼
                          ┌───────────────────┐
                          │   ExchangeItem    │
                          ├───────────────────┤
                          │ id (PK)           │
                          │ exchangeId (FK)   │
                          │ orderItemId (FK)  │
                          │ reason            │
                          └───────────────────┘

┌──────────────────┐      ┌───────────────────┐
│  ReturnRequest   │      │  LoyaltyAccount   │
│  (disabled UI)   │      ├───────────────────┤
├──────────────────┤      │ id (PK)           │
│ id (PK)          │      │ userId (FK) uniq  │
│ userId (FK)      │      │ totalPoints       │
│ orderId (FK)     │      │ createdAt         │
│ status           │      └───────────────────┘
│ refundMethod     │                │ 1:N
│  SHAMCASH|WALLET │                ▼
│ amount           │      ┌───────────────────┐
│ createdAt        │      │ LoyaltyTransaction│
└──────────────────┘      ├───────────────────┤
                          │ id (PK)           │
                          │ userId (FK)       │
                          │ points            │
                          │ type EARN|REDEEM  │
                          │ source            │
                          │  ONLINE|INSTORE   │
                          │ orderId (FK) null │
                          │ invoiceAmount null│
                          │ createdAt         │
                          └───────────────────┘

┌──────────────────┐      ┌───────────────────┐
│  DiscountCode    │      │  DiscountUsage    │
├──────────────────┤      ├───────────────────┤
│ id (PK)          │──┐   │ id (PK)           │
│ code (unique)    │  └──►│ codeId (FK)       │
│ type             │      │ userId (FK)       │
│  PERCENTAGE|FIXED│      │ orderId (FK)      │
│ value            │      │ usedAt            │
│ minOrderAmount   │      └───────────────────┘
│ maxUses          │
│ usedCount        │      ┌───────────────────┐
│ isFirstOrder     │      │   HelperUser      │
│ categoryId(FK)?  │      ├───────────────────┤
│ expiresAt        │      │ id (PK)           │
│ isActive         │      │ userId (FK) uniq  │
│ createdAt        │      │ isActive          │
└──────────────────┘      │ createdAt         │
                          └───────────────────┘
                                   │ 1:N
                                   ▼
                          ┌───────────────────┐
                          │ HelperSubmission  │
                          ├───────────────────┤
                          │ id (PK)           │
                          │ helperId (FK)     │
                          │ type              │
                          │  ADD_PRODUCT      │
                          │  EDIT_PRODUCT     │
                          │  DELETE_PRODUCT   │
                          │  UPDATE_STOCK     │
                          │ payload (JSON)    │
                          │ status            │
                          │  PENDING|APPROVED │
                          │  REJECTED         │
                          │ reviewedBy (FK)?  │
                          │ reviewNote        │
                          │ createdAt         │
                          └───────────────────┘

┌──────────────────┐
│  PartnerUser     │   ← صاحب نقطة الاستلام المستقلة
├──────────────────┤
│ id (PK)          │
│ userId (FK) uniq │
│ shopName         │
│ area             │
│ phone            │
│ isActive         │
│ createdAt        │
└──────────────────┘

════════════════════════════════════════════════════════════════
## 3. USER JOURNEY FLOWCHART — تدفق رحلة المستخدم
════════════════════════════════════════════════════════════════

```
╔══════════╗
║  زائر    ║
╚════╤═════╝
     │
     ▼
╔══════════════════╗      ╔═══════════╗
║  الصفحة الرئيسية║─────►║   بحث     ║
╚════╤═════════════╝      ╚═════╤═════╝
     │                          │
     ├──────────┐               │
     ▼          ▼               ▼
╔════════╗ ╔════════╗   ╔══════════════╗
║تصفح فئة║ ║براند   ║   ║نتائج البحث  ║
╚════╤═══╝ ╚════╤═══╝   ╚══════╤═══════╝
     │          │               │
     └──────────┴───────────────┘
                │
                ▼
     ╔══════════════════╗
     ║ صفحة القائمة PLP ║
     ║  فلاتر + مرتب   ║
     ╚════════╤═════════╝
              │
              ▼
     ╔══════════════════╗
     ║ صفحة المنتج PDP  ║
     ║ صور + مقاس+لون   ║
     ╚════════╤═════════╝
              │
         ┌────┴────────────┐
         │                  │
         ▼                  ▼
  ╔═══════════╗      ╔══════════╗
  ║ أضف للسلة║      ║ مفضلة   ║
  ╚═════╤═════╝      ╚══════════╝
        │
        ▼
  ╔══════════════╗
  ║  Checkout    ║
  ║  ← كود خصم  ║
  ║  ← نقاط ولاء║
  ╚══════╤═══════╝
         │
         ▼
  ╔══════════════╗
  ║  طلب مؤكد   ║
  ╚══════╤═══════╝
         │
    ┌────┴──────────────────────┐
    │                            │
    ▼                            ▼
╔════════════╗           ╔══════════════════╗
║ استلم؟    ║ نعم       ║ استبدال؟         ║
╚═════╤══════╝           ║ ← QR Code        ║
      │                  ║ ← محل شريك      ║
      ▼                  ╚══════════════════╝
╔════════════╗
║ تقييم      ║
╚════════════╝
```

════════════════════════════════════════════════════════════════
## 3B. EXCHANGE FLOW — تدفق الاستبدال (مساران)
════════════════════════════════════════════════════════════════

```
┌───────────────────────────────────────────────────────────────┐
│           EXCHANGE FLOW — مسار أ: في المحل (HELPER)           │
└───────────────────────────────────────────────────────────────┘

  [1] الزبون                    [2] النظام            [3] الهيلبر (موظف المحل)
┌─────────────────┐          ┌─────────────┐       ┌────────────────────────┐
│ يأتي للمحل      │          │ ينشئ طلب    │       │ يفتح بوابة الهيلبر    │
│ بنفسه           │          │ استبدال      │       │                        │
│ يفتح التطبيق   │──────────►│ source:      │       │ يضغط "مسح QR"         │
│ يختار "استبدال" │          │ IN_STORE     │       │                        │
│ يُظهر QR        │          │ يولّد qrToken│       │ يصور QR الزبون        │
└─────────────────┘          └──────┬──────┘       │                        │
                                     │              │ يرى: صور المنتجات +   │
                                     ▼              │ الأحجام + الألوان      │
                             ╔═══════════════╗      │                        │
                             ║ QR على هاتف  ║──────►│ يفحص القطع فعلياً    │
                             ║ الزبون        ║      │                        │
                             ╚═══════════════╝      │ يضغط "تأكيد الاستلام" │
                                                    └──────────┬─────────────┘
                                                               │
                                                               ▼
                                                    ╔══════════════════════╗
                                                    ║ status:              ║
                                                    ║ CONFIRMED_IN_STORE   ║
                                                    ║ → هيلبر يسلّم البديل ║
                                                    ║   فوراً من المخزون   ║
                                                    ║ → NEW_ORDER_CREATED  ║
                                                    ║ → COMPLETED          ║
                                                    ║ (لا توصيل)           ║
                                                    ╚══════════════════════╝

┌───────────────────────────────────────────────────────────────┐
│       EXCHANGE FLOW — مسار ب: نقطة الاستلام (PARTNER)        │
└───────────────────────────────────────────────────────────────┘

  [1] الزبون                  [2] النظام           [3] الشريك (Partner)
┌─────────────────┐          ┌─────────────┐      ┌─────────────────────┐
│ يختار المنتجات  │          │ ينشئ طلب    │      │ يفتح بوابة الشريك  │
│ في التطبيق      │──────────►│ source:     │      │                     │
│ يختار أقرب      │          │ PARTNER     │      │ يضغط "مسح QR جديد" │
│ نقطة استلام     │          │ يولّد qrToken│      │                     │
│ يُظهر QR        │          └──────┬──────┘      │ يصور QR الزبون     │
└─────────────────┘                 │             │                     │
                                    ▼             │ يرى:                │
                            ╔═══════════════╗     │ • اسم الزبون (مختصر)│
                            ║ QR على هاتف  ║─────►│ • صور المنتجات      │
                            ║ الزبون        ║     │ • قائمة تحقق        │
                            ╚═══════════════╝     │                     │
                                                  │ ☐ منتجات موجودة     │
                                                  │ ☐ بدون تلف          │
                                                  │ ☐ وسوم موجودة       │
                                                  └──────────┬──────────┘
                                                             │
                                              ┌──────────────┴──────────────┐
                                              │ تأكيد                        │ رفض + سبب
                                              ▼                              ▼
                                   ╔════════════════╗          ╔═══════════════════╗
                                   ║ CONFIRMED_BY_  ║          ║ REJECTED           ║
                                   ║ PARTNER        ║          ║ إشعار للزبون       ║
                                   ║ إشعار للزبون  ║          ║ + سبب الرفض        ║
                                   ║ + للأدمن       ║          ╚═══════════════════╝
                                   ╚═══════╤════════╝
                                           │
                                           ▼
                                   ╔════════════════╗
                                   ║ IN_TRANSIT     ║
                                   ║ سائق يستلم من  ║
                                   ║ نقطة الاستلام  ║
                                   ║ → يوصل البديل  ║
                                   ╚════════════════╝
```

════════════════════════════════════════════════════════════════
## 3C. LOYALTY POINTS FLOW — تدفق نظام النقاط
════════════════════════════════════════════════════════════════

```
╔════════════════════════════════════════════════════════════╗
║                    LOYALTY SYSTEM                          ║
╠══════════════════════════╦═════════════════════════════════╣
║   كسب النقاط (EARN)      ║   استخدام النقاط (REDEEM)      ║
╠══════════════════════════╬═════════════════════════════════╣
║                          ║                                 ║
║  عبر المنصة:             ║  عبر المنصة (Checkout):         ║
║  → شراء إلكتروني         ║  → يفعّل زر "استخدام النقاط"   ║
║  → نقاط تُضاف تلقائياً   ║  → يُحسب الخصم من المجموع      ║
║                          ║  → يُنشأ LoyaltyTransaction     ║
║  داخل المحل:              ║    type: REDEEM                 ║
║  → زبون يفتح account/    ║                                 ║
║    loyalty               ║  داخل المحل:                    ║
║  → يعرض QR-Code          ║  → نفس الـ QR Code              ║
║  → Helper يصوره          ║  → Helper يختار "استخدام نقاط" ║
║  → يدخل قيمة الفاتورة    ║  → يدخل قيمة الفاتورة          ║
║  → نقاط تُضاف للحساب     ║  → يُحسب المبلغ المتبقي         ║
║                          ║                                 ║
╚══════════════════════════╩═════════════════════════════════╝

LoyaltyTransaction record:
{
  userId, points, type: 'EARN'|'REDEEM',
  source: 'ONLINE'|'INSTORE',
  orderId?, invoiceAmount?, createdAt
}
```

════════════════════════════════════════════════════════════════
## 3D. HELPER SUBMISSION FLOW — تدفق اقتراحات الهيلبر
════════════════════════════════════════════════════════════════

```
Helper                     Backend                 Admin
  │                           │                     │
  │─ يعدّل مخزون ────────────►│                     │
  │  (UPDATE_STOCK)           │─ يُحدَّث مباشرة ──►│ (no approval needed)
  │                           │                     │
  │─ يقترح منتجاً جديداً ────►│                     │
  │  (ADD_PRODUCT)            │─ ينشئ               │
  │                           │  HelperSubmission   │
  │                           │  status: PENDING ──►│ يرى الطلب في
  │                           │                     │ pending-reviews/
  │                           │                     │
  │                           │◄── APPROVED ─────────│ يوافق
  │                           │    → ينشر المنتج    │
  │                           │                     │
  │◄─ إشعار: تمت الموافقة ────│                     │
  │                           │◄── REJECTED ─────────│ يرفض + ملاحظة
  │◄─ إشعار: مرفوض + سبب ─────│                     │
```

════════════════════════════════════════════════════════════════
════════════════════════════════════════════════════════════════
## 3E. ORDER STATES — حالات الطلبات
════════════════════════════════════════════════════════════════

```
EXCHANGE (استبدال عبر شريك خارجي):
  PENDING
    → CONFIRMED_BY_PARTNER  (شريك أكّد الاستلام)
    → IN_TRANSIT            (سائق استلم من نقطة الاستلام)
    → DELIVERED             (وصل للزبون)
    → COMPLETED
    → REJECTED              (شريك رفض + سبب)

IN_STORE_EXCHANGE (استبدال مباشر مع الهيلبر في المحل):
  PENDING
    → CONFIRMED_IN_STORE    (هيلبر أكّد الاستلام + سلّم البديل فوراً)
    → COMPLETED
  (لا IN_TRANSIT — الزبون أخذ البديل يداً بيد)

RETURN (إرجاع — disabled UI):
  PENDING
    → RECEIVED_BY_HELPER    (هيلبر استلم في المحل)
    → RECEIVED_BY_PARTNER   (شريك استلم)
    → ADMIN_REVIEW          (ينتظر قرار الأدمن)
    → REFUND_APPROVED       → REFUNDED
    → REJECTED / REFUND_REJECTED (مع سبب)
```

════════════════════════════════════════════════════════════════
## 3F. AUTH GUARD FLOW — حماية الإجراءات للزوار
════════════════════════════════════════════════════════════════

```
┌─────────────────────────────────────────────────────────────┐
│              AUTH GUARD — الإجراءات المحمية                  │
└─────────────────────────────────────────────────────────────┘

  زائر غير مسجّل يضغط إجراءً محمياً (سلة / مفضلة / checkout)
              │
              ▼
    ┌─────────────────────┐
    │   isLoggedIn ?      │
    └──────────┬──────────┘
               │
        ┌──────┴───────┐
        │ YES           │ NO
        ▼               ▼
    ينفّذ الإجراء    يحفظ returnUrl في sessionStorage
                     redirect → /[locale]/auth/login?return=...
                                 │
                                 ▼ (بعد نجاح تسجيل الدخول)
                     redirect ← returnUrl المحفوظ

الإجراءات المحمية وتحويلاتها:
┌──────────────────────────────────────────────────────────────┐
│  الإجراء               │ redirect URL                        │
├────────────────────────┼─────────────────────────────────────┤
│ إضافة للسلة            │ ?return=/[locale]/cart              │
│ إضافة للمفضلة          │ ?return=[current-page]              │
│ Checkout               │ ?return=/[locale]/checkout          │
│ طلب استبدال            │ ?return=/[locale]/account/exchange  │
│ استخدام نقاط الولاء    │ ?return=/[locale]/account/loyalty   │
│ كتابة تقييم            │ ?return=[product-page]              │
└────────────────────────┴─────────────────────────────────────┘

التقنية:
  Web:    useAuthGuard() hook ← يقرأ Zustand authStore.isLoggedIn
          middleware.ts ← يحمي /checkout + /account/* تلقائياً
  Mobile: AuthStack ↔ MainTabs ← React Navigation يتولى الحماية تلقائياً
```

════════════════════════════════════════════════════════════════
## 4. COMPONENT TREE — شجرة المكونات (Web)
════════════════════════════════════════════════════════════════

```
<RootLayout>                    ← app/layout.tsx
├── <ThemeProvider>             ← lib/theme.ts
├── <I18nProvider>              ← next-intl
├── <ToastProvider>
│
└── <LocaleLayout>              ← app/[locale]/layout.tsx
    ├── <TopBanner />
    ├── <Header>
    │   ├── <Logo />
    │   ├── <MegaMenu> ...
    │   ├── <SearchBar> ...
    │   ├── <ThemeToggle />
    │   ├── <LocaleSwitcher />
    │   ├── <WishlistIcon count={n} />
    │   ├── <CartIcon count={n} />
    │   ├── <AccountIcon />
│   └── <LogoutButton />           ← يظهر فقط عند تسجيل الدخول
    │
    ├── {children}
    ├── <MobileNav> ...
    └── <Footer> ...


── صفحة المنتج PDP ──
<ProductDetailPage>
├── <Breadcrumb />
├── <ProductGallery> ...
├── <ProductInfo>
│   ├── <BrandName />
│   ├── <ProductTitle />
│   ├── <RatingStars + count />
│   ├── <PriceBlock> ...
│   ├── <ColorPicker> ...
│   ├── <SizePicker> ...
│   ├── <AddToCartButton />        ← زائر غير مسجل: redirect → /auth/login
│   ├── <WishlistButton />         ← زائر غير مسجل: redirect → /auth/login
│   └── <DeliveryInfo />
├── <ProductTabs> ...
├── <ReviewsSection> ...
└── <RelatedProducts carousel />


── صفحة القائمة PLP ──
<ProductListingPage>
├── <Breadcrumb />
├── <CategoryHeader> ...
├── <ListingLayout>
│   ├── <FilterSidebar> ...
│   └── <MainContent>
│       ├── <SortBar> ...
│       ├── <ProductGrid> ...
│       └── <Pagination />
└── <FilterSheet />


── صفحة Checkout ──
<CheckoutPage>
├── <StepIndicator />
├── <AddressForm />
├── <ShippingOptions />
├── <PaymentOptions />          ← كاش COD + شام كاش + disabled (بطاقات)
├── <DiscountCodeInput />       ← جديد: كود الخصم
│   ├── <input placeholder="كود الخصم" />
│   ├── <ApplyButton />
│   └── <DiscountResult />      ← قيمة الخصم
├── <LoyaltyPointsToggle />     ← جديد: استخدام النقاط
│   ├── <PointsBalance />
│   ├── <ToggleSwitch />
│   └── <PointsDeductionAmount />
└── <OrderSummary />            ← sticky


── صفحة الاستبدال ──
<ExchangePage>
├── <Breadcrumb />
├── <PageTitle "طلب استبدال" />
├── <ExchangeOrderSelector />   ← اختيار الطلب
│   └── <OrderCard selectable />
├── <ExchangeItemSelector />    ← اختيار المنتجات
│   └── <OrderItemCheckbox × N />
└── <SubmitExchangeButton />

<ExchangeDetailPage>            ← account/exchange/[id]
├── <ExchangeStatus />
├── <ExchangeItemsList />
├── <QRCodeDisplay               ← جديد: عرض QR
│   token={qrToken}
│   size={240}
│   label="اعرض هذا الكود في المحل الشريك"
│ />
├── <PartnerShopsInfo />        ← قائمة المحلات الشريكة
└── <ExchangeTimeline />


── صفحة نقاط الولاء ──
<LoyaltyPage>
├── <LoyaltyHeader>
│   ├── <TotalPoints display />
│   └── <PointsValue hint />    ← "1000 نقطة = 100 ل.س خصم"
├── <LoyaltyQRCard>             ← جديد
│   ├── <QRCodeDisplay token={userQR} size={200} />
│   └── <QRLabel "اعرض هذا الكود للمحاسب" />
├── <LoyaltyStats>
│   ├── <TotalEarned />
│   ├── <TotalRedeemed />
│   └── <CurrentBalance />
└── <TransactionsHistory>
    └── <TransactionRow × N>
        ├── <TransactionIcon type />
        ├── <TransactionDesc />
        ├── <TransactionPoints />
        └── <TransactionDate />
```

════════════════════════════════════════════════════════════════
## 5. API ARCHITECTURE — بنية الـ API
════════════════════════════════════════════════════════════════

```
Client (Web/Mobile/Helper)
        │
        │  HTTPS
        ▼
╔══════════════════════╗
║   API Gateway        ║   Vercel Serverless Functions (تجريبي) / Hostinger (إنتاج) — api.eurostore.sy
║   Express + TS       ║
╠══════════════════════╣
║ Middleware Stack:     ║
║  - helmet            ║
║  - cors              ║
║  - rate-limiter      ║  ← Supabase Auth + in-memory middleware
║  - auth (JWT verify) ║
║  - role-check        ║  ← CUSTOMER | HELPER | PARTNER | ADMIN
║  - request-logger    ║
╚══════════╤═══════════╝
           │
    ┌──────┼─────────────────────────────────────────┐
    │      │                                          │
    ▼      ▼            ▼           ▼         ▼      ▼
╔══════╗ ╔════════╗ ╔════════╗ ╔═════════╗ ╔══════╗ ╔═══════╗
║/auth ║ ║/product║ ║/orders ║ ║/exchange║ ║/loyal║ ║/discnt║
╚══════╝ ╚════════╝ ╚════════╝ ╚═════════╝ ╚══════╝ ╚═══════╝
    │         │           │           │          │        │
    └─────────┴───────────┴───────────┴──────────┴────────┘
                                │
                                ▼
╔══════════════════════════════════════════════════════╗
║              Prisma ORM                              ║
╚══════════════════════════╤═══════════════════════════╝
                           │
                           ▼
╔══════════════════════════════════════════════════════╗
║   PostgreSQL — Supabase                              ║
║   Tables: users, products, variants, categories,     ║
║           orders, orderItems, cart, wishlist,         ║
║           reviews, addresses, brands, banners,        ║
║           partnerShops, exchangeRequests,             ║
║           exchangeItems, returnRequests,              ║
║           loyaltyAccounts, loyaltyTransactions,      ║
║           discountCodes, discountUsages,             ║
║           helperUsers, helperSubmissions,            ║
║           partnerUsers                               ║
╚══════════════════════════════════════════════════════╝
```

## API Endpoints الكاملة

```
AUTH
POST   /api/auth/register
POST   /api/auth/otp/send
POST   /api/auth/otp/verify
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me

PRODUCTS
GET    /api/products               ← ?category&brand&color&size&min&max&sort&page&limit
GET    /api/products/:slug
GET    /api/products/:id/related
GET    /api/products/search?q=

CATEGORIES
GET    /api/categories
GET    /api/categories/:slug

BRANDS
GET    /api/brands
GET    /api/brands/:slug/products

CART
GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:id
DELETE /api/cart/items/:id
DELETE /api/cart

WISHLIST
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:productId

ORDERS
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders                 ← يشمل: discountCode? + usePoints?
PATCH  /api/orders/:id/cancel

REVIEWS
GET    /api/products/:id/reviews
POST   /api/products/:id/reviews

ADDRESSES
GET    /api/addresses
POST   /api/addresses
PATCH  /api/addresses/:id
DELETE /api/addresses/:id

EXCHANGE (role: CUSTOMER)
POST   /api/exchanges              ← إنشاء طلب استبدال + توليد qrToken
GET    /api/exchanges              ← طلبات الزبون
GET    /api/exchanges/:id          ← تفاصيل + qrToken
PATCH  /api/exchanges/:id/cancel

RETURNS (backend ready — UI disabled)
POST   /api/returns
GET    /api/returns/:id

LOYALTY (role: CUSTOMER)
GET    /api/loyalty/me             ← رصيد النقاط + تاريخ المعاملات
GET    /api/loyalty/qr             ← QR token الثابت للمستخدم
POST   /api/loyalty/redeem         ← {orderId, pointsToUse}

DISCOUNT CODES
POST   /api/discounts/validate     ← {code, cartTotal, categoryIds}
GET    /api/discounts/:code        ← تفاصيل الكود (إن كان عاماً)

HELPER (role: HELPER)
GET    /api/helper/products           ← قائمة المنتجات مع المخزون
POST   /api/helper/submissions        ← اقتراح إضافة/تعديل/حذف منتج (pending)
GET    /api/helper/submissions        ← اقتراحاتي + حالتها
GET    /api/helper/exchanges          ← طلبات الاستبدال IN_STORE المعلقة
POST   /api/helper/exchanges/scan     ← {qrToken} → تفاصيل الطلب
POST   /api/helper/exchanges/:id/confirm ← تأكيد استلام في المحل (+ تسليم بديل)
POST   /api/helper/exchanges/:id/reject  ← رفض + سبب
POST   /api/helper/loyalty/earn       ← {userQRToken, invoiceAmount} → نقاط

PARTNER (role: PARTNER)
POST   /api/partner/scan              ← {qrToken} → تفاصيل الطلب
POST   /api/partner/exchanges/:id/confirm ← تأكيد استلام
POST   /api/partner/exchanges/:id/reject  ← {reason} رفض
GET    /api/partner/history           ← سجل الاستلامات (اليوم + السابق)

ADMIN (role: ADMIN)
GET    /api/admin/dashboard/stats
GET    /api/admin/products
POST   /api/admin/products
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
GET    /api/admin/orders
PATCH  /api/admin/orders/:id/status
GET    /api/admin/customers
GET    /api/admin/analytics/sales  ← ?period=7d|30d|90d

ADMIN — EXCHANGES & RETURNS
GET    /api/admin/exchanges
GET    /api/admin/exchanges/:id
PATCH  /api/admin/exchanges/:id/status
GET    /api/admin/returns
PATCH  /api/admin/returns/:id/status

ADMIN — LOYALTY
GET    /api/admin/loyalty/stats
GET    /api/admin/loyalty/transactions
POST   /api/admin/loyalty/settings   ← {pointsPerPound, redemptionRate}

ADMIN — DISCOUNTS
GET    /api/admin/discounts
POST   /api/admin/discounts
PATCH  /api/admin/discounts/:id
DELETE /api/admin/discounts/:id

ADMIN — HELPERS & PARTNER SHOPS
GET    /api/admin/helpers
POST   /api/admin/helpers            ← {userId} → تعيين كـ helper
DELETE /api/admin/helpers/:id
GET    /api/admin/partners           ← قائمة الشركاء (نقاط الاستلام)
POST   /api/admin/partners           ← {userId} → تعيين كـ partner
PATCH  /api/admin/partners/:id
DELETE /api/admin/partners/:id
GET    /api/admin/partner-shops
POST   /api/admin/partner-shops
PATCH  /api/admin/partner-shops/:id
DELETE /api/admin/partner-shops/:id

ADMIN — SUBMISSIONS (اقتراحات الهيلبر)
GET    /api/admin/submissions        ← ?status=PENDING
PATCH  /api/admin/submissions/:id    ← {status: APPROVED|REJECTED, note?}
```

════════════════════════════════════════════════════════════════
## 6. AUTH SEQUENCE DIAGRAM — تسلسل المصادقة
════════════════════════════════════════════════════════════════

```
Client          API             DB            SMS Provider
  │               │               │                │
  │─register────►│               │                │
  │               │─insert user──►│               │
  │               │◄─user id──────│               │
  │               │─send OTP─────────────────────►│
  │               │◄─ok───────────────────────────│
  │◄─201 pending─│               │                │
  │               │               │                │
  │─verify OTP──►│               │                │
  │               │─update isVerified─────────────►│(none)
  │               │─generate JWT+RefreshToken      │
  │◄─200 + tokens│               │                │
  │               │               │                │
  │─request──────►│               │                │
  │  (Bearer JWT) │               │                │
  │               │─verify JWT    │                │
  │               │─query data───►│               │
  │               │◄─data─────────│               │
  │◄─200 + data──│               │                │
  │               │               │                │
  │─(JWT expired)►│               │                │
  │               │─401           │                │
  │◄─401──────────│               │                │
  │               │               │                │
  │─refresh──────►│               │                │
  │  (cookie)     │─verify RT─────►│(Supabase Auth)│
  │               │─new JWT       │                │
  │◄─200 + newJWT│               │                │
```

════════════════════════════════════════════════════════════════
## 7. CHECKOUT FLOW DIAGRAM — تدفق الدفع (محدّث)
════════════════════════════════════════════════════════════════

```
┌─────────────────────────────────────────────────────────────┐
│                    CHECKOUT FLOW v3                          │
└─────────────────────────────────────────────────────────────┘

  [1] CART                [2] ADDRESS           [3] SHIPPING
┌─────────────┐         ┌──────────────┐      ┌─────────────┐
│ • قائمة     │  ──────►│ • عناوين     │─────►│ • عادي      │
│   المنتجات  │         │   محفوظة    │      │   3-5 أيام  │
│ • ملخص      │         │ • عنوان جديد│      │ • سريع      │
│   السعر     │         │ • تحقق من   │      │   1-2 أيام  │
│ • كود خصم  │         │   الحقول    │      │   (+100SYP) │
│ • نقاط ولاء│         └──────────────┘      └──────┬──────┘
└─────────────┘                                       │
                          [5] CONFIRM                  ▼
                        ┌──────────────┐      ┌─────────────┐
                        │ • رقم الطلب │◄─────│ [4] PAYMENT │
                        │ • ملخص كامل │      │ • كاش (COD) │
                        │ • وقت متوقع │      │ • شام كاش   │
                        │ • زر تتبع   │      │ • بطاقة     │
                        └──────────────┘      │   (disabled)│
                                              └─────────────┘

تطبيق كود الخصم:
  order.discountCode → validate → discountAmount
  finalTotal = subtotal - discountAmount

تطبيق النقاط:
  usePoints = true → pointsValue = min(points * rate, subtotal * 0.5)
  finalTotal = subtotal - discountAmount - pointsValue

Rules:
- الخصم + النقاط قابلان للجمع
- النقاط لا تتجاوز 50% من قيمة الطلب
- كل خطوة تحفظ البيانات في Zustand
- عند Confirm تُرسل request واحدة للـ API
- بعد نجاح الطلب: redirect → /account/orders/[id]
```

════════════════════════════════════════════════════════════════
## 8. THEME SYSTEM ARCHITECTURE — بنية نظام الثيم
════════════════════════════════════════════════════════════════

```
┌─────────────────────────────────────────────────────────────┐
│                    THEME SYSTEM                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User Action                                               │
│     │ click ThemeToggle                                    │
│     ▼                                                       │
│  useTheme() hook                                           │
│     │                                                       │
│     ├──► localStorage.set('theme', 'dark'|'light')        │
│     ├──► document.documentElement.classList.toggle('dark') │
│     └──► update Zustand uiStore.theme                     │
│                                                             │
│  CSS Variables (globals.css):                              │
│                                                             │
│  :root {                    .dark {                        │
│    --bg-base: #fafaf8;        --bg-base: #0d0d0d;         │
│    --bg-surface: #ffffff;     --bg-surface: #161616;       │
│    --text-main: #0d0d0d;      --text-main: #f0eeeb;        │
│    --text-muted: #4a4a4a;     --text-muted: #9e9e9e;       │
│    --border: #e8e8e8;         --border: #2c2c2c;           │
│    --gold: #c9961a;           --gold: #c9961a;  ← ثابت!   │
│    --accent: #c0282d;         --accent: #c0282d; ← ثابت!  │
│  }                          }                              │
│                                                             │
│  Initial Load:                                             │
│  1. Read localStorage → theme                              │
│  2. If null → read prefers-color-scheme                    │
│  3. Apply class BEFORE hydration (script في <head>)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

════════════════════════════════════════════════════════════════
## 9. MOBILE NAVIGATION STRUCTURE — بنية تنقل الموبايل
════════════════════════════════════════════════════════════════

```
┌─────────────────────────────────────────┐
│           MOBILE APP STRUCTURE          │
├─────────────────────────────────────────┤
│                                         │
│  <RootStack>                            │
│  ├── <AuthStack>   (unauthenticated)    │
│  │   ├── LoginScreen                   │
│  │   ├── RegisterScreen                │
│  │   └── OTPScreen                     │
│  │                                     │
│  └── <MainTabs>    (authenticated)     │
│      │                                 │
│      ├── Tab: Home                     │
│      │   └── <HomeStack>               │
│      │       ├── HomeScreen            │
│      │       ├── CategoryScreen (PLP)  │
│      │       └── ProductScreen (PDP)   │
│      │                                 │
│      ├── Tab: Search                   │
│      │   └── <SearchStack>             │
│      │       ├── SearchScreen          │
│      │       └── SearchResults         │
│      │                                 │
│      ├── Tab: Wishlist                 │
│      │   └── WishlistScreen            │
│      │                                 │
│      ├── Tab: Cart                     │
│      │   └── <CartStack>               │
│      │       ├── CartScreen            │
│      │       └── CheckoutScreen        │
│      │                                 │
│      └── Tab: Account                  │
│          └── <AccountStack>            │
│              ├── AccountScreen         │
│              ├── OrdersScreen          │
│              ├── OrderDetailScreen     │
│              ├── ExchangeScreen        ← جديد
│              ├── LoyaltyScreen         ← جديد: QR + نقاط
│              └── SettingsScreen        │
│                                        │
│  Bottom Tab Bar:                       │
│  ┌──────┬──────┬──────┬──────┬───────┐│
│  │ 🏠   │  🔍  │  ♡   │  🛍  │  👤  ││
│  │Home  │Search│Wish  │Cart  │Account││
│  └──────┴──────┴──────┴──────┴───────┘│
└─────────────────────────────────────────┘
```

════════════════════════════════════════════════════════════════
## 10. STATE MANAGEMENT — إدارة الحالة (Zustand)
════════════════════════════════════════════════════════════════

```
┌─────────────────────────────────────────────────────────────┐
│                    ZUSTAND STORES                            │
├──────────┬───────────┬───────────┬──────────┬──────────────┤
│cartStore │wishlist   │authStore  │uiStore   │loyaltyStore  │
│          │Store      │           │          │  (جديد)      │
├──────────┼───────────┼───────────┼──────────┼──────────────┤
│items[]   │items[]    │user: User │theme:    │totalPoints   │
│totalQty  │total      │isLoggedIn │ lt|dk    │userQRToken   │
│totalPrice│           │token      │cartOpen  │transactions[]│
│coupon    │addItem()  │           │searchOpen│              │
│discount  │remove()   │login()    │mobileMenu│fetch()       │
│pointsUsed│isInList() │logout()   │          │redeem()      │
│          │toggle()   │refresh()  │openCart()│              │
│addItem() │           │updateUser │closeCart │persisted     │
│removeItem│persisted  │           │toggle    │ localStorage │
│updateQty │ localStorage│persisted│Theme()   │              │
│clearCart │           │ localStorage│        │              │
│applyCode │           │           │          │              │
│applyPts  │           │           │          │              │
│          │           │           │          │              │
│persisted │           │           │          │              │
│ localStorage│        │           │          │              │
└──────────┴───────────┴───────────┴──────────┴──────────────┘
```

════════════════════════════════════════════════════════════════
## 11. DEPLOYMENT ARCHITECTURE — بنية النشر
════════════════════════════════════════════════════════════════

```
┌─────────────────────────────────────────────────────────────┐
│           مرحلة التطوير والاختبار (الآن)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  apps/web      ──────►  Vercel                             │
│  apps/admin    ──────►  Vercel  (subdomain مخفي)           │
│  apps/helper   ──────►  Vercel  (subdomain مخفي)           │
│  apps/partner  ──────►  Vercel  (subdomain مخفي)           │
│                                                             │
│  API Backend       ─►  Vercel Serverless Functions          │
│  Auth/Sessions     ─►  Supabase Auth (JWT + Google OAuth)  │
│                                                             │
│  PostgreSQL    ──────►  Supabase  (free: 500MB)            │
│  File Storage  ──────►  Supabase Storage  (free: 1GB)      │
│  Search        ──────►  pg_search على Supabase (مؤقتاً)   │
│                                                             │
│  ملاحظة: Vercel + Supabase يكفيان — بلا Railway أو Redis  │
│          Vercel = المنصة الرسمية لـ Next.js (zero config)  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│           مرحلة الإنتاج الحقيقي (عند الإطلاق الفعلي)       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Hostinger Business (الخطة الشاملة)                        │
│  ├── Web Hosting + cPanel                                  │
│  ├── PostgreSQL / MySQL                                    │
│  ├── Domain: eurostore.sy + subdomains                     │
│  ├── SSL Certificate مجاني                                 │
│  └── Email Hosting                                         │
│                                                             │
│  Supabase Storage  ← قد يبقى لصور المنتجات                 │
│  Supabase Auth     ← يبقى للـ Authentication و Sessions   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```