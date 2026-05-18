"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ShoppingBag, Truck, CreditCard, CheckCircle, ArrowRight, Loader2 } from "lucide-react"
import DiscountCodeInput, { type DiscountResult } from "@/components/checkout/DiscountCodeInput"
import LoyaltyPointsToggle from "@/components/checkout/LoyaltyPointsToggle"
import AddressSelector, { type Address } from "@/components/checkout/AddressSelector"

interface CartItem {
  id: string; productId: string; name: string; brand: string
  price: number; salePrice?: number; size: string; color: string
  quantity: number; image?: string
}

const MOCK_ITEMS: CartItem[] = [
  { id:"ci1", productId:"p1", name:"Ø¨Ù†Ø·Ù„ÙˆÙ† ÙƒÙ„Ø§Ø³ÙŠÙƒÙŠ Ø£Ø²Ø±Ù‚", brand:"Zara", price:85000, size:"L",  color:"Ø£Ø²Ø±Ù‚", quantity:1 },
  { id:"ci2", productId:"p3", name:"ØªÙŠØ´ÙŠØ±Øª Ø£Ø¨ÙŠØ¶ Ø¨Ø³ÙŠØ·",    brand:"H&M",  price:45000, size:"M",  color:"Ø£Ø¨ÙŠØ¶", quantity:2 },
]
let LOYALTY_PTS = 340

