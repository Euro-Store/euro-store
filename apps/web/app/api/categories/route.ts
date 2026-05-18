import { NextResponse } from 'next/server'
import { prisma } from '@euro-store/db'
import { serverError } from '@/lib/auth/middleware'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true, parentId: null },
      orderBy: { displayOrder: 'asc' },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
          select: { id: true, slug: true, nameAr: true, nameEn: true, image: true },
        },
      },
      select: {
        id: true, slug: true, nameAr: true, nameEn: true, image: true,
        children: true,
      },
    })
    return NextResponse.json({ categories })
  } catch (e) { return serverError(e) }
}
