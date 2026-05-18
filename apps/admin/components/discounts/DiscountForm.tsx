"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

export default function DiscountForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    code:"", type:"PERCENTAGE", value:"", minOrderAmount:"",
    maxUses:"", isFirstOrder:false, expiresAt:"",
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState("")

  const set = (k: string, v: string|boolean) => setForm(prev=>({ ...prev, [k]:v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("")
    try {
      await api.post("/admin/discounts",{
        ...form,
        code: form.code.toUpperCase(),
        value: Number(form.value),
        minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : undefined,
        maxUses: form.maxUses ? Number(form.maxUses) : undefined,
        expiresAt: form.expiresAt || undefined,
      })
      router.push("/dashboard/discounts")
    } catch(err:any) { setError(err.message) } finally { setSaving(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">الكود</label>
          <input value={form.code} onChange={e=>set("code",e.target.value.toUpperCase())}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#d4a017] font-mono font-bold text-sm focus:border-[#d4a017] outline-none uppercase" required placeholder="SAVE20" />
        </div>
        <div>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">نوع الخصم</label>
          <select value={form.type} onChange={e=>set("type",e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none">
            <option value="PERCENTAGE">نسبة مئوية (%)</option>
            <option value="FIXED">مبلغ ثابت (ل.س)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">القيمة</label>
          <input type="number" value={form.value} onChange={e=>set("value",e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none" required />
        </div>
        <div>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">أقصى عدد استخدامات</label>
          <input type="number" value={form.maxUses} onChange={e=>set("maxUses",e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none" placeholder="فارغ = غير محدود" />
        </div>
        <div>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">الحد الأدنى للطلب</label>
          <input type="number" value={form.minOrderAmount} onChange={e=>set("minOrderAmount",e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none" placeholder="فارغ = بدون حد" />
        </div>
        <div>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">تاريخ الانتهاء</label>
          <input type="date" value={form.expiresAt} onChange={e=>set("expiresAt",e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="firstOrder" checked={form.isFirstOrder} onChange={e=>set("isFirstOrder",e.target.checked)}
          className="w-4 h-4 accent-[#d4a017]" />
        <label htmlFor="firstOrder" className="text-sm text-[#f5f5f5]">أول طلب فقط (للمستخدمين الجدد)</label>
      </div>
      {error && <p className="text-[#dc2626] text-sm bg-[#dc262615] px-3 py-2 rounded-lg">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition disabled:opacity-50">
          {saving?"جارٍ الإنشاء...":"إنشاء الكود"}
        </button>
        <button type="button" onClick={()=>router.back()}
          className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#a0a0a0] rounded-lg text-sm transition">
          إلغاء
        </button>
      </div>
    </form>
  )
}
