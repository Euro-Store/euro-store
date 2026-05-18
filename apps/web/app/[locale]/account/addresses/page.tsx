'use client'
import { useEffect, useState } from 'react'
import { addressesApi, type Address, type AddressInput } from '@/lib/api-client'
import { AccountSidebar } from '@/components/account/AccountSidebar'

const blank: AddressInput = { label: '', city: '', street: '', building: '', phone: '', isDefault: false }

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading,   setLoading]   = useState(true)
  const [showForm,  setShowForm]  = useState(false)
  const [form,      setForm]      = useState<AddressInput>(blank)
  const [saving,    setSaving]    = useState(false)

  const load = () => {
    addressesApi.list().then(r => setAddresses(r.addresses)).catch(() => {}).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    try { await addressesApi.add(form); setShowForm(false); setForm(blank); load() }
    catch (err: unknown) { alert(err instanceof Error ? err.message : 'حدث خطأ') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل تريد حذف هذا العنوان؟')) return
    try { await addressesApi.delete(id); setAddresses(a => a.filter(x => x.id !== id)) } catch {}
  }

  const inp = 'w-full px-3 py-2.5 rounded-[8px] bg-[#f7f5ef] dark:bg-[#1a1a1a] border border-[#e5e7eb] dark:border-[#2a2a2a] text-[#111111] dark:text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40 focus:border-[#d4a017] transition-all text-sm'

  return (
    <div className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] py-8 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#111111] dark:text-[#f5f5f5] mb-6">عناويني</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar />
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#6b7280] dark:text-[#a0a0a0]">{addresses.length} عنوان</p>
              <button onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 rounded-[8px] bg-[#d4a017] hover:bg-[#a87400] text-white text-sm font-medium transition-colors">
                + إضافة عنوان
              </button>
            </div>
            {showForm && (
              <div className="bg-white dark:bg-[#121212] rounded-[12px] border-2 border-[#d4a017] p-6 mb-4">
                <h3 className="font-semibold text-[#111111] dark:text-[#f5f5f5] mb-4 text-sm">عنوان جديد</h3>
                <form onSubmit={handleAdd} className="grid grid-cols-2 gap-3">
                  {[
                    { k:'label',    label:'التسمية',                  full:false, req:true  },
                    { k:'phone',    label:'رقم الهاتف',                full:false, req:true  },
                    { k:'city',     label:'المدينة',                   full:false, req:true  },
                    { k:'street',   label:'الشارع',                    full:false, req:true  },
                    { k:'building', label:'المبنى / الطابق (اختياري)', full:true,  req:false },
                  ].map(f => (
                    <div key={f.k} className={f.full ? 'col-span-2' : ''}>
                      <label className="block text-xs font-medium text-[#111111] dark:text-[#f5f5f5] mb-1">{f.label}</label>
                      <input type="text" required={f.req}
                        value={((form as unknown) as Record<string,unknown>)[f.k] as string}
                        onChange={e => setForm(x => ({ ...x, [f.k]: e.target.value }))}
                        className={inp} />
                    </div>
                  ))}
                  <div className="col-span-2 flex items-center gap-2">
                    <input type="checkbox" id="isDefault" checked={!!form.isDefault}
                      onChange={e => setForm(x => ({ ...x, isDefault: e.target.checked }))}
                      className="accent-[#d4a017] w-4 h-4" />
                    <label htmlFor="isDefault" className="text-sm text-[#111111] dark:text-[#f5f5f5]">جعله العنوان الافتراضي</label>
                  </div>
                  <div className="col-span-2 flex gap-3">
                    <button type="submit" disabled={saving}
                      className="px-5 py-2.5 rounded-[8px] bg-[#d4a017] hover:bg-[#a87400] text-white text-sm font-medium transition-colors disabled:opacity-50">
                      {saving ? 'جارٍ الحفظ...' : 'حفظ العنوان'}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className="px-5 py-2.5 rounded-[8px] border border-[#e5e7eb] dark:border-[#2a2a2a] text-[#111111] dark:text-[#f5f5f5] text-sm hover:bg-[#f0ede4] dark:hover:bg-[#1a1a1a] transition-colors">
                      إلغاء
                    </button>
                  </div>
                </form>
              </div>
            )}
            {loading ? (
              <div className="space-y-3">{[1,2].map(i=><div key={i} className="h-20 rounded-[12px] bg-[#e5e7eb] dark:bg-[#2a2a2a] animate-pulse"/>)}</div>
            ) : addresses.length === 0 && !showForm ? (
              <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-12 text-center">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="font-semibold text-[#111111] dark:text-[#f5f5f5] mb-2">لا توجد عناوين مضافة</h3>
                <p className="text-[#6b7280] dark:text-[#a0a0a0] text-sm">أضف عنواناً لتسريع عملية الشراء</p>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map(addr => (
                  <div key={addr.id} className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] p-5 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#111111] dark:text-[#f5f5f5] text-sm">{addr.label}</span>
                        {addr.isDefault && <span className="px-2 py-0.5 rounded-full bg-[#d4a017]/10 text-[#d4a017] text-xs font-medium">افتراضي</span>}
                      </div>
                      <p className="text-[#6b7280] dark:text-[#a0a0a0] text-sm">{addr.city}، {addr.street}{addr.building ? `، ${addr.building}` : ''}</p>
                      <p className="text-[#6b7280] dark:text-[#a0a0a0] text-sm mt-1" dir="ltr">{addr.phone}</p>
                    </div>
                    <button onClick={() => handleDelete(addr.id)} className="text-red-400 hover:text-red-600 transition-colors text-sm">حذف</button>
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
