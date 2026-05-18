import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

export class AppError extends Error {
  constructor(public message: string, public statusCode = 400) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERR] ${req.method} ${req.path}:`, err.message)

  if (err instanceof AppError)
    return res.status(err.statusCode).json({ success: false, error: err.message })

  if (err instanceof ZodError)
    return res.status(400).json({ success: false, error: 'بيانات غير صحيحة', details: err.flatten().fieldErrors })

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') return res.status(409).json({ success: false, error: 'هذا السجل موجود مسبقاً' })
    if (err.code === 'P2025') return res.status(404).json({ success: false, error: 'السجل غير موجود' })
  }

  return res.status(500).json({ success: false, error: 'خطأ في الخادم' })
}

export const notFound = (req: Request, res: Response) =>
  res.status(404).json({ success: false, error: `المسار غير موجود: ${req.path}` })
