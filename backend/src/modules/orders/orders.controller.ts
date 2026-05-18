import { Request, Response, NextFunction } from 'express'
import { OrdersService } from './orders.service'
import { ok, fail } from '../../utils/response'
import { paginate } from '../../utils/pagination'

const svc = new OrdersService()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { addressId, notes } = req.body
    if (!addressId) return fail(res, 'العنوان مطلوب', 400)
    return ok(res, await svc.create(req.user!.userId, addressId, notes), 'تم تقديم طلبك بنجاح', 201)
  } catch (e) { next(e) }
}
export const myOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit } = paginate(req.query as any)
    const r = await svc.myOrders(req.user!.userId, page, limit)
    return ok(res, r.orders, undefined, 200, r.meta)
  } catch (e) { next(e) }
}
export const myOrder = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.myOrder(req.params.id, req.user!.userId)) }
  catch (e) { next(e) }
}
export const cancel = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.cancel(req.params.id, req.user!.userId), 'تم إلغاء الطلب') }
  catch (e) { next(e) }
}
export const adminList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit } = paginate(req.query as any)
    const r = await svc.adminList(page, limit, req.query.status as string)
    return ok(res, r.orders, undefined, 200, r.meta)
  } catch (e) { next(e) }
}
export const setStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body
    if (!status) return fail(res, 'الحالة مطلوبة', 400)
    return ok(res, await svc.setStatus(req.params.id, status), 'تم تحديث الحالة')
  } catch (e) { next(e) }
}
