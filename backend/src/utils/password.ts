import bcrypt from 'bcryptjs'
export const hash = (pw: string) => bcrypt.hash(pw, 12)
export const compare = (pw: string, h: string) => bcrypt.compare(pw, h)
