import { Request, Response, NextFunction } from 'express'
import { SearchService } from './search.service'
import { ok } from '../../utils/response'
import { paginate } from '../../utils/pagination'

const svc = new SearchService()

export const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q = '' } = req.query as any
    const { page, limit } = paginate(req.query as any)
    const r = await svc.search(String(q), page, limit)
    return ok(res, r.products, undefined, 200, r.meta)
  } catch (e) { next(e) }
}
export const suggest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q = '' } = req.query as any
    return ok(res, await svc.suggest(String(q)))
  } catch (e) { next(e) }
}
