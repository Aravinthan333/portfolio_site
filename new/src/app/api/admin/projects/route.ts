import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/auth";
import { serializeList } from "@/lib/projects";

const projectSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  overview: z.string().min(1),
  role: z.string().min(1),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
  outcome: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).min(1),
  liveUrl: z.string().optional(),
  year: z.string().min(1),
  image: z.string().min(1),
  accent: z.string().optional(),
  hasCaseStudy: z.boolean().optional(),
  galleryImages: z.array(z.string()).max(3).optional(),
  published: z.boolean().optional(),
});

export async function GET() {
  try {
    await requireAdmin();
    const projects = await prisma.projectCaseStudy.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const data = projectSchema.parse(await req.json());

    const project = await prisma.projectCaseStudy.create({
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        overview: data.overview,
        role: data.role,
        challenge: data.challenge,
        solution: data.solution,
        highlights: serializeList(data.highlights),
        outcome: data.outcome,
        stack: serializeList(data.stack),
        tags: serializeList(data.tags),
        liveUrl: data.liveUrl?.trim() ? data.liveUrl : null,
        year: data.year,
        image: data.image,
        accent: data.accent?.trim() ? data.accent : null,
        hasCaseStudy: data.hasCaseStudy ?? true,
        galleryImages: serializeList(data.galleryImages ?? []),
        published: data.published ?? true,
      },
    });

    await logAdminAction("create", "project", project.id, project.title);
    return NextResponse.json(project, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Invalid input or slug exists" }, { status: 400 });
  }
}
