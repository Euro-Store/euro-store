import { prisma } from '../../config/database'
import { AppError } from '../../middleware/error.middleware'
import { hash, compare } from '../../utils/password'

export class UsersService {
  async addresses(userId: string) {
    return prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    })
  }

  async addAddress(userId: string, data: any) {
    if (data.isDefault)
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } })
    return prisma.address.create({ data: { ...data, userId } })
  }

  async updateAddress(userId: string, id: string, data: any) {
    const a = await prisma.address.findFirst({ where: { id, userId } })
    if (!a) throw new AppError('العنوان غير موجود', 404)
    if (data.isDefault)
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } })
    return prisma.address.update({ where: { id }, data })
  }

  async deleteAddress(userId: string, id: string) {
    const a = await prisma.address.findFirst({ where: { id, userId } })
    if (!a) throw new AppError('العنوان غير موجود', 404)
    await prisma.address.delete({ where: { id } })
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; email?: string }) {
    return prisma.user.update({
      where: { id: userId }, data,
      select: { id: true, phone: true, email: true, firstName: true, lastName: true },
    })
  }

  async changePassword(userId: string, current: string, next: string) {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { passwordHash: true } })
    if (!u) throw new AppError('المستخدم غير موجود', 404)
    if (!(await compare(current, u.passwordHash)))
      throw new AppError('كلمة المرور الحالية غير صحيحة', 401)
    await prisma.user.update({ where: { id: userId }, data: { passwordHash: await hash(next) } })
  }

  async adminList(page: number, limit: number) {
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip, take: limit, orderBy: { createdAt: 'desc' },
        select: { id: true, phone: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
      }),
      prisma.user.count(),
    ])
    return { users, total }
  }
}
