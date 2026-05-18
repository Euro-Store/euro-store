import { Response } from 'express'

export interface Meta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export const ok = <T>(res: Response, data: T, message?: string, status = 200, meta?: Meta) =>
  res.status(status).json({ success: true, data, message, meta })

export const fail = (res: Response, error: string, status = 400) =>
  res.status(status).json({ success: false, error })
