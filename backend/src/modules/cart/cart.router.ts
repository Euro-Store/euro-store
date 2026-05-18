import { Router } from 'express'
import { get, add, update, remove, clear } from './cart.controller'
import { auth } from '../../middleware/auth.middleware'

const r = Router()
r.use(auth)
r.get('/', get)
r.post('/items', add)
r.put('/items/:itemId', update)
r.delete('/items/:itemId', remove)
r.delete('/', clear)
export default r
