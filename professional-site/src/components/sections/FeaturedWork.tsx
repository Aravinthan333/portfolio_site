import Link from "next/link";
import { projects } from "@/data/projects";
import { FadeUp } from "@/components/ui/FadeUp";
import { ProjectCard } from "@/components/ui/ProjectCard";

type Props = {
  limit?: number;
  showViewAll?: boolean;
};

export function FeaturedWork({ limit, showViewAll = false }: Props) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="section-alt section-block" id="projects">
      <div className="container-wide">
        <FadeUp>
          <h2 className="section-heading">Latest Projects</h2>
        </FadeUp>

        <div className="portfolio-grid">
          {items.map((p, i) => (
            <FadeUp key={p.slug} delay={0.05 + i * 0.05}>
              <ProjectCard project={p} priority={i < 2} />
            </FadeUp>
          ))}
        </div>

        {showViewAll && (
          <FadeUp delay={0.15}>
            <div className="mt-10 text-center">
              <Link href="/work" className="text-link">
                View all projects
              </Link>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
