import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const sp  = req.nextUrl.searchParams
    const page = Math.max(1, parseInt(sp.get('page') ?? '1'))
    const status = sp.get('status')

    const where: any = {}
    if (status) where.status = status

    const [exchanges, total] = await Promise.all([
      prisma.exchangeRequest.findMany({
        where, skip: (page - 1) * 20, take: 20,
        orderBy: { createdAt: 'desc' },
        include: {
          user:  { select: { name: true, email: true } },
          items: { include: { product: { select: { nameAr: true, images: true } } } },
          partnerShop: { select: { nameAr: true } },
        },
      }),
      prisma.exchangeRequest.count({ where }),
    ])

    return NextResponse.json({ exchanges, total, page, pages: Math.ceil(total / 20) })
  } catch (e) { return serverError(e) }
}
