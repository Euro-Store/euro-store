// Euro Store — Shared TypeScript Types
// مشترك بين Web + Mobile + Admin + Backend

export interface Product {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  descriptionAr?: string
  descriptionEn?: string
  categoryId: string
  brand?: string
  basePrice: number
  salePrice?: number
  isFeatured: boolean
  isActive: boolean
  variants: ProductVariant[]
  images: ProductImage[]
}

export interface ProductVariant {
  id: string
  productId: string
  color?: string
  size?: string
  sku: string
  stockQty: number
  priceOverride?: number
}

export interface ProductImage {
  id: string
  url: string
  altText?: string
  isPrimary: boolean
  sortOrder: number
}

export interface Category {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  parentId?: string
  imageUrl?: string
  children?: Category[]
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  subtotal: number
  shippingFee: number
  total: number
  paymentMethod: "CASH_ON_DELIVERY"
  items: OrderItem[]
  createdAt: string
}

export interface OrderItem {
  id: string
  productName: string
  unitPrice: number
  quantity: number
  totalPrice: number
}

export interface User {
  id: string
  name: string
  phone: string
  email?: string
  role: "CUSTOMER" | "ADMIN" | "STAFF"
}

export interface Address {
  id: string
  fullName: string
  phone: string
  governorate: string
  city: string
  street: string
  isDefault: boolean
}

export interface CartItem {
  variantId: string
  productId: string
  productName: string
  image: string
  color?: string
  size?: string
  price: number
  quantity: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  meta?: { total?: number; page?: number; limit?: number }
}

export interface ApiError {
  success: false
  error: string
  code: string
}
