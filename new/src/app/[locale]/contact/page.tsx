import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/SiteShell";
import { ContactPageView } from "@/components/ContactPageView";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const tSeo = await getTranslations("seo");
  return buildMetadata({
    title: tSeo("contactTitle"),
    description: tSeo("contactDescription"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  const tNav = await getTranslations("nav");
  const tBreadcrumb = await getTranslations("breadcrumbs");

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbSchema([
            { name: tBreadcrumb("home"), path: "/" },
            { name: tNav("contact"), path: "/contact" },
          ])
        )}
      />
      <ContactPageView
        title={t("title")}
        subtitle={t("subtitle")}
        preferTitle={t("preferConversation")}
        preferBody={t("preferConversationBody")}
      />
    </SiteShell>
  );
}
