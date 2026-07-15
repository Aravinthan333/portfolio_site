import type { BlogPost as StaticBlogPost } from "@/data/blogs";
import type { BlogContentBlock } from "@/types/blog";
import { blogPosts as staticBlogPosts } from "@/data/blogs";
import { prisma } from "@/lib/db";

export type { BlogContentBlock } from "@/types/blog";

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage?: string;
  date: string;
  readTime: string;
  relatedProject?: string;
  content: BlogContentBlock[];
  published?: boolean;
};

function parseContent(json: string): BlogContentBlock[] {
  try {
    const parsed = JSON.parse(json) as BlogContentBlock[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function fromDb(row: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  content: string;
  readTime: string;
  relatedProject: string | null;
  published: boolean;
  publishedAt: Date;
}): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    coverImage: row.coverImage ?? undefined,
    date: row.publishedAt.toISOString().split("T")[0],
    readTime: row.readTime,
    relatedProject: row.relatedProject ?? undefined,
    content: parseContent(row.content),
    published: row.published,
  };
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length > 0) return rows.map(fromDb);
  } catch {
    /* DB unavailable - fall back to static */
  }
  return staticBlogPosts;
}

export async function getAllBlogsAdmin() {
  return prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const row = await prisma.blogPost.findFirst({
      where: { slug, published: true },
    });
    if (row) return fromDb(row);
  } catch {
    /* fall through */
  }
  return staticBlogPosts.find((p) => p.slug === slug) ?? null;
}

export async function getBlogBySlugAdmin(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function getBlogByIdAdmin(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export function serializeContent(content: BlogContentBlock[]) {
  return JSON.stringify(content);
}

export function staticToSeedData(posts: StaticBlogPost[]) {
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    coverImage: null,
    content: serializeContent(p.content),
    readTime: p.readTime,
    relatedProject: p.relatedProject ?? null,
    published: true,
    publishedAt: new Date(p.date),
  }));
}

export async function getLatestPublishedBlogs(count = 3) {
  const blogs = await getPublishedBlogs();
  return blogs.slice(0, count);
}
