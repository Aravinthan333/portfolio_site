"use client";

import { ArrowUpRight, BookOpen, FileText, Lightbulb, PenLine, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ScrollReveal";

const BLOG_ICONS: LucideIcon[] = [BookOpen, FileText, Lightbulb, PenLine];

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

type Props = {
  posts: BlogListItem[];
  readArticleLabel: string;
  emptyLabel: string;
};

export function BlogList({ posts, readArticleLabel, emptyLabel }: Props) {
  if (posts.length === 0) {
    return (
      <p className="rounded-xl border border-[rgba(15,23,42,0.06)] bg-white/80 px-5 py-10 text-center text-sm text-[var(--fg-muted)] shadow-[var(--shadow-sm)]">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {posts.map((post, index) => {
        const Icon = BLOG_ICONS[index % BLOG_ICONS.length];
        return (
          <ScrollReveal key={post.slug} delay={index * 0.05}>
            <article className="group relative overflow-hidden rounded-xl border border-[rgba(15,23,42,0.06)] bg-white/80 shadow-[var(--shadow-sm)] transition-all duration-300 hover:border-[rgba(59,130,246,0.16)] hover:bg-white hover:shadow-[var(--shadow-md)]">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--blue-50)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <Link href={`/blog/${post.slug}`} className="relative block px-3.5 py-3.5 sm:px-4 sm:py-4">
                <div className="flex gap-3 sm:gap-3.5">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--blue-600)]/15 bg-[var(--blue-50)] text-[var(--blue-600)] shadow-sm [&_svg]:h-4 [&_svg]:w-4">
                    <Icon strokeWidth={2} aria-hidden />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="pill pill-blue !py-0.5 !text-[0.625rem]">{post.category}</span>
                      <span className="text-xs text-[var(--fg-subtle)]">
                        {post.date} · {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-display mt-2 text-base font-semibold tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--blue-600)] sm:text-lg">
                      {post.title}
                    </h2>

                    <p className="mt-2.5 rounded-lg border border-[var(--blue-100)]/80 bg-[var(--blue-50)]/50 px-3 py-2.5 text-sm leading-relaxed text-[var(--fg-muted)] sm:px-3.5 sm:py-3">
                      {post.excerpt}
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--blue-600)]">
                      {readArticleLabel}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
