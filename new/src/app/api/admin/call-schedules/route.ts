import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { scheduledCallStatuses } from "@/lib/admin-status";

export async function GET(req: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status")?.trim() || "";
    const from = searchParams.get("from")?.trim() || "";
    const to = searchParams.get("to")?.trim() || "";

    const where: Prisma.ScheduledCallWhereInput = {};

    if (status && scheduledCallStatuses.some((s) => s.value === status)) {
      where.status = status;
    }

    if (from || to) {
      where.startAt = {};
      if (from) {
        const fromDate = new Date(`${from}T00:00:00.000Z`);
        if (!Number.isNaN(fromDate.getTime())) where.startAt.gte = fromDate;
      }
      if (to) {
        const toDate = new Date(`${to}T23:59:59.999Z`);
        if (!Number.isNaN(toDate.getTime())) where.startAt.lte = toDate;
      }
    }

    const items = await prisma.scheduledCall.findMany({
      where,
      orderBy: { startAt: "desc" },
    });

    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
