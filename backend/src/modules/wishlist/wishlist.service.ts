import { prisma } from '../../config/database'

const include = {
  items: {
    orderBy: { addedAt: 'desc' as const },
    include: {
      product: {
        select: {
          id: true, slug: true, nameAr: true, nameEn: true,
          price: true, salePrice: true, images: true,
          brand: { select: { nameAr: true, nameEn: true } },
          variants: { select: { size: true, stock: true }, take: 5 },
        },
      },
    },
  },
}

export class WishlistService {
  async get(userId: string) {
    let w = await prisma.wishlist.findUnique({ where: { userId }, include })
    if (!w) w = await prisma.wishlist.create({ data: { userId }, include })
    return w
  }

  async toggle(userId: string, productId: string) {
    let w = await prisma.wishlist.findUnique({ where: { userId } })
    if (!w) w = await prisma.wishlist.create({ data: { userId } })

    const ex = await prisma.wishlistItem.findUnique({
      where: { wishlistId_productId: { wishlistId: w.id, productId } },
    })
    if (ex) {
      await prisma.wishlistItem.delete({ where: { id: ex.id } })
      return { added: false }
    }
    await prisma.wishlistItem.create({ data: { wishlistId: w.id, productId } })
    return { added: true }
  }
}
