'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const suggestions = ['قميص رجالي','فستان سهرة','حذاء رياضي','حقيبة جلد','جاكيت شتوي','ساعة أنيقة']

export default function SearchBar() {
  const [open,  setOpen]  = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router   = useRouter()

  useEffect(() => { if (open) inputRef.current?.focus() }, [open])

  const filtered = suggestions.filter(s => s.includes(query) || query === '')

  function submit(q: string) {
    if (!q.trim()) return
    router.push(`/ar/search?q=${encodeURIComponent(q)}`)
    setOpen(false); setQuery('')
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="p-2 rounded-btn text-light-muted dark:text-dark-muted hover:text-gold transition-colors"
        aria-label="بحث">
        <Search size={18} />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col" onClick={() => setOpen(false)}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      {/* Search box */}
      <div className="relative z-10 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border px-4 py-3"
        onClick={e => e.stopPropagation()}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Search size={18} className="text-gold flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit(query)}
            placeholder="ابحث عن ملابس، أحذية، إكسسوار..."
            className="flex-1 bg-transparent text-light-text dark:text-dark-text placeholder:text-light-muted dark:placeholder:text-dark-muted outline-none text-base"
          />
          <button onClick={() => setOpen(false)} className="text-light-muted hover:text-gold transition-colors">
            <X size={18} />
          </button>
        </div>
        {/* Suggestions */}
        {filtered.length > 0 && (
          <div className="max-w-2xl mx-auto mt-3 flex flex-wrap gap-2">
            {filtered.map(s => (
              <button key={s} onClick={() => submit(s)}
                className="px-3 py-1 rounded-pill bg-light-elevated dark:bg-dark-elevated
                           text-light-muted dark:text-dark-muted text-sm hover:bg-gold hover:text-white transition-all">
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
