import { Router } from 'express'
import { register, login, refresh, logout, profile } from './auth.controller'
import { auth } from '../../middleware/auth.middleware'
import { validate } from '../../middleware/validate.middleware'
import { authLimit } from '../../middleware/rateLimit.middleware'
import { RegisterDto, LoginDto } from './auth.types'

const r = Router()
r.post('/register', authLimit, validate(RegisterDto), register)
r.post('/login', authLimit, validate(LoginDto), login)
r.post('/refresh', refresh)
r.post('/logout', auth, logout)
r.get('/profile', auth, profile)
export default r
