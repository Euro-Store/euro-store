"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

export default function SubmissionForm() {
  const router = useRouter()
  const [type, setType]               = useState<"NEW_PRODUCT"|"EDIT_PRODUCT">("NEW_PRODUCT")
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory]       = useState("")
  const [price, setPrice]             = useState("")
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("")
    try {
      await api.post("/helper/submissions",{ type, productName, description, category, price:price?Number(price):undefined })
      router.push("/dashboard/products")
    } catch(err:any) { setError(err.message) } finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label className="block text-sm text-[#a0a0a0] mb-2">نوع الطلب</label>
        <div className="flex gap-2">
          {([["NEW_PRODUCT","اقتراح منتج جديد"],["EDIT_PRODUCT","تعديل منتج موجود"]] as const).map(([v,l])=>(
            <button key={v} type="button" onClick={()=>setType(v)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition border ${type===v?"bg-[#d4a01720] border-[#d4a017] text-[#d4a017]":"bg-[#1a1a1a] border-[#2a2a2a] text-[#a0a0a0] hover:border-[#3a3a3a]"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-[#a0a0a0] mb-1.5">اسم المنتج *</label>
        <input value={productName} onChange={e=>setProductName(e.target.value)} required placeholder="مثال: حذاء رياضي نايك أبيض"
          className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017]" />
      </div>
      <div>
        <label className="block text-sm text-[#a0a0a0] mb-1.5">الفئة</label>
        <select value={category} onChange={e=>setCategory(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017]">
          <option value="">اختر الفئة</option>
          {["رجالي","نسائي","ولادي","أحذية","شنط","إكسسوار"].map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {type==="NEW_PRODUCT"&&(
        <div>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">السعر المقترح (ل.س)</label>
          <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="مثال: 85000"
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017]" />
        </div>
      )}
      <div>
        <label className="block text-sm text-[#a0a0a0] mb-1.5">التفاصيل والملاحظات *</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4} required
          placeholder={type==="NEW_PRODUCT"?"صف المنتج بالتفصيل: المواصفات، المقاسات، سبب الاقتراح...":"اشرح التعديل المطلوب بالتفصيل..."}
          className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017] resize-none" />
      </div>
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-xs text-[#666]">
        سيُرسل هذا الاقتراح للمسؤول للمراجعة. لن يُنشر أي تعديل بدون موافقة الأدمن.
      </div>
      {error&&<p className="text-[#dc2626] text-sm bg-[#dc262615] px-3 py-2 rounded-lg">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition disabled:opacity-50">
          {saving?"جارٍ الإرسال...":"إرسال للمراجعة"}
        </button>
        <button type="button" onClick={()=>router.back()}
          className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#a0a0a0] rounded-lg text-sm transition">
          إلغاء
        </button>
      </div>
    </form>
  )
}
