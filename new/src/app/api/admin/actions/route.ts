import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const actions = await prisma.adminAction.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(actions);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
