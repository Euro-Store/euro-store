import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@euro-store/db'
import { serverError } from '@/lib/auth/middleware'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'البريد وكلمة المرور مطلوبان' }, { status: 400 })
    }

    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) return NextResponse.json({ error: error.message }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true, email: true, name: true, phone: true,
        avatarUrl: true, role: true, loyaltyPoints: true, loyaltyQrCode: true,
      },
    })

    if (!user) return NextResponse.json({ error: 'المستخدم غير موجود' }, { status: 404 })

    return NextResponse.json({ user, session: data.session })
  } catch (e) { return serverError(e) }
}
