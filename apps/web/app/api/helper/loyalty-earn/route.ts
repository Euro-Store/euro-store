// هذا Route يُعيد توجيه لـ /api/loyalty/earn — للتوافق
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  url.pathname = '/api/loyalty/earn'
  return NextResponse.rewrite(url)
}
