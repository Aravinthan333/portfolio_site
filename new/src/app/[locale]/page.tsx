import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { HomeExplore } from "@/components/HomeExplore";
import { Collaborators } from "@/components/Collaborators";
import { Process } from "@/components/Process";
import { WhyMe } from "@/components/WhyMe";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { SITE } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import {
  jsonLdScript,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/schema";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getLocalizedServices,
  localizeBlogPosts,
} from "@/lib/i18n-content";
import { getLatestPublishedBlogs } from "@/lib/blogs";
import { getPublishedProjects } from "@/lib/projects";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("seo");
  return buildMetadata({
    title: t("homeTitle", { name: SITE.name }),
    description: t("homeDescription"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [projects, rawPosts, services] = await Promise.all([
    getPublishedProjects(),
    getLatestPublishedBlogs(2),
    getLocalizedServices(),
  ]);
  const posts = await localizeBlogPosts(rawPosts);

  const schema = [
    personSchema(),
    professionalServiceSchema(),
    websiteSchema(),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(schema)}
      />
      <Hero />
      <Metrics />
      <HomeExplore
        projects={projects.slice(0, 2).map(
          ({ slug, title, subtitle, year, image, liveUrl, hasCaseStudy }) => ({
            slug,
            title,
            subtitle,
            year,
            image,
            liveUrl,
            hasCaseStudy,
          }),
        )}
        services={services.map(({ slug, shortTitle }) => ({
          slug,
          title: shortTitle,
        }))}
        posts={posts.map(
          ({ slug, title, category, date, readTime, coverImage }) => ({
            slug,
            title,
            category,
            date,
            readTime,
            coverImage,
          }),
        )}
      />
      <Collaborators />
      <Process />
      <WhyMe />
      <Skills />
      <Contact />
    </>
  );
}
