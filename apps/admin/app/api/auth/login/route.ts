import { SignJWT } from "jose"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { prisma } from "@euro-store/db"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "euro-store-secret-key-change-in-prod"
)

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      return NextResponse.json({ error: "Invalid login credentials" }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({ where: { email } })
    if (!dbUser || dbUser.role !== "ADMIN") {
      return NextResponse.json({ error: "ليس لديك صلاحية الوصول" }, { status: 403 })
    }

    const token = await new SignJWT({ userId: dbUser.id, email, role: "ADMIN" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(SECRET)

    const res = NextResponse.json({ ok: true })
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 3600,
      sameSite: "strict",
    })
    return res
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ error: "server_error" }, { status: 500 })
  }
}