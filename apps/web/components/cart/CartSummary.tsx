'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
export default function CartSummary() {
  const { items, total } = useCartStore()
  const subtotal   = total()
  const shipping   = subtotal >= 150000 ? 0 : 15000
  const grandTotal = subtotal + shipping
  const f = (n: number) => n.toLocaleString('ar-SY') + ' ل.س'
  return (
    <div className="bg-light-surface dark:bg-dark-surface rounded-card border border-light-border dark:border-dark-border p-5 sticky top-24">
      <h3 className="text-base font-black text-light-text dark:text-dark-text mb-5">ملخص الطلب</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-light-muted dark:text-dark-muted">
          <span>المجموع الفرعي ({items.reduce((s,i)=>s+i.quantity,0)} منتجات)</span>
          <span>{f(subtotal)}</span>
        </div>
        <div className="flex justify-between text-light-muted dark:text-dark-muted">
          <span>الشحن</span>
          <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'مجاني 🎉' : f(shipping)}</span>
        </div>
        {shipping > 0 && (
          <p className="text-[11px] text-light-muted dark:text-dark-muted bg-gold/10 border border-gold/20 rounded-btn px-3 py-2">
            أضف {f(150000 - subtotal)} للحصول على شحن مجاني
          </p>
        )}
      </div>
      <div className="border-t border-light-border dark:border-dark-border my-4" />
      <div className="flex justify-between font-black text-base text-light-text dark:text-dark-text mb-5">
        <span>الإجمالي</span>
        <span className="text-gold">{f(grandTotal)}</span>
      </div>
      <Link href="/ar/checkout"
        className="block w-full py-3.5 rounded-btn text-center font-bold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98]"
        style={{ background:'linear-gradient(135deg,#d4a017,#a87400)' }}>
        إتمام الطلب
      </Link>
      <Link href="/ar" className="block text-center text-xs text-light-muted dark:text-dark-muted mt-3 hover:text-gold transition-colors">
        ← متابعة التسوق
      </Link>
    </div>
  )
}
