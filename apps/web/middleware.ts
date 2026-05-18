import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/account', '/checkout']
const AUTH_ROUTES = ['/auth/login', '/auth/register']

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove: (name, options) => {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const { pathname } = request.nextUrl

  // إزالة الـ locale prefix للمقارنة
  const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, '') || '/'

  // حماية الصفحات المحمية
  const isProtected = PROTECTED_PREFIXES.some(p => pathWithoutLocale.startsWith(p))
  if (isProtected && !session) {
    const locale = pathname.startsWith('/en') ? 'en' : 'ar'
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/auth/login`
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // إعادة توجيه المستخدم المسجّل من صفحات الـ Auth
  const isAuthRoute = AUTH_ROUTES.some(r => pathWithoutLocale.startsWith(r))
  if (isAuthRoute && session) {
    const locale = pathname.startsWith('/en') ? 'en' : 'ar'
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/account`
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/(ar|en)/(account|checkout)(.*)',
    '/(ar|en)/auth/(login|register)(.*)',
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
