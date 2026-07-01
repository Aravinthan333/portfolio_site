import Image from "next/image";
import type { Project } from "@/data/projects";

type Props = {
  project: Pick<Project, "slug" | "title" | "image" | "accent">;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function ProjectImage({
  project,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const isPlaceholder = project.image.endsWith(".svg");

  return (
    <div className={`project-image-wrap ${className}`}>
      <Image
        src={project.image}
        alt={`${project.title} project screenshot`}
        fill
        priority={priority}
        sizes={sizes}
        className="project-image"
      />
      {isPlaceholder && (
        <div className="project-image-badge">
          <span className="project-image-badge-dot" style={{ background: project.accent }} />
          Replace with /images/projects/{project.slug}.jpg
        </div>
      )}
    </div>
  );
}
