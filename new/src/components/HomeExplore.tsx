"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  CircleHelp,
  Layers3,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";

type ProjectPreview = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  liveUrl?: string;
  hasCaseStudy: boolean;
};

type ServicePreview = {
  slug: string;
  title: string;
};

type PostPreview = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  coverImage?: string;
};

type Props = {
  projects: ProjectPreview[];
  services: ServicePreview[];
  posts: PostPreview[];
};

const gatewayClass =
  "group inline-flex items-center gap-2 text-sm font-semibold text-[var(--blue-600)] transition-colors hover:text-[var(--blue-700)]";

export function HomeExplore({ projects, services, posts }: Props) {
  const t = useTranslations("homeExplore");
  const tProjects = useTranslations("projectLabels");
  const locale = useLocale();

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));

  return (
    <section
      className="section-band-blue relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="home-explore-heading"
    >
      <AtmosphereBg variant="band" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">{t("label")}</p>
            <h2 id="home-explore-heading" className="section-title mt-3">
              {t("title")}
            </h2>
            <p className="section-desc mt-4">{t("description")}</p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <article className="h-full overflow-hidden rounded-[1.75rem] border border-[rgba(15,23,42,0.07)] bg-white p-5 shadow-[var(--shadow-md)] sm:p-7">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--blue-50)] text-[var(--blue-600)]">
                    <BriefcaseBusiness size={19} aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[var(--fg)] sm:text-2xl">
                    {t("workTitle")}
                  </h3>
                </div>
                <Link href="/projects" className={`${gatewayClass} self-start sm:self-auto`}>
                  {t("viewAllWork")}
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>

              {projects.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {projects.map((project) =>
                    project.hasCaseStudy ? (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="group/project relative block aspect-[16/11] overflow-hidden rounded-2xl bg-[var(--blue-50)]"
                      >
                        <ProjectContent
                          project={project}
                          actionLabel={tProjects("viewCaseStudy")}
                        />
                      </Link>
                    ) : (
                      <a
                        key={project.slug}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/project relative block aspect-[16/11] overflow-hidden rounded-2xl bg-[var(--blue-50)]"
                      >
                        <ProjectContent
                          project={project}
                          actionLabel={tProjects("liveSite")}
                        />
                      </a>
                    ),
                  )}
                </div>
              ) : (
                <p className="rounded-2xl bg-[var(--grey-100)] p-6 text-sm text-[var(--fg-muted)]">
                  {t("noProjects")}
                </p>
              )}
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.06} className="lg:col-span-5">
            <article className="h-full rounded-[1.75rem] border border-[rgba(15,23,42,0.07)] bg-white p-5 shadow-[var(--shadow-md)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--green-50)] text-[var(--green-600)]">
                  <Layers3 size={19} aria-hidden />
                </span>
                <h3 className="font-display text-xl font-semibold text-[var(--fg)] sm:text-2xl">
                  {t("servicesTitle")}
                </h3>
              </div>
              <div className="mt-5 divide-y divide-[rgba(15,23,42,0.06)] border-y border-[rgba(15,23,42,0.06)]">
                {services.map((service, index) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group/service flex items-center gap-3 py-3.5"
                  >
                    <span className="text-xs font-semibold tabular-nums text-[var(--blue-400)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-[var(--fg)] transition-colors group-hover/service:text-[var(--blue-600)] sm:text-base">
                      {service.title}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="text-[var(--fg-subtle)] transition-transform group-hover/service:-translate-y-0.5 group-hover/service:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
              <Link href="/services" className={`${gatewayClass} mt-5`}>
                {t("viewAllServices")}
                <ArrowRight size={15} aria-hidden />
              </Link>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="lg:col-span-8">
            <article className="h-full rounded-[1.75rem] border border-[rgba(15,23,42,0.07)] bg-white p-5 shadow-[var(--shadow-md)] sm:p-7">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--blue-50)] text-[var(--blue-600)]">
                    <BookOpenText size={19} aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[var(--fg)] sm:text-2xl">
                    {t("writingTitle")}
                  </h3>
                </div>
                <Link href="/blog" className={`${gatewayClass} self-start sm:self-auto`}>
                  {t("viewAllPosts")}
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>

              {posts.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group/post flex min-w-0 gap-3 rounded-2xl border border-[rgba(15,23,42,0.06)] bg-[var(--grey-100)]/55 p-3 transition-colors hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] sm:gap-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--blue-100)] to-white">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-300 group-hover/post:scale-105"
                            unoptimized={post.coverImage.startsWith("/uploads/")}
                          />
                        ) : (
                          <BookOpenText
                            size={22}
                            className="absolute inset-0 m-auto text-[var(--blue-500)]"
                            aria-hidden
                          />
                        )}
                      </div>
                      <div className="min-w-0 py-0.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--blue-600)]">
                          {post.category}
                        </p>
                        <h4 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-[var(--fg)] transition-colors group-hover/post:text-[var(--blue-700)]">
                          {post.title}
                        </h4>
                        <p className="mt-2 text-[11px] text-[var(--fg-subtle)]">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          {" · "}
                          {post.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl bg-[var(--grey-100)] p-6 text-sm text-[var(--fg-muted)]">
                  {t("noPosts")}
                </p>
              )}
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="lg:col-span-4">
            <Link
              href="/faq"
              className="group/faq flex h-full min-h-52 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[var(--blue-400)] bg-[var(--blue-500)] p-6 text-white shadow-[var(--shadow-md)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[var(--blue-500)] hover:shadow-[var(--shadow-lg)] sm:p-7"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
                <CircleHelp size={20} aria-hidden />
              </span>
              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold">{t("faqTitle")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {t("faqDescription")}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  {t("visitFaq")}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover/faq:-translate-y-0.5 group-hover/faq:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ProjectContent({
  project,
  actionLabel,
}: {
  project: ProjectPreview;
  actionLabel: string;
}) {
  return (
    <>
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover/project:scale-105"
        unoptimized={project.image.startsWith("/uploads/")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.92)] via-[rgba(15,23,42,0.12)] to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
        <span className="max-w-[45%] shrink-0 truncate rounded-full bg-[rgba(15,23,42,0.42)] px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          {project.year}
        </span>
        <span className="max-w-[55%] truncate rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[var(--blue-700)]">
          {actionLabel}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--blue-200)]">
          {project.subtitle}
        </p>
        <h4 className="font-display mt-1 text-xl font-semibold leading-tight">
          {project.title}
        </h4>
      </div>
    </>
  );
}
