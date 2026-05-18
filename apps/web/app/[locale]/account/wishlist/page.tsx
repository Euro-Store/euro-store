'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { wishlistApi, type WishlistItem } from '@/lib/api-client'
import { AccountSidebar } from '@/components/account/AccountSidebar'

export default function WishlistPage() {
  const [items,   setItems]   = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    wishlistApi.get().then(r => setItems(r.items)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleRemove = async (productId: string) => {
    try { await wishlistApi.toggle(productId); setItems(i => i.filter(x => x.product.id !== productId)) } catch {}
  }

  return (
    <div className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] py-8 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#111111] dark:text-[#f5f5f5] mb-6">المفضلة</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar />
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] rounded-[12px] bg-[#e5e7eb] dark:bg-[#2a2a2a] animate-pulse" />)}</div>
            ) : items.length === 0 ? (
              <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-12 text-center">
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="font-semibold text-[#111111] dark:text-[#f5f5f5] mb-2">قائمة المفضلة فارغة</h3>
                <p className="text-[#6b7280] dark:text-[#a0a0a0] text-sm mb-6">احفظ المنتجات التي تعجبك</p>
                <Link href="/ar" className="inline-flex px-6 py-3 rounded-[8px] bg-[#d4a017] text-white font-medium text-sm hover:bg-[#a87400] transition-colors">تصفح المنتجات</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map(item => (
                  <div key={item.id} className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] overflow-hidden group relative">
                    <button onClick={() => handleRemove(item.product.id)}
                      className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#e5e7eb] dark:border-[#2a2a2a] flex items-center justify-center text-red-400 hover:text-red-600 shadow-sm text-xs font-bold">✕</button>
                    <Link href={`/ar/product/${item.product.slug}`}>
                      <div className="aspect-[3/4] bg-[#f0ede4] dark:bg-[#1a1a1a] overflow-hidden">
                        {item.product.images?.[0]
                          ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          : <div className="w-full h-full flex items-center justify-center text-4xl">👗</div>
                        }
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-[#6b7280] dark:text-[#a0a0a0]">{item.product.brand?.name}</p>
                        <p className="text-sm font-medium text-[#111111] dark:text-[#f5f5f5] truncate mt-0.5">{item.product.name}</p>
                        <p className="text-sm font-bold text-[#d4a017] mt-1">{(item.product.salePrice ?? item.product.price).toLocaleString('ar-SY')} ل.س</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}