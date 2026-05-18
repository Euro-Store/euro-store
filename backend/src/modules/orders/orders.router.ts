import { Router } from 'express'
import { create, myOrders, myOrder, cancel, adminList, setStatus } from './orders.controller'
import { auth, adminOnly } from '../../middleware/auth.middleware'

const r = Router()
r.use(auth)

// Customer
r.post('/', create)
r.get('/my', myOrders)
r.get('/my/:id', myOrder)
r.patch('/my/:id/cancel', cancel)

// Admin
r.get('/', adminOnly, adminList)
r.patch('/:id/status', adminOnly, setStatus)
export default r
