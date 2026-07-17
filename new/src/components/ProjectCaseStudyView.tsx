"use client";

import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink, ImageIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";

type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  role: string;
  challenge: string;
  solution: string;
  highlights: string[];
  outcome: string;
  stack: string[];
  tags: string[];
  liveUrl?: string;
  year: string;
  image: string;
  galleryImages: string[];
};

type Props = {
  project: Project;
  labels: {
    backToProjects: string;
    overview: string;
    myRole: string;
    theChallenge: string;
    theSolution: string;
    keyHighlights: string;
    outcome: string;
    projectSnapshots: string;
    snapshot: string;
    technologies: string;
    visitLive: string;
    discussSimilar: string;
  };
};

export function ProjectCaseStudyView({ project, labels }: Props) {
  const sections = [
    { label: labels.overview, content: project.overview },
    { label: labels.myRole, content: project.role },
    { label: labels.theChallenge, content: project.challenge },
    { label: labels.theSolution, content: project.solution },
  ];

  return (
    <section className="relative overflow-hidden py-8 sm:py-10 md:py-12">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <article className="mx-auto w-full min-w-0 max-w-3xl xl:max-w-[48rem]">
          <ScrollReveal>
            <Link
              href="/projects"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.08)] bg-white/90 px-3.5 py-2 text-sm font-medium text-[var(--fg-muted)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)] sm:mb-7"
            >
              <ArrowLeft size={15} strokeWidth={2} aria-hidden />
              {labels.backToProjects}
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
              <span className="inline-flex items-center rounded-full border border-[var(--blue-600)]/15 bg-[var(--blue-50)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--blue-600)]">
                {project.subtitle}
              </span>
              <span className="inline-flex items-center rounded-full border border-[rgba(15,23,42,0.08)] bg-[var(--grey-100)] px-2.5 py-1 text-[11px] font-medium text-[var(--fg-muted)]">
                {project.year}
              </span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[rgba(15,23,42,0.08)] bg-[var(--grey-100)] px-2.5 py-1 text-[11px] font-medium text-[var(--fg-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-[var(--fg)] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem]">
              {project.title}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-[var(--fg-muted)] sm:mt-4 sm:text-lg md:text-xl">
              {project.description}
            </p>

            <div className="relative mt-6 overflow-hidden rounded-md border border-[rgba(15,23,42,0.06)] bg-white/80 shadow-[var(--shadow-md)] sm:mt-7">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue-50)]/80 via-white to-[var(--blue-100)]" />
              <div className="relative aspect-[16/9]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-contain"
                  unoptimized={project.image.startsWith("/uploads/")}
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <section className="mt-8 sm:mt-10">
              <h2 className="font-display text-xl font-medium tracking-tight text-[var(--fg)] sm:text-2xl">
                {labels.projectSnapshots}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((index) => {
                  const snapshot = project.galleryImages[index];
                  return (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-xl border border-[rgba(59,130,246,0.18)] bg-white shadow-[var(--shadow-sm)]"
                    >
                      {snapshot ? (
                        <Image
                          src={snapshot}
                          alt={`${project.title} - ${labels.snapshot} ${index + 1}`}
                          fill
                          className="object-contain"
                          unoptimized={snapshot.startsWith("/uploads/")}
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[var(--blue-50)] via-white to-[var(--blue-100)] text-[var(--blue-500)]">
                          <ImageIcon size={24} strokeWidth={1.7} aria-hidden />
                          <span className="mt-2 text-xs font-medium">
                            {labels.snapshot} {index + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="relative mt-8 overflow-hidden rounded-xl border border-[rgba(15,23,42,0.06)] bg-white/90 p-5 shadow-[var(--shadow-md)] sm:mt-10 sm:p-7">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--blue-50)]/70 via-transparent to-transparent"
                aria-hidden
              />
              <div className="relative space-y-9">
                {sections.map((section) => (
                  <section key={section.label}>
                    <h2 className="font-display text-xl font-medium tracking-tight text-[var(--blue-600)] sm:text-2xl">
                      {section.label}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-[var(--fg-muted)]">
                      {section.content}
                    </p>
                  </section>
                ))}

                <section>
                  <h2 className="font-display text-xl font-medium tracking-tight text-[var(--blue-600)] sm:text-2xl">
                    {labels.keyHighlights}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {project.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-relaxed text-[var(--fg-muted)]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue-500)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="rounded-2xl border border-[var(--blue-200)] bg-[var(--blue-50)] p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--blue-600)]">
                    {labels.outcome}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[var(--fg)]">{project.outcome}</p>
                </div>

                <section>
                  <h2 className="font-display text-lg font-medium text-[var(--fg)]">
                    {labels.technologies}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech, index) => (
                      <span
                        key={tech}
                        className={index % 2 === 0 ? "pill-accent text-[11px]" : "pill-blue text-[11px]"}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <ExternalLink size={16} />
                  {labels.visitLive}
                </a>
              )}
              <Link href="/contact" className="btn-primary">
                {labels.discussSimilar}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </article>
      </div>
    </section>
  );
}
