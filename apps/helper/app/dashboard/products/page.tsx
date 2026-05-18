"use client"
import { useState, useEffect } from "react"
import HelperHeader from "@/components/layout/HelperHeader"
import Link from "next/link"
import { Plus } from "lucide-react"
import type { HelperSubmission } from "@/types"
import { api } from "@/lib/api"
import { formatDateTime } from "@/lib/utils"

const MOCK: HelperSubmission[] = [
  { id:"1", type:"NEW_PRODUCT",  status:"PENDING",  productName:"حذاء رياضي نايك أبيض", description:"مقاسات 40-45", images:[], helper:{ name:"أنت", shopName:"محلك" }, createdAt:new Date().toISOString() },
  { id:"2", type:"EDIT_PRODUCT", status:"APPROVED", productName:"بنطلون أسود كلاسيكي",  description:"تحديث الكمية", images:[], helper:{ name:"أنت", shopName:"محلك" }, createdAt:new Date(Date.now()-86400000).toISOString() },
  { id:"3", type:"NEW_PRODUCT",  status:"REJECTED", productName:"ساعة جلدية",            description:"بناءً على طلب زبائن", images:[], helper:{ name:"أنت", shopName:"محلك" }, createdAt:new Date(Date.now()-2*86400000).toISOString() },
]

const ST: Record<string,{ label:string; color:string }> = {
  PENDING:  { label:"بانتظار المراجعة", color:"#f59e0b" },
  APPROVED: { label:"مقبول ✓",          color:"#16a34a" },
  REJECTED: { label:"مرفوض",            color:"#dc2626" },
}

export default function ProductsPage() {
  const [subs, setSubs] = useState<HelperSubmission[]>(MOCK)
  useEffect(()=>{ api.get<{ submissions:HelperSubmission[] }>("/helper/submissions").then(d=>setSubs(d.submissions)).catch(()=>{}) },[])
  const pending = subs.filter(s=>s.status==="PENDING").length
  return (
    <div>
      <HelperHeader title="اقتراحاتي" subtitle="متابعة طلبات الإضافة والتعديل" />
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          {pending>0&&<div className="text-sm text-[#f59e0b] bg-[#f59e0b10] border border-[#f59e0b30] px-3 py-2 rounded-lg">{pending} اقتراح بانتظار رد الأدمن</div>}
          <Link href="/dashboard/products/new" className="flex items-center gap-2 px-4 py-2 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition mr-auto">
            <Plus size={16}/> اقتراح جديد
          </Link>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#2a2a2a]">
              {["المنتج","النوع","الحالة","التاريخ"].map(h=>(
                <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {subs.length===0&&<tr><td colSpan={4} className="text-center py-12 text-[#666]">لا توجد اقتراحات بعد</td></tr>}
              {subs.map(s=>{
                const st = ST[s.status]
                return (
                  <tr key={s.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#f5f5f5]">{s.productName}</p>
                      <p className="text-xs text-[#666] mt-0.5 max-w-[200px] truncate">{s.description}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${s.type==="NEW_PRODUCT"?"bg-[#0284c720] text-[#0284c7]":"bg-[#d4a01720] text-[#d4a017]"}`}>
                        {s.type==="NEW_PRODUCT"?"منتج جديد":"تعديل"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background:st.color+"20", color:st.color }}>{st.label}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#666]">{formatDateTime(s.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
