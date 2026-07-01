import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BlogForm } from "@/components/admin/BlogForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import type { BlogContentBlock } from "@/types/blog";
import { FileText } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  let content: BlogContentBlock[] = [];
  try {
    content = JSON.parse(post.content) as BlogContentBlock[];
  } catch {
    content = [];
  }

  return (
    <div>
      <AdminPageHeader
        icon={FileText}
        title="Edit blog post"
        description={post.title}
        backHref="/admin/blogs"
        backLabel="All posts"
      />
      <div className="mt-8">
        <BlogForm
          initial={{
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            readTime: post.readTime,
            relatedProject: post.relatedProject ?? "",
            coverImage: post.coverImage ?? "",
            published: post.published,
            publishedAt: post.publishedAt.toISOString().split("T")[0],
            content,
          }}
        />
      </div>
    </div>
  );
}
