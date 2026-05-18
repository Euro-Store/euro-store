import { NextRequest, NextResponse } from 'next/server'
import { requireRole, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

export async function GET(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const shops = await prisma.partnerShop.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { helpers: true, exchanges: true } } },
    })

    return NextResponse.json({ shops })
  } catch (e) { return serverError(e) }
}

export async function POST(req: NextRequest) {
  try {
    const { error } = await requireRole(req, ['ADMIN'])
    if (error) return error

    const data = await req.json()
    const shop = await prisma.partnerShop.create({ data })
    return NextResponse.json({ shop }, { status: 201 })
  } catch (e) { return serverError(e) }
}
