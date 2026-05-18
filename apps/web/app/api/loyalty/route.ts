import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const [settings, transactions] = await Promise.all([
      prisma.loyaltySettings.findUnique({ where: { id: 'global' } }),
      prisma.loyaltyTransaction.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 30,
      }),
    ])

    return NextResponse.json({
      points: user.loyaltyPoints,
      qrCode: user.loyaltyQrCode,
      pointValueSyp: settings?.pointValueSyp ?? 10,
      maxRedeemPercent: settings?.maxRedeemPercent ?? 0.5,
      transactions,
    })
  } catch (e) { return serverError(e) }
}
