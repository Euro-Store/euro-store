import { Request, Response, NextFunction } from 'express'
import { ReviewsService } from './reviews.service'
import { ok } from '../../utils/response'

const svc = new ReviewsService()

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try { return ok(res, await svc.forProduct(req.params.productId)) } catch (e) { next(e) }
}
export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rating, comment } = req.body
    return ok(res, await svc.add(req.user!.userId, req.params.productId, Number(rating), comment), 'شكراً على تقييمك', 201)
  } catch (e) { next(e) }
}
