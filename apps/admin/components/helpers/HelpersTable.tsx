"use client"
import { useState, useEffect } from "react"
import { Plus, ToggleRight, ToggleLeft } from "lucide-react"
import type { Helper } from "@/types"
import { api } from "@/lib/api"
import { formatDate } from "@/lib/utils"

const MOCK: Helper[] = [
  { id:"1", name:"محمد السيد",  email:"h1@store.com", phone:"0911111111", shopName:"محل النور",    shopAddress:"شارع العدوي",   isActive:true,  createdAt: new Date().toISOString() },
  { id:"2", name:"خالد أحمد",  email:"h2@store.com", phone:"0922222222", shopName:"متجر الأمل",  shopAddress:"ساحة الساعة",   isActive:true,  createdAt: new Date().toISOString() },
  { id:"3", name:"يوسف عمر",   email:"h3@store.com", phone:"0933333333", shopName:"بوتيك الموضة", shopAddress:"شارع القوتلي",  isActive:false, createdAt: new Date().toISOString() },
]

export default function HelpersTable() {
  const [helpers, setHelpers]           = useState<Helper[]>(MOCK)
  const [showForm, setShowForm]         = useState(false)
  const [newHelper, setNewHelper]       = useState({ name:"", email:"", phone:"", shopName:"", shopAddress:"" })

  useEffect(()=>{ api.get<{ helpers:Helper[] }>("/admin/helpers").then(d=>setHelpers(d.helpers)).catch(()=>{}) },[])

  async function toggleActive(id: string, cur: boolean) {
    await api.patch(`/admin/helpers/${id}`,{ isActive:!cur }).catch(()=>{})
    setHelpers(prev=>prev.map(h=>h.id===id?{ ...h, isActive:!cur }:h))
  }

  async function createHelper(e: React.FormEvent) {
    e.preventDefault()
    await api.post("/admin/helpers", newHelper).catch(()=>{})
    setShowForm(false)
    api.get<{ helpers:Helper[] }>("/admin/helpers").then(d=>setHelpers(d.helpers)).catch(()=>{})
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button onClick={()=>setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition">
          <Plus size={16}/> إضافة هيلبر
        </button>
      </div>
      {showForm && (
        <form onSubmit={createHelper} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 grid grid-cols-2 gap-4">
          {[["الاسم الكامل","name"],["البريد الإلكتروني","email"],["رقم الهاتف","phone"],["اسم المحل","shopName"],["عنوان المحل","shopAddress"]].map(([label,key])=>(
            <div key={key}>
              <label className="block text-xs text-[#a0a0a0] mb-1">{label}</label>
              <input value={newHelper[key as keyof typeof newHelper]} onChange={e=>setNewHelper(prev=>({ ...prev, [key]:e.target.value }))}
                className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f5] outline-none focus:border-[#d4a017]" required />
            </div>
          ))}
          <div className="col-span-2 flex gap-3 pt-2">
            <button type="submit" className="px-5 py-2 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold">حفظ</button>
            <button type="button" onClick={()=>setShowForm(false)} className="px-5 py-2 bg-[#1a1a1a] text-[#a0a0a0] rounded-lg text-sm">إلغاء</button>
          </div>
        </form>
      )}
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#2a2a2a]">
            {["الاسم","المحل","الهاتف","تاريخ الانضمام","نشط"].map(h=>(
              <th key={h} className="text-right px-4 py-3 text-xs text-[#666] font-medium">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {helpers.map(h=>(
              <tr key={h.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]">
                <td className="px-4 py-3"><div className="font-medium text-[#f5f5f5]">{h.name}</div><div className="text-xs text-[#666]">{h.email}</div></td>
                <td className="px-4 py-3"><div className="text-[#f5f5f5]">{h.shopName}</div><div className="text-xs text-[#666]">{h.shopAddress}</div></td>
                <td className="px-4 py-3 text-[#a0a0a0]">{h.phone}</td>
                <td className="px-4 py-3 text-xs text-[#666]">{formatDate(h.createdAt)}</td>
                <td className="px-4 py-3">
                  <button onClick={()=>toggleActive(h.id,h.isActive)}>
                    {h.isActive ? <ToggleRight size={22} className="text-[#16a34a]"/> : <ToggleLeft size={22} className="text-[#666]"/>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
