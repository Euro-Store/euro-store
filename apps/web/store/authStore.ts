import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'CUSTOMER' | 'HELPER' | 'ADMIN'
  avatarUrl?: string
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  setUser: (user: User) => void
  updateUser: (data: Partial<User>) => void
  clearAuth: () => void
  fetchProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: true }),
      updateUser: (data) => set((s) => ({ user: s.user ? { ...s.user, ...data } : null })),
      clearAuth: () => set({ user: null, isLoggedIn: false }),
      fetchProfile: async () => {
        try {
          const res = await fetch('/api/auth/me')
          if (res.ok) {
            const data = await res.json()
            set({ user: data.user, isLoggedIn: true })
          } else {
            get().clearAuth()
          }
        } catch {
          // لا نفعل شيئاً إذا فشل الطلب
        }
      },
    }),
    { name: 'euro-auth' }
  )
)
