import { NextResponse } from "next/server";
import { requireAdmin, logAdminAction } from "@/lib/auth";
import { syncScheduledCallsFromCalendly } from "@/lib/calendly";

export const runtime = "nodejs";

export async function POST() {
  try {
    await requireAdmin();
    const result = await syncScheduledCallsFromCalendly();
    await logAdminAction(
      "sync",
      "scheduled_call",
      undefined,
      `upserted=${result.upserted};events=${result.events}`
    );
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sync failed";
    const status = message.includes("not configured") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
