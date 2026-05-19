import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@euro-store/db'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ role: null }, { status: 401 })
    }
    const token = authHeader.substring(7)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user?.email) {
      return NextResponse.json({ role: null }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } })
    return NextResponse.json({ role: dbUser?.role ?? null })
  } catch (err) {
    console.error('Error in /api/auth/me:', err)
    return NextResponse.json({ role: null, error: 'server_error' }, { status: 500 })
  }
}