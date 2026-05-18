import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "euro-store-secret-key-change-in-prod"
)

export async function verifyHelperToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    if (payload.role !== "HELPER") return null
    return payload as { userId: string; email: string; role: "HELPER"; exp: number }
  } catch { return null }
}
export function setHelperToken(token: string) {
  document.cookie = `helper_token=${token}; path=/; max-age=${7*24*3600}; SameSite=Strict`
}
export function clearHelperToken() {
  document.cookie = "helper_token=; path=/; max-age=0"
}
