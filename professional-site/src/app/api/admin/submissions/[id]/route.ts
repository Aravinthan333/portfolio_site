import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/auth";
import { submissionStatuses } from "@/lib/admin-status";

const schema = z.object({
  status: z.enum(submissionStatuses.map((s) => s.value) as [string, ...string[]]),
});

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const { status } = schema.parse(await req.json());

    const item = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });

    await logAdminAction("update", "submission", id, status);
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.contactSubmission.delete({ where: { id } });
    await logAdminAction("delete", "submission", id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}
