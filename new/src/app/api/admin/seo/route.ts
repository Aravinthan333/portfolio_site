import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getSeoReports } from "@/lib/analytics";

export async function GET() {
  try {
    await requireAdmin();
    const reports = await getSeoReports();
    const good = reports.filter((r) => r.issues.length === 0).length;
    return NextResponse.json({
      reports,
      summary: {
        total: reports.length,
        good,
        warnings: reports.length - good,
      },
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
