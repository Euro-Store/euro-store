"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import InventoryBadge from "./InventoryBadge"
import type { Product } from "@/types"
import { api } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"

const MOCK: Product[] = [
  { id:"1", name:"بنطلون كلاسيكي أزرق", slug:"blue-classic-pants", price:85000, stock:24, category:"رجالي", brand:"Zara", status:"ACTIVE", images:[], createdAt: new Date().toISOString() },
  { id:"2", name:"فستان صيفي منقوش",      slug:"summer-floral-dress", price:120000, salePrice:95000, stock:3, category:"نسائي", brand:"H&M", status:"ACTIVE", images:[], createdAt: new Date().toISOString() },
  { id:"3", name:"حذاء رياضي أبيض",        slug:"white-sneaker",       price:150000, stock:0, category:"أحذية", brand:"Nike", status:"OUT_OF_STOCK", images:[], createdAt: new Date().toISOString() },
]

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>(MOCK)
  const [q, setQ] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get<{ products: Product[] }>("/admin/products").then(d => setProducts(d.products)).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  const filtered = products.filter(p => p.name.includes(q) || p.brand.includes(q) || p.category.includes(q))

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return
    await api.delete(`/admin/products/${id}`).catch(()=>{})
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const statusLabel: Record<string,string> = { ACTIVE:"نشط", DRAFT:"مسودة", OUT_OF_STOCK:"نفذ" }
  const statusColor: Record<string,string> = { ACTIVE:"#16a34a", DRAFT:"#f59e0b", OUT_OF_STOCK:"#dc2626" }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666]" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="بحث عن منتج..."
            className="w-full pl-4 pr-9 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] placeholder-[#666] outline-none focus:border-[#d4a017]" />
        </div>
        <Link href="/dashboard/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition">
          <Plus size={16} /> إضافة منتج
        </Link>
      </div>

      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              {["المنتج","الفئة","البراند","السعر","المخزون","الحالة","إجراءات"].map(h => (
                <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-12 text-[#666]">جارٍ التحميل...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-[#666]">لا توجد منتجات</td></tr>
            ) : filtered.map(p => (
              <tr key={p.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition">
                <td className="px-4 py-3">
                  <span className="font-medium text-[#f5f5f5]">{p.name}</span>
                  {p.salePrice && <span className="mr-2 text-xs text-[#dc2626]">خصم</span>}
                </td>
                <td className="px-4 py-3 text-[#a0a0a0]">{p.category}</td>
                <td className="px-4 py-3 text-[#a0a0a0]">{p.brand}</td>
                <td className="px-4 py-3">
                  <div>{formatCurrency(p.salePrice || p.price)}</div>
                  {p.salePrice && <div className="text-xs text-[#666] line-through">{formatCurrency(p.price)}</div>}
                </td>
                <td className="px-4 py-3"><InventoryBadge stock={p.stock} /></td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: statusColor[p.status]+"20", color: statusColor[p.status] }}>
                    {statusLabel[p.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/products/${p.id}/edit`} className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#d4a017] transition">
                      <Edit size={14} />
                    </Link>
                    <button onClick={()=>handleDelete(p.id)} className="p-1.5 rounded hover:bg-[#2a2a2a] text-[#a0a0a0] hover:text-[#dc2626] transition">
                      <Trash2 size={14} />
                    </button>
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
