"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Link } from "@/i18n/navigation";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";
import { BookCallButton } from "@/components/BookCallButton";
import { SITE } from "@/data/site";
import type { BlogListItem } from "@/components/BlogList";
import type { BlogContentBlock } from "@/types/blog";

const COVER_GRADIENTS = [
  "linear-gradient(145deg, #1e40af 0%, #3b82f6 55%, #0f172a 100%)",
  "linear-gradient(145deg, #0f766e 0%, #38bdf8 55%, #0f172a 100%)",
  "linear-gradient(145deg, #1e3a8a 0%, #60a5fa 50%, #0f172a 100%)",
  "linear-gradient(145deg, #075985 0%, #7dd3fc 55%, #0f172a 100%)",
];

function coverFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % COVER_GRADIENTS.length;
  }
  return COVER_GRADIENTS[hash];
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function authorInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

type RelatedProject = {
  slug: string;
  title: string;
  description: string;
};

type ArticlePost = BlogListItem & {
  content: BlogContentBlock[];
};

type Props = {
  post: ArticlePost;
  relatedPosts: BlogListItem[];
  relatedProject?: RelatedProject;
  labels: {
    backToBlog: string;
    author: string;
    publication: string;
    relatedPosts: string;
    relatedProject: string;
    viewCaseStudy: string;
    hireMe: string;
    bookCall: string;
  };
};

export function BlogArticleView({
  post,
  relatedPosts,
  relatedProject,
  labels,
}: Props) {
  return (
    <div className="blog-article-page min-w-0 w-full">
      <article className="min-w-0">
        <div className="section-wrap py-5 sm:py-6 md:py-8 lg:py-10">
          <div className="blog-article-prose mx-auto w-full min-w-0 max-w-3xl xl:max-w-[48rem]">
            <Link
              href="/blog"
              className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 -ml-1 px-1 text-sm font-semibold text-[var(--fg-subtle)] transition-colors hover:text-[var(--blue-600)] sm:mb-6"
            >
              <span aria-hidden>←</span>
              {labels.backToBlog}
            </Link>

            <p className="blog-article-meta mb-3 text-xs text-[var(--fg-subtle)] sm:mb-4 sm:text-sm">
              <span className="font-semibold text-[var(--blue-600)]">{post.category}</span>
              <span className="blog-article-meta__sep" aria-hidden>
                ·
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="blog-article-meta__sep" aria-hidden>
                ·
              </span>
              <span>{post.readTime}</span>
            </p>

            <h1 className="blog-article-title font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-[var(--fg)] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem]">
              {post.title}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-[var(--fg-muted)] sm:mt-4 sm:text-lg md:text-xl">
              {post.excerpt}
            </p>

            <div
              className={`blog-article-hero relative mt-6 overflow-hidden rounded-md sm:mt-7 ${
                post.coverImage ? "blog-cover--article bg-[rgba(15,23,42,0.04)]" : "blogs-cover"
              }`}
              style={
                post.coverImage
                  ? undefined
                  : ({ background: coverFor(post.slug) } as CSSProperties)
              }
            >
              {post.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="blog-cover__image-full block h-auto w-full"
                />
              ) : (
                <div
                  className="absolute inset-0 opacity-35"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45) 0%, transparent 55%)",
                  }}
                  aria-hidden
                />
              )}
            </div>

            <div className="mt-5 mb-5 flex min-w-0 items-center gap-2.5 border-b border-[rgba(15,23,42,0.08)] pb-5 sm:mt-6 sm:mb-6 sm:gap-3 sm:pb-6">
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--blue-600)] to-[var(--blue-400)] text-xs font-bold text-white sm:h-10 sm:w-10"
                aria-hidden
              >
                {authorInitials(SITE.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--fg)]">{labels.author}</p>
                <p className="truncate text-xs text-[var(--fg-subtle)]">{labels.publication}</p>
              </div>
            </div>

            <div className="blog-article-body">
              <BlogContentRenderer blocks={post.content} />
            </div>

            <div className="blog-article-cta mt-8 flex flex-col gap-3 border-t border-[rgba(15,23,42,0.08)] pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:pt-8">
              <Link href="/contact" className="btn-primary w-full justify-center !text-sm sm:w-auto">
                {labels.hireMe}
              </Link>
              <BookCallButton
                label={labels.bookCall}
                className="btn-secondary w-full justify-center !text-sm sm:w-auto"
              />
            </div>
          </div>

          {relatedProject && (
            <div className="mx-auto mt-10 w-full max-w-3xl min-w-0 border-t border-[rgba(15,23,42,0.08)] pt-6 sm:mt-12 sm:pt-8 xl:max-w-[48rem]">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)]">
                {labels.relatedProject}
              </p>
              <Link
                href={`/projects/${relatedProject.slug}`}
                className="group block rounded-lg outline-none transition-colors hover:bg-[rgba(59,130,246,0.04)] focus-visible:ring-2 focus-visible:ring-[var(--blue-400)]/40"
              >
                <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--blue-600)]">
                  {relatedProject.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {relatedProject.description}
                </p>
                <span className="mt-3 inline-flex text-sm font-semibold text-[var(--blue-600)]">
                  {labels.viewCaseStudy} →
                </span>
              </Link>
            </div>
          )}

          {relatedPosts.length > 0 && (
            <section
              className="mx-auto mt-10 w-full max-w-3xl min-w-0 border-t border-[rgba(15,23,42,0.08)] pt-6 sm:mt-12 sm:pt-8 xl:max-w-[48rem]"
              aria-labelledby="related-posts"
            >
              <h2
                id="related-posts"
                className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--fg-subtle)] sm:mb-3"
              >
                {labels.relatedPosts}
              </h2>
              <div className="min-w-0">
                {relatedPosts.map((rel) => (
                  <article
                    key={rel.slug}
                    className="blogs-feed-item group border-b border-[rgba(15,23,42,0.08)] last:border-b-0"
                  >
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="group/row flex w-full min-w-0 flex-col items-stretch gap-3 rounded-sm py-4 text-left sm:flex-row-reverse sm:gap-5 sm:py-5"
                    >
                      <div
                        className="blogs-feed-item__cover relative shrink-0 overflow-hidden"
                        style={
                          rel.coverImage ? undefined : { background: coverFor(rel.slug) }
                        }
                      >
                        {rel.coverImage ? (
                          <Image
                            src={rel.coverImage}
                            alt=""
                            fill
                            sizes="(max-width: 639px) 100vw, 120px"
                            className="object-cover"
                            unoptimized={rel.coverImage.startsWith("/uploads/")}
                          />
                        ) : null}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="mb-1.5 text-xs text-[var(--fg-subtle)]">
                          <span className="font-medium text-[var(--fg-muted)]">{rel.category}</span>
                          <span className="mx-1.5 opacity-55" aria-hidden>
                            ·
                          </span>
                          <time dateTime={rel.date}>{formatDate(rel.date)}</time>
                          <span className="mx-1.5 opacity-55" aria-hidden>
                            ·
                          </span>
                          <span>{rel.readTime}</span>
                        </p>
                        <h3 className="blogs-feed-item__title line-clamp-2 text-lg font-semibold leading-snug text-[var(--fg)] transition-colors group-hover/row:text-[var(--blue-600)]">
                          {rel.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                          {rel.excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
