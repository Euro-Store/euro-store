import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@euro-store/db'
import type { UserRole, AuthUser } from '@euro-store/shared'

type AuthResult =
  | { error: NextResponse; user: null }
  | { error: null; user: AuthUser }

/** يستخرج المستخدم من جلسة Supabase ويتحقق من قاعدة البيانات */
export async function getAuthUser(req: NextRequest): Promise<AuthResult> {
  const supabase = createClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !session) {
    return {
      error: NextResponse.json({ error: 'غير مصرح — سجّل دخولك' }, { status: 401 }),
      user: null,
    }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      id: true, email: true, name: true, phone: true,
      avatarUrl: true, role: true, loyaltyPoints: true,
      loyaltyQrCode: true, isActive: true,
    },
  })

  if (!user || !user.isActive) {
    return {
      error: NextResponse.json({ error: 'الحساب غير موجود أو معطّل' }, { status: 401 }),
      user: null,
    }
  }

  return { error: null, user: user as AuthUser }
}

/** يتطلب دوراً معيناً — يُستخدم في نهاية دوال الـ API */
export async function requireRole(
  req: NextRequest,
  roles: UserRole[]
): Promise<AuthResult> {
  const result = await getAuthUser(req)
  if (result.error) return result

  if (!roles.includes(result.user.role)) {
    return {
      error: NextResponse.json({ error: 'لا تملك صلاحية هذا الإجراء' }, { status: 403 }),
      user: null,
    }
  }

  return result
}

/** Helper — يرد بـ JSON error مباشرة */
export function unauthorized(msg = 'غير مصرح') {
  return NextResponse.json({ error: msg }, { status: 401 })
}
export function forbidden(msg = 'ممنوع') {
  return NextResponse.json({ error: msg }, { status: 403 })
}
export function badRequest(msg = 'بيانات غير صحيحة') {
  return NextResponse.json({ error: msg }, { status: 400 })
}
export function serverError(e?: unknown) {
  console.error('[API Error]', e)
  return NextResponse.json({ error: 'خطأ في الخادم — حاول لاحقاً' }, { status: 500 })
}
