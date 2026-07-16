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
};

type Props = {
  projects: ProjectListItem[];
  title: string;
  subtitle: string;
  viewCaseStudyLabel: string;
};

export function ProjectsPageView({
  projects,
  title,
  subtitle,
  viewCaseStudyLabel,
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
            <ScrollReveal key={project.slug} delay={index * 0.05}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.06)] bg-white/85 shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[rgba(37,99,235,0.18)] hover:shadow-[var(--shadow-md)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[var(--blue-50)] via-white to-[var(--blue-100)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(15,23,42,0.06)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    unoptimized={project.image.startsWith("/uploads/")}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--blue-500)]">
                        {project.year}
                      </p>
                      <h2 className="font-display mt-1.5 text-xl font-semibold leading-[1.12] tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--blue-600)] sm:text-[1.4rem]">
                        {project.title}
                      </h2>
                    </div>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--blue-200)] bg-white text-[var(--blue-600)] shadow-[var(--shadow-sm)] transition-colors group-hover:border-[var(--blue-400)] group-hover:bg-[var(--blue-50)]">
                      <ArrowUpRight size={15} aria-hidden />
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-[var(--fg-muted)]">{project.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--blue-600)]">
                    {viewCaseStudyLabel}
                    <ArrowUpRight size={14} aria-hidden />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
