"use client";

import { BlogList, type BlogListItem } from "@/components/BlogList";
import { HireCta } from "@/components/HireCta";
import { AtmosphereBg } from "@/components/AtmosphereBg";

type Props = {
  posts: BlogListItem[];
  title: string;
  subtitle: string;
  allTopicsLabel: string;
  emptyLabel: string;
  emptyFilterLabel: string;
  authorLabel: string;
  hireCtaTitle: string;
  hireCtaDescription: string;
};

export function BlogPageView({
  posts,
  title,
  subtitle,
  allTopicsLabel,
  emptyLabel,
  emptyFilterLabel,
  authorLabel,
  hireCtaTitle,
  hireCtaDescription,
}: Props) {
  return (
    <section className="relative overflow-hidden py-8 sm:py-10 md:py-12">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <div className="blogs-page mx-auto w-full min-w-0 max-w-4xl xl:max-w-5xl">
          <header className="mb-4 sm:mb-5 md:mb-6">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[var(--fg)] sm:text-3xl lg:text-[2rem]">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)] sm:text-[0.9375rem]">
              {subtitle}
            </p>
          </header>

          <BlogList
            posts={posts}
            allTopicsLabel={allTopicsLabel}
            emptyLabel={emptyLabel}
            emptyFilterLabel={emptyFilterLabel}
            authorLabel={authorLabel}
          />

          <div className="mt-10 sm:mt-12">
            <HireCta compact title={hireCtaTitle} description={hireCtaDescription} />
          </div>
        </div>
      </div>
    </section>
  );
}
