'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'خطأ في تسجيل الدخول')
      setUser(data.user)
      const returnUrl =
        (typeof window !== 'undefined' && sessionStorage.getItem('returnUrl')) ||
        searchParams.get('return') ||
        '/ar'
      sessionStorage.removeItem('returnUrl')
      router.replace(returnUrl)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'خطأ غير متوقع')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-light-base dark:bg-dark-base px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold">Euro Store</h1>
          <p className="mt-2 text-sm text-light-text-muted dark:text-dark-text-muted">
            سجّل دخولك للمتابعة
          </p>
        </div>

        <div className="bg-light-surface dark:bg-dark-surface rounded-card shadow-lg p-8">
          {error && (
            <div className="mb-4 p-3 rounded-btn bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" dir="rtl">
            <div>
              <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full px-4 py-2.5 rounded-btn border border-light-border dark:border-dark-border bg-light-base dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-gold text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-btn border border-light-border dark:border-dark-border bg-light-base dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-gold text-sm"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="/ar/auth/forgot-password" className="text-gold hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-btn font-semibold text-sm bg-gold text-dark-base hover:bg-gold-light active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-4">
            <div className="relative flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
              <span className="text-xs text-light-text-muted dark:text-dark-text-muted">أو</span>
              <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full py-2.5 rounded-btn border border-light-border dark:border-dark-border hover:bg-light-elevated dark:hover:bg-dark-elevated text-sm font-medium transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              المتابعة مع Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-light-text-muted dark:text-dark-text-muted">
            ليس لديك حساب؟{' '}
            <Link href="/ar/auth/register" className="text-gold font-medium hover:underline">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}