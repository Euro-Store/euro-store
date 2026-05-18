import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(req, ['ADMIN'])
  if (error) return error
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true, brand: true },
    })
    if (!product) return NextResponse.json({ error: 'غير موجود' }, { status: 404 })
    return NextResponse.json({ product })
  } catch (e) { return serverError(e) }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(req, ['ADMIN'])
  if (error) return error
  try {
    const data = await req.json()
    const product = await prisma.product.update({ where: { id: params.id }, data })
    return NextResponse.json({ product })
  } catch (e) { return serverError(e) }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(req, ['ADMIN'])
  if (error) return error
  try {
    await prisma.product.update({ where: { id: params.id }, data: { isActive: false } })
    return NextResponse.json({ message: 'تم إخفاء المنتج' })
  } catch (e) { return serverError(e) }
}
