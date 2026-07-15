import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/blogs";
import { BlogCard } from "@/components/ui/BlogCard";
import { PageHero } from "@/components/ui/PageHero";
import { FadeUp } from "@/components/ui/FadeUp";
import { CtaBanner } from "@/components/sections/CtaBanner";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return buildMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/blog",
  });
}

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.blog");
  const tCommon = await getTranslations("common");
  const posts = await getPublishedBlogs();

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="section-block !pt-0">
        <div className="container-wide">
          {posts.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted sm:py-16">
              {tCommon("noArticles")}
            </p>
          ) : (
            <div className="blog-grid">
              {posts.map((post, i) => (
                <FadeUp key={post.slug} delay={0.04 + i * 0.04} className="h-full">
                  <BlogCard post={post} />
                </FadeUp>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
