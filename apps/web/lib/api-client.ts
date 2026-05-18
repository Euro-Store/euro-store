const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

async function req<T>(method: Method, path: string, body?: unknown): Promise<T> {
  const opts: RequestInit = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }
  if (body !== undefined) opts.body = JSON.stringify(body)

  let res = await fetch(`${API_BASE}${path}`, opts)

  if (res.status === 401) {
    const refresh = await fetch(`${API_BASE}/auth/refresh`, { method: 'POST', credentials: 'include' })
    if (refresh.ok) res = await fetch(`${API_BASE}${path}`, opts)
    else throw new Error('UNAUTHORIZED')
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? 'حدث خطأ. حاول مرة أخرى.')
  }

  const text = await res.text()
  return text ? JSON.parse(text) : ({} as T)
}

export const api = {
  get:    <T>(path: string)                => req<T>('GET',    path),
  post:   <T>(path: string, body: unknown) => req<T>('POST',   path, body),
  put:    <T>(path: string, body: unknown) => req<T>('PUT',    path, body),
  patch:  <T>(path: string, body: unknown) => req<T>('PATCH',  path, body),
  delete: <T>(path: string)                => req<T>('DELETE', path),
}

export const authApi = {
  login:          (email: string, password: string) => api.post<AuthResponse>('/auth/login', { email, password }),
  register:       (d: RegisterInput)                => api.post<AuthResponse>('/auth/register', d),
  logout:         ()                                => api.post<void>('/auth/logout', {}),
  refresh:        ()                                => api.post<void>('/auth/refresh', {}),
  profile:        ()                                => api.get<{ user: User }>('/auth/profile'),
  changePassword: (d: ChangePasswordInput)          => api.post<{ message: string }>('/users/change-password', d),
}

export const cartApi = {
  get:    ()                               => api.get<CartResponse>('/cart'),
  add:    (variantId: string, qty: number) => api.post<CartResponse>('/cart/items', { variantId, quantity: qty }),
  update: (itemId: string, qty: number)    => api.patch<CartResponse>(`/cart/items/${itemId}`, { quantity: qty }),
  remove: (itemId: string)                 => api.delete<CartResponse>(`/cart/items/${itemId}`),
  clear:  ()                               => api.delete<void>('/cart'),
}

export const wishlistApi = {
  get:    ()                  => api.get<WishlistResponse>('/wishlist'),
  toggle: (productId: string) => api.post<{ added: boolean }>('/wishlist/toggle', { productId }),
}

export const ordersApi = {
  list:   ()              => api.get<{ orders: Order[] }>('/orders'),
  get:    (id: string)    => api.get<{ order: Order }>(`/orders/${id}`),
  create: (d: OrderInput) => api.post<{ order: Order }>('/orders', d),
}

export const addressesApi = {
  list:   ()                            => api.get<{ addresses: Address[] }>('/users/addresses'),
  add:    (d: AddressInput)             => api.post<{ address: Address }>('/users/addresses', d),
  update: (id: string, d: AddressInput) => api.put<{ address: Address }>(`/users/addresses/${id}`, d),
  delete: (id: string)                  => api.delete<void>(`/users/addresses/${id}`),
}

export interface User { id: string; name: string; email: string; phone?: string; role: string }
export interface RegisterInput { name: string; email: string; phone: string; password: string }
export interface ChangePasswordInput { currentPassword: string; newPassword: string }
export interface AuthResponse { user: User; message: string }
export interface Product {
  id: string; name: string; slug: string; price: number; salePrice?: number
  images: string[]; brand: { name: string }; category: { name: string }
}
export interface Cart { items: CartItem[]; subtotal: number }
export interface CartItem {
  id: string; quantity: number
  variant: { id: string; size: string; color: string }
  product: Product
}
export interface WishlistItem { id: string; product: Product }
export interface Order { id: string; status: string; total: number; createdAt: string; items: OrderItem[] }
export interface OrderItem { id: string; quantity: number; price: number; product: Product }
export interface OrderInput { addressId: string; paymentMethod: string; notes?: string }
export interface Address { id: string; label: string; city: string; street: string; building?: string; phone: string; isDefault: boolean }
export interface AddressInput { label: string; city: string; street: string; building?: string; phone: string; isDefault?: boolean }
export interface ProductsResponse { products: Product[]; total: number; page: number; limit: number }
export interface ProductResponse { product: Product }
export interface CartResponse { cart: Cart }
export interface WishlistResponse { items: WishlistItem[] }
