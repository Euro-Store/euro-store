import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'

const cartInclude = {
  items: {
    include: {
      product: {
        select: { id: true, slug: true, nameAr: true, nameEn: true, price: true, salePrice: true, images: true },
      },
      variant: { select: { id: true, size: true, color: true, colorHex: true, stock: true } },
    },
  },
}

export class CartService {
  async get(userId: string) {
    let cart = await prisma.cart.findUnique({ where: { userId }, include: cartInclude })
    if (!cart) cart = await prisma.cart.create({ data: { userId }, include: cartInclude })

    const subtotal = cart.items.reduce((s, i) => {
      return s + Number(i.product.salePrice ?? i.product.price) * i.quantity
    }, 0)
    return { ...cart, subtotal, itemCount: cart.items.length }
  }

  async add(userId: string, productId: string, variantId: string | undefined, qty: number) {
    const cart = await this.ensure(userId)
    const existing = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId, variantId: variantId ?? null },
    })
    if (existing) {
      await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + qty } })
    } else {
      await prisma.cartItem.create({ data: { cartId: cart.id, productId, variantId, quantity: qty } })
    }
    return this.get(userId)
  }

  async update(userId: string, itemId: string, qty: number) {
    const cart = await this.ensure(userId)
    const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } })
    if (!item) throw new AppError('العنصر غير موجود', 404)
    if (qty <= 0) await prisma.cartItem.delete({ where: { id: itemId } })
    else await prisma.cartItem.update({ where: { id: itemId }, data: { quantity: qty } })
    return this.get(userId)
  }

  async remove(userId: string, itemId: string) {
    const cart = await this.ensure(userId)
    await prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } })
    return this.get(userId)
  }

  async clear(userId: string) {
    const cart = await this.ensure(userId)
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
  }

  private async ensure(userId: string) {
    let c = await prisma.cart.findUnique({ where: { userId } })
    if (!c) c = await prisma.cart.create({ data: { userId } })
    return c
  }
}
