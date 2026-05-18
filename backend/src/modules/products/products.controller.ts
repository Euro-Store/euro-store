import { Request, Response, NextFunction } from 'express'
import { ProductsService } from './products.service'
import { ok } from '../../utils/response'

const svc = new ProductsService()

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try { const r = await svc.list(req.query); return ok(res, r.products, undefined, 200, r.meta) }
  catch (e) { next(e) }
}
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.bySlug(req.params.slug)) }
  catch (e) { next(e) }
}
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.create(req.body), 'تم إضافة المنتج', 201) }
  catch (e) { next(e) }
}
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.update(req.params.id, req.body), 'تم التحديث') }
  catch (e) { next(e) }
}
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try { await svc.remove(req.params.id); return ok(res, null, 'تم الحذف') }
  catch (e) { next(e) }
}
