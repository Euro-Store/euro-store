import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'
import { setCache, getCache } from '../../config/redis'

export class CategoriesService {
  async all() {
    const cached = await getCache('cats:all')
    if (cached) return cached
    const cats = await prisma.category.findMany({
      where: { isActive: true, parentId: null },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true, slug: true, nameAr: true, nameEn: true, image: true,
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          select: { id: true, slug: true, nameAr: true, nameEn: true, image: true },
        },
      },
    })
    await setCache('cats:all', cats, 600)
    return cats
  }

  async bySlug(slug: string) {
    const c = await prisma.category.findUnique({
      where: { slug },
      select: {
        id: true, slug: true, nameAr: true, nameEn: true, image: true,
        parent: { select: { id: true, slug: true, nameAr: true, nameEn: true } },
        children: { select: { id: true, slug: true, nameAr: true, nameEn: true } },
      },
    })
    if (!c) throw new AppError('القسم غير موجود', 404)
    return c
  }

  async create(data: any) {
    return prisma.category.create({ data })
  }
}
