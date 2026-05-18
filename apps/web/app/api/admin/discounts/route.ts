import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const discounts = await prisma.discountCode.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { usages: true } } },
    })

    return NextResponse.json({ discounts })
  } catch (e) { return serverError(e) }
}

export async function POST(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const data = await req.json()
    // كود الخصم دائماً بحروف كبيرة
    data.code = data.code.trim().toUpperCase()

    const discount = await prisma.discountCode.create({ data })
    return NextResponse.json({ discount }, { status: 201 })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return NextResponse.json({ error: 'الكود موجود مسبقاً' }, { status: 409 })
    }
    return serverError(e)
  }
}
