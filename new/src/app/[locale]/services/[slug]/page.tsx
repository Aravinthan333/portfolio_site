import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServiceDetailView } from "@/components/ServiceDetailView";
import { services } from "@/data/services";
import { getLocalizedService } from "@/lib/i18n-content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = await getLocalizedService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = await getLocalizedService(slug);
  if (!service) notFound();

  const t = await getTranslations("serviceLabels");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const tBreadcrumb = await getTranslations("breadcrumbs");

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: tNav("services"), path: "/services" },
            { name: service.shortTitle, path: `/services/${slug}` },
          ])
        )}
      />
      <ServiceDetailView
        service={{
          slug: service.slug,
          title: service.title,
          shortTitle: service.shortTitle,
          description: service.description,
          summary: service.summary,
          outcomes: service.outcomes,
          tags: service.tags,
        }}
        labels={{
          backToServices: t("allServices"),
          howIHelp: t("howIHelp"),
          outcomes: t("outcomes"),
          contact: tNav("contact"),
          bookCall: tCommon("bookCall"),
          nextStepsHint: t("nextStepsHint", { service: service.shortTitle }),
        }}
      />
    </SiteShell>
  );
}
