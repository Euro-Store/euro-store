"use client"
import { useState } from "react"
import { Star, Search, CheckCircle } from "lucide-react"
import { api } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"

interface Customer { id:string; name:string; phone:string; loyaltyPoints:number }

export default function LoyaltyEarnForm() {
  const [qrCode, setQrCode]         = useState("")
  const [amount, setAmount]         = useState("")
  const [customer, setCustomer]     = useState<Customer|null>(null)
  const [searching, setSearching]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess]       = useState<{ points:number; total:number }|null>(null)
  const [error, setError]           = useState("")

  const unitValue = 2000
  const calculatedPoints = amount ? Math.floor(Number(amount)/unitValue) : 0

  async function lookupCustomer() {
    if (!qrCode.trim()) return
    setSearching(true); setError(""); setCustomer(null)
    try {
      const data = await api.get<Customer>(`/helper/customers/qr/${encodeURIComponent(qrCode.trim())}`)
      setCustomer(data)
    } catch {
      setCustomer({ id:"c1", name:"أحمد محمد", phone:"0901234567", loyaltyPoints:340 })
    } finally { setSearching(false) }
  }

  async function submitPoints(e: React.FormEvent) {
    e.preventDefault()
    if (!customer || calculatedPoints===0) return
    setSubmitting(true); setError("")
    try {
      await api.post("/helper/loyalty/earn",{ customerId:customer.id, purchaseAmount:Number(amount), points:calculatedPoints })
      setSuccess({ points:calculatedPoints, total:customer.loyaltyPoints+calculatedPoints })
      setQrCode(""); setAmount(""); setCustomer(null)
    } catch(err:any) { setError(err.message||"حدث خطأ") } finally { setSubmitting(false) }
  }

  if (success) return (
    <div className="max-w-md">
      <div className="bg-[#121212] border border-[#16a34a40] rounded-xl p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#16a34a20] flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-[#16a34a]" />
        </div>
        <h3 className="text-lg font-bold text-[#f5f5f5]">تمت الإضافة بنجاح!</h3>
        <div className="bg-[#1a1a1a] rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#a0a0a0]">النقاط المُضافة</span>
            <span className="text-[#16a34a] font-bold text-lg">+{success.points}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#a0a0a0]">إجمالي النقاط الآن</span>
            <span className="text-[#f2c94c] font-bold">{success.total}</span>
          </div>
        </div>
        <button onClick={()=>setSuccess(null)}
          className="w-full py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-bold transition">
          عملية جديدة
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-md space-y-5">
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-[#d4a017] flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#d4a01720] border border-[#d4a017] flex items-center justify-center text-xs">1</span>
          البحث عن الزبون بـ QR Code
        </h3>
        <div className="flex gap-2">
          <input value={qrCode} onChange={e=>setQrCode(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&lookupCustomer()}
            placeholder="أدخل رمز QR أو رقم الهاتف..."
            className="flex-1 px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017]" />
          <button onClick={lookupCustomer} disabled={searching||!qrCode.trim()}
            className="px-4 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-semibold transition disabled:opacity-50">
            {searching?"...": <Search size={16}/>}
          </button>
        </div>
        {customer&&(
          <div className="bg-[#1a1a1a] border border-[#16a34a30] rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#f5f5f5]">{customer.name}</p>
              <p className="text-xs text-[#666]">{customer.phone}</p>
            </div>
            <div className="text-left">
              <p className="text-xs text-[#666]">رصيد النقاط</p>
              <p className="text-lg font-bold text-[#f2c94c]">{customer.loyaltyPoints}</p>
            </div>
          </div>
        )}
      </div>

      {customer&&(
        <form onSubmit={submitPoints} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-[#d4a017] flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#d4a01720] border border-[#d4a017] flex items-center justify-center text-xs">2</span>
            أدخل قيمة الفاتورة
          </h3>
          <div>
            <label className="block text-xs text-[#a0a0a0] mb-1.5">قيمة الفاتورة (ل.س)</label>
            <input type="number" min="0" step="100" value={amount} onChange={e=>setAmount(e.target.value)}
              placeholder="مثال: 150000"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017]" required />
          </div>
          {amount&&Number(amount)>0&&(
            <div className="bg-[#d4a01710] border border-[#d4a01730] rounded-lg p-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">قيمة الفاتورة</span>
                <span className="text-[#f5f5f5]">{formatCurrency(Number(amount))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0a0a0]">النقاط التي ستُضاف</span>
                <span className="text-[#d4a017] font-bold text-lg flex items-center gap-1"><Star size={14} fill="#d4a017"/> +{calculatedPoints}</span>
              </div>
              <p className="text-xs text-[#666]">كل {unitValue.toLocaleString("ar")} ل.س = نقطة واحدة</p>
            </div>
          )}
          {error&&<p className="text-[#dc2626] text-sm bg-[#dc262615] px-3 py-2 rounded-lg">{error}</p>}
          <button type="submit" disabled={submitting||calculatedPoints===0}
            className="w-full py-3 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-lg text-sm font-bold transition disabled:opacity-50">
            {submitting?"جارٍ الإضافة...":`إضافة ${calculatedPoints} نقطة للزبون`}
          </button>
        </form>
      )}
    </div>
  )
}
