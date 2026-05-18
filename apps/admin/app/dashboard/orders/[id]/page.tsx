"use client"
import { useEffect, useState } from "react"
import AdminHeader from "@/components/layout/AdminHeader"
import OrderStatusBadge from "@/components/orders/OrderStatusBadge"
import OrderTimeline from "@/components/orders/OrderTimeline"
import type { Order } from "@/types"
import { api } from "@/lib/api"
import { formatCurrency, formatDateTime } from "@/lib/utils"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order|null>(null)
  useEffect(() => {
    api.get<Order>(`/admin/orders/${params.id}`).then(setOrder).catch(()=>{})
  }, [params.id])

  if (!order) return (
    <div><AdminHeader title="تفاصيل الطلب" />
      <div className="p-6 text-[#666]">جارٍ التحميل...</div></div>
  )

  return (
    <div>
      <AdminHeader title={`طلب #${order.orderNumber}`} subtitle={formatDateTime(order.createdAt)} />
      <div className="p-6 space-y-5">
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
          <OrderTimeline currentStatus={order.status} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#d4a017]">معلومات العميل</h3>
            <p className="text-sm text-[#f5f5f5]">{order.customer.name}</p>
            <p className="text-sm text-[#a0a0a0]">{order.customer.email}</p>
            <p className="text-sm text-[#a0a0a0]">{order.customer.phone}</p>
            <p className="text-sm text-[#a0a0a0]">{order.address}</p>
          </div>
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#d4a017]">ملخص الطلب</h3>
            <div className="flex justify-between text-sm">
              <span className="text-[#a0a0a0]">الحالة</span>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#a0a0a0]">الإجمالي</span>
              <span className="text-[#f5f5f5] font-semibold">{formatCurrency(order.total)}</span>
            </div>
            {order.discountCode && (
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">كود الخصم</span>
                <span className="text-[#d4a017] font-mono">{order.discountCode}</span>
              </div>
            )}
            {order.loyaltyPointsUsed ? (
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">نقاط مستخدمة</span>
                <span className="text-[#f2c94c]">{order.loyaltyPointsUsed} نقطة</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#d4a017] mb-4">المنتجات ({order.items.length})</h3>
          {order.items.length === 0 ? <p className="text-[#666] text-sm">لا توجد عناصر</p> : (
            <div className="space-y-3">
              {order.items.map((item,i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#1a1a1a] last:border-0">
                  <div>
                    <p className="text-sm text-[#f5f5f5]">{item.name}</p>
                    <p className="text-xs text-[#666]">المقاس: {item.size} — الكمية: {item.quantity}</p>
                  </div>
                  <span className="text-sm text-[#f5f5f5]">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
