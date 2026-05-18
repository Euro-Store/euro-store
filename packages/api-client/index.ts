// Euro Store API Client — مشترك بين Web + Mobile
import axios from "axios"

const API_BASE = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:4000/api"

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
})

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("euro_token") : null
  if (token) config.headers.Authorization = "Bearer " + token
  return config
})

// M5: ستضاف هنا كل الدوال
// export * from "./endpoints/products"
// export * from "./endpoints/orders"
// export * from "./endpoints/auth"

export default apiClient
