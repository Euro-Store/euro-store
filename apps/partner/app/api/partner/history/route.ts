import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const user = await verifyAuth(req)
  if (!user || user.role !== "PARTNER")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const exchanges = await prisma.exchangeRequest.findMany({
    where: {
      updatedAt: { gte: todayStart },
      status: { in: ["CONFIRMED_BY_PARTNER", "REJECTED"] }
    },
    include: {
      order: { include: { user: { select: { name: true } } } }
    },
    orderBy: { updatedAt: "desc" }
  })

  return NextResponse.json({ exchanges })
}