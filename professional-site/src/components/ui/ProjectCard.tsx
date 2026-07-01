import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectImage } from "@/components/ui/ProjectImage";

type Props = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: Props) {
  return (
    <Link href={`/work/${project.slug}`} className="portfolio-box group">
      <ProjectImage project={project} priority={priority} className="portfolio-box-image" />
      <div className="portfolio-layer">
        <h4 className="text-xl font-bold sm:text-2xl">{project.title}</h4>
        <p className="mt-2 px-4 text-sm leading-relaxed">{project.subtitle}</p>
        <span className="portfolio-layer-cta">View project ↗</span>
      </div>
    </Link>
  );
}
