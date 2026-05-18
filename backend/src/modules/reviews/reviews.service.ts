import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'

export class ReviewsService {
  async forProduct(productId: string) {
    const reviews = await prisma.review.findMany({
      where: { productId, isApproved: true },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { firstName: true, lastName: true } } },
    })
    const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0
    return { reviews, avgRating: Math.round(avg * 10) / 10, count: reviews.length }
  }

  async add(userId: string, productId: string, rating: number, comment?: string) {
    if (rating < 1 || rating > 5) throw new AppError('التقييم بين 1 و 5', 400)
    const ex = await prisma.review.findUnique({ where: { userId_productId: { userId, productId } } })
    if (ex) throw new AppError('قيّمت هذا المنتج مسبقاً', 409)
    return prisma.review.create({
      data: { userId, productId, rating, comment },
      include: { user: { select: { firstName: true, lastName: true } } },
    })
  }
}
