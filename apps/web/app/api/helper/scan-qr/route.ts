import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// POST: مسح QR الاستبدال — يُظهر تفاصيل الطلب للهيلبر
export async function POST(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['HELPER', 'ADMIN'])
    if (error) return error

    const { qrCode } = await req.json()
    if (!qrCode) return NextResponse.json({ error: 'QR Code مطلوب' }, { status: 400 })

    const exchange = await prisma.exchangeRequest.findFirst({
      where: { qrCode, status: { in: ['QR_GENERATED', 'REQUESTED'] } },
      include: {
        user: { select: { name: true, phone: true } },
        items: {
          include: {
            product: {
              select: { nameAr: true, images: true, sizes: true, colors: true },
            },
          },
        },
        order: { select: { id: true, createdAt: true } },
      },
    })

    if (!exchange) {
      return NextResponse.json(
        { error: 'طلب الاستبدال غير موجود أو انتهت صلاحيته' },
        { status: 404 }
      )
    }

    return NextResponse.json({ exchange })
  } catch (e) { return serverError(e) }
}
