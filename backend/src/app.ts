import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { errorHandler, notFound } from './middleware/error.middleware'
import { generalLimit } from './middleware/rateLimit.middleware'

import authRouter from './modules/auth/auth.router'
import productsRouter from './modules/products/products.router'
import categoriesRouter from './modules/categories/categories.router'
import brandsRouter from './modules/brands/brands.router'
import cartRouter from './modules/cart/cart.router'
import wishlistRouter from './modules/wishlist/wishlist.router'
import ordersRouter from './modules/orders/orders.router'
import reviewsRouter from './modules/reviews/reviews.router'
import searchRouter from './modules/search/search.router'
import usersRouter from './modules/users/users.router'

const app = express()

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}))
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use('/api', generalLimit)

app.get('/health', (_, res) =>
  res.json({ status: 'ok', env: process.env.NODE_ENV, time: new Date().toISOString() })
)

const V1 = '/api/v1'
app.use(`${V1}/auth`, authRouter)
app.use(`${V1}/products`, productsRouter)
app.use(`${V1}/products/:productId/reviews`, reviewsRouter)
app.use(`${V1}/categories`, categoriesRouter)
app.use(`${V1}/brands`, brandsRouter)
app.use(`${V1}/cart`, cartRouter)
app.use(`${V1}/wishlist`, wishlistRouter)
app.use(`${V1}/orders`, ordersRouter)
app.use(`${V1}/search`, searchRouter)
app.use(`${V1}/users`, usersRouter)

app.use(notFound)
app.use(errorHandler)

export default app
