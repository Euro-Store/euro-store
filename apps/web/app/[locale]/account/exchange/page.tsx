"use client"
import { useState, useEffect } from "react"
import { ArrowLeftRight, Plus, QrCode, Clock, CheckCircle, XCircle, Package } from "lucide-react"

type ExchangeStatus = "REQUESTED" | "CONFIRMED_BY_SHOP" | "PROCESSING" | "COMPLETED" | "REJECTED"

interface ExchangeRequest {
  id: string; orderNumber: string; status: ExchangeStatus
  qrCode: string; items: { name: string; size: string }[]; createdAt: string
}

const STATUS: Record<ExchangeStatus, { label: string; color: string }> = {
  REQUESTED:         { label:"بانتظار المحل",  color:"#f59e0b" },
  CONFIRMED_BY_SHOP: { label:"استُلم بالمحل",  color:"#0284c7" },
  PROCESSING:        { label:"جارٍ التجهيز",   color:"#d4a017" },
  COMPLETED:         { label:"اكتمل ✓",        color:"#16a34a" },
  REJECTED:          { label:"مرفوض",          color:"#dc2626" },
}

const MOCK: ExchangeRequest[] = [
  { id:"e1", orderNumber:"1030", status:"REQUESTED", qrCode:"EUR-EX-1030-7A3F",
    items:[{ name:"بنطلون أزرق كلاسيكي", size:"L" }], createdAt:new Date().toISOString() },
]

