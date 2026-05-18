"use client"
import { useState } from "react"
import { Tag, X, CheckCircle, Loader2 } from "lucide-react"

export interface DiscountResult {
  code: string
  type: "PERCENTAGE" | "FIXED"
  value: number
  discountAmount: number
  description: string
}

interface Props {
  orderTotal: number
  onApply: (discount: DiscountResult | null) => void
}

export default function DiscountCodeInput({ orderTotal, onApply }: Props) {
  const [code,    setCode]    = useState("")
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState<DiscountResult | null>(null)
  const [error,   setError]   = useState("")

  async function handleApply() {
    if (!code.trim()) return
    setLoading(true); setError("")
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/discounts/validate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ code: code.trim(), orderTotal }),
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? "الكود غير صالح")
      setApplied(data); onApply(data)
    } catch (err: any) {
      setError(err.message); onApply(null)
    } finally { setLoading(false) }
  }

  function handleRemove() {
    setApplied(null); setCode(""); setError(""); onApply(null)
  }

  if (applied) {
    return (
      <div className="flex items-center justify-between p-3.5 bg-[#16a34a10] border border-[#16a34a30] rounded-xl">
        <div className="flex items-center gap-2.5">
          <CheckCircle size={15} className="text-[#16a34a] flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-[#16a34a] font-mono tracking-wider">{applied.code}</p>
            <p className="text-xs text-[#a0a0a0]">{applied.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-semibold text-[#16a34a]">
            -{applied.type === "PERCENTAGE" ? `${applied.value}%` : `${applied.discountAmount.toLocaleString("ar")} ل.س`}
          </span>
          <button onClick={handleRemove} className="text-[#555] hover:text-[#dc2626] transition">
            <X size={14} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555]" />
          <input
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && handleApply()}
            placeholder="كود الخصم"
            className="w-full pr-9 pl-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017] transition-colors font-mono tracking-wider placeholder-[#444]"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          className="px-5 py-2.5 bg-[#d4a01718] hover:bg-[#d4a01730] border border-[#d4a01740] text-[#d4a017] rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 min-w-[76px] flex items-center justify-center"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : "تطبيق"}
        </button>
      </div>
      {error && <p className="text-xs text-[#dc2626] px-1">⚠ {error}</p>}
    </div>
  )
}