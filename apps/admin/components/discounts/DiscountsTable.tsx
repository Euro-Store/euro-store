"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import DiscountTypeBadge from "./DiscountTypeBadge"
import type { Discount } from "@/types"
import { api } from "@/lib/api"
import { formatDate } from "@/lib/utils"

const MOCK: Discount[] = [
  { id:"1", code:"WELCOME20", type:"PERCENTAGE", value:20, maxUses:1000, usedCount:142, isFirstOrder:false, categoryIds:[], isActive:true },
  { id:"2", code:"FIRST50K",  type:"FIXED", value:50000, minOrderAmount:200000, maxUses:undefined, usedCount:8, isFirstOrder:true, categoryIds:[], isActive:true },
  { id:"3", code:"SUMMER15",  type:"PERCENTAGE", value:15, maxUses:500, usedCount:500, isFirstOrder:false, categoryIds:["c1"], isActive:false, expiresAt: new Date().toISOString() },
]

export default function DiscountsTable() {
  const [discounts, setDiscounts] = useState<Discount[]>(MOCK)
  useEffect(()=>{ api.get<{ discounts:Discount[] }>("/admin/discounts").then(d=>setDiscounts(d.discounts)).catch(()=>{}) },[])

  async function toggleActive(id: string, current: boolean) {
    await api.patch(`/admin/discounts/${id}`, { isActive: !current }).catch(()=>{})
    setDiscounts(prev => prev.map(d => d.id===id ? { ...d, isActive:!current } : d))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/dashboard/discounts/new" className="flex items-center gap-2 px-4 py-2 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition">
          <Plus size={16}/> كود خصم جديد
        </Link>
      </div>
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#2a2a2a]">
            {["الكود","النوع","الشروط","الاستخدام","الانتهاء","نشط","إجراءات"].map(h=>(
              <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {discounts.map(d=>(
              <tr key={d.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">
                <td className="px-4 py-3 font-mono text-[#d4a017] font-bold">{d.code}</td>
                <td className="px-4 py-3"><DiscountTypeBadge type={d.type} value={d.value}/></td>
                <td className="px-4 py-3 text-xs text-[#a0a0a0]">
                  {d.isFirstOrder && <span className="block">أول طلب فقط</span>}
                  {d.minOrderAmount && <span className="block">فوق {d.minOrderAmount.toLocaleString("ar")} ل.س</span>}
                  {d.categoryIds.length>0 && <span className="block">فئات محددة</span>}
                  {!d.isFirstOrder && !d.minOrderAmount && d.categoryIds.length===0 && <span>عام</span>}
                </td>
                <td className="px-4 py-3 text-[#a0a0a0]">
                  {d.usedCount}{d.maxUses ? ` / ${d.maxUses}` : ""}
                  {d.maxUses && <div className="w-20 h-1 bg-[#2a2a2a] rounded mt-1"><div className="h-1 bg-[#d4a017] rounded" style={{ width:`${Math.min(100,(d.usedCount/d.maxUses)*100)}%` }}/></div>}
                </td>
                <td className="px-4 py-3 text-xs text-[#666]">{d.expiresAt ? formatDate(d.expiresAt) : "—"}</td>
                <td className="px-4 py-3">
                  <button onClick={()=>toggleActive(d.id,d.isActive)} className="text-[#a0a0a0] hover:text-[#d4a017] transition">
                    {d.isActive ? <ToggleRight size={20} className="text-[#16a34a]"/> : <ToggleLeft size={20}/>}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={async()=>{ await api.delete(`/admin/discounts/${d.id}`).catch(()=>{}); setDiscounts(prev=>prev.filter(x=>x.id!==d.id)) }}
                    className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#dc2626] transition">
                    <Trash2 size={14}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
