import { Request, Response, NextFunction } from 'express'
import { UsersService } from './users.service'
import { ok, fail } from '../../utils/response'

const svc = new UsersService()

export const addresses = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.addresses(req.user!.userId)) } catch (e) { next(e) }
}
export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.addAddress(req.user!.userId, req.body), 'تم إضافة العنوان', 201) }
  catch (e) { next(e) }
}
export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.updateAddress(req.user!.userId, req.params.id, req.body), 'تم التحديث') }
  catch (e) { next(e) }
}
export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
  try { await svc.deleteAddress(req.user!.userId, req.params.id); return ok(res, null, 'تم الحذف') }
  catch (e) { next(e) }
}
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.updateProfile(req.user!.userId, req.body), 'تم تحديث الملف الشخصي') }
  catch (e) { next(e) }
}
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { current, next: nxt } = req.body
    if (!current || !nxt) return fail(res, 'كلمة المرور الحالية والجديدة مطلوبتان', 400)
    await svc.changePassword(req.user!.userId, current, nxt)
    return ok(res, null, 'تم تغيير كلمة المرور')
  } catch (e) { next(e) }
}
