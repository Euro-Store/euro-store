const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return m ? decodeURIComponent(m[1]) : null
}

async function req<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getCookie("admin_token")
  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  get:    <T>(url: string)                 => req<T>(url),
  post:   <T>(url: string, body: unknown)  => req<T>(url, { method:"POST",   body: JSON.stringify(body) }),
  put:    <T>(url: string, body: unknown)  => req<T>(url, { method:"PUT",    body: JSON.stringify(body) }),
  patch:  <T>(url: string, body: unknown)  => req<T>(url, { method:"PATCH",  body: JSON.stringify(body) }),
  delete: <T>(url: string)                 => req<T>(url, { method:"DELETE" }),
}
