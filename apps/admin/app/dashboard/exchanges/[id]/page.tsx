"use client"
import { useEffect, useState } from "react"
import AdminHeader from "@/components/layout/AdminHeader"
import ExchangeStatusBadge from "@/components/exchanges/ExchangeStatusBadge"
import type { Exchange, ExchangeStatus } from "@/types"
import { api } from "@/lib/api"
import { formatDateTime } from "@/lib/utils"

export default function ExchangeDetailPage({ params }: { params: { id: string } }) {
  const [ex, setEx]   = useState<Exchange|null>(null)
  const [updating, setUpdating] = useState(false)
  useEffect(()=>{ api.get<Exchange>(`/admin/exchanges/${params.id}`).then(setEx).catch(()=>{}) },[params.id])

  async function updateStatus(status: ExchangeStatus) {
    setUpdating(true)
    await api.patch(`/admin/exchanges/${params.id}/status`,{ status }).catch(()=>{})
    if (ex) setEx({ ...ex, status })
    setUpdating(false)
  }

  if (!ex) return (
    <div><AdminHeader title="تفاصيل طلب الاستبدال" />
      <div className="p-6 text-[#666]">جارٍ التحميل...</div></div>
  )

  return (
    <div>
      <AdminHeader title={`استبدال — طلب #${ex.orderNumber}`} />
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#d4a017]">معلومات الطلب</h3>
            <div className="flex justify-between"><span className="text-[#a0a0a0] text-sm">الحالة</span><ExchangeStatusBadge status={ex.status} /></div>
            <div className="flex justify-between"><span className="text-[#a0a0a0] text-sm">العميل</span><span className="text-sm text-[#f5f5f5]">{ex.customer.name}</span></div>
            <div className="flex justify-between"><span className="text-[#a0a0a0] text-sm">الهاتف</span><span className="text-sm text-[#f5f5f5]">{ex.customer.phone}</span></div>
            <div className="flex justify-between"><span className="text-[#a0a0a0] text-sm">المحل</span><span className="text-sm text-[#f5f5f5]">{ex.partnerShop||"لم يُحدد"}</span></div>
            <div className="flex justify-between"><span className="text-[#a0a0a0] text-sm">التاريخ</span><span className="text-xs text-[#666]">{formatDateTime(ex.createdAt)}</span></div>
          </div>
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[#d4a017] mb-4">تحديث الحالة</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["PROCESSING","COMPLETED","REJECTED"] as ExchangeStatus[]).map(s => (
                <button key={s} onClick={()=>updateStatus(s)} disabled={updating||ex.status===s}
                  className="px-3 py-2 text-xs rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#a0a0a0] disabled:opacity-40 transition">
                  {s==="PROCESSING"?"جارٍ المعالجة":s==="COMPLETED"?"مكتمل":"مرفوض"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#d4a017] mb-4">المنتجات ({ex.items.length})</h3>
          {ex.items.map((item,i)=>(
            <div key={i} className="flex justify-between py-2 border-b border-[#1a1a1a] last:border-0 text-sm">
              <span className="text-[#f5f5f5]">{item.name}</span>
              <span className="text-[#a0a0a0]">مقاس: {item.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
