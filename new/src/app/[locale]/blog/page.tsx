import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/SiteShell";
import { BlogPageView } from "@/components/BlogPageView";
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
      <BlogPageView
        posts={posts.map(({ slug, title, excerpt, category, date, readTime, coverImage }) => ({
          slug,
          title,
          excerpt,
          category,
          date,
          readTime,
          coverImage,
        }))}
        title={t("title")}
        subtitle={t("subtitle")}
        allTopicsLabel={t("allTopics")}
        emptyLabel={t("emptyState")}
        emptyFilterLabel={t("emptyFilter")}
        authorLabel={t("author")}
        hireCtaTitle={t("hireCtaTitle")}
        hireCtaDescription={t("hireCtaDescription")}
      />
    </SiteShell>
  );
}
