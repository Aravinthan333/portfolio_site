import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/auth";
import { callStatuses } from "@/lib/admin-status";

const schema = z.object({
  status: z.enum(callStatuses.map((s) => s.value) as [string, ...string[]]),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const { status } = schema.parse(await req.json());

    const item = await prisma.callRequest.update({
      where: { id },
      data: { status },
    });

    await logAdminAction("update", "call", id, status);
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.callRequest.delete({ where: { id } });
    await logAdminAction("delete", "call", id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}
