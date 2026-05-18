import { Router } from 'express'
import { list, add } from './reviews.controller'
import { auth } from '../../middleware/auth.middleware'

const r = Router({ mergeParams: true })
r.get('/', list)
r.post('/', auth, add)
export default r
