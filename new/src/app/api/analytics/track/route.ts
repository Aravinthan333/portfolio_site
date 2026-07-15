import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  path: z.string().min(1),
  referrer: z.string().optional(),
  sessionId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const userAgent = req.headers.get("user-agent") ?? undefined;

    await prisma.pageView.create({
      data: {
        path: data.path,
        referrer: data.referrer,
        userAgent,
        sessionId: data.sessionId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
}
