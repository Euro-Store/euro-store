"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) throw new Error(authError.message)

      // تحقق من الـ role عبر API
      const res = await fetch("/api/auth/me", {
        headers: { "Authorization": `Bearer ${data.session?.access_token}` }
      })
      const userData = await res.json()
      if (userData?.role !== "ADMIN") {
        await supabase.auth.signOut()
        throw new Error("ليس لديك صلاحية الوصول")
      }
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#d4a017]">Euro Store</h1>
          <p className="text-[#a0a0a0] mt-2">لوحة الإدارة</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-8 space-y-5">
          <div>
            <label className="block text-sm text-[#a0a0a0] mb-2">البريد الإلكتروني</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] focus:border-[#d4a017] outline-none transition"
              required placeholder="admin@eurostore.com" />
          </div>
          <div>
            <label className="block text-sm text-[#a0a0a0] mb-2">كلمة المرور</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] focus:border-[#d4a017] outline-none transition"
              required placeholder="••••••••" />
          </div>
          {error && <p className="text-[#dc2626] text-sm bg-[#dc262615] px-3 py-2 rounded-lg">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#d4a017] hover:bg-[#f2c94c] text-[#0a0a0a] font-bold rounded-lg transition disabled:opacity-50">
            {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  )
}