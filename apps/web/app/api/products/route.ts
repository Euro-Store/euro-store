import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@euro-store/db'
import { serverError } from '@/lib/auth/middleware'

const SORT_MAP: Record<string, object> = {
  newest:    { createdAt: 'desc' },
  popular:   { salesCount: 'desc' },
  priceAsc:  { price: 'asc' },
  priceDesc: { price: 'desc' },
}

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams
    const page    = Math.max(1, parseInt(sp.get('page')  ?? '1'))
    const limit   = Math.min(48, parseInt(sp.get('limit') ?? '24'))
    const sort    = sp.get('sort') ?? 'newest'

    const where: any = { isActive: true }

    if (sp.get('category')) where.category = { slug: sp.get('category') }
    if (sp.get('brand'))    where.brand    = { slug: sp.get('brand') }
    if (sp.get('size'))     where.sizes    = { has: sp.get('size') }
    if (sp.get('color'))    where.colors   = { has: sp.get('color') }
    if (sp.get('onSale'))   where.salePrice = { not: null }
    if (sp.get('featured')) where.isFeatured = true

    const min = sp.get('minPrice'), max = sp.get('maxPrice')
    if (min || max) {
      where.price = {}
      if (min) where.price.gte = parseFloat(min)
      if (max) where.price.lte = parseFloat(max)
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: SORT_MAP[sort] ?? { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, slug: true, nameAr: true, nameEn: true,
          price: true, salePrice: true, images: true,
          sizes: true, colors: true, colorHexes: true,
          stock: true, isFeatured: true,
          category: { select: { slug: true, nameAr: true } },
          brand:    { select: { slug: true, nameAr: true } },
        },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    })
  } catch (e) { return serverError(e) }
}
