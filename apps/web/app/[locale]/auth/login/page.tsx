'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { login, isLoading, error, clearError, isLoggedIn } = useAuthStore()
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect') || '/ar/account'

  useEffect(() => { if (isLoggedIn) router.replace(redirect) }, [isLoggedIn])
  useEffect(() => () => { clearError() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    try { await login(email, password); router.push(redirect) } catch {}
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/api/auth/callback` }
    })
  }

  const inp = 'w-full px-4 py-3 rounded-[8px] bg-[#f7f5ef] dark:bg-[#1a1a1a] border border-[#e5e7eb] dark:border-[#2a2a2a] text-[#111111] dark:text-[#f5f5f5] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#d4a017]/40 focus:border-[#d4a017] transition-all text-sm'

  return (
    <main className="min-h-screen bg-[#f7f5ef] dark:bg-[#0a0a0a] flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/ar"><span className="text-[2.4rem] font-extrabold tracking-tight text-[#d4a017]">Euro Store</span></Link>
          <p className="mt-2 text-[#6b7280] dark:text-[#a0a0a0] text-sm">مرحباً بعودتك</p>
        </div>
        <div className="bg-white dark:bg-[#121212] rounded-[12px] border border-[#e5e7eb] dark:border-[#2a2a2a] shadow-sm p-8">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-[8px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm text-center">{error}</div>
          )}

          {/* Google Login */}
          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-[8px] border border-[#e5e7eb] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] hover:bg-[#f7f5ef] dark:hover:bg-[#222] text-[#111111] dark:text-[#f5f5f5] font-medium text-sm transition-all disabled:opacity-50 mb-5">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 32.4 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 7.1 29 5 24 5 13 5 4 14 4 24s9 19 20 19c10 0 19-7 19-19 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 7.1 29 5 24 5c-7.7 0-14.3 4.3-17.7 9.7z"/>
              <path fill="#4CAF50" d="M24 43c5 0 9.5-1.9 12.9-5l-6-5C29.2 34.4 26.7 35 24 35c-5.2 0-9.6-2.6-11.3-6H6.4C9.7 38.6 16.4 43 24 43z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6 5c3.5-3.2 5.9-8 5.9-14.5 0-1.3-.1-2.7-.3-4z"/>
            </svg>
            {googleLoading ? 'جارٍ التحويل...' : 'تسجيل الدخول بـ Google'}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#e5e7eb] dark:bg-[#2a2a2a]"></div>
            <span className="text-xs text-[#9ca3af]">أو</span>
            <div className="flex-1 h-px bg-[#e5e7eb] dark:bg-[#2a2a2a]"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-[#111111] dark:text-[#f5f5f5] mb-2">البريد الإلكتروني</label>
              <input type="email" autoComplete="email" required dir="ltr"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" className={inp} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#111111] dark:text-[#f5f5f5]">كلمة المرور</label>
                <Link href="/ar/auth/forgot-password" className="text-xs text-[#d4a017] hover:text-[#a87400] transition-colors">نسيت كلمة المرور؟</Link>
              </div>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} autoComplete="current-password" required dir="ltr"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className={`${inp} pl-11`} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#d4a017] transition-colors text-base leading-none">
                  {showPwd ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={isLoading || !email || !password}
              className="w-full py-3 rounded-[8px] bg-[#d4a017] hover:bg-[#a87400] text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-[#e5e7eb] dark:border-[#2a2a2a] text-center">
            <p className="text-sm text-[#6b7280] dark:text-[#a0a0a0]">
              ليس لديك حساب؟{' '}
              <Link href="/ar/auth/register" className="text-[#d4a017] font-semibold hover:text-[#a87400] transition-colors">إنشاء حساب جديد</Link>
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/ar" className="text-sm text-[#6b7280] hover:text-[#d4a017] transition-colors">← العودة للصفحة الرئيسية</Link>
        </div>
      </div>
    </main>
  )
}
