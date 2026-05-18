import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'
import { ok, fail } from '../../utils/response'

const svc = new AuthService()

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.register(req.body), 'تم التسجيل بنجاح', 201) }
  catch (e) { next(e) }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.login(req.body), 'مرحباً بك') }
  catch (e) { next(e) }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) return fail(res, 'refreshToken مطلوب', 400)
    return ok(res, await svc.refresh(refreshToken))
  } catch (e) { next(e) }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try { await svc.logout(req.user!.userId); return ok(res, null, 'تم تسجيل الخروج') }
  catch (e) { next(e) }
}

export const profile = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.profile(req.user!.userId)) }
  catch (e) { next(e) }
}
