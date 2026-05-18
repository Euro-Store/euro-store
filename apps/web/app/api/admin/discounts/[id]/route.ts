import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(req, ['ADMIN'])
  if (error) return error
  try {
    const data = await req.json()
    const discount = await prisma.discountCode.update({ where: { id: params.id }, data })
    return NextResponse.json({ discount })
  } catch (e) { return serverError(e) }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(req, ['ADMIN'])
  if (error) return error
  try {
    await prisma.discountCode.update({ where: { id: params.id }, data: { isActive: false } })
    return NextResponse.json({ message: 'تم تعطيل الكود' })
  } catch (e) { return serverError(e) }
}
