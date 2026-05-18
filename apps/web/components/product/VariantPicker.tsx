'use client'
import { useState } from 'react'

interface Size  { label: string; available: boolean }
interface Color { label: string; hex: string; available: boolean }
interface Props { sizes: Size[]; colors: Color[]; onSizeChange?: (s: string) => void; onColorChange?: (c: string) => void }

export default function VariantPicker({ sizes, colors, onSizeChange, onColorChange }: Props) {
  const [selectedSize,  setSelectedSize]  = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)

  return (
    <div className="space-y-5">
      {colors.length > 0 && (
        <div>
          <p className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-widest mb-3">
            اللون: <span className="text-light-text dark:text-dark-text">{selectedColor ?? '—'}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map(c => (
              <button key={c.label}
                onClick={() => { if (c.available) { setSelectedColor(c.label); onColorChange?.(c.label) } }}
                title={c.label} disabled={!c.available}
                className={`w-8 h-8 rounded-full transition-all ${!c.available ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}
                  ${selectedColor === c.label ? 'ring-2 ring-gold ring-offset-2 scale-110' : ''}`}
                style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid #e5e7eb' : 'none' }} />
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className={`text-xs font-bold uppercase tracking-widest ${sizeError ? 'text-red-500' : 'text-light-muted dark:text-dark-muted'}`}>
            {sizeError ? 'الرجاء اختيار مقاس' : 'المقاس'}
          </p>
          <button className="text-xs text-gold hover:text-gold-deep underline transition-colors">دليل المقاسات</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map(s => (
            <button key={s.label}
              onClick={() => { if (s.available) { setSelectedSize(s.label); setSizeError(false); onSizeChange?.(s.label) } }}
              disabled={!s.available}
              className={`min-w-[44px] h-11 px-3 rounded-btn text-sm font-semibold transition-all
                ${!s.available ? 'opacity-30 line-through cursor-not-allowed border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted'
                  : selectedSize === s.label
                    ? 'bg-dark-base text-white border-2 border-dark-base dark:bg-gold dark:border-gold'
                    : 'border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-gold hover:text-gold'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}