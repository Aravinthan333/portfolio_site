import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAnalyticsSummary } from "@/lib/analytics";

export async function GET() {
  try {
    await requireAdmin();
    const data = await getAnalyticsSummary();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
