"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "فشل تسجيل الدخول")
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#d4a01720] border border-[#d4a01740] flex items-center justify-center mx-auto mb-4">
            <span className="text-xl sm:text-2xl">🏪</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#d4a017]">Euro Store</h1>
          <p className="text-[#a0a0a0] mt-2 text-sm sm:text-base">بوابة الهيلبر</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-5 sm:p-8 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm text-[#a0a0a0] mb-1.5 sm:mb-2">البريد الإلكتروني</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm sm:text-base focus:border-[#d4a017] outline-none transition"
              required placeholder="helper@eurostore.com"
              autoComplete="email" inputMode="email" />
          </div>
          <div>
            <label className="block text-sm text-[#a0a0a0] mb-1.5 sm:mb-2">كلمة المرور</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm sm:text-base focus:border-[#d4a017] outline-none transition"
              required placeholder="••••••••"
              autoComplete="current-password" />
          </div>
          {error && <p className="text-[#dc2626] text-xs sm:text-sm bg-[#dc262615] px-3 py-2 rounded-lg text-right">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-2.5 sm:py-3 bg-[#d4a017] hover:bg-[#f2c94c] active:bg-[#b8860f] text-[#0a0a0a] font-bold rounded-lg transition disabled:opacity-50 text-sm sm:text-base touch-manipulation">
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  )
}