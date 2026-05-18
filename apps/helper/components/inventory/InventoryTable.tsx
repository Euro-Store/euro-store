"use client"
import { useState, useEffect } from "react"
import { Search, Save, AlertTriangle } from "lucide-react"
import type { Product } from "@/types"
import { api } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"

const MOCK: Product[] = [
  { id:"1", name:"بنطلون كلاسيكي أزرق", slug:"p1", price:85000,  stock:24, category:"رجالي", brand:"Zara", status:"ACTIVE",       images:[], createdAt:new Date().toISOString() },
  { id:"2", name:"فستان صيفي منقوش",     slug:"p2", price:120000, stock:3,  category:"نسائي", brand:"H&M",  status:"ACTIVE",       images:[], createdAt:new Date().toISOString() },
  { id:"3", name:"حذاء رياضي أبيض",      slug:"p3", price:150000, stock:0,  category:"أحذية", brand:"Nike", status:"OUT_OF_STOCK", images:[], createdAt:new Date().toISOString() },
  { id:"4", name:"تيشيرت أبيض بسيط",    slug:"p4", price:45000,  stock:52, category:"رجالي", brand:"H&M",  status:"ACTIVE",       images:[], createdAt:new Date().toISOString() },
  { id:"5", name:"حقيبة جلد بني",        slug:"p5", price:200000, stock:2,  category:"شنط",   brand:"Zara", status:"ACTIVE",       images:[], createdAt:new Date().toISOString() },
]

export default function InventoryTable() {
  const [products, setProducts] = useState<Product[]>(MOCK)
  const [edits,    setEdits]    = useState<Record<string,string>>({})
  const [saving,   setSaving]   = useState<Record<string,boolean>>({})
  const [q, setQ]               = useState("")
  const [filter, setFilter]     = useState("ALL")

  useEffect(()=>{ api.get<{ products:Product[] }>("/helper/products").then(d=>setProducts(d.products)).catch(()=>{}) },[])

  const filtered = products.filter(p=>{
    const matchQ = !q || p.name.includes(q) || p.brand.includes(q)
    const matchF = filter==="ALL"||(filter==="LOW"&&p.stock<=5&&p.stock>0)||(filter==="OUT"&&p.stock===0)
    return matchQ && matchF
  })

  async function saveStock(id: string) {
    const n = Number(edits[id])
    if (isNaN(n) || n < 0) return
    setSaving(s=>({ ...s, [id]:true }))
    await api.patch(`/helper/products/${id}/stock`,{ stock:n }).catch(()=>{})
    setProducts(prev=>prev.map(p=>p.id===id?{ ...p, stock:n, status:n===0?"OUT_OF_STOCK":"ACTIVE" }:p))
    setEdits(e=>{ const x={...e}; delete x[id]; return x })
    setSaving(s=>({ ...s, [id]:false }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="بحث عن منتج..."
            className="pl-4 pr-9 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] placeholder-[#666] outline-none focus:border-[#d4a017] w-60" />
        </div>
        <div className="flex gap-1">
          {[{v:"ALL",l:"الكل"},{v:"LOW",l:"منخفض ≤5"},{v:"OUT",l:"نفذ"}].map(f=>(
            <button key={f.v} onClick={()=>setFilter(f.v)}
              className={`px-3 py-1.5 text-xs rounded-lg transition ${filter===f.v?"bg-[#d4a017] text-[#0a0a0a] font-semibold":"bg-[#1a1a1a] text-[#a0a0a0] hover:bg-[#2a2a2a]"}`}>
              {f.l}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#2a2a2a]">
            {["المنتج","الفئة","البراند","السعر","الكمية","تحديث"].map(h=>(
              <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={6} className="text-center py-12 text-[#666]">لا توجد نتائج</td></tr>}
            {filtered.map(p=>(
              <tr key={p.id} className={`border-b border-[#1a1a1a] transition ${p.stock===0?"bg-[#dc262608]":p.stock<=5?"bg-[#f59e0b08]":""}`}>
                <td className="px-4 py-3">
                  <p className="font-medium text-[#f5f5f5]">{p.name}</p>
                  {p.stock===0&&<span className="text-xs text-[#dc2626]">نفذ المخزون</span>}
                  {p.stock>0&&p.stock<=5&&<span className="flex items-center gap-1 text-xs text-[#f59e0b]"><AlertTriangle size={10}/> منخفض</span>}
                </td>
                <td className="px-4 py-3 text-[#a0a0a0]">{p.category}</td>
                <td className="px-4 py-3 text-[#a0a0a0]">{p.brand}</td>
                <td className="px-4 py-3 text-[#f5f5f5]">{formatCurrency(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold text-lg ${p.stock===0?"text-[#dc2626]":p.stock<=5?"text-[#f59e0b]":"text-[#16a34a]"}`}>{p.stock}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input type="number" min="0"
                      value={edits[p.id]??""}
                      onChange={e=>setEdits(prev=>({ ...prev,[p.id]:e.target.value }))}
                      placeholder={String(p.stock)}
                      className="w-20 px-2 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] text-center outline-none focus:border-[#d4a017]" />
                    {edits[p.id]!==undefined&&(
                      <button onClick={()=>saveStock(p.id)} disabled={saving[p.id]}
                        className="p-1.5 bg-[#d4a01720] hover:bg-[#d4a01740] text-[#d4a017] rounded-lg transition disabled:opacity-50">
                        <Save size={14}/>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
