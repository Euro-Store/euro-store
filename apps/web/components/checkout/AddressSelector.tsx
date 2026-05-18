"use client"
import { useState, useEffect } from "react"
import { MapPin, Plus, Check } from "lucide-react"
import Link from "next/link"

export interface Address {
  id: string; label: string; fullAddress: string; city: string; isDefault: boolean
}

const MOCK: Address[] = [
  { id:"a1", label:"المنزل", fullAddress:"شارع الميدان، بناء 12، طابق 3", city:"دمشق", isDefault:true },
  { id:"a2", label:"العمل",  fullAddress:"شارع بغداد، مبنى الشركة",        city:"دمشق", isDefault:false },
]

export default function AddressSelector({ onSelect }: { onSelect: (a: Address | null) => void }) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selected,  setSelected]  = useState("")
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/users/me/addresses`, { credentials:"include" })
      .then(r => r.json())
      .then(d => {
        const list: Address[] = d.addresses ?? MOCK
        setAddresses(list)
        const def = list.find(a => a.isDefault) ?? list[0]
        if (def) { setSelected(def.id); onSelect(def) }
      })
      .catch(() => { setAddresses(MOCK); setSelected(MOCK[0].id); onSelect(MOCK[0]) })
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <div className="space-y-2">{[1,2].map(i=><div key={i} className="h-16 bg-[#1a1a1a] rounded-xl animate-pulse" />)}</div>

  return (
    <div className="space-y-2">
      {addresses.map(addr => (
        <button key={addr.id} onClick={() => { setSelected(addr.id); onSelect(addr) }}
          className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-right transition-colors ${selected===addr.id ? "bg-[#d4a01710] border-[#d4a01750]" : "bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a]"}`}>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${selected===addr.id ? "border-[#d4a017] bg-[#d4a017]" : "border-[#3a3a3a]"}`}>
            {selected===addr.id && <Check size={11} className="text-[#0a0a0a]" strokeWidth={3} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#f5f5f5]">{addr.label}</p>
              {addr.isDefault && <span className="text-[10px] px-1.5 py-0.5 bg-[#d4a01720] text-[#d4a017] rounded-full">افتراضي</span>}
            </div>
            <p className="text-xs text-[#a0a0a0] mt-0.5 truncate">{addr.fullAddress}</p>
            <p className="text-xs text-[#666]">{addr.city}</p>
          </div>
          <MapPin size={14} className={selected===addr.id ? "text-[#d4a017]" : "text-[#555]"} />
        </button>
      ))}
      <Link href="/account/addresses"
        className="flex items-center gap-2 w-full p-3 rounded-xl border border-dashed border-[#2a2a2a] hover:border-[#d4a01750] text-[#666] hover:text-[#d4a017] transition-colors text-sm">
        <Plus size={14} /><span>إضافة عنوان جديد</span>
      </Link>
    </div>
  )
}