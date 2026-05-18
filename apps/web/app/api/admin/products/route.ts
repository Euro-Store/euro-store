import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const sp = req.nextUrl.searchParams
    const page = Math.max(1, parseInt(sp.get('page') ?? '1'))
    const limit = Math.min(50, parseInt(sp.get('limit') ?? '20'))
    const q = sp.get('q')

    const where: any = {}
    if (q) {
      where.OR = [
        { nameAr: { contains: q, mode: 'insensitive' } },
        { nameEn: { contains: q, mode: 'insensitive' } },
      ]
    }
    if (sp.get('status') === 'active')   where.isActive = true
    if (sp.get('status') === 'inactive') where.isActive = false
    if (sp.get('category')) where.category = { slug: sp.get('category') }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where, skip: (page - 1) * limit, take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { nameAr: true } },
          brand:    { select: { nameAr: true } },
          _count:   { select: { orderItems: true, reviews: true } },
        },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) })
  } catch (e) { return serverError(e) }
}

export async function POST(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const data = await req.json()
    const product = await prisma.product.create({ data })
    return NextResponse.json({ product }, { status: 201 })
  } catch (e) { return serverError(e) }
}
