import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'
import { paginate, meta } from '../../utils/pagination'

export class OrdersService {
  async create(userId: string, addressId: string, notes?: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: { select: { id: true, nameAr: true, nameEn: true, price: true, salePrice: true, images: true } },
            variant: true,
          },
        },
      },
    })
    if (!cart || !cart.items.length) throw new AppError('السلة فارغة', 400)

    const address = await prisma.address.findFirst({ where: { id: addressId, userId } })
    if (!address) throw new AppError('العنوان غير موجود', 404)

    for (const item of cart.items) {
      if (item.variant && item.variant.stock < item.quantity)
        throw new AppError(`"${item.product.nameAr}" غير متوفر بالكمية المطلوبة`, 400)
    }

    const total = cart.items.reduce((s, i) => s + Number(i.product.salePrice ?? i.product.price) * i.quantity, 0)

    const order = await prisma.order.create({
      data: {
        userId, addressId, notes, total,
        items: {
          create: cart.items.map(i => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
            price: i.product.salePrice ?? i.product.price,
            nameAr: i.product.nameAr,
            nameEn: i.product.nameEn,
            image: i.product.images[0],
          })),
        },
      },
      include: { items: true, address: true },
    })

    // Deduct stock + clear cart
    await Promise.all([
      ...cart.items.filter(i => i.variantId).map(i =>
        prisma.variant.update({ where: { id: i.variantId! }, data: { stock: { decrement: i.quantity } } })
      ),
      prisma.cartItem.deleteMany({ where: { cartId: cart.id } }),
    ])

    return order
  }

  async myOrders(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId }, orderBy: { createdAt: 'desc' }, skip, take: limit,
        include: { items: { select: { nameAr: true, quantity: true, price: true, image: true } }, address: true },
      }),
      prisma.order.count({ where: { userId } }),
    ])
    return { orders, meta: meta(total, page, limit) }
  }

  async myOrder(id: string, userId: string) {
    const o = await prisma.order.findFirst({
      where: { id, userId },
      include: {
        items: { include: { product: { select: { slug: true } }, variant: true } },
        address: true,
      },
    })
    if (!o) throw new AppError('الطلب غير موجود', 404)
    return o
  }

  async cancel(id: string, userId: string) {
    const o = await prisma.order.findFirst({ where: { id, userId } })
    if (!o) throw new AppError('الطلب غير موجود', 404)
    if (!['PENDING', 'CONFIRMED'].includes(o.status))
      throw new AppError('لا يمكن إلغاء هذا الطلب في مرحلته الحالية', 400)
    return prisma.order.update({ where: { id }, data: { status: 'CANCELLED' } })
  }

  async adminList(page: number, limit: number, status?: string) {
    const skip = (page - 1) * limit
    const where: any = status ? { status } : {}
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where, skip, take: limit, orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { firstName: true, lastName: true, phone: true } },
          address: true,
          items: { select: { nameAr: true, quantity: true, price: true } },
        },
      }),
      prisma.order.count({ where }),
    ])
    return { orders, meta: meta(total, page, limit) }
  }

  async setStatus(id: string, status: string) {
    return prisma.order.update({ where: { id }, data: { status: status as any } })
  }
}