export default function CheckoutPage() {
  const router = useRouter()
  const [items,          setItems]          = useState<CartItem[]>(MOCK_ITEMS)
  const [address,        setAddress]        = useState<Address | null>(null)
  const [discount,       setDiscount]       = useState<DiscountResult | null>(null)
  const [usePoints,      setUsePoints]      = useState(false)
  const [pointsDiscount, setPointsDiscount] = useState(0)
  const [placing,        setPlacing]        = useState(false)
  const [orderId,        setOrderId]        = useState("")

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/cart`, { credentials:"include" })
      .then(r => r.json())
      .then(d => { if (d.items?.length) setItems(d.items) })
      .catch(() => {})
  }, [])

  const subtotal       = items.reduce((s, i) => s + (i.salePrice ?? i.price) * i.quantity, 0)
  const discountAmt    = discount?.discountAmount ?? 0
  const total          = Math.max(0, subtotal - discountAmt - pointsDiscount)

  async function placeOrder() {
    if (!address) return
    setPlacing(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            addressId: address.id,
            discountCode: discount?.code,
            usePoints,
            paymentMethod: "COD",
            items: items.map(i => ({ productId:i.productId, quantity:i.quantity, size:i.size, color:i.color })),
          }),
        }
      )
      const data = await res.json()
      setOrderId(data.order?.orderNumber ?? data.orderNumber ?? "1001")
    } catch {
      setOrderId("1001")
    } finally { setPlacing(false) }
  }

  if (orderId) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-[#16a34a20] border border-[#16a34a40] flex items-center justify-center mx-auto">
          <CheckCircle size={40} className="text-[#16a34a]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#f5f5f5]">ØªÙ… ØªØ£ÙƒÙŠØ¯ Ø·Ù„Ø¨Ùƒ!</h2>
          <p className="text-[#a0a0a0] mt-1 text-sm">Ø±Ù‚Ù… Ø§Ù„Ø·Ù„Ø¨: <span className="text-[#d4a017] font-mono font-bold">#{orderId}</span></p>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-4 text-sm text-[#a0a0a0] space-y-2 text-right">
          <div className="flex items-center gap-2"><Truck size={14} className="text-[#d4a017] flex-shrink-0" /><span>Ø³ÙŠØµÙ„Ùƒ Ø·Ù„Ø¨Ùƒ Ø®Ù„Ø§Ù„ 2â€“4 Ø£ÙŠØ§Ù… Ø¹Ù…Ù„</span></div>
          <div className="flex items-center gap-2"><CreditCard size={14} className="text-[#d4a017] flex-shrink-0" /><span>Ø§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù…</span></div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => router.push("/account/orders")}
            className="flex-1 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-xl text-sm font-bold transition">
            ØªØªØ¨Ø¹ Ø·Ù„Ø¨ÙŠ
          </button>
          <button onClick={() => router.push("/")}
            className="flex-1 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#f5f5f5] rounded-xl text-sm font-medium transition">
            Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[#a0a0a0] hover:text-[#f5f5f5] transition text-sm">
            <ArrowRight size={16} /> Ø±Ø¬ÙˆØ¹
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-[#d4a017]" />
            <span className="font-bold text-[#f5f5f5] text-sm">Ø¥ØªÙ…Ø§Ù… Ø§Ù„Ø·Ù„Ø¨</span>
          </div>
          <span className="text-xs text-[#666]">{items.length} Ù…Ù†ØªØ¬</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

        {/* LEFT */}
        <div className="space-y-5">

          {/* Cart Items */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#2a2a2a]">
              <h2 className="font-semibold text-[#f5f5f5] text-sm">Ù…Ù†ØªØ¬Ø§ØªÙƒ ({items.length})</h2>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {items.map(item => {
                const price = item.salePrice ?? item.price
                return (
                  <div key={item.id} className="flex gap-3 p-4">
                    <div className="w-16 h-20 bg-[#1a1a1a] rounded-xl flex-shrink-0 overflow-hidden">
                      {item.image
                        ? <Image src={item.image} alt={item.name} width={64} height={80} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-2xl">ðŸ‘•</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#666]">{item.brand}</p>
                      <p className="text-sm font-medium text-[#f5f5f5] truncate">{item.name}</p>
                      <p className="text-xs text-[#a0a0a0] mt-0.5">{item.size} Â· {item.color}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-[#666]">Ø§Ù„ÙƒÙ…ÙŠØ©: {item.quantity}</span>
                        <span className="text-sm font-bold text-[#f5f5f5]">{(price * item.quantity).toLocaleString("ar")} Ù„.Ø³</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Discount */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="font-semibold text-[#f5f5f5] text-sm mb-3">ÙƒÙˆØ¯ Ø§Ù„Ø®ØµÙ…</h2>
            <DiscountCodeInput orderTotal={subtotal} onApply={setDiscount} />
          </section>

          {/* Loyalty */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="font-semibold text-[#f5f5f5] text-sm mb-3">Ù†Ù‚Ø§Ø· Ø§Ù„ÙˆÙ„Ø§Ø¡</h2>
            <LoyaltyPointsToggle
              points={LOYALTY_PTS}
              orderTotal={subtotal - discountAmt}
              enabled={usePoints}
              onToggle={(on, disc) => { setUsePoints(on); setPointsDiscount(disc) }}
            />
            {LOYALTY_PTS === 0 && <p className="text-sm text-[#555]">Ù„ÙŠØ³ Ù„Ø¯ÙŠÙƒ Ù†Ù‚Ø§Ø· Ø¨Ø¹Ø¯. Ø§Ø´ØªØ±Ù Ù…Ù† Ù…ØªØ§Ø¬Ø±Ù†Ø§ Ø§Ù„Ø´Ø±ÙŠÙƒØ© Ù„ØªÙƒØ³Ø¨ Ù†Ù‚Ø§Ø·Ø§Ù‹.</p>}
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-5 lg:sticky lg:top-20 self-start">

          {/* Address */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="font-semibold text-[#f5f5f5] text-sm mb-3 flex items-center gap-2">
              Ø¹Ù†ÙˆØ§Ù† Ø§Ù„ØªÙˆØµÙŠÙ„ {address && <CheckCircle size={14} className="text-[#16a34a]" />}
            </h2>
            <AddressSelector onSelect={setAddress} />
          </section>

          {/* Payment */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="font-semibold text-[#f5f5f5] text-sm mb-3">Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¯ÙØ¹</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-[#d4a01710] border border-[#d4a01740] rounded-xl">
                <div className="w-5 h-5 rounded-full border-2 border-[#d4a017] bg-[#d4a017] flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#f5f5f5]">Ø§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù…</p>
                  <p className="text-xs text-[#a0a0a0]">Ø§Ø¯ÙØ¹ Ù†Ù‚Ø¯Ø§Ù‹ Ø¹Ù†Ø¯ ÙˆØµÙˆÙ„ Ø·Ù„Ø¨Ùƒ</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl opacity-40 cursor-not-allowed">
                <div className="w-5 h-5 rounded-full border-2 border-[#2a2a2a] flex-shrink-0" />
                <div className="flex-1"><p className="text-sm font-medium text-[#666]">Ø¨Ø·Ø§Ù‚Ø© Ø§Ø¦ØªÙ…Ø§Ù†ÙŠØ©</p></div>
                <span className="text-[10px] bg-[#2a2a2a] text-[#555] px-2 py-0.5 rounded-full">Ù‚Ø±ÙŠØ¨Ø§Ù‹</span>
              </div>
            </div>
          </section>

          {/* Total + Submit */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
            <h2 className="font-semibold text-[#f5f5f5] text-sm">Ù…Ù„Ø®Øµ Ø§Ù„Ø·Ù„Ø¨</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹ Ø§Ù„ÙØ±Ø¹ÙŠ</span>
                <span className="text-[#f5f5f5]">{subtotal.toLocaleString("ar")} Ù„.Ø³</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#16a34a]">ÙƒÙˆØ¯ Ø§Ù„Ø®ØµÙ… ({discount?.code})</span>
                  <span className="text-[#16a34a]">-{discountAmt.toLocaleString("ar")} Ù„.Ø³</span>
                </div>
              )}
              {pointsDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#d4a017]">Ø®ØµÙ… Ø§Ù„Ù†Ù‚Ø§Ø·</span>
                  <span className="text-[#d4a017]">-{pointsDiscount.toLocaleString("ar")} Ù„.Ø³</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Ø§Ù„ØªÙˆØµÙŠÙ„</span>
                <span className="text-[#16a34a] font-medium">Ù…Ø¬Ø§Ù†ÙŠ</span>
              </div>
              <div className="pt-2 border-t border-[#2a2a2a] flex justify-between font-bold">
                <span className="text-[#f5f5f5]">Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ</span>
                <span className="text-[#d4a017] text-lg">{total.toLocaleString("ar")} Ù„.Ø³</span>
              </div>
            </div>
            <button onClick={placeOrder} disabled={!address || placing}
              className="w-full py-3.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-xl font-bold text-base transition disabled:opacity-40 flex items-center justify-center gap-2">
              {placing
                ? <><Loader2 size={18} className="animate-spin" /> Ø¬Ø§Ø±Ù Ø§Ù„ØªØ£ÙƒÙŠØ¯...</>
                : <><CheckCircle size={18} /> ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø·Ù„Ø¨</>}
            </button>
            {!address && <p className="text-xs text-center text-[#f59e0b]">âš  Ø§Ø®ØªØ± Ø¹Ù†ÙˆØ§Ù† Ø§Ù„ØªÙˆØµÙŠÙ„ Ø£ÙˆÙ„Ø§Ù‹</p>}
          </section>
        </div>
      </div>
    </div>
  )
}
