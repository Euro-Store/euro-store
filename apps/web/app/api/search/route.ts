import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@euro-store/db'
import { serverError } from '@/lib/auth/middleware'

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get('q')?.trim()
    if (!q || q.length < 2) {
      return NextResponse.json({ products: [], suggestions: [] })
    }

    // البحث عبر pg_trgm — مطلوب تفعيل الـ extension في Supabase
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { nameAr:    { contains: q, mode: 'insensitive' } },
          { nameEn:    { contains: q, mode: 'insensitive' } },
          { tags:      { has: q } },
        ],
      },
      take: 20,
      orderBy: { salesCount: 'desc' },
      select: {
        id: true, slug: true, nameAr: true, nameEn: true,
        price: true, salePrice: true,
        images: true, stock: true,
        category: { select: { slug: true, nameAr: true } },
      },
    })

    // اقتراحات بسيطة من أسماء المنتجات
    const suggestions = [...new Set(
      products.map(p => p.nameAr).slice(0, 8)
    )]

    return NextResponse.json({ products, suggestions, total: products.length })
  } catch (e) { return serverError(e) }
}
