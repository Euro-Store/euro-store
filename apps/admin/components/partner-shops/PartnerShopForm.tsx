"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

export default function PartnerShopForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name:"", address:"", phone:"", managerName:"", city:"" })
  const [saving, setSaving] = useState(false)
  const set = (k:string,v:string)=>setForm(p=>({...p,[k]:v}))
  async function handleSubmit(e:React.FormEvent){
    e.preventDefault(); setSaving(true)
    await api.post("/admin/partner-shops",form).catch(()=>{})
    router.push("/dashboard/partner-shops")
  }
  const fields:[string,string][] = [["اسم المحل","name"],["المدينة","city"],["العنوان التفصيلي","address"],["اسم المدير","managerName"],["رقم الهاتف","phone"]]
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {fields.map(([label,key])=>(
        <div key={key}>
          <label className="block text-sm text-[#a0a0a0] mb-1.5">{label}</label>
          <input value={form[key as keyof typeof form]} onChange={e=>set(key,e.target.value)}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm focus:border-[#d4a017] outline-none" required />
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold disabled:opacity-50">
          {saving?"جارٍ الحفظ...":"إضافة المحل"}
        </button>
        <button type="button" onClick={()=>router.back()} className="px-6 py-2.5 bg-[#1a1a1a] text-[#a0a0a0] rounded-lg text-sm">إلغاء</button>
      </div>
    </form>
  )
}
