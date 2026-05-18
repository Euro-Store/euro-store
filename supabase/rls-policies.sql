-- Euro Store — Supabase RLS Policies
-- شغّل هذا في Supabase SQL Editor بعد npx prisma db push

-- ── تفعيل RLS على كل الجداول ─────────────────────────────────────────────
ALTER TABLE "User"               ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WishlistItem"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Address"            ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ExchangeRequest"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LoyaltyTransaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "HelperProfile"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "HelperSubmission"   ENABLE ROW LEVEL SECURITY;

-- ── الجداول العامة (قراءة للجميع) ───────────────────────────────────────
ALTER TABLE "Product"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category"     ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Brand"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PartnerShop"  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_public_read" ON "Product"
  FOR SELECT USING ("isActive" = true);

CREATE POLICY "categories_public_read" ON "Category"
  FOR SELECT USING ("isActive" = true);

CREATE POLICY "brands_public_read" ON "Brand"
  FOR SELECT USING ("isActive" = true);

CREATE POLICY "partner_shops_public_read" ON "PartnerShop"
  FOR SELECT USING ("isActive" = true);

-- ── User: كل مستخدم يرى بياناته فقط ────────────────────────────────────
CREATE POLICY "user_select_own" ON "User"
  FOR SELECT USING (email = auth.jwt() ->> 'email');

CREATE POLICY "user_update_own" ON "User"
  FOR UPDATE USING (email = auth.jwt() ->> 'email');

-- ── Orders ────────────────────────────────────────────────────────────────
CREATE POLICY "orders_select_own" ON "Order"
  FOR SELECT USING (
    "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt() ->> 'email')
  );

CREATE POLICY "orders_insert_own" ON "Order"
  FOR INSERT WITH CHECK (
    "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt() ->> 'email')
  );

-- ── Wishlist ──────────────────────────────────────────────────────────────
CREATE POLICY "wishlist_own" ON "WishlistItem"
  FOR ALL USING (
    "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt() ->> 'email')
  );

-- ── Reviews ───────────────────────────────────────────────────────────────
CREATE POLICY "reviews_approved_public" ON "Review"
  FOR SELECT USING ("isApproved" = true);

CREATE POLICY "reviews_insert_own" ON "Review"
  FOR INSERT WITH CHECK (
    "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt() ->> 'email')
  );

-- ── Address ───────────────────────────────────────────────────────────────
CREATE POLICY "address_own" ON "Address"
  FOR ALL USING (
    "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt() ->> 'email')
  );

-- ── Exchange ──────────────────────────────────────────────────────────────
CREATE POLICY "exchange_own" ON "ExchangeRequest"
  FOR SELECT USING (
    "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt() ->> 'email')
  );

-- ── Loyalty ───────────────────────────────────────────────────────────────
CREATE POLICY "loyalty_select_own" ON "LoyaltyTransaction"
  FOR SELECT USING (
    "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt() ->> 'email')
  );

-- ── ملاحظة: API Routes (Netlify Functions) تستخدم SUPABASE_SERVICE_ROLE_KEY
--   وتتجاوز RLS — لذا الـ RLS للحماية المباشرة للـ client SDK فقط
