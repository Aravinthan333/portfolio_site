import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HireCta } from "@/components/HireCta";
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
      <div className="section-wrap py-10 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: tNav("services") },
          ]}
        />

        <header className="section-header">
          <p className="section-label">{t("label")}</p>
          <h1 className="section-title mt-3">{t("title")}</h1>
          <p className="section-desc mt-4">{t("subtitle")}</p>
        </header>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="card group relative overflow-hidden p-6 text-center sm:p-8 sm:text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--green-50)] via-transparent to-[var(--blue-50)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <h2 className="text-lg font-semibold text-[var(--fg)] sm:text-xl">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {service.tags.map((tag, ti) => (
                    <span
                      key={tag}
                      className={ti % 2 === 0 ? "pill-accent text-[11px]" : "pill-blue text-[11px]"}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--green-600)]">
                  {tCommon("learnMore")}
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <HireCta title={t("hireCtaTitle")} description={t("hireCtaDescription")} />
        </div>
      </div>
    </SiteShell>
  );
}
