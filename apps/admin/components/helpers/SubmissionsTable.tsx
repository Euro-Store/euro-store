"use client"
import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"
import type { HelperSubmission } from "@/types"
import { api } from "@/lib/api"
import { formatDateTime } from "@/lib/utils"

const MOCK: HelperSubmission[] = [
  { id:"1", type:"NEW_PRODUCT", status:"PENDING", productName:"حذاء رياضي نايك أبيض", description:"حذاء رياضي مستورد — مقاسات 40-45", images:[], helper:{ name:"محمد السيد", shopName:"محل النور" }, createdAt: new Date().toISOString() },
  { id:"2", type:"EDIT_PRODUCT",status:"PENDING", productName:"بنطلون أسود كلاسيكي",   description:"تحديث الكمية إلى 30 قطعة",         images:[], helper:{ name:"خالد أحمد", shopName:"متجر الأمل" }, createdAt: new Date(Date.now()-3600000).toISOString() },
]

export default function SubmissionsTable() {
  const [subs, setSubs] = useState<HelperSubmission[]>(MOCK)
  useEffect(()=>{ api.get<{ submissions:HelperSubmission[] }>("/admin/helper-submissions").then(d=>setSubs(d.submissions)).catch(()=>{}) },[])

  async function decide(id: string, approve: boolean) {
    await api.patch(`/admin/helper-submissions/${id}`,{ status: approve?"APPROVED":"REJECTED" }).catch(()=>{})
    setSubs(prev=>prev.map(s=>s.id===id?{ ...s, status: approve?"APPROVED":"REJECTED" }:s))
  }

  const pending = subs.filter(s=>s.status==="PENDING")
  const others  = subs.filter(s=>s.status!=="PENDING")

  return (
    <div className="space-y-6">
      {pending.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[#f59e0b] mb-3">بانتظار الموافقة ({pending.length})</h3>
          <div className="space-y-3">
            {pending.map(s=>(
              <div key={s.id} className="bg-[#121212] border border-[#f59e0b30] rounded-xl p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.type==="NEW_PRODUCT"?"bg-[#0284c720] text-[#0284c7]":"bg-[#d4a01720] text-[#d4a017]"}`}>
                      {s.type==="NEW_PRODUCT"?"منتج جديد":"تعديل منتج"}
                    </span>
                    <span className="text-xs text-[#666]">من: {s.helper.name} — {s.helper.shopName}</span>
                  </div>
                  <p className="font-medium text-[#f5f5f5] mb-1">{s.productName}</p>
                  <p className="text-sm text-[#a0a0a0]">{s.description}</p>
                  <p className="text-xs text-[#666] mt-1">{formatDateTime(s.createdAt)}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={()=>decide(s.id,true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#16a34a20] hover:bg-[#16a34a40] text-[#16a34a] rounded-lg text-xs font-semibold transition">
                    <Check size={12}/> موافقة
                  </button>
                  <button onClick={()=>decide(s.id,false)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#dc262620] hover:bg-[#dc262640] text-[#dc2626] rounded-lg text-xs font-semibold transition">
                    <X size={12}/> رفض
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {others.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[#666] mb-3">المعالجة السابقة</h3>
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[#2a2a2a]">
                {["الهيلبر","المنتج","النوع","القرار","التاريخ"].map(h=>(
                  <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
                ))}
              </tr></thead>
              <tbody>{others.map(s=>(
                <tr key={s.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#f5f5f5]">{s.helper.name}</td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{s.productName}</td>
                  <td className="px-4 py-3 text-xs text-[#666]">{s.type==="NEW_PRODUCT"?"منتج جديد":"تعديل"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.status==="APPROVED"?"bg-[#16a34a20] text-[#16a34a]":"bg-[#dc262620] text-[#dc2626]"}`}>
                      {s.status==="APPROVED"?"مقبول":"مرفوض"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#666]">{formatDateTime(s.createdAt)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
      {subs.length===0 && <p className="text-[#666] text-center py-12">لا توجد اقتراحات</p>}
    </div>
  )
}
