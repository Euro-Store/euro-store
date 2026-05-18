'use client'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function TopBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="bg-dark-base text-dark-text text-center py-2 px-4 text-sm font-medium relative">
      <span className="text-gold font-bold ml-1">🎉 عرض خاص!</span>
      شحن مجاني على الطلبات فوق{' '}
      <span className="text-gold font-bold">150,000 ل.س</span>
      <button
        onClick={() => setVisible(false)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark-text transition-colors"
        aria-label="إغلاق"
      >
        <X size={14} />
      </button>
    </div>
  )
}
