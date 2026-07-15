import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HireCta } from "@/components/HireCta";
import { getLocalizedFaqs } from "@/lib/i18n-content";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.faq");
  const tSeo = await getTranslations("seo");
  return buildMetadata({
    title: t("title"),
    description: tSeo("faqDescription"),
    path: "/faq",
  });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.faq");
  const tNav = await getTranslations("nav");
  const tBreadcrumb = await getTranslations("breadcrumbs");
  const faqs = await getLocalizedFaqs();

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: tNav("faq"), path: "/faq" },
          ]),
          faqPageSchema(faqs),
        ])}
      />
      <div className="section-wrap py-10 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: tNav("faq") },
          ]}
        />

        <header className="section-header mb-12">
          <p className="section-label">{t("label")}</p>
          <h1 className="section-title mt-3">{t("title")}</h1>
          <p className="section-desc mt-4">{t("subtitle")}</p>
        </header>

        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>

        <div className="mt-16">
          <HireCta title={t("hireCtaTitle")} description={t("hireCtaDescription")} />
        </div>
      </div>
    </SiteShell>
  );
}
