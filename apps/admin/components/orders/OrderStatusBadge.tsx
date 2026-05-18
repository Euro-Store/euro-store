import type { OrderStatus } from "@/types"
const MAP: Record<OrderStatus,{ label:string; color:string }> = {
  PENDING:   { label:"معلّق",     color:"#f59e0b" },
  CONFIRMED: { label:"مؤكد",      color:"#0284c7" },
  SHIPPED:   { label:"مشحون",     color:"#d4a017" },
  DELIVERED: { label:"تم التسليم",color:"#16a34a" },
  CANCELLED: { label:"ملغي",      color:"#dc2626" },
}
export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, color } = MAP[status]
  return (
    <span className="px-2 py-0.5 text-xs rounded-full" style={{ background: color+"20", color }}>
      {label}
    </span>
  )
}
