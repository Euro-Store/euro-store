import jwt from 'jsonwebtoken'

export interface TokenPayload { userId: string; role: string }

const secret = () => process.env.JWT_SECRET!
const refresh = () => process.env.JWT_REFRESH_SECRET!

export const signAccess = (p: TokenPayload) =>
  jwt.sign(p, secret(), { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any })

export const signRefresh = (p: TokenPayload) =>
  jwt.sign(p, refresh(), { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any })

export const verifyAccess = (token: string) => jwt.verify(token, secret()) as TokenPayload
export const verifyRefresh = (token: string) => jwt.verify(token, refresh()) as TokenPayload
