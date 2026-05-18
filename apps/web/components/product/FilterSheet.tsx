'use client'
import { useState } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
const tabs = ['السعر','اللون','المقاس','البراند']
const sizeOptions = ['XS','S','M','L','XL','XXL','36','37','38','39','40','41','42']
const colors = [
  { label:'أسود', hex:'#000000' },{ label:'أبيض', hex:'#ffffff' },
  { label:'أزرق', hex:'#1d4ed8' },{ label:'أحمر', hex:'#dc2626' },
  { label:'ذهبي', hex:'#d4a017' },{ label:'رمادي', hex:'#6b7280' },
]
const brands = ['Zara','H&M','Nike','Mango','Boss','Fossil','Adidas']

export default function FilterSheet() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [selectedSizes,  setSelectedSizes]  = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceMax, setPriceMax] = useState(1000000)
  const totalActive = selectedSizes.length + selectedColors.length + selectedBrands.length
  function toggle<T>(arr: T[], item: T, set: (a: T[]) => void) {
    set(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item])
  }
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2 rounded-btn border border-light-border dark:border-dark-border text-sm font-semibold text-light-text dark:text-dark-text">
        <SlidersHorizontal size={15} />
        فلاتر{totalActive > 0 && <span className="w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center mr-1">{totalActive}</span>}
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 inset-x-0 bg-light-surface dark:bg-dark-surface rounded-t-2xl max-h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-2"><div className="w-10 h-1 bg-light-border dark:bg-dark-border rounded-full" /></div>
            <div className="flex items-center justify-between px-4 pb-3 border-b border-light-border dark:border-dark-border">
              <h3 className="font-bold text-light-text dark:text-dark-text">الفلاتر</h3>
              <button onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex overflow-x-auto scrollbar-hide border-b border-light-border dark:border-dark-border px-2">
              {tabs.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)}
                  className={`px-4 py-2.5 text-sm font-semibold flex-shrink-0 border-b-2 transition-colors
                    ${activeTab === i ? 'border-gold text-gold' : 'border-transparent text-light-muted dark:text-dark-muted'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 0 && (
                <div>
                  <input type="range" min={0} max={1000000} step={10000} value={priceMax}
                    onChange={e => setPriceMax(+e.target.value)} className="w-full accent-gold mb-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-light-muted dark:text-dark-muted">0</span>
                    <span className="text-gold font-bold">{priceMax.toLocaleString()} ل.س</span>
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div className="flex flex-wrap gap-3">
                  {colors.map(c => (
                    <button key={c.label} onClick={() => toggle(selectedColors, c.label, setSelectedColors)}
                      className={`w-10 h-10 rounded-full transition-all ${selectedColors.includes(c.label) ? 'ring-2 ring-gold ring-offset-2 scale-110' : ''}`}
                      style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid #e5e7eb' : 'none' }} />
                  ))}
                </div>
              )}
              {activeTab === 2 && (
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(s => (
                    <button key={s} onClick={() => toggle(selectedSizes, s, setSelectedSizes)}
                      className={`px-3 py-2 rounded-btn text-sm font-semibold border transition-all
                        ${selectedSizes.includes(s) ? 'bg-gold text-white border-gold' : 'border-light-border dark:border-dark-border text-light-text dark:text-dark-text'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {activeTab === 3 && (
                <div className="space-y-2">
                  {brands.map(b => (
                    <label key={b} className="flex items-center gap-3 py-2 cursor-pointer">
                      <input type="checkbox" checked={selectedBrands.includes(b)}
                        onChange={() => toggle(selectedBrands, b, setSelectedBrands)} className="w-4 h-4 accent-gold" />
                      <span className="text-sm text-light-text dark:text-dark-text">{b}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-light-border dark:border-dark-border flex gap-3">
              <button onClick={() => { setSelectedSizes([]); setSelectedColors([]); setSelectedBrands([]); setPriceMax(1000000) }}
                className="flex-1 py-3 rounded-btn border border-light-border dark:border-dark-border text-sm font-semibold text-light-text dark:text-dark-text">
                مسح الكل
              </button>
              <button onClick={() => setOpen(false)}
                className="flex-1 py-3 rounded-btn text-sm font-bold text-white"
                style={{ background:'linear-gradient(135deg,#d4a017,#a87400)' }}>
                عرض النتائج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}