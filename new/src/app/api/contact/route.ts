import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.string().min(1),
  message: z.string().optional(),
  company: z.string().optional(),
  type: z.enum(["application", "general"]).optional(),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        service: data.service,
        company: data.company,
        message: data.message?.trim() || null,
        type: data.type ?? "application",
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
