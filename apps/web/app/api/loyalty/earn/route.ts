import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// POST: يستدعيه الـ Helper لتسجيل مشتريات داخل المحل
export async function POST(req: NextRequest) {
  try {
    const { error, user: helper } = await requireRole(req, ['HELPER', 'ADMIN'])
    if (error) return error

    const { customerQrCode, invoiceAmount } = await req.json()
    if (!customerQrCode || !invoiceAmount || invoiceAmount <= 0) {
      return NextResponse.json({ error: 'QR Code وقيمة الفاتورة مطلوبان' }, { status: 400 })
    }

    const customer = await prisma.user.findUnique({
      where: { loyaltyQrCode: customerQrCode },
    })

    if (!customer) return NextResponse.json({ error: 'QR Code غير صالح' }, { status: 404 })

    const settings = await prisma.loyaltySettings.findUnique({ where: { id: 'global' } })
    const rate = settings?.pointsPerSyp ?? 0.001

    const earnedPoints = Math.floor(invoiceAmount * rate)
    if (earnedPoints <= 0) {
      return NextResponse.json({ error: 'المبلغ غير كافٍ لكسب نقاط' }, { status: 400 })
    }

    const helperProfile = await prisma.helperProfile.findUnique({
      where: { userId: helper.id },
    })

    const newBalance = customer.loyaltyPoints + earnedPoints

    await prisma.$transaction([
      prisma.user.update({
        where: { id: customer.id },
        data: { loyaltyPoints: { increment: earnedPoints } },
      }),
      prisma.loyaltyTransaction.create({
        data: {
          userId: customer.id,
          type: 'EARN_IN_STORE',
          points: earnedPoints,
          balanceAfter: newBalance,
          description: `شراء داخل المحل — فاتورة ${invoiceAmount.toLocaleString()} ل.س`,
          invoiceAmount,
          helperId: helperProfile?.id ?? null,
        },
      }),
    ])

    return NextResponse.json({
      earnedPoints,
      newBalance,
      customerName: customer.name,
      message: `أُضيفت ${earnedPoints} نقطة لحساب ${customer.name}`,
    })
  } catch (e) { return serverError(e) }
}
