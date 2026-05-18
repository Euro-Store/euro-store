import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function POST(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const { rating, comment } = await req.json()
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'التقييم يجب أن يكون بين 1 و 5' }, { status: 400 })
    }

    // التحقق من أن المستخدم اشترى المنتج
    const hasBought = await prisma.orderItem.findFirst({
      where: {
        productId: params.productId,
        order: { userId: user.id, status: 'DELIVERED' },
      },
    })

    if (!hasBought) {
      return NextResponse.json(
        { error: 'يمكنك التقييم فقط بعد استلام المنتج' },
        { status: 403 }
      )
    }

    const review = await prisma.review.upsert({
      where: { userId_productId: { userId: user.id, productId: params.productId } },
      create: { userId: user.id, productId: params.productId, rating, comment },
      update: { rating, comment, isApproved: false },
    })

    return NextResponse.json({
      review,
      message: 'شكراً — تقييمك قيد المراجعة',
    }, { status: 201 })
  } catch (e) { return serverError(e) }
}
