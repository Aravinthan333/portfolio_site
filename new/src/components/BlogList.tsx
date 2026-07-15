"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage?: string;
};

const COVER_GRADIENTS = [
  "linear-gradient(145deg, #1e40af 0%, #3b82f6 55%, #0f172a 100%)",
  "linear-gradient(145deg, #0f766e 0%, #38bdf8 55%, #0f172a 100%)",
  "linear-gradient(145deg, #1e3a8a 0%, #60a5fa 50%, #0f172a 100%)",
  "linear-gradient(145deg, #075985 0%, #7dd3fc 55%, #0f172a 100%)",
];

function coverFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) hash = (hash + slug.charCodeAt(i) * (i + 1)) % COVER_GRADIENTS.length;
  return COVER_GRADIENTS[hash];
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
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

type Props = {
  posts: BlogListItem[];
  allTopicsLabel: string;
  emptyLabel: string;
  emptyFilterLabel: string;
  authorLabel: string;
};

export function BlogList({
  posts,
  allTopicsLabel,
  emptyLabel,
  emptyFilterLabel,
  authorLabel,
}: Props) {
  const [topic, setTopic] = useState("all");

  const topics = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const post of posts) {
      if (!seen.has(post.category)) {
        seen.add(post.category);
        list.push(post.category);
      }
    }
    return list;
  }, [posts]);

  const filtered = useMemo(
    () => (topic === "all" ? posts : posts.filter((p) => p.category === topic)),
    [posts, topic]
  );

  const topicTabs = [{ id: "all", label: allTopicsLabel }, ...topics.map((c) => ({ id: c, label: c }))];

  return (
    <div className="blogs-list">
      {topicTabs.length > 1 && (
        <div className="blog-topic-filter" role="tablist" aria-label={allTopicsLabel}>
          {topicTabs.map((tab) => {
            const selected = topic === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setTopic(tab.id)}
                className={`blog-topic-filter__tab ${
                  selected
                    ? "bg-[var(--fg)] text-white"
                    : "bg-transparent text-[var(--fg-muted)] hover:bg-[rgba(15,23,42,0.04)] hover:text-[var(--fg)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="px-2 py-12 text-center text-sm leading-relaxed text-[var(--fg-muted)] sm:py-16 sm:text-base">
          {posts.length === 0 ? emptyLabel : emptyFilterLabel}
        </p>
      ) : (
        <div className="mt-3 min-w-0 sm:mt-4 md:mt-5">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="blogs-feed-item group border-b border-[rgba(15,23,42,0.08)] last:border-b-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group/row flex w-full min-w-0 flex-col items-stretch gap-3 rounded-sm py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-400)]/40 focus-visible:ring-offset-2 sm:flex-row-reverse sm:gap-5 sm:py-5 md:gap-6 md:py-6"
              >
                <div
                  className="blogs-feed-item__cover relative shrink-0 overflow-hidden"
                  style={post.coverImage ? undefined : { background: coverFor(post.slug) }}
                >
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, 120px"
                      className="object-cover"
                      unoptimized={post.coverImage.startsWith("/uploads/")}
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

                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="mb-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs leading-snug text-[var(--fg-subtle)] sm:mb-2">
                    <span className="font-medium text-[var(--fg-muted)]">{post.category}</span>
                    <span aria-hidden className="opacity-55">
                      ·
                    </span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden className="opacity-55">
                      ·
                    </span>
                    <span>{post.readTime}</span>
                  </p>

                  <h2 className="blogs-feed-item__title line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-[var(--fg)] transition-colors group-hover/row:text-[var(--blue-600)] sm:text-[1.25rem] md:text-[1.35rem]">
                    {post.title}
                  </h2>

                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--fg-muted)] sm:mt-2 sm:line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex min-w-0 items-center gap-2 pt-3">
                    <span
                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--blue-600)] to-[var(--blue-400)] text-[9px] font-bold text-white"
                      aria-hidden
                    >
                      {authorInitials(SITE.name)}
                    </span>
                    <span className="truncate text-xs text-[var(--fg-subtle)]">
                      <span className="font-medium text-[var(--fg-muted)]">{authorLabel}</span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
