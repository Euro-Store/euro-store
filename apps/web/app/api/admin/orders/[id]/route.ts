import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(req, ['ADMIN'])
  if (error) return error
  try {
    const { status } = await req.json()
    const order = await prisma.order.update({ where: { id: params.id }, data: { status } })
    return NextResponse.json({ order })
  } catch (e) { return serverError(e) }
}
