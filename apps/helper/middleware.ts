import { NextRequest, NextResponse } from "next/server"
import { verifyHelperToken } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("helper_token")?.value
    if (!token) return NextResponse.redirect(new URL("/login", req.url))
    const payload = await verifyHelperToken(token)
    if (!payload) {
      const res = NextResponse.redirect(new URL("/login", req.url))
      res.cookies.delete("helper_token")
      return res
    }
  }
  return NextResponse.next()
}
export const config = { matcher: ["/dashboard/:path*"] }
