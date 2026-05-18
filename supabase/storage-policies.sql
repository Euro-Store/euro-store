-- Euro Store — Supabase Storage Policies
-- شغّل هذا في Supabase SQL Editor

-- إنشاء الـ bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,          -- صور المنتجات عامة
  5242880,       -- 5MB per image
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- سياسة: أي شخص يقرأ (صور عامة)
CREATE POLICY "public_images_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- سياسة: Admin فقط يرفع صور
-- (الـ upload يتم عبر service_role في API Routes — لا يحتاج هذه السياسة)
-- لكن نضعها للاحتياط عند الاستخدام المباشر
CREATE POLICY "admin_images_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "admin_images_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );
