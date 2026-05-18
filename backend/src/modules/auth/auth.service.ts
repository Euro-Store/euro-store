import { prisma } from '../../config/database'
import { hash, compare } from '../../utils/password'
import { signAccess, signRefresh, verifyRefresh } from '../../utils/jwt'
import { AppError } from '../../middleware/error.middleware'
import type { RegisterInput, LoginInput } from './auth.types'

const userSelect = {
  id: true, phone: true, email: true,
  firstName: true, lastName: true, role: true,
}

export class AuthService {
  async register(dto: RegisterInput) {
    if (await prisma.user.findUnique({ where: { phone: dto.phone } }))
      throw new AppError('رقم الهاتف مسجل مسبقاً', 409)

    const user = await prisma.user.create({
      data: { ...dto, passwordHash: await hash(dto.password), password: undefined } as any,
      select: userSelect,
    })

    // Bootstrap cart + wishlist
    await Promise.all([
      prisma.cart.create({ data: { userId: user.id } }),
      prisma.wishlist.create({ data: { userId: user.id } }),
    ])

    return this.tokens(user)
  }

  async login(dto: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { phone: dto.phone },
      select: { ...userSelect, passwordHash: true },
    })
    if (!user || !(await compare(dto.password, user.passwordHash)))
      throw new AppError('رقم الهاتف أو كلمة المرور غير صحيحة', 401)

    const { passwordHash: _, ...safe } = user
    return this.tokens(safe)
  }

  async refresh(token: string) {
    try {
      const p = verifyRefresh(token)
      const user = await prisma.user.findUnique({
        where: { id: p.userId },
        select: { id: true, role: true, refreshToken: true },
      })
      if (!user || user.refreshToken !== token)
        throw new AppError('رمز التحديث غير صحيح', 401)
      return { accessToken: signAccess({ userId: user.id, role: user.role }) }
    } catch {
      throw new AppError('رمز التحديث منتهي الصلاحية', 401)
    }
  }

  async logout(userId: string) {
    await prisma.user.update({ where: { id: userId }, data: { refreshToken: null } })
  }

  async profile(userId: string) {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: userSelect })
    if (!u) throw new AppError('المستخدم غير موجود', 404)
    return u
  }

  private async tokens(user: any) {
    const payload = { userId: user.id, role: user.role }
    const accessToken = signAccess(payload)
    const refreshToken = signRefresh(payload)
    await prisma.user.update({ where: { id: user.id }, data: { refreshToken } })
    return { user, accessToken, refreshToken }
  }
}
