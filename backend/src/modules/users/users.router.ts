import { Router } from 'express'
import { addresses, addAddress, updateAddress, deleteAddress, updateProfile, changePassword } from './users.controller'
import { auth } from '../../middleware/auth.middleware'

const r = Router()
r.use(auth)
r.get('/addresses', addresses)
r.post('/addresses', addAddress)
r.put('/addresses/:id', updateAddress)
r.delete('/addresses/:id', deleteAddress)
r.patch('/profile', updateProfile)
r.patch('/password', changePassword)
export default r
