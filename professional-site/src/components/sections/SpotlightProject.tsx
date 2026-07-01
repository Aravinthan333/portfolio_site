import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { FadeUp } from "@/components/ui/FadeUp";
import { ProjectImage } from "@/components/ui/ProjectImage";

export function SpotlightProject() {
  const project = projects[0];
  if (!project) return null;

  return (
    <section className="section-block">
      <div className="container-wide">
        <div className="spotlight-grid">
          <FadeUp className="spotlight-content">
            <p className="section-label">Featured project</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-accent">{project.subtitle}</p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              {project.description}
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">{project.outcome}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((s) => (
                <span key={s} className="tech-pill">
                  {s}
                </span>
              ))}
            </div>
            <Link href={`/work/${project.slug}`} className="apple-link mt-8 inline-flex items-center gap-1">
              Read case study
              <ArrowUpRight size={16} />
            </Link>
          </FadeUp>

          <FadeUp delay={0.08} className="spotlight-media">
            <ProjectImage project={project} priority sizes="(max-width: 1024px) 100vw, 560px" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
