// الـ Cart يُدار أساساً في Zustand + localStorage
// هذا الـ Route لمزامنة السلة مع الخادم لمستخدمي مسجّلين (اختياري)
import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// GET: جلب حالة المنتجات (التحقق من الأسعار الحالية)
export async function POST(req: NextRequest) {
  try {
    const { productIds } = await req.json()
    if (!Array.isArray(productIds)) {
      return NextResponse.json({ error: 'productIds مطلوب' }, { status: 400 })
    }

    // إعادة الأسعار والمخزون المحدّث
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
      select: {
        id: true, slug: true, nameAr: true,
        price: true, salePrice: true, stock: true,
        images: true, sizes: true, colors: true,
      },
    })

    return NextResponse.json({ products })
  } catch (e) { return serverError(e) }
}
