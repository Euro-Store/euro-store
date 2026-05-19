"use client"
import { useState, useRef, useEffect } from "react"
import { QrCode, CheckCircle, XCircle, Camera, Package } from "lucide-react"
import Image from "next/image"

type ExchangeData = {
  id: string
  status: string
  order: {
    user: { name: string }
    items: { id: string; product: { name: string; images: string[] }; quantity: number; size?: string }[]
  }
}

const REJECT_REASONS = [
  "المنتج تالف أو ممزق",
  "يوجد بقع أو أوساخ",
  "بطاقات الأسعار مفقودة",
  "المنتج مختلف عن الطلب",
  "سبب آخر"
]

export default function ScanPage() {
  const [step, setStep] = useState<"scan" | "review" | "done">("scan")
  const [qrInput, setQrInput] = useState("")
  const [exchange, setExchange] = useState<ExchangeData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [action, setAction] = useState<"confirm" | "reject" | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [checklist, setChecklist] = useState({ exists: false, noDefect: false, tags: false })
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (step === "scan") inputRef.current?.focus() }, [step])

  async function handleScan(e: React.FormEvent) {
    e.preventDefault()
    if (!qrInput.trim()) return
    setLoading(true); setError("")
    try {
      const res = await fetch("/api/partner/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrToken: qrInput.trim() })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setExchange(data.exchange)
      setStep("review")
    } catch { setError("تعذّر الاتصال") }
    finally { setLoading(false) }
  }

  async function handleConfirm() {
    if (!exchange) return
    setLoading(true)
    try {
      const res = await fetch(`/api/partner/exchanges/${exchange.id}/confirm`, { method: "PATCH" })
      if (res.ok) { setAction("confirm"); setStep("done") }
    } finally { setLoading(false) }
  }

  async function handleReject() {
    if (!exchange || !rejectReason) return
    setLoading(true)
    try {
      const res = await fetch(`/api/partner/exchanges/${exchange.id}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectReason })
      })
      if (res.ok) { setAction("reject"); setStep("done") }
    } finally { setLoading(false) }
  }

  function reset() {
    setStep("scan"); setQrInput(""); setExchange(null)
    setError(""); setAction(null); setRejectReason("")
    setChecklist({ exists: false, noDefect: false, tags: false })
  }

  const allChecked = checklist.exists && checklist.noDefect && checklist.tags

  if (step === "done") return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${action === "confirm" ? "bg-green-100" : "bg-red-100"}`}>
        {action === "confirm"
          ? <CheckCircle size={48} className="text-green-500" />
          : <XCircle size={48} className="text-red-400" />
        }
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {action === "confirm" ? "تم تأكيد الاستلام!" : "تم الرفض"}
      </h2>
      <p className="text-gray-500 mb-8">
        {action === "confirm" ? "سيتم إرسال البديل للزبون" : `السبب: ${rejectReason}`}
      </p>
      <button onClick={reset}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-xl">
        مسح QR جديد
      </button>
    </div>
  )

  if (step === "review" && exchange) return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="bg-yellow-500 px-4 py-3">
          <p className="text-white font-semibold">طلب استبدال</p>
          <p className="text-yellow-100 text-sm">{exchange.order.user.name?.split(" ")[0] ?? "زبون"}</p>
        </div>
        <div className="p-4 space-y-3">
          {exchange.order.items.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              {item.product.images?.[0] && (
                <Image src={item.product.images[0]} alt={item.product.name}
                  width={60} height={60} className="rounded-lg object-cover border" />
              )}
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-800">{item.product.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  الكمية: {item.quantity} {item.size ? `• المقاس: ${item.size}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        <p className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Package size={18} className="text-yellow-500" /> قائمة التحقق
        </p>
        {[
          { key: "exists", label: "المنتجات موجودة ومكتملة" },
          { key: "noDefect", label: "لا يوجد تلف أو تمزيق" },
          { key: "tags", label: "وسوم الأسعار موجودة" }
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-3 py-2 cursor-pointer">
            <input type="checkbox"
              checked={checklist[key as keyof typeof checklist]}
              onChange={e => setChecklist(prev => ({ ...prev, [key]: e.target.checked }))}
              className="w-5 h-5 rounded accent-yellow-500"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      {/* Actions */}
      <button onClick={handleConfirm} disabled={!allChecked || loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl mb-3 flex items-center justify-center gap-2 transition-colors">
        <CheckCircle size={20} /> تأكيد الاستلام
      </button>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">رفض مع السبب:</p>
        <div className="space-y-1.5 mb-3">
          {REJECT_REASONS.map(r => (
            <button key={r} onClick={() => setRejectReason(r)}
              className={`w-full text-right text-sm py-2 px-3 rounded-lg transition-colors ${rejectReason === r ? "bg-red-100 text-red-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
              {r}
            </button>
          ))}
        </div>
        <button onClick={handleReject} disabled={!rejectReason || loading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
          <XCircle size={18} /> رفض الطلب
        </button>
      </div>
    </div>
  )

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="text-center mb-8 pt-4">
        <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <QrCode size={40} className="text-yellow-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">مسح QR الزبون</h1>
        <p className="text-gray-500 text-sm mt-1">أدخل رمز QR أو امسحه بالكاميرا</p>
      </div>

      <form onSubmit={handleScan} className="space-y-4">
        <input
          ref={inputRef}
          value={qrInput}
          onChange={e => setQrInput(e.target.value)}
          placeholder="امسح QR أو أدخل الرمز يدوياً"
          className="w-full border-2 border-dashed border-gray-300 focus:border-yellow-400 rounded-xl px-4 py-4 text-center text-sm focus:outline-none"
        />
        {error && <p className="text-red-500 text-sm text-center bg-red-50 rounded-xl p-3">{error}</p>}
        <button type="submit" disabled={loading || !qrInput.trim()}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-base">
          <Camera size={20} />
          {loading ? "جاري البحث..." : "فحص الطلب"}
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-6">
        يمكنك استخدام ماسح QR خارجي — الرمز يُلصق تلقائياً في الحقل
      </p>
    </div>
  )
}