import { Request, Response, NextFunction } from 'express'
import { verifyAccess, TokenPayload } from '../utils/jwt'
import { fail } from '../utils/response'

declare global {
  namespace Express {
    interface Request { user?: TokenPayload }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return fail(res, 'غير مصرح — يرجى تسجيل الدخول', 401)
  try {
    req.user = verifyAccess(token)
    next()
  } catch {
    return fail(res, 'الجلسة منتهية — يرجى تسجيل الدخول مجدداً', 401)
  }
}

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return fail(res, 'غير مصرح', 401)
  if (req.user.role !== 'ADMIN') return fail(res, 'ممنوع — صلاحيات المدير مطلوبة', 403)
  next()
}

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) try { req.user = verifyAccess(token) } catch {}
  next()
}
