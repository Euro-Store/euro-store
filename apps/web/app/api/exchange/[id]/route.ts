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

    const exchange = await prisma.exchangeRequest.findFirst({
      where,
      include: {
        items: { include: { product: true } },
        partnerShop: true,
        helper: { include: { user: { select: { name: true } } } },
      },
    })

    if (!exchange) return NextResponse.json({ error: 'الطلب غير موجود' }, { status: 404 })

    return NextResponse.json({ exchange })
  } catch (e) { return serverError(e) }
}
