import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireRole(req, ['ADMIN'])
  if (error) return error
  try {
    const { status, adminNote } = await req.json()
    const exchange = await prisma.exchangeRequest.update({
      where: { id: params.id },
      data: { status, adminNote },
    })
    return NextResponse.json({ exchange })
  } catch (e) { return serverError(e) }
}
