import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";
import { FadeUp } from "@/components/ui/FadeUp";
import { ProjectCard } from "@/components/ui/ProjectCard";

type Props = {
  limit?: number;
  showViewAll?: boolean;
};

export async function FeaturedWork({ limit, showViewAll = false }: Props) {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="section-alt section-block" id="projects">
      <div className="container-wide">
        <FadeUp>
          <h2 className="section-heading">{t("latestProjects")}</h2>
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
            <div className="mt-8 text-center sm:mt-10">
              <Link href="/work" className="text-link">
                {tCommon("viewAllProjects")}
              </Link>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
