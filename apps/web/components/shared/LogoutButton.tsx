'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

interface LogoutButtonProps {
  className?: string
  /** 'icon' = أيقونة فقط | 'text' = نص فقط | 'full' = أيقونة + نص (الافتراضي) */
  variant?: 'icon' | 'text' | 'full'
}

export function LogoutButton({ className = '', variant = 'full' }: LogoutButtonProps) {
  const router = useRouter()
  const { isLoggedIn, clearAuth } = useAuthStore()
  const [loading, setLoading] = useState(false)

  // لا نعرض الزر للزوار غير المسجلين
  if (!isLoggedIn) return null

  async function handleLogout() {
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // نتجاهل الخطأ ونكمل تسجيل الخروج محلياً
    } finally {
      clearAuth()
      setLoading(false)
      router.push('/')
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-btn
        text-sm font-medium transition-colors
        text-red-600 hover:bg-red-50
        dark:text-red-400 dark:hover:bg-red-950/30
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label="تسجيل الخروج"
    >
      {/* أيقونة الخروج */}
      {(variant === 'icon' || variant === 'full') && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
          />
        </svg>
      )}
      {/* النص */}
      {(variant === 'text' || variant === 'full') && (
        <span>{loading ? 'جارٍ الخروج...' : 'تسجيل الخروج'}</span>
      )}
    </button>
  )
}
