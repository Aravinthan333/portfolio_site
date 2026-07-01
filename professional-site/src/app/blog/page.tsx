import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getPublishedBlogs } from "@/lib/blogs";
import { BlogCard } from "@/components/ui/BlogCard";
import { PageHero } from "@/components/ui/PageHero";
import { FadeUp } from "@/components/ui/FadeUp";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: `Insights, case studies, and engineering notes from ${SITE.name}, ${SITE.title}.`,
  path: "/blog",
});

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogs();

  return (
    <>
      <PageHero
        label="Insights"
        title="Blog & case studies"
        subtitle="Architecture decisions, delivery lessons, and deep dives from projects I've shipped."
      />

      <section className="section-block !pt-0">
        <div className="container-wide">
          {posts.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">No articles published yet.</p>
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
