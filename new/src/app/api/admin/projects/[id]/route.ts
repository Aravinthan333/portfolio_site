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
  liveUrl: z.string().optional().nullable(),
  year: z.string().min(1),
  image: z.string().min(1),
  accent: z.string().optional().nullable(),
  hasCaseStudy: z.boolean().optional(),
  galleryImages: z.array(z.string()).max(3).optional(),
  published: z.boolean().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const project = await prisma.projectCaseStudy.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = projectSchema.partial().parse(await req.json());

    const project = await prisma.projectCaseStudy.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        overview: data.overview,
        role: data.role,
        challenge: data.challenge,
        solution: data.solution,
        highlights: data.highlights ? serializeList(data.highlights) : undefined,
        outcome: data.outcome,
        stack: data.stack ? serializeList(data.stack) : undefined,
        tags: data.tags ? serializeList(data.tags) : undefined,
        liveUrl: data.liveUrl === undefined ? undefined : data.liveUrl?.trim() ? data.liveUrl : null,
        year: data.year,
        image: data.image,
        accent: data.accent === undefined ? undefined : data.accent?.trim() ? data.accent : null,
        hasCaseStudy: data.hasCaseStudy,
        galleryImages: data.galleryImages ? serializeList(data.galleryImages) : undefined,
        published: data.published,
      },
    });

    await logAdminAction("update", "project", project.id, project.title);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const project = await prisma.projectCaseStudy.delete({ where: { id } });
    await logAdminAction("delete", "project", id, project.title);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}
