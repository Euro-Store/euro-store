import { prisma } from '../../config/database'
import { setCache, getCache } from '../../config/redis'

export class BrandsService {
  async all() {
    const cached = await getCache('brands:all')
    if (cached) return cached
    const brands = await prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { nameEn: 'asc' },
      select: { id: true, slug: true, nameAr: true, nameEn: true, logo: true },
    })
    await setCache('brands:all', brands, 600)
    return brands
  }
  async bySlug(slug: string) {
    return prisma.brand.findUnique({ where: { slug } })
  }
  async create(data: any) {
    return prisma.brand.create({ data })
  }
}
