import { prisma } from '../../config/database'
import { paginate, meta } from '../../utils/pagination'

export class SearchService {
  async search(q: string, page: number, limit: number) {
    const skip = (page - 1) * limit
    const where = {
      isActive: true,
      OR: [
        { nameAr: { contains: q, mode: 'insensitive' as const } },
        { nameEn: { contains: q, mode: 'insensitive' as const } },
        { descriptionAr: { contains: q, mode: 'insensitive' as const } },
        { brand: { nameAr: { contains: q, mode: 'insensitive' as const } } },
        { brand: { nameEn: { contains: q, mode: 'insensitive' as const } } },
      ],
    }
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where, skip, take: limit,
        select: {
          id: true, slug: true, nameAr: true, nameEn: true,
          price: true, salePrice: true, images: true,
          brand: { select: { nameAr: true, nameEn: true } },
          category: { select: { slug: true, nameAr: true } },
        },
      }),
      prisma.product.count({ where }),
    ])
    return { products, meta: meta(total, page, limit) }
  }

  async suggest(q: string) {
    if (q.length < 2) return []
    return prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { nameAr: { startsWith: q, mode: 'insensitive' } },
          { nameEn: { startsWith: q, mode: 'insensitive' } },
        ],
      },
      take: 8,
      select: { id: true, slug: true, nameAr: true, nameEn: true, images: true, price: true },
    })
  }
}
