import { Router } from 'express'
import { get, toggle } from './wishlist.controller'
import { auth } from '../../middleware/auth.middleware'

const r = Router()
r.use(auth)
r.get('/', get)
r.post('/toggle', toggle)
export default r
