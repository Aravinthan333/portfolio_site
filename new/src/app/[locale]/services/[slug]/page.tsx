import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { HireCta } from "@/components/HireCta";
import { BookCallButton } from "@/components/BookCallButton";
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
  const tPages = await getTranslations("pages.serviceDetail");
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

      <div className="section-wrap py-10 sm:py-16">

        <article className="mx-auto max-w-3xl">
          <header className="text-center">
            <p className="section-label">{t("label")}</p>
            <h1 className="section-title mt-3">{service.title}</h1>
            <p className="section-desc mx-auto mt-4 max-w-2xl">{service.description}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {service.tags.map((tag, i) => (
                <span
                  key={tag}
                  className={i % 2 === 0 ? "pill-accent text-[11px]" : "pill-blue text-[11px]"}
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <section className="mt-14">
            <h2 className="font-display text-xl font-medium text-[var(--green-600)] sm:text-2xl">
              {t("howIHelp")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--fg-muted)]">{service.summary}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-medium text-[var(--green-600)] sm:text-2xl">
              {t("outcomes")}
            </h2>
            <ul className="mt-4 space-y-3">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-[var(--fg-muted)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green-500)]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-[var(--border)] pt-10">
            <Link href="/contact" className="btn-primary">
              {tCommon("hireMe")}
              <ArrowUpRight size={16} />
            </Link>
            <BookCallButton label={tCommon("bookCall")} className="btn-secondary" />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--green-600)]"
            >
              <ArrowLeft size={14} />
              {t("allServices")}
            </Link>
          </div>
        </article>

        <div className="mt-16">
          <HireCta
            title={tPages("hireCtaTitle", { service: service.shortTitle })}
            description={tPages("hireCtaDescription")}
          />
        </div>
      </div>
    </SiteShell>
  );
}
