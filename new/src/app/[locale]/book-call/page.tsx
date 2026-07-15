import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Calendar } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallRequestForm } from "@/components/CallRequestForm";
import { SITE } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.bookCall");
  const tSeo = await getTranslations("seo");
  return buildMetadata({
    title: t("title"),
    description: tSeo("bookCallDescription"),
    path: "/book-call",
  });
}

export default async function BookCallPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.bookCall");
  const tBreadcrumb = await getTranslations("breadcrumbs");

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: t("label"), path: "/book-call" },
          ])
        )}
      />
      <div className="section-wrap py-10 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: t("label") },
          ]}
        />

        <header className="section-header mb-12">
          <p className="section-label">{t("label")}</p>
          <h1 className="section-title mt-3">{t("title")}</h1>
          <p className="section-desc mt-4">{t("subtitle")}</p>
        </header>

        <a
          href={SITE.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-10 flex flex-col items-center gap-4 rounded-3xl border border-[var(--green-200)] bg-gradient-to-br from-[var(--green-50)] via-[var(--surface)] to-[var(--blue-50)] p-8 text-center shadow-[var(--shadow-md)] transition-shadow hover:shadow-[var(--shadow-lg)] sm:flex-row sm:justify-between sm:p-10 sm:text-left"
        >
          <div>
            <p className="section-label">{t("fastestPath")}</p>
            <h2 className="font-display mt-2 text-2xl font-medium text-[var(--fg)] sm:text-3xl">
              {t("bookInstantlyTitle")}
            </h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{t("bookInstantlyBody")}</p>
          </div>
          <span className="btn-primary shrink-0">
            <Calendar size={16} />
            {t("openCalendlyBtn")}
            <ArrowUpRight size={16} />
          </span>
        </a>

        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
          <div className="border-b border-[var(--border)] bg-[var(--bg-alt)] px-8 py-6 sm:px-12">
            <h2 className="font-display text-xl font-medium text-[var(--fg)]">
              {t("orRequestTitle")}
            </h2>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">{t("orRequestBody")}</p>
          </div>
          <div className="p-8 sm:p-12">
            <CallRequestForm />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
