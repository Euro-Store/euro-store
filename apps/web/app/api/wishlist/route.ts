import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const items = await prisma.wishlistItem.findMany({
      where: { userId: user.id },
      include: {
        product: {
          select: {
            id: true, slug: true, nameAr: true, price: true, salePrice: true,
            images: true, stock: true, isActive: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ items })
  } catch (e) { return serverError(e) }
}

export async function POST(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const { productId } = await req.json()
    if (!productId) return NextResponse.json({ error: 'productId مطلوب' }, { status: 400 })

    await prisma.wishlistItem.upsert({
      where: { userId_productId: { userId: user.id, productId } },
      create: { userId: user.id, productId },
      update: {},
    })

    return NextResponse.json({ message: 'تم الإضافة للمفضلة' })
  } catch (e) { return serverError(e) }
}

export async function DELETE(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const { productId } = await req.json()
    await prisma.wishlistItem.deleteMany({
      where: { userId: user.id, productId },
    })

    return NextResponse.json({ message: 'تم الحذف من المفضلة' })
  } catch (e) { return serverError(e) }
}
