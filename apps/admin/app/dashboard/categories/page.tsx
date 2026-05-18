"use client"
import { useState, useEffect } from "react"
import AdminHeader from "@/components/layout/AdminHeader"
import { Plus, Edit, Trash2 } from "lucide-react"
import { api } from "@/lib/api"
import type { Category } from "@/types"

export default function CategoriesPage() {
  const [cats, setCats]   = useState<Category[]>([])
  const [name, setName]   = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(()=>{ api.get<{ categories:Category[] }>("/admin/categories").then(d=>setCats(d.categories)).catch(()=>{}) },[])

  async function addCategory(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await api.post("/admin/categories",{ name }).catch(()=>{})
    setName(""); setSaving(false)
    api.get<{ categories:Category[] }>("/admin/categories").then(d=>setCats(d.categories)).catch(()=>{})
  }

  return (
    <div>
      <AdminHeader title="الفئات" subtitle="إدارة فئات المنتجات" />
      <div className="p-6 space-y-6">
        <form onSubmit={addCategory} className="flex gap-3 max-w-sm">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="اسم الفئة الجديدة"
            className="flex-1 px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] outline-none focus:border-[#d4a017]" required />
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition disabled:opacity-50">
            <Plus size={16}/> إضافة
          </button>
        </form>
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#2a2a2a]">
              {["الاسم","الرابط","عدد المنتجات","إجراءات"].map(h=>(
                <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {cats.length===0&&<tr><td colSpan={4} className="text-center py-10 text-[#666]">لا توجد فئات</td></tr>}
              {cats.map(c=>(
                <tr key={c.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">
                  <td className="px-4 py-3 font-medium text-[#f5f5f5]">{c.name}</td>
                  <td className="px-4 py-3 text-[#666] font-mono text-xs">{c.slug}</td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{c.productsCount}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#d4a017] transition"><Edit size={14}/></button>
                    <button className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#dc2626] transition"><Trash2 size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
