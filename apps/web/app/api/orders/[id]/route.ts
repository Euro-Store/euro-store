import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const where = user.role === 'ADMIN'
      ? { id: params.id }
      : { id: params.id, userId: user.id }

    const order = await prisma.order.findFirst({
      where,
      include: {
        items: {
          include: { product: { select: { nameAr: true, slug: true, images: true } } },
        },
        address: true,
        discountCode: { select: { code: true, type: true, value: true } },
        exchangeRequest: { select: { id: true, status: true } },
      },
    })

    if (!order) return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 })

    return NextResponse.json({ order })
  } catch (e) { return serverError(e) }
}

// تحديث الحالة (Admin فقط)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'ممنوع' }, { status: 403 })
    }

    const { status } = await req.json()
    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json({ order })
  } catch (e) { return serverError(e) }
}
