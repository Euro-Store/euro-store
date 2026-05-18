import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function POST(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error

    const { code, orderAmount, categoryId, isFirstOrder } = await req.json()
    if (!code) return NextResponse.json({ valid: false, error: 'الكود مطلوب' }, { status: 400 })

    const discount = await prisma.discountCode.findFirst({
      where: {
        code: code.trim().toUpperCase(),
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
    })

    if (!discount) return NextResponse.json({ valid: false, error: 'الكود غير صحيح أو منتهي' })

    // التحقق من الحد الأقصى للاستخدام
    if (discount.maxUses && discount.usedCount >= discount.maxUses) {
      return NextResponse.json({ valid: false, error: 'الكود استُنفد' })
    }

    // التحقق من أول استخدام
    if (discount.isFirstOrder && !isFirstOrder) {
      return NextResponse.json({ valid: false, error: 'الكود صالح للطلب الأول فقط' })
    }

    // التحقق من الحد الأدنى للطلب
    if (discount.minOrderAmount && orderAmount < discount.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        error: `الطلب الأدنى لهذا الكود ${discount.minOrderAmount.toLocaleString()} ل.س`,
      })
    }

    // التحقق من الأقسام المحددة
    if (discount.categoryIds.length > 0 && categoryId) {
      if (!discount.categoryIds.includes(categoryId)) {
        return NextResponse.json({ valid: false, error: 'الكود غير صالح لهذا القسم' })
      }
    }

    // التحقق من سبق الاستخدام بواسطة هذا المستخدم (إذا maxUses: 1)
    if (discount.maxUses === 1) {
      const used = await prisma.discountUsage.findFirst({
        where: { codeId: discount.id, userId: user.id },
      })
      if (used) return NextResponse.json({ valid: false, error: 'استخدمت هذا الكود مسبقاً' })
    }

    const discountAmount = discount.type === 'PERCENTAGE'
      ? Math.round((orderAmount * discount.value) / 100)
      : discount.value

    return NextResponse.json({
      valid: true,
      code: discount.code,
      codeId: discount.id,
      type: discount.type,
      value: discount.value,
      discountAmount: Math.min(discountAmount, orderAmount),
    })
  } catch (e) { return serverError(e) }
}