function QRBox({ qrCode, orderNumber }: { qrCode: string; orderNumber: string }) {
  const size = 15
  let seed = 0
  for (let i = 0; i < qrCode.length; i++) seed = ((seed * 31) + qrCode.charCodeAt(i)) | 0
  function isDark(r: number, c: number): boolean {
    const tl = r < 5 && c < 5; const tr = r < 5 && c >= size - 5; const bl = r >= size - 5 && c < 5
    if (tl || tr || bl) {
      const rr = bl ? r - (size - 5) : r; const cc = tr ? c - (size - 5) : c
      return rr === 0 || rr === 4 || cc === 0 || cc === 4 || (rr >= 1 && rr <= 3 && cc >= 1 && cc <= 3)
    }
    return ((seed ^ (r * 97 + c * 31)) & 1) === 1
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="p-3 bg-white rounded-2xl shadow-lg">
        <div style={{ display:"grid", gridTemplateColumns:`repeat(${size},1fr)`, gap:2, width:150, height:150 }}>
          {Array.from({length:size*size}).map((_,i)=>(
            <div key={i} style={{ background:isDark(Math.floor(i/size),i%size)?"#0a0a0a":"#ffffff", borderRadius:1 }} />
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-mono text-[#d4a017] tracking-wider">{qrCode}</p>
        <p className="text-[11px] text-[#666] mt-0.5">طلب استبدال #{orderNumber}</p>
      </div>
    </div>
  )
}

function NewExchangeForm({ onDone }: { onDone: (ex: ExchangeRequest) => void }) {
  const [orderNumber,  setOrderNumber]  = useState("")
  const [description,  setDescription]  = useState("")
  const [saving,       setSaving]       = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    const mock: ExchangeRequest = {
      id: Date.now().toString(), orderNumber, status:"REQUESTED",
      qrCode: `EUR-EX-${orderNumber}-${Math.random().toString(36).slice(2,6).toUpperCase()}`,
      items:[{ name:description, size:"-" }], createdAt:new Date().toISOString(),
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/exchanges`,
        { method:"POST", headers:{"Content-Type":"application/json"}, credentials:"include",
          body:JSON.stringify({ orderNumber, description }) }
      )
      const data = await res.json()
      onDone(data.exchange ?? mock)
    } catch { onDone(mock) } finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit} className="bg-[#121212] border border-[#d4a01730] rounded-2xl p-5 space-y-4">
      <h3 className="font-semibold text-[#d4a017] flex items-center gap-2"><Plus size={15}/> طلب استبدال جديد</h3>
      <div>
        <label className="block text-xs text-[#a0a0a0] mb-1.5">رقم الطلب *</label>
        <input value={orderNumber} onChange={e=>setOrderNumber(e.target.value)} required placeholder="1030"
          className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017] transition font-mono" />
      </div>
      <div>
        <label className="block text-xs text-[#a0a0a0] mb-1.5">المنتجات المراد استبدالها *</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} required rows={3}
          placeholder={"بنطلون أزرق مقاس L → أريد مقاس XL\nتيشيرت مقاس M → أريد لون أسود"}
          className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[#f5f5f5] text-sm outline-none focus:border-[#d4a017] transition resize-none" />
      </div>
      <div className="bg-[#1a1a1a] rounded-xl p-3 text-xs text-[#666] space-y-1">
        <p>📦 المنتجات يجب أن تكون غير مستخدمة وبحالة ممتازة</p>
        <p>🏪 توجّه لأقرب محل شريك معتمد مع رمز QR الناتج</p>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-xl text-sm font-bold transition disabled:opacity-50">
          {saving ? "جارٍ الإنشاء..." : "إنشاء طلب الاستبدال"}
        </button>
      </div>
    </form>
  )
}

export default function ExchangePage() {
  const [exchanges, setExchanges] = useState<ExchangeRequest[]>([])
  const [showForm,  setShowForm]  = useState(false)
  const [activeQR,  setActiveQR]  = useState<ExchangeRequest | null>(null)

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL??"http://localhost:5000/api"}/exchanges/my`,{credentials:"include"})
      .then(r=>r.json()).then(d=>setExchanges(d.exchanges??MOCK)).catch(()=>setExchanges(MOCK))
  },[])

  function handleNew(ex: ExchangeRequest) {
    setExchanges(p=>[ex,...p]); setShowForm(false); setActiveQR(ex)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#f5f5f5] flex items-center gap-2">
            <ArrowLeftRight size={20} className="text-[#d4a017]"/> طلبات الاستبدال
          </h1>
          <p className="text-sm text-[#666] mt-0.5">استبدل منتجاتك في أي محل شريك</p>
        </div>
        {!showForm && (
          <button onClick={()=>{setShowForm(true);setActiveQR(null)}}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-xl text-sm font-semibold transition">
            <Plus size={15}/> طلب جديد
          </button>
        )}
      </div>

      {activeQR && (
        <div className="bg-[#121212] border border-[#d4a01730] rounded-2xl p-5 flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-[#d4a017] self-start flex items-center gap-2"><QrCode size={15}/> رمز QR الخاص بطلبك</p>
          <QRBox qrCode={activeQR.qrCode} orderNumber={activeQR.orderNumber} />
          <p className="text-xs text-[#555]">احفظ هذا الرمز وأرِه لصاحب المحل الشريك</p>
        </div>
      )}

      {showForm && <NewExchangeForm onDone={handleNew} />}

      {/* How it works */}
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-[#d4a017] mb-3">خطوات الاستبدال</h3>
        <div className="space-y-2.5">
          {[
            {n:"1",t:"أنشئ طلب الاستبدال",   d:"حدد المنتجات والبديل المطلوب"},
            {n:"2",t:"احفظ رمز QR",           d:"سيظهر لك رمز خاص بالطلب"},
            {n:"3",t:"توجّه لمحل شريك",       d:"أحضر المنتجات ورمز QR"},
            {n:"4",t:"استلم طلبك الجديد",     d:"البديل يصلك خلال 2–4 أيام"},
          ].map(s=>(
            <div key={s.n} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-[#d4a01720] text-[#d4a017] text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{s.n}</span>
              <div>
                <p className="text-sm font-medium text-[#f5f5f5]">{s.t}</p>
                <p className="text-xs text-[#666]">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing */}
      {exchanges.length > 0 && (
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2a2a2a]"><h3 className="text-sm font-semibold text-[#f5f5f5]">طلباتي السابقة</h3></div>
          <div className="divide-y divide-[#1a1a1a]">
            {exchanges.map(ex=>{
              const st = STATUS[ex.status]
              return (
                <div key={ex.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:st.color+"20"}}>
                      <Package size={16} style={{color:st.color}}/>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#f5f5f5]">طلب #{ex.orderNumber}</p>
                      <p className="text-xs text-[#666] truncate">{ex.items.map(i=>i.name).join("، ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{background:st.color+"20",color:st.color}}>{st.label}</span>
                    {ex.status==="REQUESTED" && (
                      <button onClick={()=>setActiveQR(activeQR?.id===ex.id?null:ex)}
                        className="p-1.5 text-[#d4a017] hover:bg-[#d4a01720] rounded-lg transition" title="عرض QR">
                        <QrCode size={15}/>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}