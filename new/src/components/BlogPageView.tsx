"use client";

import { BookOpen } from "lucide-react";
import { BlogList, type BlogListItem } from "@/components/BlogList";
import { HireCta } from "@/components/HireCta";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";

type Props = {
  posts: BlogListItem[];
  title: string;
  subtitle: string;
  readArticleLabel: string;
  emptyLabel: string;
  hireCtaTitle: string;
  hireCtaDescription: string;
};

export function BlogPageView({
  posts,
  title,
  subtitle,
  readArticleLabel,
  emptyLabel,
  hireCtaTitle,
  hireCtaDescription,
}: Props) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <header className="mb-4 flex flex-col items-center justify-center gap-2 text-center sm:mb-5 sm:flex-row sm:gap-3.5">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--blue-600)]/15 bg-[var(--blue-50)] text-[var(--blue-600)] shadow-sm [&_svg]:h-5 [&_svg]:w-5">
              <BookOpen strokeWidth={2} aria-hidden />
            </span>
            <h1 className="font-display text-[clamp(1.65rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)] text-balance">
              {title}
            </h1>
          </header>
          <p className="section-desc mx-auto mb-10 max-w-xl px-1 text-center sm:mb-12">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl">
          <BlogList posts={posts} readArticleLabel={readArticleLabel} emptyLabel={emptyLabel} />
        </div>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <HireCta compact title={hireCtaTitle} description={hireCtaDescription} />
        </div>
      </div>
    </section>
  );
}
