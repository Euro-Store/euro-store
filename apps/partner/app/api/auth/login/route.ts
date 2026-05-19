import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createClient } from "@supabase/supabase-js"
import { signToken } from "@/lib/auth"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (!email || !password)
    return NextResponse.json({ error: "البريد وكلمة المرور مطلوبان" }, { status: 400 })

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data.user)
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { email } })
  if (!dbUser || dbUser.role !== "PARTNER")
    return NextResponse.json({ error: "ليس لديك صلاحية الدخول" }, { status: 403 })

  const token = await signToken({ id: dbUser.id, email: dbUser.email, role: dbUser.role, name: dbUser.name ?? "" })

  const res = NextResponse.json({ ok: true, name: dbUser.name })
  res.cookies.set("partner_token", token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/"
  })
  return res
}