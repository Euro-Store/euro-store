import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-me")

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET)
}

export async function verifyAuth(req?: NextRequest) {
  try {
    let token: string | undefined
    if (req) {
      token = req.cookies.get("partner_token")?.value
      if (!token) {
        const auth = req.headers.get("authorization") ?? ""
        token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined
      }
    } else {
      token = cookies().get("partner_token")?.value
    }
    if (!token) return null
    const { payload } = await jwtVerify(token, SECRET)
    return payload as { id: string; email: string; role: string; name: string }
  } catch {
    return null
  }
}