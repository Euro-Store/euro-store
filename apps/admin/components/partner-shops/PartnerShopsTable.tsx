"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, ToggleRight, ToggleLeft } from "lucide-react"
import type { PartnerShop } from "@/types"
import { api } from "@/lib/api"
import { formatDate } from "@/lib/utils"

const MOCK: PartnerShop[] = [
  { id:"1", name:"محل النور",     address:"شارع العدوي",  phone:"0111111111", managerName:"أبو محمد",  city:"حمص",  isActive:true,  createdAt:new Date().toISOString() },
  { id:"2", name:"متجر الأمل",   address:"ساحة الساعة",  phone:"0122222222", managerName:"أبو خالد",  city:"دمشق", isActive:true,  createdAt:new Date().toISOString() },
  { id:"3", name:"بوتيك الموضة", address:"شارع القوتلي", phone:"0133333333", managerName:"أبو يوسف",  city:"حلب",  isActive:false, createdAt:new Date().toISOString() },
]
export default function PartnerShopsTable() {
  const [shops, setShops] = useState<PartnerShop[]>(MOCK)
  useEffect(()=>{ api.get<{ shops:PartnerShop[] }>("/admin/partner-shops").then(d=>setShops(d.shops)).catch(()=>{}) },[])
  async function toggle(id:string,cur:boolean){ await api.patch(`/admin/partner-shops/${id}`,{isActive:!cur}).catch(()=>{}); setShops(p=>p.map(s=>s.id===id?{...s,isActive:!cur}:s)) }
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/dashboard/partner-shops/new" className="flex items-center gap-2 px-4 py-2 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition">
          <Plus size={16}/> محل شريك جديد
        </Link>
      </div>
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#2a2a2a]">
            {["اسم المحل","المدينة","المدير","الهاتف","تاريخ الانضمام","نشط"].map(h=>(
              <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
            ))}
          </tr></thead>
          <tbody>{shops.map(s=>(
            <tr key={s.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">
              <td className="px-4 py-3"><div className="font-medium text-[#f5f5f5]">{s.name}</div><div className="text-xs text-[#666]">{s.address}</div></td>
              <td className="px-4 py-3 text-[#a0a0a0]">{s.city}</td>
              <td className="px-4 py-3 text-[#a0a0a0]">{s.managerName}</td>
              <td className="px-4 py-3 text-[#a0a0a0]">{s.phone}</td>
              <td className="px-4 py-3 text-xs text-[#666]">{formatDate(s.createdAt)}</td>
              <td className="px-4 py-3">
                <button onClick={()=>toggle(s.id,s.isActive)}>
                  {s.isActive?<ToggleRight size={22} className="text-[#16a34a]"/>:<ToggleLeft size={22} className="text-[#666]"/>}
                </button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
