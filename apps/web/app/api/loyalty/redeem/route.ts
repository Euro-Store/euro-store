import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// POST: يستدعيه الـ Helper لخصم نقاط المستخدم عند المحل
export async function POST(req: NextRequest) {
  try {
    const { error, user: helper } = await requireRole(req, ['HELPER', 'ADMIN'])
    if (error) return error

    const { customerQrCode, pointsToRedeem } = await req.json()
    if (!customerQrCode || !pointsToRedeem || pointsToRedeem <= 0) {
      return NextResponse.json({ error: 'QR Code والنقاط مطلوبة' }, { status: 400 })
    }

    const settings = await prisma.loyaltySettings.findUnique({ where: { id: 'global' } })
    const minRedeem = settings?.minRedeemPoints ?? 10

    if (pointsToRedeem < minRedeem) {
      return NextResponse.json(
        { error: `الحد الأدنى للاستخدام ${minRedeem} نقطة` },
        { status: 400 }
      )
    }

    const customer = await prisma.user.findUnique({
      where: { loyaltyQrCode: customerQrCode },
    })

    if (!customer) return NextResponse.json({ error: 'QR Code غير صالح' }, { status: 404 })

    if (customer.loyaltyPoints < pointsToRedeem) {
      return NextResponse.json(
        { error: `رصيد غير كافٍ — المتاح: ${customer.loyaltyPoints} نقطة` },
        { status: 400 }
      )
    }

    const helperProfile = await prisma.helperProfile.findUnique({
      where: { userId: helper.id },
    })

    const pointValue = settings?.pointValueSyp ?? 10
    const syValue = pointsToRedeem * pointValue
    const newBalance = customer.loyaltyPoints - pointsToRedeem

    await prisma.$transaction([
      prisma.user.update({
        where: { id: customer.id },
        data: { loyaltyPoints: { decrement: pointsToRedeem } },
      }),
      prisma.loyaltyTransaction.create({
        data: {
          userId: customer.id,
          type: 'REDEEM',
          points: -pointsToRedeem,
          balanceAfter: newBalance,
          description: `استخدام نقاط في المحل — قيمة ${syValue.toLocaleString()} ل.س`,
          helperId: helperProfile?.id ?? null,
        },
      }),
    ])

    return NextResponse.json({
      redeemedPoints: pointsToRedeem,
      syValue,
      newBalance,
      customerName: customer.name,
      message: `تم خصم ${pointsToRedeem} نقطة (${syValue.toLocaleString()} ل.س خصم)`,
    })
  } catch (e) { return serverError(e) }
}
