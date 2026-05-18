// Euro Store — Shared TypeScript Types v5

// ─── API Response ─────────────────────────────────────────────────────────

export interface ApiResponse<T = void> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pages: number
  limit: number
}

// ─── Auth ─────────────────────────────────────────────────────────────────

export type UserRole = 'CUSTOMER' | 'HELPER' | 'ADMIN'

export interface AuthUser {
  id: string
  email: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  role: UserRole
  loyaltyPoints: number
  loyaltyQrCode: string
}

// ─── Product ──────────────────────────────────────────────────────────────

export interface ProductCard {
  id: string
  slug: string
  nameAr: string
  nameEn: string
  price: number
  salePrice?: number | null
  images: string[]
  sizes: string[]
  colors: string[]
  colorHexes: string[]
  stock: number
  isFeatured: boolean
  category: { slug: string; nameAr: string }
  brand?: { slug: string; nameAr: string } | null
}

export interface ProductDetail extends ProductCard {
  descriptionAr?: string | null
  descriptionEn?: string | null
  tags: string[]
  salesCount: number
  reviews: ReviewSummary
}

export interface ReviewSummary {
  avgRating: number
  count: number
}

// ─── Cart ─────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string
  slug: string
  nameAr: string
  image: string
  price: number
  salePrice?: number | null
  size?: string
  color?: string
  qty: number
}

// ─── Order ────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'PENDING' | 'CONFIRMED' | 'PROCESSING'
  | 'SHIPPED'  | 'DELIVERED' | 'CANCELLED'

export type PaymentMethod = 'CASH_ON_DELIVERY' | 'SHAM_CASH' | 'CARD'

export interface OrderSummary {
  id: string
  status: OrderStatus
  total: number
  itemsCount: number
  createdAt: string
  paymentMethod: PaymentMethod
}

// ─── Discount ─────────────────────────────────────────────────────────────

export type DiscountType = 'PERCENTAGE' | 'FIXED'

export interface DiscountValidation {
  valid: boolean
  code?: string
  type?: DiscountType
  value?: number
  discountAmount?: number
  error?: string
}

// ─── Loyalty ──────────────────────────────────────────────────────────────

export interface LoyaltyStatus {
  points: number
  qrCode: string
  pointValueSyp: number  // قيمة النقطة الواحدة بالليرة
  maxRedeemPercent: number
}

// ─── Exchange ─────────────────────────────────────────────────────────────

export type ExchangeStatus =
  | 'REQUESTED' | 'QR_GENERATED' | 'RECEIVED_BY_HELPER'
  | 'PROCESSING' | 'SHIPPED'     | 'COMPLETED' | 'REJECTED'

export interface ExchangeRequestSummary {
  id: string
  status: ExchangeStatus
  qrCode?: string | null
  itemsCount: number
  createdAt: string
}

// ─── Filters (PLP) ────────────────────────────────────────────────────────

export interface ProductFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  size?: string
  color?: string
  onSale?: boolean
  sort?: 'newest' | 'popular' | 'priceAsc' | 'priceDesc'
  page?: number
  limit?: number
  q?: string
}
