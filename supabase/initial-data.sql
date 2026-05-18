-- Euro Store — Initial Seed Data
-- شغّل بعد npx prisma db push والـ RLS policies

-- ── إعدادات نظام النقاط ────────────────────────────────────────────────
INSERT INTO "LoyaltySettings" (id, "pointsPerSyp", "pointValueSyp", "maxRedeemPercent", "minRedeemPoints", "updatedAt")
VALUES (
  'global',
  0.001,   -- 1000 ل.س = 1 نقطة
  10.0,    -- 1 نقطة = 10 ل.س خصم
  0.5,     -- لا تتجاوز 50% من الطلب
  10,      -- الحد الأدنى للاستخدام
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- ── الأقسام الرئيسية ────────────────────────────────────────────────────
INSERT INTO "Category" (id, "nameAr", "nameEn", slug, "displayOrder", "isActive")
VALUES
  ('cat_men',   'رجالي',  'Men',   'rjaly',   1, true),
  ('cat_women', 'نسائي',  'Women', 'nsaiy',   2, true),
  ('cat_kids',  'ولادي',  'Kids',  'wlady',   3, true),
  ('cat_shoes', 'أحذية',  'Shoes', 'ahzya',   4, true),
  ('cat_bags',  'شنط',    'Bags',  'shnt',    5, true),
  ('cat_acc',   'إكسسوار','Access','iksswaar', 6, true)
ON CONFLICT (slug) DO NOTHING;

-- ── حساب Admin أولي (تذكر تغيير البريد وإنشاء الحساب في Supabase Auth أولاً) ──
-- INSERT INTO "User" (id, email, name, role, "loyaltyQrCode", "updatedAt")
-- VALUES ('admin_01', 'admin@eurostore.sy', 'مدير النظام', 'ADMIN', 'admin-qr-fixed', NOW())
-- ON CONFLICT (email) DO NOTHING;
