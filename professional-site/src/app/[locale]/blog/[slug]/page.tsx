import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import { getProject } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPublishedBlogs();
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const related = post.relatedProject ? getProject(post.relatedProject) : null;

  return (
    <article>
      <section className="page-hero">
        <div className="container-wide">
          <Link href="/blog" className="article-back-link">
            <ArrowLeft size={15} />
            Back to blog
          </Link>

          <div className="article-header mx-auto max-w-3xl">
            <div className="article-meta">
              <span className="article-category">{post.category}</span>
              <span className="article-meta-dot" aria-hidden>
                ·
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="article-meta-dot" aria-hidden>
                ·
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} />
                {post.readTime}
              </span>
            </div>

            <h1 className="article-title">{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>
          </div>

          {post.coverImage && (
            <div className="article-cover mx-auto mt-8 max-w-4xl">
              <Image
                src={post.coverImage}
                alt=""
                width={1200}
                height={630}
                className="article-cover-image"
                priority
                unoptimized={post.coverImage.startsWith("/uploads/")}
              />
            </div>
          )}
        </div>
      </section>

      <section className="section-block !pt-0">
        <div className="container-wide">
          <div className="article-content mx-auto max-w-3xl">
            <BlogContentRenderer blocks={post.content} />

            {related && (
              <div className="article-related">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Related project
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold">{related.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{related.description}</p>
                <Link href={`/work/${related.slug}`} className="apple-link mt-4 inline-flex">
                  View case study
                </Link>
              </div>
            )}

            <div className="article-footer">
              <Link href="/blog" className="apple-link">
                Back to blog
              </Link>
              <Button href="/contact" variant="secondary">
                Discuss a project
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
