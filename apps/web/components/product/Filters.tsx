'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const filterSections = [
  {
    id: 'price', label: 'السعر',
    type: 'range',
    min: 0, max: 1000000,
  },
  {
    id: 'size', label: 'المقاس',
    type: 'multi',
    options: ['XS','S','M','L','XL','XXL','36','37','38','39','40','41','42'],
  },
  {
    id: 'color', label: 'اللون',
    type: 'color',
    options: [
      { label:'أسود',  value:'black',  hex:'#000000' },
      { label:'أبيض',  value:'white',  hex:'#ffffff' },
      { label:'أزرق',  value:'blue',   hex:'#1d4ed8' },
      { label:'أحمر',  value:'red',    hex:'#dc2626' },
      { label:'أخضر',  value:'green',  hex:'#16a34a' },
      { label:'ذهبي',  value:'gold',   hex:'#d4a017' },
      { label:'رمادي', value:'gray',   hex:'#6b7280' },
    ],
  },
  {
    id: 'brand', label: 'البراند',
    type: 'multi',
    options: ['Zara','H&M','Nike','Mango','Boss','Levi\'s','Fossil','Adidas'],
  },
  {
    id: 'discount', label: 'الخصم',
    type: 'multi',
    options: ['10٪ فأكثر','20٪ فأكثر','30٪ فأكثر','50٪ فأكثر'],
  },
]

export default function Filters() {
  const [open,     setOpen]     = useState<Record<string, boolean>>({ price:true, size:true, color:true })
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [priceRange, setRange]  = useState([0, 1000000])

  function toggle(sectionId: string, value: string) {
    setSelected(prev => {
      const cur = prev[sectionId] ?? []
      return { ...prev, [sectionId]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] }
    })
  }

  function clearAll() { setSelected({}); setRange([0, 1000000]) }

  const totalActive = Object.values(selected).flat().length

  return (
    <aside className="w-60 flex-shrink-0">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-light-text dark:text-dark-text">الفلاتر</h3>
        {totalActive > 0 && (
          <button onClick={clearAll} className="text-xs text-gold hover:text-gold-deep transition-colors font-semibold">
            مسح الكل ({totalActive})
          </button>
        )}
      </div>

      <div className="space-y-1">
        {filterSections.map((section) => (
          <div key={section.id} className="border-b border-light-border dark:border-dark-border pb-4 mb-1">
            <button
              onClick={() => setOpen(p => ({ ...p, [section.id]: !p[section.id] }))}
              className="flex items-center justify-between w-full py-3 text-sm font-semibold
                         text-light-text dark:text-dark-text hover:text-gold transition-colors">
              {section.label}
              <ChevronDown size={14} className={`transition-transform ${open[section.id] ? 'rotate-180' : ''}`} />
            </button>

            {open[section.id] && (
              <div className="mt-1">
                {section.type === 'multi' && section.options && (
                  <div className="flex flex-wrap gap-2">
                    {(section.options as string[]).map((opt) => {
                      const active = selected[section.id]?.includes(opt)
                      return (
                        <button key={opt} onClick={() => toggle(section.id, opt)}
                          className={`px-2.5 py-1 rounded-btn text-xs font-semibold transition-all
                            ${active
                              ? 'bg-gold text-white shadow-gold'
                              : 'bg-light-elevated dark:bg-dark-elevated text-light-text dark:text-dark-text hover:border-gold border border-light-border dark:border-dark-border'}`}>
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                )}

                {section.type === 'color' && section.options && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(section.options as { label:string; value:string; hex:string }[]).map((c) => {
                      const active = selected[section.id]?.includes(c.value)
                      return (
                        <button key={c.value} onClick={() => toggle(section.id, c.value)}
                          title={c.label}
                          className={`w-7 h-7 rounded-pill transition-all hover:scale-110
                            ${active ? 'ring-2 ring-gold ring-offset-2 scale-110' : ''}`}
                          style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid #e5e7eb' : 'none' }}
                        />
                      )
                    })}
                  </div>
                )}

                {section.type === 'range' && (
                  <div className="px-1 mt-2">
                    <input type="range" min={0} max={1000000} step={10000}
                      value={priceRange[1]}
                      onChange={e => setRange([0, +e.target.value])}
                      className="w-full accent-gold" />
                    <div className="flex justify-between text-xs text-light-muted dark:text-dark-muted mt-1">
                      <span>0</span>
                      <span className="text-gold font-semibold">{priceRange[1].toLocaleString('ar-SY')} ل.س</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
