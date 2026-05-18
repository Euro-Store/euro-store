import { z } from 'zod'

export const RegisterDto = z.object({
  phone: z.string().min(9).max(15),
  password: z.string().min(8, 'كلمة المرور 8 أحرف على الأقل'),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email().optional(),
})

export const LoginDto = z.object({
  phone: z.string().min(9),
  password: z.string().min(1),
})

export type RegisterInput = z.infer<typeof RegisterDto>
export type LoginInput = z.infer<typeof LoginDto>
