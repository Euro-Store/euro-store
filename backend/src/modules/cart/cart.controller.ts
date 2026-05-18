import { Request, Response, NextFunction } from 'express'
import { CartService } from './cart.service'
import { ok, fail } from '../../utils/response'

const svc = new CartService()

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.get(req.user!.userId)) } catch (e) { next(e) }
}
export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, variantId, quantity = 1 } = req.body
    if (!productId) return fail(res, 'productId مطلوب', 400)
    return ok(res, await svc.add(req.user!.userId, productId, variantId, quantity), 'تمت الإضافة للسلة')
  } catch (e) { next(e) }
}
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body
    return ok(res, await svc.update(req.user!.userId, req.params.itemId, quantity))
  } catch (e) { next(e) }
}
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.remove(req.user!.userId, req.params.itemId), 'تم الحذف') }
  catch (e) { next(e) }
}
export const clear = async (req: Request, res: Response, next: NextFunction) => {
  try { await svc.clear(req.user!.userId); return ok(res, null, 'تم تفريغ السلة') }
  catch (e) { next(e) }
}
