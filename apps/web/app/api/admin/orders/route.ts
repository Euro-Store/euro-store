import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const sp = req.nextUrl.searchParams
    const page  = Math.max(1, parseInt(sp.get('page') ?? '1'))
    const limit = Math.min(50, parseInt(sp.get('limit') ?? '20'))
    const status = sp.get('status')

    const where: any = {}
    if (status) where.status = status

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where, skip: (page - 1) * limit, take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user:  { select: { name: true, email: true, phone: true } },
          items: { select: { qty: true, nameAr: true } },
          _count: { select: { items: true } },
        },
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) })
  } catch (e) { return serverError(e) }
}
