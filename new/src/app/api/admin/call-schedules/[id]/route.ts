import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/auth";
import { scheduledCallStatuses } from "@/lib/admin-status";

const schema = z.object({
  status: z
    .enum(scheduledCallStatuses.map((s) => s.value) as [string, ...string[]])
    .optional(),
  notes: z.string().max(5000).nullable().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = schema.parse(await req.json());

    const data: { status?: string; notes?: string | null } = {};
    if (body.status !== undefined) data.status = body.status;
    if (body.notes !== undefined) data.notes = body.notes;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const item = await prisma.scheduledCall.update({
      where: { id },
      data,
    });

    await logAdminAction(
      "update",
      "scheduled_call",
      id,
      body.status ?? (body.notes !== undefined ? "notes" : undefined)
    );
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.scheduledCall.delete({ where: { id } });
    await logAdminAction("delete", "scheduled_call", id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}
