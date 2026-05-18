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
  { id:"ci1", productId:"p1", name:"بنطلون كلاسيكي أزرق", brand:"Zara", price:85000, size:"L",  color:"أزرق", quantity:1 },
  { id:"ci2", productId:"p3", name:"تيشيرت أبيض بسيط",    brand:"H&M",  price:45000, size:"M",  color:"أبيض", quantity:2 },
]
const LOYALTY_PTS = 340

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
          <h2 className="text-2xl font-bold text-[#f5f5f5]">تم تأكيد طلبك!</h2>
          <p className="text-[#a0a0a0] mt-1 text-sm">رقم الطلب: <span className="text-[#d4a017] font-mono font-bold">#{orderId}</span></p>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-4 text-sm text-[#a0a0a0] space-y-2 text-right">
          <div className="flex items-center gap-2"><Truck size={14} className="text-[#d4a017] flex-shrink-0" /><span>سيصلك طلبك خلال 2–4 أيام عمل</span></div>
          <div className="flex items-center gap-2"><CreditCard size={14} className="text-[#d4a017] flex-shrink-0" /><span>الدفع عند الاستلام</span></div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => router.push("/account/orders")}
            className="flex-1 py-2.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-xl text-sm font-bold transition">
            تتبع طلبي
          </button>
          <button onClick={() => router.push("/")}
            className="flex-1 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#f5f5f5] rounded-xl text-sm font-medium transition">
            الرئيسية
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
            <ArrowRight size={16} /> رجوع
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-[#d4a017]" />
            <span className="font-bold text-[#f5f5f5] text-sm">إتمام الطلب</span>
          </div>
          <span className="text-xs text-[#666]">{items.length} منتج</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

        {/* LEFT */}
        <div className="space-y-5">

          {/* Cart Items */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#2a2a2a]">
              <h2 className="font-semibold text-[#f5f5f5] text-sm">منتجاتك ({items.length})</h2>
            </div>
            <div className="divide-y divide-[#1a1a1a]">
              {items.map(item => {
                const price = item.salePrice ?? item.price
                return (
                  <div key={item.id} className="flex gap-3 p-4">
                    <div className="w-16 h-20 bg-[#1a1a1a] rounded-xl flex-shrink-0 overflow-hidden">
                      {item.image
                        ? <Image src={item.image} alt={item.name} width={64} height={80} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-2xl">👕</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#666]">{item.brand}</p>
                      <p className="text-sm font-medium text-[#f5f5f5] truncate">{item.name}</p>
                      <p className="text-xs text-[#a0a0a0] mt-0.5">{item.size} · {item.color}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-[#666]">الكمية: {item.quantity}</span>
                        <span className="text-sm font-bold text-[#f5f5f5]">{(price * item.quantity).toLocaleString("ar")} ل.س</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Discount */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="font-semibold text-[#f5f5f5] text-sm mb-3">كود الخصم</h2>
            <DiscountCodeInput orderTotal={subtotal} onApply={setDiscount} />
          </section>

          {/* Loyalty */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="font-semibold text-[#f5f5f5] text-sm mb-3">نقاط الولاء</h2>
            <LoyaltyPointsToggle
              points={LOYALTY_PTS}
              orderTotal={subtotal - discountAmt}
              enabled={usePoints}
              onToggle={(on, disc) => { setUsePoints(on); setPointsDiscount(disc) }}
            />
            {LOYALTY_PTS === 0 && <p className="text-sm text-[#555]">ليس لديك نقاط بعد. اشترِ من متاجرنا الشريكة لتكسب نقاطاً.</p>}
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-5 lg:sticky lg:top-20 self-start">

          {/* Address */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="font-semibold text-[#f5f5f5] text-sm mb-3 flex items-center gap-2">
              عنوان التوصيل {address && <CheckCircle size={14} className="text-[#16a34a]" />}
            </h2>
            <AddressSelector onSelect={setAddress} />
          </section>

          {/* Payment */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5">
            <h2 className="font-semibold text-[#f5f5f5] text-sm mb-3">طريقة الدفع</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-[#d4a01710] border border-[#d4a01740] rounded-xl">
                <div className="w-5 h-5 rounded-full border-2 border-[#d4a017] bg-[#d4a017] flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#f5f5f5]">الدفع عند الاستلام</p>
                  <p className="text-xs text-[#a0a0a0]">ادفع نقداً عند وصول طلبك</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl opacity-40 cursor-not-allowed">
                <div className="w-5 h-5 rounded-full border-2 border-[#2a2a2a] flex-shrink-0" />
                <div className="flex-1"><p className="text-sm font-medium text-[#666]">بطاقة ائتمانية</p></div>
                <span className="text-[10px] bg-[#2a2a2a] text-[#555] px-2 py-0.5 rounded-full">قريباً</span>
              </div>
            </div>
          </section>

          {/* Total + Submit */}
          <section className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
            <h2 className="font-semibold text-[#f5f5f5] text-sm">ملخص الطلب</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">المجموع الفرعي</span>
                <span className="text-[#f5f5f5]">{subtotal.toLocaleString("ar")} ل.س</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#16a34a]">كود الخصم ({discount?.code})</span>
                  <span className="text-[#16a34a]">-{discountAmt.toLocaleString("ar")} ل.س</span>
                </div>
              )}
              {pointsDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#d4a017]">خصم النقاط</span>
                  <span className="text-[#d4a017]">-{pointsDiscount.toLocaleString("ar")} ل.س</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">التوصيل</span>
                <span className="text-[#16a34a] font-medium">مجاني</span>
              </div>
              <div className="pt-2 border-t border-[#2a2a2a] flex justify-between font-bold">
                <span className="text-[#f5f5f5]">الإجمالي</span>
                <span className="text-[#d4a017] text-lg">{total.toLocaleString("ar")} ل.س</span>
              </div>
            </div>
            <button onClick={placeOrder} disabled={!address || placing}
              className="w-full py-3.5 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] rounded-xl font-bold text-base transition disabled:opacity-40 flex items-center justify-center gap-2">
              {placing
                ? <><Loader2 size={18} className="animate-spin" /> جارٍ التأكيد...</>
                : <><CheckCircle size={18} /> تأكيد الطلب</>}
            </button>
            {!address && <p className="text-xs text-center text-[#f59e0b]">⚠ اختر عنوان التوصيل أولاً</p>}
          </section>
        </div>
      </div>
    </div>
  )
}