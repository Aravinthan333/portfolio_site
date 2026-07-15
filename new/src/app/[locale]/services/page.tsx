import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServicesPageView } from "@/components/ServicesPageView";
import { getLocalizedServices } from "@/lib/i18n-content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");
  const tSeo = await getTranslations("seo");
  return buildMetadata({
    title: t("title"),
    description: tSeo("servicesDescription"),
    path: "/services",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tBreadcrumb = await getTranslations("breadcrumbs");
  const services = await getLocalizedServices();

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: tNav("services"), path: "/services" },
          ])
        )}
      />
      <ServicesPageView
        services={services.map(({ slug, title, shortTitle, description, tags }) => ({
          slug,
          title,
          shortTitle,
          description,
          tags,
        }))}
        title={t("title")}
        subtitle={t("subtitle")}
        learnMoreLabel={tCommon("learnMore")}
      />
    </SiteShell>
  );
}
