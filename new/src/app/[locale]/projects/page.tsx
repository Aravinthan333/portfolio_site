import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectsPageView } from "@/components/ProjectsPageView";
import { getPublishedProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.projects");
  const tSeo = await getTranslations("seo");
  return buildMetadata({
    title: t("title"),
    description: tSeo("projectsDescription"),
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.projects");
  const tNav = await getTranslations("nav");
  const tBreadcrumb = await getTranslations("breadcrumbs");
  const tLabels = await getTranslations("projectLabels");
  const projects = await getPublishedProjects();

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: tNav("work"), path: "/projects" },
          ])
        )}
      />
      <ProjectsPageView
        projects={projects.map((project) => ({
          slug: project.slug,
          title: project.title,
          subtitle: project.subtitle,
          description: project.description,
          tags: project.tags,
          year: project.year,
          image: project.image,
          liveUrl: project.liveUrl,
          hasCaseStudy: project.hasCaseStudy,
        }))}
        title={t("title")}
        subtitle={t("subtitle")}
        viewCaseStudyLabel={tLabels("viewCaseStudy")}
        liveSiteLabel={tLabels("liveSite")}
      />
    </SiteShell>
  );
}
