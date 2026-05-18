'use client'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
interface CartItemType { id: string; name: string; brand: string; price: number; image: string; qty: number; size?: string }
export default function CartItem({ item }: { item: CartItemType }) {
  const { remove, updateQty } = useCartStore()
  const f = (n: number) => n.toLocaleString('ar-SY') + ' ل.س'
  return (
    <div className="flex gap-4 py-4 border-b border-light-border dark:border-dark-border last:border-0">
      <div className="w-24 h-28 rounded-card overflow-hidden bg-light-elevated dark:bg-dark-elevated flex-shrink-0">
        <Image src={item.image} alt={item.name} width={96} height={112} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">{item.brand}</p>
        <h4 className="text-sm font-semibold text-light-text dark:text-dark-text leading-snug mt-0.5 line-clamp-2">{item.name}</h4>
        {item.size && <p className="text-xs text-light-muted dark:text-dark-muted mt-1">المقاس: {item.size}</p>}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-light-border dark:border-dark-border rounded-btn overflow-hidden">
            <button onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : remove(item.id)}
              className="w-8 h-8 flex items-center justify-center hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors">
              <Minus size={13} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-light-text dark:text-dark-text">{item.qty}</span>
            <button onClick={() => updateQty(item.id, item.qty + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors">
              <Plus size={13} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-black text-light-text dark:text-dark-text">{f(item.price * item.qty)}</span>
            <button onClick={() => remove(item.id)} className="text-light-muted hover:text-red-500 transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}