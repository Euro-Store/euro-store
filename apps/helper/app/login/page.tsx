"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { setHelperToken } from "@/lib/auth"

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL||"http://localhost:5000/api"}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "فشل تسجيل الدخول")
      if (data.user?.role !== "HELPER") throw new Error("هذه البوابة مخصصة للهيلبرز فقط")
      setHelperToken(data.accessToken)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#d4a01720] border border-[#d4a01740] flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏪</span>
          </div>
          <h1 className="text-3xl font-bold text-[#d4a017]">Euro Store</h1>
          <p className="text-[#a0a0a0] mt-2">بوابة الهيلبر</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-8 space-y-5">
          <div>
            <label className="block text-sm text-[#a0a0a0] mb-2">البريد الإلكتروني</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] focus:border-[#d4a017] outline-none transition"
              required placeholder="helper@eurostore.com" />
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
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  )
}
