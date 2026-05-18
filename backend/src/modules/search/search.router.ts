import { Router } from 'express'
import { search, suggest } from './search.controller'

const r = Router()
r.get('/', search)
r.get('/suggest', suggest)
export default r
