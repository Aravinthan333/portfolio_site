import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/auth";

const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  domain: z.string().min(1),
  location: z.string().min(1),
  availability: z.string().min(1),
  email: z.string().email(),
  linkedIn: z.string().url(),
  github: z.string().url(),
  calendly: z.string().url(),
});

export async function GET() {
  try {
    await requireAdmin();
    const profile = await prisma.siteProfile.findUnique({ where: { id: "default" } });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: Request) {
  try {
    await requireAdmin();
    const data = profileSchema.parse(await req.json());

    const profile = await prisma.siteProfile.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });

    await logAdminAction("update", "site_profile", profile.id);
    return NextResponse.json(profile);
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
