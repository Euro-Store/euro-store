'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
interface Props { title: string; children: React.ReactNode; defaultOpen?: boolean }
export default function Accordion({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-light-border dark:border-dark-border">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-sm font-semibold text-light-text dark:text-dark-text hover:text-gold transition-colors">
        {title}
        <ChevronDown size={16} className={`transition-transform text-light-muted dark:text-dark-muted ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-4 text-sm text-light-muted dark:text-dark-muted leading-relaxed animate-fadeUp">{children}</div>}
    </div>
  )
}