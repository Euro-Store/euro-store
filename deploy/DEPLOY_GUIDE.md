# Euro Store — دليل النشر الكامل (M9)
## Netlify + Supabase — بلا Railway أو Redis

---

## الخطوة 1 — Supabase Project

```bash
# 1. اذهب إلى https://supabase.com وأنشئ project جديد
# 2. اختر Region: EU West (Frankfurt) — الأقرب جغرافياً
# 3. من Settings > API انسخ:
#    SUPABASE_URL          = https://xxxxxxx.supabase.co
#    ANON_KEY              = eyJ...
#    SERVICE_ROLE_KEY      = eyJ...  ← سري — لا تشاركه
#    JWT_SECRET            = super-secret-jwt-token
#
# 4. من Settings > Database > Connection String
#    اختر "Nodejs" → انسخ الـ URL
#    استبدل [YOUR-PASSWORD] بكلمة مرور قاعدة البيانات

# DATABASE_URL (pgBouncer port 6543 — لـ Netlify Functions):
# postgresql://postgres:[PASS]@db.[REF].supabase.co:6543/postgres?pgbouncer=true

# DIRECT_URL (port 5432 — لـ prisma migrate فقط):
# postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres
```

## الخطوة 2 — تشغيل Prisma

```powershell
# من مجلد packages/db
cd "D:\Files\Programming_Projects\Euro Store\packages\db"

# توليد الـ Prisma Client
npx prisma generate

# دفع الـ Schema لـ Supabase (بدون migrations — dev mode)
npx prisma db push

# التحقق
npx prisma studio
```

## الخطوة 3 — SQL Policies في Supabase
