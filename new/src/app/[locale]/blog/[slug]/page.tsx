import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { BlogArticleView } from "@/components/BlogArticleView";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import { localizeBlogPost, localizeBlogPosts, getLocalizedProject } from "@/lib/i18n-content";
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

  const allPosts = await localizeBlogPosts(await getPublishedBlogs());
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)
    .map(({ slug: s, title, excerpt, category, date, readTime, coverImage }) => ({
      slug: s,
      title,
      excerpt,
      category,
      date,
      readTime,
      coverImage,
    }));

  const relatedProject = post.relatedProject
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

      <BlogArticleView
        post={{
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          date: post.date,
          readTime: post.readTime,
          coverImage: post.coverImage,
          content: post.content,
        }}
        relatedPosts={relatedPosts}
        relatedProject={
          relatedProject
            ? {
                slug: relatedProject.slug,
                title: relatedProject.title,
                description: relatedProject.description,
              }
            : undefined
        }
        labels={{
          backToBlog: t("backToBlog"),
          author: t("author"),
          publication: t("publication"),
          relatedPosts: t("relatedPosts"),
          relatedProject: t("relatedProject"),
          viewCaseStudy: t("viewCaseStudy"),
        }}
      />
    </SiteShell>
  );
}
