import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// GET: طلبات المستخدم
export async function GET(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: { select: { nameAr: true, images: true } } },
        },
      },
    })

    return NextResponse.json({ orders })
  } catch (e) { return serverError(e) }
}

// POST: إنشاء طلب جديد (Checkout)
export async function POST(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const {
      items, addressId, paymentMethod,
      discountCodeId, pointsUsed = 0, notes,
    } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ error: 'السلة فارغة' }, { status: 400 })
    }

    // جلب المنتجات والأسعار من DB (لا نثق بأسعار العميل)
    const productIds = items.map((i: any) => i.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    })

    const productMap = new Map(products.map(p => [p.id, p]))

    let subtotal = 0
    const orderItems = items.map((item: any) => {
      const p = productMap.get(item.productId)
      if (!p) throw new Error(`المنتج ${item.productId} غير موجود`)
      const price = p.salePrice ?? p.price
      subtotal += price * item.qty
      return {
        productId: p.id,
        nameAr: p.nameAr,
        price,
        qty: item.qty,
        size: item.size ?? null,
        color: item.color ?? null,
        image: p.images[0] ?? null,
      }
    })

    // خصم كود
    let discountAmount = 0
    let finalDiscountCodeId: string | null = null
    if (discountCodeId) {
      const code = await prisma.discountCode.findFirst({
        where: { id: discountCodeId, isActive: true },
      })
      if (code) {
        discountAmount = code.type === 'PERCENTAGE'
          ? (subtotal * code.value) / 100
          : code.value
        discountAmount = Math.min(discountAmount, subtotal)
        finalDiscountCodeId = code.id
      }
    }

    // نقاط الولاء
    const settings = await prisma.loyaltySettings.findUnique({ where: { id: 'global' } })
    const pointValue = settings?.pointValueSyp ?? 10
    const maxRedeem = settings?.maxRedeemPercent ?? 0.5
    const loyaltyDiscount = Math.min(
      (pointsUsed ?? 0) * pointValue,
      (subtotal - discountAmount) * maxRedeem
    )

    const total = Math.max(0, subtotal - discountAmount - loyaltyDiscount)

    // إنشاء الطلب
    const order = await prisma.$transaction(async (tx) => {
      const o = await tx.order.create({
        data: {
          userId: user.id,
          status: 'PENDING',
          subtotal,
          discountAmount,
          loyaltyDiscount,
          shippingCost: 0,
          total,
          paymentMethod: paymentMethod ?? 'CASH_ON_DELIVERY',
          addressId: addressId ?? null,
          discountCodeId: finalDiscountCodeId,
          pointsUsed: pointsUsed ?? 0,
          notes: notes ?? null,
          items: { create: orderItems },
        },
        include: { items: true },
      })

      // تحديث مخزون المنتجات وعداد المبيعات
      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock:      { decrement: item.qty },
            salesCount: { increment: item.qty },
          },
        })
      }

      // خصم النقاط المستخدمة
      if (pointsUsed > 0) {
        const newBalance = user.loyaltyPoints - pointsUsed
        await tx.user.update({
          where: { id: user.id },
          data: { loyaltyPoints: { decrement: pointsUsed } },
        })
        await tx.loyaltyTransaction.create({
          data: {
            userId: user.id,
            type: 'REDEEM',
            points: -pointsUsed,
            balanceAfter: newBalance,
            description: `استخدام نقاط في الطلب #${o.id.slice(-6)}`,
            orderId: o.id,
          },
        })
      }

      // تسجيل استخدام كود الخصم
      if (finalDiscountCodeId) {
        await tx.discountCode.update({
          where: { id: finalDiscountCodeId },
          data: { usedCount: { increment: 1 } },
        })
        await tx.discountUsage.create({
          data: { codeId: finalDiscountCodeId, userId: user.id, orderId: o.id },
        })
      }

      // إضافة نقاط ربح على الطلب
      const earnPoints = Math.floor(total * (settings?.pointsPerSyp ?? 0.001))
      if (earnPoints > 0) {
        const newBal = (user.loyaltyPoints - pointsUsed) + earnPoints
        await tx.user.update({
          where: { id: user.id },
          data: { loyaltyPoints: { increment: earnPoints } },
        })
        await tx.loyaltyTransaction.create({
          data: {
            userId: user.id,
            type: 'EARN_ONLINE',
            points: earnPoints,
            balanceAfter: newBal,
            description: `نقاط على الطلب #${o.id.slice(-6)}`,
            orderId: o.id,
          },
        })
      }

      return o
    })

    return NextResponse.json({ order }, { status: 201 })
  } catch (e) { return serverError(e) }
}
