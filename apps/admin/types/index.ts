export type OrderStatus   = "PENDING"|"CONFIRMED"|"SHIPPED"|"DELIVERED"|"CANCELLED"
export type ExchangeStatus= "REQUESTED"|"CONFIRMED_BY_SHOP"|"PROCESSING"|"COMPLETED"|"REJECTED"
export type DiscountType  = "PERCENTAGE"|"FIXED"
export type ProductStatus = "ACTIVE"|"DRAFT"|"OUT_OF_STOCK"

export interface Product {
  id: string; name: string; slug: string; price: number; salePrice?: number
  stock: number; category: string; brand: string; status: ProductStatus
  images: string[]; createdAt: string
}
export interface Order {
  id: string; orderNumber: string; status: OrderStatus; total: number
  customer: { name: string; email: string; phone: string }
  items: { productId: string; name: string; quantity: number; price: number; size: string }[]
  address: string; discountCode?: string; loyaltyPointsUsed?: number; createdAt: string
}
export interface Customer {
  id: string; name: string; email: string; phone: string
  totalOrders: number; totalSpent: number; loyaltyPoints: number; createdAt: string
}
export interface Category  { id: string; name: string; slug: string; parentId?: string; productsCount: number }
export interface Brand     { id: string; name: string; slug: string; logo?: string; productsCount: number }
export interface Exchange {
  id: string; orderNumber: string; status: ExchangeStatus; qrCode: string
  customer: { name: string; phone: string }
  items: { name: string; size: string; image?: string }[]
  partnerShop?: string; helperName?: string; createdAt: string
}
export interface LoyaltyTransaction {
  id: string; type: "EARN"|"REDEEM"; points: number; description: string
  customer: { name: string; email: string }; createdAt: string
}
export interface LoyaltySettings {
  pointsPerUnit: number; unitValue: number; minRedeemPoints: number
  pointsExpireDays: number; maxRedeemPercentage: number
}
export interface Discount {
  id: string; code: string; type: DiscountType; value: number
  minOrderAmount?: number; maxUses?: number; usedCount: number
  isFirstOrder: boolean; categoryIds: string[]; isActive: boolean; expiresAt?: string
}
export interface Helper {
  id: string; name: string; email: string; phone: string
  shopName: string; shopAddress: string; isActive: boolean; createdAt: string
}
export interface PartnerShop {
  id: string; name: string; address: string; phone: string
  managerName: string; city: string; isActive: boolean; createdAt: string
}
export interface HelperSubmission {
  id: string; type: "NEW_PRODUCT"|"EDIT_PRODUCT"; status: "PENDING"|"APPROVED"|"REJECTED"
  productName: string; description: string; images: string[]
  helper: { name: string; shopName: string }; createdAt: string
}
export interface DashboardStats {
  totalRevenue: number; totalOrders: number; totalCustomers: number; totalProducts: number
  revenueChange: number; ordersChange: number; customersChange: number; pendingOrders: number
  revenueChart: { month: string; revenue: number }[]
  ordersChart:  { day: string; orders: number }[]
}
