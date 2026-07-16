"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BlueInitials } from "@/components/BlueInitials";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";

export type ProjectListItem = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  image: string;
  liveUrl?: string;
  hasCaseStudy: boolean;
};

type Props = {
  projects: ProjectListItem[];
  title: string;
  subtitle: string;
  viewCaseStudyLabel: string;
  liveSiteLabel: string;
};

export function ProjectsPageView({
  projects,
  title,
  subtitle,
  viewCaseStudyLabel,
  liveSiteLabel,
}: Props) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <header className="mb-4 text-center sm:mb-5">
            <h1 className="font-display text-[clamp(1.65rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)] text-balance">
              <BlueInitials text={title} />
            </h1>
          </header>
          <p className="section-desc mx-auto mb-8 max-w-xl px-1 text-center sm:mb-12">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:gap-5">
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.05} className="h-full">
              {project.hasCaseStudy ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[var(--blue-50)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[rgba(37,99,235,0.24)] hover:shadow-[var(--shadow-md)]"
                >
                  <ProjectCardContent project={project} actionLabel={viewCaseStudyLabel} />
                </Link>
              ) : (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[var(--blue-50)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[rgba(37,99,235,0.24)] hover:shadow-[var(--shadow-md)]"
                >
                  <ProjectCardContent project={project} actionLabel={liveSiteLabel} />
                </a>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardContent({
  project,
  actionLabel,
}: {
  project: ProjectListItem;
  actionLabel: string;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        unoptimized={project.image.startsWith("/uploads/")}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.94)] via-[rgba(15,23,42,0.18)] to-[rgba(15,23,42,0.08)] transition-colors duration-300 group-hover:from-[rgba(15,23,42,0.98)] group-hover:via-[rgba(15,23,42,0.55)]" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
        <span className="rounded-full border border-white/20 bg-[rgba(15,23,42,0.38)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
          {project.year}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[var(--blue-700)] shadow-[var(--shadow-sm)] backdrop-blur-md">
          {actionLabel}
          <ArrowUpRight size={13} aria-hidden />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--blue-200)]">
          {project.subtitle}
        </p>
        <h2 className="font-display mt-1.5 text-2xl font-semibold leading-[1.08] tracking-tight sm:text-[1.7rem]">
          {project.title}
        </h2>
        <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:max-h-24 group-focus-visible:opacity-100">
          {project.description}
        </p>
      </div>
    </div>
  );
}
