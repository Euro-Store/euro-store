import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'
import { prisma } from '@euro-store/db'

// جلب بيانات المستخدم من QR Code (للـ Helper عند المسح)
export async function GET(req: NextRequest) {
  try {
    const qr = req.nextUrl.searchParams.get('code')
    if (!qr) return NextResponse.json({ error: 'QR Code مطلوب' }, { status: 400 })

    // التحقق من أن الطالب هو Helper أو Admin
    const { error, user: caller } = await getAuthUser(req)
    if (error) return error
    if (!['HELPER', 'ADMIN'].includes(caller.role)) {
      return NextResponse.json({ error: 'مخصص للمساعدين فقط' }, { status: 403 })
    }

    const customer = await prisma.user.findUnique({
      where: { loyaltyQrCode: qr },
      select: { id: true, name: true, loyaltyPoints: true, loyaltyQrCode: true },
    })

    if (!customer) return NextResponse.json({ error: 'QR Code غير صالح' }, { status: 404 })

    const settings = await prisma.loyaltySettings.findUnique({ where: { id: 'global' } })

    return NextResponse.json({
      customer,
      pointValueSyp: settings?.pointValueSyp ?? 10,
    })
  } catch (e) { return serverError(e) }
}
