import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/SiteShell";
import { FaqPageView } from "@/components/FaqPageView";
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
      <FaqPageView
        faqs={faqs}
        title={t("title")}
        hireCtaTitle={t("hireCtaTitle")}
        hireCtaDescription={t("hireCtaDescription")}
      />
    </SiteShell>
  );
}
