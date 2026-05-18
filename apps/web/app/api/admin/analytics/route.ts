import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const now   = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
      totalOrders, monthOrders, revenue, monthRevenue,
      totalCustomers, newCustomers, totalProducts,
      topProducts,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: start } } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.aggregate({ where: { createdAt: { gte: start } }, _sum: { total: true } }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.user.count({ where: { role: 'CUSTOMER', createdAt: { gte: start } } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.findMany({
        take: 5,
        orderBy: { salesCount: 'desc' },
        where: { isActive: true },
        select: { id: true, nameAr: true, salesCount: true, price: true, images: true },
      }),
    ])

    return NextResponse.json({
      orders: { total: totalOrders, month: monthOrders },
      revenue: { total: revenue._sum.total ?? 0, month: monthRevenue._sum.total ?? 0 },
      customers: { total: totalCustomers, new: newCustomers },
      products: { total: totalProducts },
      topProducts,
    })
  } catch (e) { return serverError(e) }
}
