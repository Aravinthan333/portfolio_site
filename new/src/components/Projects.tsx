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
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.06)] bg-white/85 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[rgba(37,99,235,0.18)] hover:shadow-[var(--shadow-md)] sm:flex-row"
      >
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-gradient-to-br from-[var(--blue-50)] via-white to-[var(--blue-100)] sm:aspect-auto sm:min-h-[12.5rem] sm:w-[42%]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 flex items-end bg-[rgba(15,23,42,0.72)] p-4 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-5">
            <p className="text-sm leading-relaxed text-white">{project.description}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em]">
            <span className="text-[var(--blue-500)]">{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--blue-300)]" aria-hidden />
            <span className="text-[var(--fg-subtle)]">{project.subtitle}</span>
          </div>

          <h3 className="font-display mt-3 text-xl font-semibold leading-[1.12] tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--blue-600)] sm:text-[1.5rem]">
            {project.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--blue-200)] bg-[var(--blue-50)] px-3 py-1.5 text-sm font-medium text-[var(--blue-600)] transition-colors group-hover:border-[var(--blue-400)] group-hover:bg-white">
            {actionLabel}
            <ArrowUpRight size={14} aria-hidden />
          </span>
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

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14">
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
