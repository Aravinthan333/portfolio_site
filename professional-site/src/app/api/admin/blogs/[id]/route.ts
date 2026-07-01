import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin, logAdminAction } from "@/lib/auth";
import { serializeContent } from "@/lib/blogs";
import { blogContentSchema } from "@/lib/blog-content";

const blogSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  coverImage: z.string().optional().nullable(),
  content: blogContentSchema,
  readTime: z.string().optional(),
  relatedProject: z.string().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = blogSchema.partial().parse(await req.json());

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        coverImage:
          data.coverImage === undefined ? undefined : data.coverImage || null,
        content: data.content ? serializeContent(data.content) : undefined,
        relatedProject: data.relatedProject ?? undefined,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      },
    });

    await logAdminAction("update", "blog", post.id, post.title);
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const post = await prisma.blogPost.delete({ where: { id } });
    await logAdminAction("delete", "blog", id, post.title);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}
