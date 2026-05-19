import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-me")

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/api/auth")
  const token = req.cookies.get("partner_token")?.value

  if (!isAuth) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url))
    try {
      const { payload } = await jwtVerify(token, SECRET)
      if ((payload as any).role !== "PARTNER")
        return NextResponse.redirect(new URL("/login", req.url))
    } catch {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"]
}