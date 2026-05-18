import express from "express"
import cors from "cors"
import helmet from "helmet"

const app = express()
const PORT = process.env.PORT || 4000

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Euro Store API is running" })
})

// M4: سيضاف هنا كل الـ routes
// app.use("/api/auth",     authRoutes)
// app.use("/api/products", productRoutes)
// app.use("/api/orders",   orderRoutes)
// app.use("/api/users",    userRoutes)
// app.use("/api/admin",    adminRoutes)

app.listen(PORT, () => {
  console.log("Euro Store API running on port " + PORT)
})
