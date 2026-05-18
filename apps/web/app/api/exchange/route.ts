import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// GET: طلبات استبدال المستخدم
export async function GET(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const exchanges = await prisma.exchangeRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        items: { include: { product: { select: { nameAr: true, images: true } } } },
        partnerShop: { select: { nameAr: true, address: true, city: true } },
      },
    })

    return NextResponse.json({ exchanges })
  } catch (e) { return serverError(e) }
}

// POST: إنشاء طلب استبدال + توليد QR
export async function POST(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const { orderId, items } = await req.json()
    if (!orderId || !items?.length) {
      return NextResponse.json({ error: 'orderId والمنتجات مطلوبة' }, { status: 400 })
    }

    // التحقق من ملكية الطلب
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: user.id, status: 'DELIVERED' },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'الطلب غير موجود أو لم يُسلَّم بعد' },
        { status: 400 }
      )
    }

    const exchange = await prisma.exchangeRequest.create({
      data: {
        orderId,
        userId: user.id,
        status: 'QR_GENERATED',
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            qty: i.qty,
            size: i.size ?? null,
            color: i.color ?? null,
            newSize: i.newSize ?? null,
            newColor: i.newColor ?? null,
            reason: i.reason ?? null,
          })),
        },
      },
      include: {
        items: { include: { product: { select: { nameAr: true, images: true } } } },
      },
    })

    return NextResponse.json({ exchange }, { status: 201 })
  } catch (e) { return serverError(e) }
}
