import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    const calls = await prisma.callRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(calls);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
