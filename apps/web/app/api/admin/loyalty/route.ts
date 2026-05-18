import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// GET: إحصائيات + إعدادات النقاط
export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const [settings, totalEarned, totalRedeemed, activeUsers] = await Promise.all([
      prisma.loyaltySettings.findUnique({ where: { id: 'global' } }),
      prisma.loyaltyTransaction.aggregate({ where: { points: { gt: 0 } }, _sum: { points: true } }),
      prisma.loyaltyTransaction.aggregate({ where: { points: { lt: 0 } }, _sum: { points: true } }),
      prisma.user.count({ where: { loyaltyPoints: { gt: 0 } } }),
    ])

    return NextResponse.json({
      settings,
      stats: {
        totalEarned:  totalEarned._sum.points  ?? 0,
        totalRedeemed: Math.abs(totalRedeemed._sum.points ?? 0),
        activeUsers,
      },
    })
  } catch (e) { return serverError(e) }
}

// PUT: تحديث إعدادات النقاط
export async function PUT(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const data = await req.json()
    const settings = await prisma.loyaltySettings.upsert({
      where: { id: 'global' },
      create: { id: 'global', ...data },
      update: data,
    })

    return NextResponse.json({ settings })
  } catch (e) { return serverError(e) }
}
