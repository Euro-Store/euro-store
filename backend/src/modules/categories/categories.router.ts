import { Router } from 'express'
import { all, get, create } from './categories.controller'
import { auth, adminOnly } from '../../middleware/auth.middleware'

const r = Router()
r.get('/', all)
r.get('/:slug', get)
r.post('/', auth, adminOnly, create)
export default r
