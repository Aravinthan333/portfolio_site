import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Calendar, Mail } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/data/site";
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
  const tSite = await getTranslations("site");
  const tCommon = await getTranslations("common");
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
      <div className="section-wrap py-10 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: tNav("contact") },
          ]}
        />

        <header className="section-header mb-12">
          <p className="section-label">{t("label")}</p>
          <h1 className="section-title mt-3">{t("title")}</h1>
          <p className="section-desc mt-4">
            {tSite("availability")} {t("subtitle")}
          </p>
        </header>

        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
          <div className="grid lg:grid-cols-2">
            <div className="bg-gradient-to-br from-[var(--green-50)] via-[var(--surface)] to-[var(--blue-50)] p-8 text-center sm:p-12 sm:text-left">
              <h2 className="font-display text-2xl font-medium text-[var(--fg)]">
                {t("preferConversation")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                {t("preferConversationBody")}
              </p>
              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center justify-center gap-3 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--green-600)] sm:justify-start"
                >
                  <Mail size={16} />
                  {SITE.email}
                </a>
                <Link href="/book-call" className="btn-primary mt-4 inline-flex">
                  <Calendar size={16} />
                  {tCommon("bookCall")}
                </Link>
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-sm font-medium text-[var(--green-600)] underline-offset-4 hover:underline"
                >
                  {t("openCalendlyDirectly")}
                </a>
              </div>
            </div>

            <div className="border-t border-[var(--border)] bg-[var(--grey-100)]/50 p-8 sm:p-12 lg:border-t-0 lg:border-l">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
