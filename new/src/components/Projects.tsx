"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { useLocalizedProjects } from "@/hooks/useLocalizedContent";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -5);
    rotateY.set(px * 5);
  };

  const onLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link
        href={project.hasCaseStudy ? `/projects/${project.slug}` : project.liveUrl ?? "/projects"}
        target={project.hasCaseStudy ? undefined : "_blank"}
        rel={project.hasCaseStudy ? undefined : "noopener noreferrer"}
        className="block"
      >
        <motion.div
          ref={ref}
          className="project-card group relative cursor-pointer overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] will-change-transform"
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          onMouseMove={onMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={onLeave}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[var(--green-50)] to-[var(--blue-50)]">
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-8"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="max-h-full w-auto object-contain"
              />
            </motion.div>

            <motion.div
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--green-200)] bg-[var(--surface)] shadow-[var(--shadow-sm)]"
              animate={{ rotate: hovered ? 0 : -45, scale: hovered ? 1 : 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ArrowUpRight size={14} className="text-[var(--green-600)]" />
            </motion.div>
          </div>

          <div className="relative p-5 text-center sm:p-6 sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <motion.h3
                  className="font-display text-xl font-medium tracking-tight text-[var(--fg)] sm:text-2xl"
                  animate={{ y: hovered ? -2 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <p className="mt-1 text-sm text-[var(--fg-muted)]">{project.subtitle}</p>
              </div>
              <span className="shrink-0 text-xs text-[var(--fg-subtle)]">{project.year}</span>
            </div>

            <motion.p
              className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]"
              animate={{ opacity: hovered ? 1 : 0.8 }}
            >
              {project.description}
            </motion.p>

            <motion.div
              className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start"
              animate={{ y: hovered ? 0 : 2, opacity: hovered ? 1 : 0.75 }}
            >
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </motion.div>

            {project.liveUrl && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[var(--fg-subtle)] sm:justify-start">
                <ExternalLink size={12} />
                <span className="truncate">{project.liveUrl.replace(/^https?:\/\//, "")}</span>
              </p>
            )}
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--green-400)] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            style={{ width: "100%", originX: 0.5 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </Link>
    </ScrollReveal>
  );
}

export function Projects() {
  const t = useTranslations("sections");
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

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
