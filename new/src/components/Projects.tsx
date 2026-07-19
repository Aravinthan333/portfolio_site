"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { useLocalizedProjects } from "@/hooks/useLocalizedContent";

function ProjectCard({
  project,
  index,
  actionLabel,
}: {
  project: Project;
  index: number;
  actionLabel: string;
}) {
  return (
    <ScrollReveal delay={index * 0.1} className="h-full">
      <Link
        href={project.hasCaseStudy ? `/projects/${project.slug}` : project.liveUrl ?? "/projects"}
        target={project.hasCaseStudy ? undefined : "_blank"}
        rel={project.hasCaseStudy ? undefined : "noopener noreferrer"}
        className="group block h-full overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[var(--blue-50)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[rgba(37,99,235,0.24)] hover:shadow-[var(--shadow-md)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.94)] via-[rgba(15,23,42,0.18)] to-[rgba(15,23,42,0.08)] transition-colors duration-300 group-hover:from-[rgba(15,23,42,0.98)] group-hover:via-[rgba(15,23,42,0.55)]" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4 sm:gap-3 sm:p-5">
            <span className="shrink-0 rounded-full border border-white/20 bg-[rgba(15,23,42,0.38)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              {project.year}
            </span>
            <span className="inline-flex max-w-[min(100%,11rem)] items-center gap-1.5 truncate rounded-full border border-white/25 bg-white/90 px-2.5 py-1.5 text-[11px] font-semibold text-[var(--blue-700)] shadow-[var(--shadow-sm)] backdrop-blur-md sm:max-w-none sm:px-3 sm:text-xs">
              <span className="truncate">{actionLabel}</span>
              <ArrowUpRight size={13} className="shrink-0" aria-hidden />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--blue-200)]">
              {project.subtitle}
            </p>
            <h3 className="font-display mt-1.5 text-2xl font-semibold leading-[1.08] tracking-tight sm:text-[1.7rem]">
              {project.title}
            </h3>
            <p className="mt-3 max-h-24 overflow-hidden text-sm leading-relaxed text-white/85 opacity-100 transition-all duration-300 md:mt-0 md:max-h-0 md:opacity-0 md:group-hover:mt-3 md:group-hover:max-h-24 md:group-hover:opacity-100 md:group-focus-visible:mt-3 md:group-focus-visible:max-h-24 md:group-focus-visible:opacity-100">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function Projects() {
  const t = useTranslations("sections");
  const tProjects = useTranslations("projectLabels");
  const projects = useLocalizedProjects();

  return (
    <section id="work" className="section-band-blue relative overflow-hidden py-20 sm:py-28">
      <AtmosphereBg variant="band" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">{t("selectedWork")}</p>
            <h2 className="section-title mt-3">{t("projectsTitle")}</h2>
            <p className="section-desc mt-4">{t("projectsDesc")}</p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 sm:grid-cols-2 lg:gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              actionLabel={
                project.hasCaseStudy ? tProjects("viewCaseStudy") : tProjects("liveSite")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
