import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi, type User, type RegisterInput } from '@/lib/api-client'

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterInput) => Promise<void>
  logout: () => Promise<void>
  fetchProfile: () => Promise<void>
  updateUser: (u: Partial<User>) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { user } = await authApi.login(email, password)
          set({ user, isLoggedIn: true, isLoading: false })
        } catch (err: unknown) {
          set({ error: err instanceof Error ? err.message : 'خطأ في تسجيل الدخول', isLoading: false })
          throw err
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const { user } = await authApi.register(data)
          set({ user, isLoggedIn: true, isLoading: false })
        } catch (err: unknown) {
          set({ error: err instanceof Error ? err.message : 'خطأ في إنشاء الحساب', isLoading: false })
          throw err
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try { await authApi.logout() } catch { /* ignore */ }
        set({ user: null, isLoggedIn: false, isLoading: false, error: null })
      },

      fetchProfile: async () => {
        try {
          const { user } = await authApi.profile()
          set({ user, isLoggedIn: true })
        } catch {
          if (get().isLoggedIn) set({ user: null, isLoggedIn: false })
        }
      },

      updateUser: (data) => {
        const u = get().user
        if (u) set({ user: { ...u, ...data } })
      },

      clearError: () => set({ error: null }),
    }),
    { name: 'euro-auth', partialize: (s) => ({ user: s.user, isLoggedIn: s.isLoggedIn }) }
  )
)
