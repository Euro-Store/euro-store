import { Request, Response, NextFunction } from 'express'
import { CategoriesService } from './categories.service'
import { ok } from '../../utils/response'

const svc = new CategoriesService()
export const all = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.all()) } catch (e) { next(e) }
}
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.bySlug(req.params.slug)) } catch (e) { next(e) }
}
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.create(req.body), 'تم إضافة القسم', 201) } catch (e) { next(e) }
}
