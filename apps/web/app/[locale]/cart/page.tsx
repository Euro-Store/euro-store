'use client'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import CartItem    from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items } = useCartStore()
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gold" />
        </div>
        <h1 className="text-2xl font-black text-light-text dark:text-dark-text mb-3">سلتك فارغة</h1>
        <p className="text-light-muted dark:text-dark-muted mb-8 max-w-sm">ابدأ التسوق واختر من آلاف المنتجات من أفضل الماركات</p>
        <Link href="/ar" className="px-8 py-3.5 rounded-btn font-bold text-white transition-all hover:opacity-90"
          style={{ background:'linear-gradient(135deg,#d4a017,#a87400)' }}>
          ابدأ التسوق
        </Link>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-black text-light-text dark:text-dark-text mb-8">
        سلة التسوق ({items.reduce((s,i)=>s+i.quantity,0)} منتجات)
      </h1>
      <div className="grid md:grid-cols-[1fr_360px] gap-8">
        <div className="bg-light-surface dark:bg-dark-surface rounded-card border border-light-border dark:border-dark-border p-4 md:p-6">
          {items.map(item => <CartItem key={item.id} item={item} />)}
        </div>
        <CartSummary />
      </div>
    </div>
  )
}
