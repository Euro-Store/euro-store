'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useAuthStore } from '@/store/authStore'

/**
 * useAuthGuard
 * يستخدم للإجراءات التي تتطلب تسجيل دخول.
 * إذا لم يكن المستخدم مسجلاً → يحفظ returnUrl ويحوّله لصفحة الدخول.
 */
export function useAuthGuard() {
  const router = useRouter()
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  const requireAuth = useCallback(
    (action: () => void, returnUrl?: string) => {
      if (isLoggedIn) {
        action()
        return
      }
      // حفظ returnUrl للعودة بعد تسجيل الدخول
      const url = returnUrl ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('returnUrl', url)
      }
      router.push('/auth/login')
    },
    [isLoggedIn, router]
  )

  return { requireAuth, isLoggedIn }
}
