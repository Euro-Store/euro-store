'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const { register, isLoading, error, clearError } = useAuthStore()
  const router = useRouter()

  const setF = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const pwdMatch = form.confirm === '' || form.password === form.confirm

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); clearError()
    if (!pwdMatch) return
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      router.push('/ar/account')
    } catch {}
  }

  const inp = 'w-full px-4 py-3 rounded-[8px] bg-[#f7f5ef] dark:bg-[#1a1a1a] border border-[#e5e7eb] dark:border-[#2a2a2a] text-[#111111] dark:text-[#f5f5f5] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40 focus:border-[#d4a017] transition-all text-sm'

  return (
    <main className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/ar"><span className="text-[2.4rem] font-extrabold tracking-tight text-[#d4a017]">Euro Store</span></Link>
          <p className="mt-2 text-[#6b7280] dark:text-[#a0a0a0] text-sm">أنشئ حسابك وابدأ التسوق</p>
        </div>
        <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] shadow-sm p-8">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-[8px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {[
              { k:'name',     label:'الاسم الكامل',      type:'text',     ph:'محمد أحمد',        ltr:false },
              { k:'email',    label:'البريد الإلكتروني', type:'email',    ph:'your@email.com',   ltr:true  },
              { k:'phone',    label:'رقم الهاتف',         type:'tel',      ph:'+963 9xx xxx xxx', ltr:true  },
            ].map(f => (
              <div key={f.k}>
                <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">{f.label}</label>
                <input type={f.type} required value={(form as Record<string,string>)[f.k]}
                  onChange={setF(f.k)} placeholder={f.ph} dir={f.ltr ? 'ltr' : undefined} className={inp} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">كلمة المرور</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} required minLength={8}
                  value={form.password} onChange={setF('password')} dir="ltr" placeholder="••••••••" className={`${inp} pl-11`} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#d4a017] transition-colors text-base">{showPwd ? '🙈' : '👁'}</button>
              </div>
              <p className="mt-1 text-xs text-[#9ca3af]">8 أحرف على الأقل</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">تأكيد كلمة المرور</label>
              <input type="password" required value={form.confirm} onChange={setF('confirm')} dir="ltr" placeholder="••••••••"
                className={`${inp} ${!pwdMatch ? '!border-red-400 dark:!border-red-600' : ''}`} />
              {!pwdMatch && <p className="mt-1 text-xs text-red-500">كلمتا المرور غير متطابقتين</p>}
            </div>
            <button type="submit" disabled={isLoading || !pwdMatch || !form.name || !form.email || !form.phone || !form.password}
              className="w-full py-3 rounded-[8px] bg-[#d4a017] hover:bg-[#a87400] text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-[#e5e7eb] dark:border-[#2a2a2a] text-center">
            <p className="text-sm text-[#6b7280] dark:text-[#a0a0a0]">
              لديك حساب؟{' '}
              <Link href="/ar/auth/login" className="text-[#d4a017] font-semibold hover:text-[#a87400] transition-colors">تسجيل الدخول</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}