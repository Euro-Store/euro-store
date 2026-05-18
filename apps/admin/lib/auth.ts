import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "euro-store-secret-key-change-in-prod"
)

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    if (payload.role !== "ADMIN") return null
    return payload as { userId: string; email: string; role: "ADMIN"; exp: number }
  } catch { return null }
}

export function setAdminToken(token: string) {
  document.cookie = `admin_token=${token}; path=/; max-age=${7*24*3600}; SameSite=Strict`
}
export function clearAdminToken() {
  document.cookie = "admin_token=; path=/; max-age=0"
}
export function getTokenFromHeader(cookieStr: string): string | null {
  const m = cookieStr.match(/admin_token=([^;]+)/)
  return m ? m[1] : null
}
