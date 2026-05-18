import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'
import { paginate, meta } from '../../utils/pagination'
import { setCache, getCache, delCache } from '../../config/redis'
import { uniqueSlug } from '../../utils/slugify'

const select = {
  id: true, slug: true, nameAr: true, nameEn: true,
  price: true, salePrice: true, images: true,
  isFeatured: true, isTrending: true, createdAt: true,
  category: { select: { id: true, slug: true, nameAr: true, nameEn: true } },
  brand: { select: { id: true, slug: true, nameAr: true, nameEn: true, logo: true } },
  variants: { select: { id: true, size: true, color: true, colorHex: true, colorNameAr: true, stock: true } },
  _count: { select: { reviews: true } },
}

const fmt = (p: any) => ({
  ...p,
  reviewCount: p._count?.reviews ?? 0,
  _count: undefined,
  isOnSale: p.salePrice !== null && Number(p.salePrice) < Number(p.price),
  discount: p.salePrice
    ? Math.round(((Number(p.price) - Number(p.salePrice)) / Number(p.price)) * 100)
    : 0,
})

export class ProductsService {
  async list(q: any) {
    const ck = `products:${JSON.stringify(q)}`
    const cached = await getCache(ck)
    if (cached) return cached

    const { page, limit, skip } = paginate(q)
    const where: any = { isActive: true }

    if (q.category) where.category = { slug: q.category }
    if (q.brand) where.brand = { slug: q.brand }
    if (q.featured === 'true') where.isFeatured = true
    if (q.trending === 'true') where.isTrending = true
    if (q.q) where.OR = [
      { nameAr: { contains: q.q, mode: 'insensitive' } },
      { nameEn: { contains: q.q, mode: 'insensitive' } },
      { tags: { has: q.q } },
    ]
    if (q.minPrice || q.maxPrice) {
      where.price = {}
      if (q.minPrice) where.price.gte = Number(q.minPrice)
      if (q.maxPrice) where.price.lte = Number(q.maxPrice)
    }

    const orderBy: any =
      q.sort === 'price_asc' ? { price: 'asc' }
      : q.sort === 'price_desc' ? { price: 'desc' }
      : { createdAt: 'desc' }

    const [products, total] = await Promise.all([
      prisma.product.findMany({ where, select, orderBy, skip, take: limit }),
      prisma.product.count({ where }),
    ])

    const result = { products: products.map(fmt), meta: meta(total, page, limit) }
    await setCache(ck, result, 60)
    return result
  }

  async bySlug(slug: string) {
    const ck = `product:${slug}`
    const cached = await getCache(ck)
    if (cached) return cached

    const p = await prisma.product.findUnique({
      where: { slug, isActive: true },
      select: { ...select, descriptionAr: true, descriptionEn: true, tags: true },
    })
    if (!p) throw new AppError('المنتج غير موجود', 404)

    const result = fmt(p)
    await setCache(ck, result, 300)
    return result
  }

  async create(dto: any) {
    const slug = dto.slug || uniqueSlug(dto.nameEn)
    const { variants, ...rest } = dto
    const p = await prisma.product.create({
      data: { ...rest, slug, variants: { create: variants ?? [] } },
      select,
    })
    return fmt(p)
  }

  async update(id: string, dto: any) {
    const p = await prisma.product.findUnique({ where: { id } })
    if (!p) throw new AppError('المنتج غير موجود', 404)
    const { variants, ...rest } = dto
    const updated = await prisma.product.update({ where: { id }, data: rest, select })
    await delCache(`product:${updated.slug}`)
    return fmt(updated)
  }

  async remove(id: string) {
    const p = await prisma.product.findUnique({ where: { id } })
    if (!p) throw new AppError('المنتج غير موجود', 404)
    await prisma.product.update({ where: { id }, data: { isActive: false } })
    await delCache(`product:${p.slug}`)
  }
}
