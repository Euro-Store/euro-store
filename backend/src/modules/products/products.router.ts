import { Router } from 'express'
import { list, get, create, update, remove } from './products.controller'
import { auth, adminOnly } from '../../middleware/auth.middleware'

const r = Router()
r.get('/', list)
r.get('/:slug', get)
r.post('/', auth, adminOnly, create)
r.put('/:id', auth, adminOnly, update)
r.delete('/:id', auth, adminOnly, remove)
export default r
