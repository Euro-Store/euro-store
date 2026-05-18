"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, Search } from "lucide-react"
import type { Exchange, ExchangeStatus } from "@/types"
import { api } from "@/lib/api"
import { formatDateTime } from "@/lib/utils"

const ST: Record<ExchangeStatus,{ label:string; color:string }> = {
  REQUESTED:         { label:"بانتظار الاستلام", color:"#f59e0b" },
  CONFIRMED_BY_SHOP: { label:"تم الاستلام",      color:"#0284c7" },
  PROCESSING:        { label:"جارٍ المعالجة",    color:"#d4a017" },
  COMPLETED:         { label:"مكتمل",            color:"#16a34a" },
  REJECTED:          { label:"مرفوض",            color:"#dc2626" },
}

const MOCK: Exchange[] = [
  { id:"1", orderNumber:"1030", status:"REQUESTED", qrCode:"QR-001",
    customer:{ name:"أحمد محمد", phone:"0901234567" },
    items:[{ name:"بنطلون أزرق كلاسيكي", size:"L" },{ name:"تيشيرت أبيض", size:"M" }],
    createdAt:new Date().toISOString() },
  { id:"2", orderNumber:"1025", status:"REQUESTED", qrCode:"QR-002",
    customer:{ name:"سارة خالد", phone:"0907654321" },
    items:[{ name:"فستان منقوش", size:"M" }],
    createdAt:new Date(Date.now()-3600000).toISOString() },
  { id:"3", orderNumber:"1018", status:"CONFIRMED_BY_SHOP", qrCode:"QR-003",
    customer:{ name:"محمود علي", phone:"0931111111" },
    items:[{ name:"حذاء رياضي أبيض", size:"42" }],
    createdAt:new Date(Date.now()-86400000).toISOString() },
]

export default function ExchangeScanner() {
  const [exchanges, setExchanges] = useState<Exchange[]>(MOCK)
  const [filter, setFilter]       = useState("REQUESTED")
  const [q, setQ]                 = useState("")

  useEffect(()=>{ api.get<{ exchanges:Exchange[] }>("/helper/exchanges").then(d=>setExchanges(d.exchanges)).catch(()=>{}) },[])

  const filtered = exchanges.filter(e=>{
    const matchQ = !q||e.orderNumber.includes(q)||e.customer.name.includes(q)
    const matchF = filter==="ALL"||e.status===filter
    return matchQ && matchF
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="رقم الطلب أو اسم الزبون..."
            className="pl-4 pr-9 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] placeholder-[#666] outline-none focus:border-[#d4a017] w-64" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {[{v:"ALL",l:"الكل"},{v:"REQUESTED",l:"بانتظار الاستلام"},{v:"CONFIRMED_BY_SHOP",l:"تم الاستلام"},{v:"COMPLETED",l:"مكتمل"}].map(f=>(
            <button key={f.v} onClick={()=>setFilter(f.v)}
              className={`px-3 py-1.5 text-xs rounded-lg transition ${filter===f.v?"bg-[#d4a017] text-[#0a0a0a] font-semibold":"bg-[#1a1a1a] text-[#a0a0a0] hover:bg-[#2a2a2a]"}`}>
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {filter==="REQUESTED"&&filtered.length>0&&(
        <div className="bg-[#f59e0b10] border border-[#f59e0b30] rounded-xl px-4 py-3 text-sm text-[#f59e0b]">
          {filtered.length} طلب استبدال ينتظر تأكيد الاستلام منك
        </div>
      )}

      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#2a2a2a]">
            {["رقم الطلب","الزبون","المنتجات","الحالة","التاريخ","تفاصيل"].map(h=>(
              <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={6} className="text-center py-12 text-[#666]">لا توجد طلبات</td></tr>}
            {filtered.map(e=>{
              const st = ST[e.status]
              return (
                <tr key={e.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition">
                  <td className="px-4 py-3 font-mono text-[#d4a017]">#{e.orderNumber}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#f5f5f5]">{e.customer.name}</div>
                    <div className="text-xs text-[#666]">{e.customer.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-[#a0a0a0] text-xs max-w-[160px] truncate">{e.items.map(i=>`${i.name} (${i.size})`).join("، ")}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs rounded-full" style={{ background:st.color+"20",color:st.color }}>{st.label}</span></td>
                  <td className="px-4 py-3 text-[#666] text-xs">{formatDateTime(e.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/exchanges/${e.id}`} className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#d4a017] transition inline-flex">
                      <Eye size={14}/>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
