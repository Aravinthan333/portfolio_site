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
  coverImage: z.string().optional(),
  content: blogContentSchema,
  readTime: z.string().optional(),
  relatedProject: z.string().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

export async function GET() {
  try {
    await requireAdmin();
    const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const data = blogSchema.parse(await req.json());

    const post = await prisma.blogPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        coverImage: data.coverImage ?? null,
        content: serializeContent(data.content),
        readTime: data.readTime ?? "5 min read",
        relatedProject: data.relatedProject ?? null,
        published: data.published ?? false,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      },
    });

    await logAdminAction("create", "blog", post.id, post.title);
    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Invalid input or slug exists" }, { status: 400 });
  }
}
