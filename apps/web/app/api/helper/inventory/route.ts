import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// GET: قائمة المنتجات للهيلبر
export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['HELPER', 'ADMIN'])
    if (error) return error

    const sp = req.nextUrl.searchParams
    const q  = sp.get('q')
    const where: any = { isActive: true }
    if (q) {
      where.OR = [
        { nameAr: { contains: q, mode: 'insensitive' } },
        { nameEn: { contains: q, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where, take: 30,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, nameAr: true, images: true, stock: true, sizes: true, colors: true },
    })

    return NextResponse.json({ products })
  } catch (e) { return serverError(e) }
}

// POST: اقتراح تحديث مخزون → يُرسل للأدمن
export async function POST(req: NextRequest) {
  try {
    const { error, user } = await requireRole(req, ['HELPER', 'ADMIN'])
    if (error) return error

    const { productId, newStock, note } = await req.json()
    if (!productId || newStock === undefined) {
      return NextResponse.json({ error: 'productId والكمية مطلوبان' }, { status: 400 })
    }

    const helper = await prisma.helperProfile.findUnique({ where: { userId: user.id } })
    if (!helper) return NextResponse.json({ error: 'ملف الهيلبر غير موجود' }, { status: 404 })

    const submission = await prisma.helperSubmission.create({
      data: {
        helperId: helper.id,
        type: 'INVENTORY_UPDATE',
        data: { productId, newStock, note },
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      submission,
      message: 'طلب التحديث أُرسل للأدمن — بانتظار الموافقة',
    }, { status: 201 })
  } catch (e) { return serverError(e) }
}
