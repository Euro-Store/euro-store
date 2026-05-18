import { Request, Response, NextFunction } from 'express'
import { WishlistService } from './wishlist.service'
import { ok, fail } from '../../utils/response'

const svc = new WishlistService()

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.get(req.user!.userId)) } catch (e) { next(e) }
}
export const toggle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.body
    if (!productId) return fail(res, 'productId مطلوب', 400)
    const r = await svc.toggle(req.user!.userId, productId)
    return ok(res, r, r.added ? 'أُضيف للمفضلة' : 'أُزيل من المفضلة')
  } catch (e) { next(e) }
}
