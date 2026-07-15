import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { HireCta } from "@/components/HireCta";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import { localizeBlogPost, getLocalizedProject } from "@/lib/i18n-content";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";
import {
  blogPostingSchema,
  breadcrumbSchema,
  jsonLdScript,
} from "@/lib/schema";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const raw = await getBlogBySlug(slug);
  if (!raw) return {};
  const post = await localizeBlogPost(raw);
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    image: post.coverImage ? `${getSiteUrl()}${post.coverImage}` : undefined,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const raw = await getBlogBySlug(slug);
  if (!raw) notFound();
  const post = await localizeBlogPost(raw);

  const t = await getTranslations("pages.blog");
  const tNav = await getTranslations("nav");
  const tBreadcrumb = await getTranslations("breadcrumbs");
  const related = post.relatedProject
    ? await getLocalizedProject(post.relatedProject)
    : undefined;

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: tNav("blog"), path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          blogPostingSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${slug}`,
            date: post.date,
            image: post.coverImage ? `${getSiteUrl()}${post.coverImage}` : undefined,
          }),
        ])}
      />

      <article className="section-wrap py-10 sm:py-16">

        <header className="mx-auto max-w-3xl text-center">
          <span className="pill-accent text-[11px]">{post.category}</span>
          <h1 className="font-display mt-5 text-3xl font-medium tracking-tight text-[var(--fg)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-[var(--fg-muted)]">
            {post.date} · {post.readTime}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-muted)]">
            {post.excerpt}
          </p>
        </header>

        <div className="mx-auto mt-12 max-w-3xl">
          <BlogContentRenderer blocks={post.content} />
        </div>

        {related && (
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--green-600)]">
              {t("relatedProject")}
            </p>
            <h2 className="font-display mt-2 text-xl font-medium text-[var(--fg)]">
              {related.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
              {related.description}
            </p>
            <Link
              href={`/projects/${related.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--green-600)]"
            >
              {t("viewCaseStudy")}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--green-600)]"
          >
            <ArrowLeft size={14} />
            {t("backToBlog")}
          </Link>
        </div>

        <div className="mt-16">
          <HireCta />
        </div>
      </article>
    </SiteShell>
  );
}
