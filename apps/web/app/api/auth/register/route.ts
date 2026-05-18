import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@euro-store/db'
import { serverError } from '@/lib/auth/middleware'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phone } = await req.json()
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'الاسم والبريد وكلمة المرور مطلوبة' }, { status: 400 })
    }

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name } },
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    // إنشاء سجل في DB
    const user = await prisma.user.create({
      data: { email, name, phone: phone || null, role: 'CUSTOMER' },
      select: { id: true, email: true, name: true, role: true, loyaltyQrCode: true },
    })

    return NextResponse.json({
      user,
      session: data.session,
      message: 'تم التسجيل — تحقق من بريدك الإلكتروني لتأكيد الحساب',
    }, { status: 201 })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return NextResponse.json({ error: 'البريد الإلكتروني مسجّل مسبقاً' }, { status: 409 })
    }
    return serverError(e)
  }
}
