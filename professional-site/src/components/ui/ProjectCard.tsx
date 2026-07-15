import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";
import { ProjectImage } from "@/components/ui/ProjectImage";

type Props = {
  project: Project;
  priority?: boolean;
};

export async function ProjectCard({ project, priority = false }: Props) {
  const t = await getTranslations("common");

  return (
    <Link href={`/work/${project.slug}`} className="portfolio-box group">
      <ProjectImage project={project} priority={priority} className="portfolio-box-image" />
      <div className="portfolio-layer">
        <h4 className="text-lg font-bold sm:text-xl md:text-2xl">{project.title}</h4>
        <p className="mt-2 px-3 text-sm leading-relaxed sm:px-4">{project.subtitle}</p>
        <span className="portfolio-layer-cta">{t("viewProjectCta")}</span>
      </div>
    </Link>
  );
}
