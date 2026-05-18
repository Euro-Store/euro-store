'use client'
import { useState } from 'react'
import { ChevronDown, LayoutGrid, List } from 'lucide-react'

const sortOptions = [
  { label:'الأكثر طلباً',   value:'popular'    },
  { label:'الأحدث',         value:'newest'     },
  { label:'السعر: الأقل',   value:'price_asc'  },
  { label:'السعر: الأعلى',  value:'price_desc' },
  { label:'الخصم الأكبر',   value:'discount'   },
]

interface Props { total: number; onSort?: (v: string) => void; onView?: (v: 'grid'|'list') => void }

export default function SortBar({ total, onSort, onView }: Props) {
  const [sort, setSort]   = useState('popular')
  const [open, setOpen]   = useState(false)
  const [view, setView]   = useState<'grid'|'list'>('grid')
  const label = sortOptions.find(o => o.value === sort)?.label ?? ''

  return (
    <div className="flex items-center justify-between py-3 border-b border-light-border dark:border-dark-border">
      <p className="text-sm text-light-muted dark:text-dark-muted">
        <span className="font-bold text-light-text dark:text-dark-text">{total}</span> منتج
      </p>

      <div className="flex items-center gap-3">
        {/* View toggle */}
        <div className="hidden md:flex border border-light-border dark:border-dark-border rounded-btn overflow-hidden">
          {(['grid','list'] as const).map((v) => (
            <button key={v} onClick={() => { setView(v); onView?.(v) }}
              className={`p-2 transition-colors ${view === v ? 'bg-gold text-white' : 'text-light-muted dark:text-dark-muted hover:text-gold'}`}>
              {v === 'grid' ? <LayoutGrid size={15} /> : <List size={15} />}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-btn border border-light-border dark:border-dark-border
                       text-sm text-light-text dark:text-dark-text hover:border-gold transition-colors">
            {label} <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="absolute left-0 top-full mt-1 w-44 rounded-card bg-light-surface dark:bg-dark-surface
                            border border-light-border dark:border-dark-border shadow-card-hover z-20 animate-slideDown">
              {sortOptions.map((o) => (
                <button key={o.value} onClick={() => { setSort(o.value); onSort?.(o.value); setOpen(false) }}
                  className={`w-full text-right px-4 py-2.5 text-sm transition-colors
                    ${sort === o.value ? 'text-gold font-semibold' : 'text-light-text dark:text-dark-text hover:text-gold'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
