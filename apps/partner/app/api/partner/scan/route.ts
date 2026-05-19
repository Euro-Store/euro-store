import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const user = await verifyAuth(req)
  if (!user || user.role !== "PARTNER")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { qrToken } = await req.json()
  if (!qrToken)
    return NextResponse.json({ error: "QR token مطلوب" }, { status: 400 })

  const exchange = await prisma.exchangeRequest.findUnique({
    where: { qrCode: qrToken },
    include: {
      order: {
        include: {
          user: { select: { name: true } },
          items: {
            include: {
              product: true
            }
          }
        }
      }
    }
  })

  if (!exchange)
    return NextResponse.json({ error: "QR غير صالح أو منتهي الصلاحية" }, { status: 404 })

  if (exchange.status !== "REQUESTED")
    return NextResponse.json({ error: "هذا الطلب تمت معالجته مسبقاً" }, { status: 400 })

  return NextResponse.json({ exchange })
}