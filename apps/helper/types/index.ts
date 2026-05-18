export type ExchangeStatus = "REQUESTED"|"CONFIRMED_BY_SHOP"|"PROCESSING"|"COMPLETED"|"REJECTED"
export type ProductStatus  = "ACTIVE"|"DRAFT"|"OUT_OF_STOCK"

export interface Product {
  id: string; name: string; slug: string; price: number; salePrice?: number
  stock: number; category: string; brand: string; status: ProductStatus
  images: string[]; createdAt: string
}
export interface Exchange {
  id: string; orderNumber: string; status: ExchangeStatus; qrCode: string
  customer: { name: string; phone: string }
  items: { name: string; size: string; image?: string }[]
  partnerShop?: string; helperName?: string; createdAt: string
}
export interface HelperSubmission {
  id: string; type: "NEW_PRODUCT"|"EDIT_PRODUCT"; status: "PENDING"|"APPROVED"|"REJECTED"
  productName: string; description: string; images: string[]
  helper: { name: string; shopName: string }; createdAt: string
}
export interface HelperProfile {
  id: string; name: string; email: string; phone: string
  shopName: string; shopAddress: string
}
