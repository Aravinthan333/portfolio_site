import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";
import { BlogCard } from "@/components/ui/BlogCard";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = {
  posts: BlogPost[];
  showViewAll?: boolean;
};

export function LatestBlog({ posts, showViewAll = false }: Props) {
  return (
    <section className="section-block">
      <div className="container-wide">
        <SectionHeader
          label="Insights"
          title="Blog & case studies"
          subtitle="Architecture decisions, delivery lessons, and deep dives from projects I've shipped."
        />

        <div className="blog-grid mt-10 lg:mt-12">
          {posts.map((post, i) => (
            <FadeUp key={post.slug} delay={0.05 + i * 0.05} className="h-full">
              <BlogCard post={post} />
            </FadeUp>
          ))}
        </div>

        {showViewAll && (
          <FadeUp delay={0.2}>
            <div className="mt-10 text-center lg:mt-12">
              <Link href="/blog" className="apple-link">
                Read all articles
              </Link>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
