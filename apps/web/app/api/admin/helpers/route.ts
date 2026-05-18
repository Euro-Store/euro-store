import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const helpers = await prisma.helperProfile.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, isActive: true } },
        partnerShop: { select: { nameAr: true, city: true } },
        _count: { select: { submissions: true, exchangesReceived: true } },
      },
    })

    return NextResponse.json({ helpers })
  } catch (e) { return serverError(e) }
}

// POST: منح مستخدم دور Helper
export async function POST(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const { userId, partnerShopId } = await req.json()

    await prisma.$transaction([
      prisma.user.update({ where: { id: userId }, data: { role: 'HELPER' } }),
      prisma.helperProfile.upsert({
        where: { userId },
        create: { userId, partnerShopId: partnerShopId ?? null },
        update: { partnerShopId: partnerShopId ?? null },
      }),
    ])

    return NextResponse.json({ message: 'تم منح صلاحية الهيلبر' }, { status: 201 })
  } catch (e) { return serverError(e) }
}
