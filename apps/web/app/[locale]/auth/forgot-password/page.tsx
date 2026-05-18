'use client'
import { useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api-client'

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null)
    try { await api.post('/auth/forgot-password', { email }); setSent(true) }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'حدث خطأ') }
    finally { setLoading(false) }
  }

  const inp = 'w-full px-4 py-3 rounded-[8px] bg-[#f7f5ef] dark:bg-[#1a1a1a] border border-[#e5e7eb] dark:border-[#2a2a2a] text-[#111111] dark:text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40 focus:border-[#d4a017] transition-all text-sm'

  return (
    <main className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/ar"><span className="text-[2.4rem] font-extrabold tracking-tight text-[#d4a017]">Euro Store</span></Link>
          <p className="mt-2 text-[#6b7280] dark:text-[#a0a0a0] text-sm">استعادة كلمة المرور</p>
        </div>
        <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] shadow-sm p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-lg font-semibold text-[#111111] dark:text-[#f5f5f5] mb-2">تم الإرسال!</h3>
              <p className="text-[#6b7280] dark:text-[#a0a0a0] text-sm mb-6">تحقق من بريدك واتبع التعليمات.</p>
              <Link href="/ar/auth/login" className="text-[#d4a017] font-medium text-sm hover:underline">العودة لتسجيل الدخول ←</Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#6b7280] dark:text-[#a0a0a0] mb-6">أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.</p>
              {error && <div className="mb-4 px-4 py-3 rounded-[8px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">البريد الإلكتروني</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} dir="ltr" placeholder="your@email.com" className={inp} />
                </div>
                <button type="submit" disabled={loading || !email}
                  className="w-full py-3 rounded-[8px] bg-[#d4a017] hover:bg-[#a87400] text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'جارٍ الإرسال...' : 'إرسال رابط الاستعادة'}
                </button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/ar/auth/login" className="text-sm text-[#6b7280] hover:text-[#d4a017] transition-colors">← العودة لتسجيل الدخول</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}