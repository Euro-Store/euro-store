import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Euro Store...')

  // Admin user
  const adminHash = await bcrypt.hash('Admin@123456', 12)
  const admin = await prisma.user.upsert({
    where: { phone: '0991000001' },
    update: {},
    create: {
      phone: '0991000001',
      email: 'admin@eurostore.com',
      passwordHash: adminHash,
      firstName: 'Admin',
      lastName: 'Euro',
      role: 'ADMIN',
      isVerified: true,
    },
  })
  console.log('✅ Admin:', admin.email)

  // Categories
  const men = await prisma.category.upsert({ where: { slug: 'men' }, update: {}, create: { slug: 'men', nameAr: 'رجالي', nameEn: 'Men', sortOrder: 1 } })
  const women = await prisma.category.upsert({ where: { slug: 'women' }, update: {}, create: { slug: 'women', nameAr: 'نسائي', nameEn: 'Women', sortOrder: 2 } })
  await prisma.category.upsert({ where: { slug: 'kids' }, update: {}, create: { slug: 'kids', nameAr: 'ولادي', nameEn: 'Kids', sortOrder: 3 } })
  await prisma.category.upsert({ where: { slug: 'shoes' }, update: {}, create: { slug: 'shoes', nameAr: 'أحذية', nameEn: 'Shoes', sortOrder: 4 } })
  await prisma.category.upsert({ where: { slug: 'bags' }, update: {}, create: { slug: 'bags', nameAr: 'شنط', nameEn: 'Bags', sortOrder: 5 } })
  await prisma.category.upsert({ where: { slug: 'accessories' }, update: {}, create: { slug: 'accessories', nameAr: 'إكسسوار', nameEn: 'Accessories', sortOrder: 6 } })
  console.log('✅ Categories seeded')

  // Sub-categories (men)
  await prisma.category.upsert({ where: { slug: 'men-tshirts' }, update: {}, create: { slug: 'men-tshirts', nameAr: 'تيشيرتات', nameEn: 'T-Shirts', parentId: men.id, sortOrder: 1 } })
  await prisma.category.upsert({ where: { slug: 'men-pants' }, update: {}, create: { slug: 'men-pants', nameAr: 'بناطيل', nameEn: 'Pants', parentId: men.id, sortOrder: 2 } })
  await prisma.category.upsert({ where: { slug: 'men-jackets' }, update: {}, create: { slug: 'men-jackets', nameAr: 'جاكيتات', nameEn: 'Jackets', parentId: men.id, sortOrder: 3 } })

  // Brands
  const brand1 = await prisma.brand.upsert({ where: { slug: 'euro-classic' }, update: {}, create: { slug: 'euro-classic', nameAr: 'يورو كلاسيك', nameEn: 'Euro Classic' } })
  const brand2 = await prisma.brand.upsert({ where: { slug: 'euro-sport' }, update: {}, create: { slug: 'euro-sport', nameAr: 'يورو سبورت', nameEn: 'Euro Sport' } })
  console.log('✅ Brands seeded')

  // Sample products
  const products = [
    {
      slug: 'classic-black-tshirt-001',
      nameAr: 'تيشيرت كلاسيك أسود',
      nameEn: 'Classic Black T-Shirt',
      descriptionAr: 'تيشيرت قطني 100% عالي الجودة، مريح ومناسب ليومك',
      descriptionEn: 'Premium 100% cotton t-shirt, comfortable and versatile',
      price: 25000,
      images: ['https://placehold.co/600x800/111111/FFFFFF?text=Euro+Classic'],
      tags: ['tshirt', 'basic', 'cotton'],
      categoryId: men.id,
      brandId: brand1.id,
      isFeatured: true,
      variants: [
        { size: 'S', color: 'أسود', colorHex: '#111111', stock: 50 },
        { size: 'M', color: 'أسود', colorHex: '#111111', stock: 100 },
        { size: 'L', color: 'أسود', colorHex: '#111111', stock: 80 },
        { size: 'XL', color: 'أسود', colorHex: '#111111', stock: 40 },
      ],
    },
    {
      slug: 'slim-chino-beige-001',
      nameAr: 'بنطلون تشينو سليم بيج',
      nameEn: 'Slim Chino Beige',
      descriptionAr: 'بنطلون تشينو سليم فيت أنيق',
      descriptionEn: 'Elegant slim fit chino pants',
      price: 65000,
      salePrice: 52000,
      images: ['https://placehold.co/600x800/D4C5A9/333333?text=Euro+Chino'],
      tags: ['pants', 'chino', 'slim'],
      categoryId: men.id,
      brandId: brand1.id,
      isTrending: true,
      variants: [
        { size: '30', color: 'بيج', colorHex: '#D4C5A9', stock: 30 },
        { size: '32', color: 'بيج', colorHex: '#D4C5A9', stock: 45 },
        { size: '34', color: 'بيج', colorHex: '#D4C5A9', stock: 25 },
      ],
    },
    {
      slug: 'sport-hoodie-navy-001',
      nameAr: 'هودي سبورت كحلي',
      nameEn: 'Sport Hoodie Navy',
      descriptionAr: 'هودي رياضي دافئ ومريح',
      descriptionEn: 'Warm and comfortable sport hoodie',
      price: 85000,
      images: ['https://placehold.co/600x800/1E3A5F/FFFFFF?text=Euro+Sport'],
      tags: ['hoodie', 'sport', 'winter'],
      categoryId: men.id,
      brandId: brand2.id,
      isFeatured: true,
      isTrending: true,
      variants: [
        { size: 'M', color: 'كحلي', colorHex: '#1E3A5F', stock: 60 },
        { size: 'L', color: 'كحلي', colorHex: '#1E3A5F', stock: 70 },
        { size: 'XL', color: 'كحلي', colorHex: '#1E3A5F', stock: 40 },
        { size: 'M', color: 'رمادي', colorHex: '#6B7280', stock: 50 },
        { size: 'L', color: 'رمادي', colorHex: '#6B7280', stock: 60 },
      ],
    },
    {
      slug: 'floral-midi-dress-001',
      nameAr: 'فستان ميدي زهري',
      nameEn: 'Floral Midi Dress',
      descriptionAr: 'فستان ميدي أنيق بطبعة زهور',
      descriptionEn: 'Elegant floral print midi dress',
      price: 95000,
      salePrice: 72000,
      images: ['https://placehold.co/600x800/F9A8D4/FFFFFF?text=Euro+Dress'],
      tags: ['dress', 'floral', 'midi'],
      categoryId: women.id,
      brandId: brand1.id,
      isFeatured: true,
      variants: [
        { size: 'XS', color: 'وردي', colorHex: '#F9A8D4', stock: 20 },
        { size: 'S', color: 'وردي', colorHex: '#F9A8D4', stock: 35 },
        { size: 'M', color: 'وردي', colorHex: '#F9A8D4', stock: 30 },
      ],
    },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        nameAr: p.nameAr,
        nameEn: p.nameEn,
        descriptionAr: p.descriptionAr,
        descriptionEn: p.descriptionEn,
        price: p.price,
        salePrice: p.salePrice,
        images: p.images,
        tags: p.tags,
        categoryId: p.categoryId,
        brandId: p.brandId,
        isFeatured: p.isFeatured ?? false,
        isTrending: p.isTrending ?? false,
        variants: { create: p.variants },
      },
    })
  }
  console.log('✅ Products seeded')
  console.log('')
  console.log('════════════════════════════════════')
  console.log('  🌱 Seed complete!')
  console.log('  Admin: 0991000001 / Admin@123456')
  console.log('════════════════════════════════════')
}

main().catch(console.error).finally(() => prisma.$disconnect())
