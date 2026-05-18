"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

interface Props { mode?: "create"|"edit"; initialData?: Record<string,any>; productId?: string }

export default function ProductForm({ mode="create", initialData={}, productId }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    name:       initialData.name       || "",
    price:      initialData.price      || "",
    salePrice:  initialData.salePrice  || "",
    stock:      initialData.stock      || "",
    category:   initialData.category   || "",
    brand:      initialData.brand      || "",
    description:initialData.description|| "",
    sizes:      initialData.sizes      || "",
    status:     initialData.status     || "ACTIVE",
  })
  const [saving, setSaving]   = useState(false)
  const [error,  setError]    = useState("")

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("")
    try {
      const body = { ...form, price: Number(form.price), stock: Number(form.stock), salePrice: form.salePrice ? Number(form.salePrice) : undefined }
      if (mode === "edit" && productId) {
        await api.put(`/admin/products/${productId}`, body)
      } else {
        await api.post("/admin/products", body)
      }
      router.push("/dashboard/products")
    } catch (err: any) { setError(err.message) } finally { setSaving(false) }
  }

  const field = (label: string, key: string, type="text", hint?: string) => (
    <div>
      <label className="block text-sm text-[#a0a0a0] mb-1.5">{label}</label>
      <input type={type} value={form[key as keyof typeof form]} onChange={e=>set(key,e.target.value)}
        className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none transition" />
      {hint && <p className="text-xs text-[#666] mt-1">{hint}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field("اسم المنتج","name")}
        {field("البراند","brand")}
        {field("الفئة","category")}
        <div>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">الحالة</label>
          <select value={form.status} onChange={e=>set("status",e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none">
            <option value="ACTIVE">نشط</option>
            <option value="DRAFT">مسودة</option>
            <option value="OUT_OF_STOCK">نفذ المخزون</option>
          </select>
        </div>
        {field("السعر (ل.س)","price","number")}
        {field("سعر الخصم (اختياري)","salePrice","number","اتركه فارغاً إذا لا يوجد خصم")}
        {field("الكمية المتوفرة","stock","number")}
        {field("المقاسات المتوفرة","sizes","text","مثال: XS,S,M,L,XL")}
      </div>
      <div>
        <label className="block text-sm text-[#a0a0a0] mb-1.5">الوصف</label>
        <textarea value={form.description} onChange={e=>set("description",e.target.value)} rows={4}
          className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none resize-none" />
      </div>
      {error && <p className="text-[#dc2626] text-sm bg-[#dc262615] px-3 py-2 rounded-lg">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition disabled:opacity-50">
          {saving ? "جارٍ الحفظ..." : mode==="edit" ? "حفظ التعديلات" : "إضافة المنتج"}
        </button>
        <button type="button" onClick={()=>router.back()}
          className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#a0a0a0] rounded-lg text-sm transition">
          إلغاء
        </button>
      </div>
    </form>
  )
}
