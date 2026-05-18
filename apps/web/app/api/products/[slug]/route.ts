import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@euro-store/db'
import { serverError } from '@/lib/auth/middleware'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug, isActive: true },
      include: {
        category: true,
        brand: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 })
    }

    // حساب متوسط التقييم
    const avgRating = product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0

    return NextResponse.json({
      product: { ...product, avgRating: Math.round(avgRating * 10) / 10 },
    })
  } catch (e) { return serverError(e) }
}
