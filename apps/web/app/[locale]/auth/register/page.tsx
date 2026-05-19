'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setUser } = useAuthStore()
  const router = useRouter()

  const setF = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(x => ({ ...x, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('كلمتا المرور غير متطابقتين'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'خطأ في إنشاء الحساب')
      setUser(data.user)
      router.replace('/ar')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'خطأ غير متوقع')
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full px-4 py-2.5 rounded-btn border border-light-border dark:border-dark-border bg-light-base dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-gold text-sm"

  return (
    <main className="min-h-screen flex items-center justify-center bg-light-base dark:bg-dark-base px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold">Euro Store</h1>
          <p className="mt-2 text-sm text-light-text-muted dark:text-dark-text-muted">إنشاء حساب جديد</p>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface rounded-card shadow-lg p-8">
          {error && <div className="mb-4 p-3 rounded-btn bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            {[
              { k:'name',     label:'الاسم الكامل',       type:'text',     req:true },
              { k:'email',    label:'البريد الإلكتروني',  type:'email',    req:true },
              { k:'phone',    label:'رقم الهاتف',         type:'tel',      req:false },
              { k:'password', label:'كلمة المرور',        type:'password', req:true },
              { k:'confirm',  label:'تأكيد كلمة المرور', type:'password', req:true },
            ].map(f => (
              <div key={f.k}>
                <label className="block text-sm font-medium mb-1">{f.label}</label>
                <input type={f.type} required={f.req}
                  value={(form as Record<string,string>)[f.k]}
                  onChange={setF(f.k)} className={inp} />
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-btn font-semibold text-sm bg-gold text-dark-base hover:bg-gold-light active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all mt-2">
              {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-light-text-muted dark:text-dark-text-muted">
            لديك حساب بالفعل؟{' '}
            <Link href="/ar/auth/login" className="text-gold font-medium hover:underline">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
