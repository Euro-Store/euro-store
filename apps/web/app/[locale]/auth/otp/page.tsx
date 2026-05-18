'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api-client'
import { useSearchParams, useRouter } from 'next/navigation'

export default function OtpPage() {
  const [otp, setOtp]         = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const inputs       = useRef<(HTMLInputElement | null)[]>([])
  const searchParams = useSearchParams()
  const router       = useRouter()
  const email        = searchParams.get('email') ?? ''

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]; next[i] = val; setOtp(next)
    if (val && i < 5) inputs.current[i + 1]?.focus()
  }
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputs.current[i - 1]?.focus()
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) return
    setLoading(true); setError(null)
    try { await api.post('/auth/verify-otp', { email, otp: code }); router.push('/ar/account') }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'رمز خاطئ. حاول مجدداً.') }
    finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/ar"><span className="text-[2.4rem] font-extrabold tracking-tight text-[#d4a017]">Euro Store</span></Link>
          <p className="mt-2 text-[#6b7280] dark:text-[#a0a0a0] text-sm">التحقق من الرمز</p>
        </div>
        <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] shadow-sm p-8">
          <p className="text-sm text-[#6b7280] dark:text-[#a0a0a0] text-center mb-6">
            أدخل الرمز المكوّن من 6 أرقام المرسل إلى <span className="font-medium text-[#111111] dark:text-[#f5f5f5]" dir="ltr">{email}</span>
          </p>
          {error && <div className="mb-5 px-4 py-3 rounded-[8px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm text-center">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 justify-center mb-6" dir="ltr">
              {otp.map((digit, i) => (
                <input key={i} ref={el => { inputs.current[i] = el }} type="text"
                  inputMode="numeric" maxLength={1} value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-[8px] bg-[#f7f5ef] dark:bg-[#1a1a1a] border-2 border-[#e5e7eb] dark:border-[#2a2a2a] text-[#111111] dark:text-[#f5f5f5] focus:outline-none focus:border-[#d4a017] transition-all" />
              ))}
            </div>
            <button type="submit" disabled={loading || otp.join('').length < 6}
              className="w-full py-3 rounded-[8px] bg-[#d4a017] hover:bg-[#a87400] text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'جارٍ التحقق...' : 'تأكيد الرمز'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/ar/auth/login" className="text-sm text-[#6b7280] hover:text-[#d4a017] transition-colors">← العودة لتسجيل الدخول</Link>
          </div>
        </div>
      </div>
    </main>
  )
}