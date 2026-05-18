# Euro Store API — v1

Base URL: http://localhost:5000/api/v1

## Auth
POST   /auth/register          — تسجيل جديد
POST   /auth/login             — تسجيل دخول
POST   /auth/refresh           — تجديد access token
POST   /auth/logout            — تسجيل خروج
GET    /auth/profile           — بيانات المستخدم الحالي

## Products
GET    /products               — قائمة المنتجات (filters: category, brand, minPrice, maxPrice, sort, featured, trending, q)
GET    /products/:slug         — تفاصيل منتج
POST   /products               — [Admin] إضافة منتج
PUT    /products/:id           — [Admin] تعديل منتج
DELETE /products/:id           — [Admin] حذف منتج

## Categories
GET    /categories             — كل الأقسام (شجرة)
GET    /categories/:slug       — قسم محدد
POST   /categories             — [Admin] إضافة قسم

## Brands
GET    /brands                 — كل البراندات
GET    /brands/:slug           — براند محدد
POST   /brands                 — [Admin] إضافة براند

## Cart
GET    /cart                   — [Auth] محتوى السلة + subtotal
POST   /cart/items             — [Auth] إضافة منتج { productId, variantId?, quantity }
PUT    /cart/items/:itemId     — [Auth] تحديث كمية
DELETE /cart/items/:itemId     — [Auth] حذف عنصر
DELETE /cart                   — [Auth] تفريغ السلة

## Wishlist
GET    /wishlist               — [Auth] المفضلة
POST   /wishlist/toggle        — [Auth] إضافة/إزالة { productId }

## Orders
POST   /orders                 — [Auth] تقديم طلب { addressId, notes? }
GET    /orders/my              — [Auth] طلباتي
GET    /orders/my/:id          — [Auth] تفاصيل طلب
PATCH  /orders/my/:id/cancel   — [Auth] إلغاء طلب
GET    /orders                 — [Admin] كل الطلبات
PATCH  /orders/:id/status      — [Admin] تغيير حالة

## Reviews
GET    /products/:productId/reviews     — تقييمات منتج
POST   /products/:productId/reviews    — [Auth] إضافة تقييم { rating, comment? }

## Search
GET    /search?q=...           — بحث كامل
GET    /search/suggest?q=...   — اقتراحات بحث

## Users
GET    /users/addresses        — [Auth] عناويني
POST   /users/addresses        — [Auth] إضافة عنوان
PUT    /users/addresses/:id    — [Auth] تعديل عنوان
DELETE /users/addresses/:id    — [Auth] حذف عنوان
PATCH  /users/profile          — [Auth] تعديل الملف
PATCH  /users/password         — [Auth] تغيير كلمة المرور { current, next }

## Health
GET    /health                 — حالة الخادم
