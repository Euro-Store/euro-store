import rateLimit from 'express-rate-limit'

export const generalLimit = rateLimit({
  windowMs: 15 * 60 * 1000, max: 300,
  message: { success: false, error: 'طلبات كثيرة — حاول لاحقاً' },
  standardHeaders: true, legacyHeaders: false,
})

export const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  message: { success: false, error: 'محاولات كثيرة — حاول بعد 15 دقيقة' },
  standardHeaders: true, legacyHeaders: false,
})
