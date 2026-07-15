import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { HireCta } from "@/components/HireCta";
import { getPublishedBlogs } from "@/lib/blogs";
import { localizeBlogPosts } from "@/lib/i18n-content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.blog");
  const tSeo = await getTranslations("seo");
  return buildMetadata({
    title: t("title"),
    description: tSeo("blogDescription"),
    path: "/blog",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.blog");
  const tNav = await getTranslations("nav");
  const tBreadcrumb = await getTranslations("breadcrumbs");
  const posts = await localizeBlogPosts(await getPublishedBlogs());

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: tNav("blog"), path: "/blog" },
          ])
        )}
      />
      <div className="section-wrap py-10 sm:py-16">

        <header className="section-header">
          <p className="section-label">{t("label")}</p>
          <h1 className="section-title mt-3">{t("title")}</h1>
          <p className="section-desc mt-4">{t("subtitle")}</p>
        </header>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group block p-6 text-center sm:p-8 sm:text-left"
            >
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="pill-accent text-[11px]">{post.category}</span>
                <span className="text-xs text-[var(--fg-subtle)]">
                  {post.date} · {post.readTime}
                </span>
              </div>
              <h2 className="font-display mt-4 text-xl font-medium tracking-tight text-[var(--fg)] sm:text-2xl">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--green-600)]">
                {t("readArticle")}
                <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <HireCta />
        </div>
      </div>
    </SiteShell>
  );
}
