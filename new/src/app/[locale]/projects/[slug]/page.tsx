import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProjectCaseStudyView } from "@/components/ProjectCaseStudyView";
import { getPublishedProjects, getProjectBySlug } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";
import { breadcrumbSchema, creativeWorkSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects
    .filter((project) => project.hasCaseStudy)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = await getProjectBySlug(slug);
  if (!project || !project.hasCaseStudy) return {};
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    image: `${getSiteUrl()}${project.image}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = await getProjectBySlug(slug);
  if (!project || !project.hasCaseStudy) notFound();

  const t = await getTranslations("projectLabels");
  const tNav = await getTranslations("nav");
  const tBreadcrumb = await getTranslations("breadcrumbs");

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: tNav("work"), path: "/projects" },
            { name: project.title, path: `/projects/${slug}` },
          ]),
          creativeWorkSchema({
            title: project.title,
            description: project.description,
            path: `/projects/${slug}`,
            image: `${getSiteUrl()}${project.image}`,
          }),
        ])}
      />

      <ProjectCaseStudyView
        project={project}
        labels={{
          backToProjects: t("backToProjects"),
          overview: t("overview"),
          myRole: t("myRole"),
          theChallenge: t("theChallenge"),
          theSolution: t("theSolution"),
          keyHighlights: t("keyHighlights"),
          outcome: t("outcome"),
          projectSnapshots: t("projectSnapshots"),
          snapshot: t("snapshot"),
          technologies: t("technologies"),
          visitLive: t("visitLive"),
          discussSimilar: t("discussSimilar"),
        }}
      />
    </SiteShell>
  );
}
