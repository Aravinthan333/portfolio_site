import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { formatPreferredTimes } from "@/lib/timezone";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  countryCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  phone: z.string().min(1),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  preferredTimezone: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());

    const formatted = formatPreferredTimes(
      data.preferredDate,
      data.preferredTime,
      data.preferredTimezone
    );
    const preferredTimeLabel = formatted.localLabel;
    const preferredTimeIst = formatted.istLabel;

    await prisma.callRequest.create({
      data: {
        name: data.name,
        email: data.email,
        countryCode: data.countryCode ?? null,
        phoneNumber: data.phoneNumber ?? null,
        phone: data.phone,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        preferredTimezone: data.preferredTimezone,
        preferredTimeLabel,
        preferredTimeIst,
        message: data.message ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
