import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, serverError } from '@/lib/auth/middleware'

export async function GET(req: NextRequest) {
  try {
    const { error, user } = await getAuthUser(req)
    if (error) return error
    return NextResponse.json({ user })
  } catch (e) { return serverError(e) }
}
