"use client"
import { useState, useEffect } from "react"
import AdminHeader from "@/components/layout/AdminHeader"
import { Plus, Trash2 } from "lucide-react"
import { api } from "@/lib/api"
import type { Brand } from "@/types"

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [name, setName]     = useState("")
  useEffect(()=>{ api.get<{ brands:Brand[] }>("/admin/brands").then(d=>setBrands(d.brands)).catch(()=>{}) },[])
  async function add(e:React.FormEvent) {
    e.preventDefault()
    await api.post("/admin/brands",{ name }).catch(()=>{})
    setName("")
    api.get<{ brands:Brand[] }>("/admin/brands").then(d=>setBrands(d.brands)).catch(()=>{})
  }
  return (
    <div>
      <AdminHeader title="البراندات" subtitle="إدارة الماركات التجارية" />
      <div className="p-6 space-y-6">
        <form onSubmit={add} className="flex gap-3 max-w-sm">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="اسم البراند"
            className="flex-1 px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] outline-none focus:border-[#d4a017]" required />
          <button type="submit" className="flex items-center gap-2 px-4 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition">
            <Plus size={16}/> إضافة
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map(b=>(
            <div key={b.id} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#f5f5f5]">{b.name}</p>
                <p className="text-xs text-[#666] mt-0.5">{b.productsCount} منتج</p>
              </div>
              <button className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#dc2626] transition"><Trash2 size={14}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
