"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import HelperHeader from "@/components/layout/HelperHeader"
import type { Exchange, ExchangeStatus } from "@/types"
import { api } from "@/lib/api"
import { formatDateTime } from "@/lib/utils"
import { CheckCircle, XCircle, Package } from "lucide-react"

const MOCK: Exchange = {
  id:"1", orderNumber:"1030", status:"REQUESTED", qrCode:"QR-001",
  customer:{ name:"أحمد محمد", phone:"0901234567" },
  items:[{ name:"بنطلون أزرق كلاسيكي", size:"L" },{ name:"تيشيرت أبيض", size:"M" }],
  createdAt:new Date().toISOString()
}

export default function ExchangeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ex, setEx]             = useState<Exchange|null>(null)
  const [updating, setUpdating] = useState(false)
  const [done, setDone]         = useState<"confirmed"|"rejected"|null>(null)

  useEffect(()=>{ api.get<Exchange>(`/helper/exchanges/${params.id}`).then(setEx).catch(()=>setEx(MOCK)) },[params.id])

  async function act(status: ExchangeStatus) {
    if (!ex) return
    setUpdating(true)
    await api.patch(`/helper/exchanges/${params.id}/status`,{ status }).catch(()=>{})
    setEx({ ...ex, status })
    setDone(status==="CONFIRMED_BY_SHOP"?"confirmed":"rejected")
    setUpdating(false)
    setTimeout(()=>router.push("/dashboard/exchanges"), 2000)
  }

  if (!ex) return (<div><HelperHeader title="تفاصيل الاستبدال" /><div className="p-6 text-[#666]">جارٍ التحميل...</div></div>)

  return (
    <div>
      <HelperHeader title={`استبدال #${ex.orderNumber}`} subtitle={formatDateTime(ex.createdAt)} />
      <div className="p-6 space-y-5 max-w-2xl">
        {done==="confirmed"&&<div className="bg-[#16a34a15] border border-[#16a34a40] rounded-xl px-4 py-3 text-sm text-[#16a34a] flex items-center gap-2"><CheckCircle size={16}/> تم تأكيد الاستلام بنجاح</div>}
        {done==="rejected"&&<div className="bg-[#dc262615] border border-[#dc262640] rounded-xl px-4 py-3 text-sm text-[#dc2626] flex items-center gap-2"><XCircle size={16}/> تم رفض طلب الاستبدال</div>}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-[#d4a017]">معلومات الزبون</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-xs text-[#666]">الاسم</p><p className="text-[#f5f5f5] font-medium">{ex.customer.name}</p></div>
            <div><p className="text-xs text-[#666]">الهاتف</p><p className="text-[#f5f5f5] font-medium">{ex.customer.phone}</p></div>
          </div>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#d4a017] mb-4 flex items-center gap-2"><Package size={14}/> المنتجات ({ex.items.length})</h3>
          <div className="space-y-2">
            {ex.items.map((item,i)=>(
              <div key={i} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                <div><p className="text-sm font-medium text-[#f5f5f5]">{item.name}</p><p className="text-xs text-[#666]">المقاس: {item.size}</p></div>
              </div>
            ))}
          </div>
        </div>
        {ex.status==="REQUESTED"&&!done&&(
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5">
            <p className="text-xs text-[#a0a0a0] mb-4">تأكد من فحص المنتجات قبل التأكيد</p>
            <div className="flex gap-3">
              <button onClick={()=>act("CONFIRMED_BY_SHOP")} disabled={updating}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-lg text-sm font-semibold transition disabled:opacity-50">
                <CheckCircle size={16}/> تأكيد الاستلام
              </button>
              <button onClick={()=>act("REJECTED")} disabled={updating}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#dc262620] text-[#dc2626] rounded-lg text-sm font-semibold transition disabled:opacity-50">
                <XCircle size={16}/> رفض
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
