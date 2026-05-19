import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await verifyAuth(req)
  if (!user || user.role !== "PARTNER")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { reason } = await req.json()
  const exchange = await prisma.exchangeRequest.findUnique({ where: { id: params.id } })
  if (!exchange)
    return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 })
  if (exchange.status !== "REQUESTED")
    return NextResponse.json({ error: "لا يمكن رفض هذا الطلب" }, { status: 400 })

  const updated = await prisma.exchangeRequest.update({
    where: { id: params.id },
    data: { status: "REJECTED", rejectionReason: reason ?? "" }
  })
  return NextResponse.json({ exchange: updated })
}