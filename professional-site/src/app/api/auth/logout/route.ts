import { NextResponse } from "next/server";
import { destroySession, logAdminAction, getSession } from "@/lib/auth";

export async function POST() {
  const session = await getSession();
  if (session) {
    await logAdminAction("logout", "admin", session.id);
  }
  await destroySession();
  return NextResponse.json({ ok: true });
}
