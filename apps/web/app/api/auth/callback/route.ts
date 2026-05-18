// Google OAuth callback — Supabase يُوجّه هنا بعد تسجيل الدخول الاجتماعي
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@euro-store/db'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/ar/account'

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user?.email) {
      // إنشاء مستخدم في DB إذا لم يكن موجوداً (Social Login أول مرة)
      await prisma.user.upsert({
        where: { email: data.user.email },
        update: {
          name: data.user.user_metadata?.name || data.user.user_metadata?.full_name || '',
          avatarUrl: data.user.user_metadata?.avatar_url || null,
        },
        create: {
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.user_metadata?.full_name || 'مستخدم',
          avatarUrl: data.user.user_metadata?.avatar_url || null,
          role: 'CUSTOMER',
        },
      })

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/ar/auth/login?error=auth_callback_failed`)
}
