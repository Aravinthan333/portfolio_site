import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { serviceIconMap } from "@/lib/icons";
import { FadeUp } from "@/components/ui/FadeUp";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";

const serviceSlugs = ["web-development", "backend", "saas", "cloud"] as const;
const serviceKeys = ["web", "backend", "saas", "cloud"] as const;
const slugToKey: Record<(typeof serviceSlugs)[number], (typeof serviceKeys)[number]> = {
  "web-development": "web",
  backend: "backend",
  saas: "saas",
  cloud: "cloud",
};

export async function ServicesPageContent() {
  const t = await getTranslations("pages.services");
  const tServices = await getTranslations("services");
  const tProfile = await getTranslations("profile");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="section-block !pt-0">
        <div className="container-wide">
          <FadeUp>
            <div className="services-intro">
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {t("intro", { availability: tProfile("availability") })}
              </p>
            </div>
          </FadeUp>

          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:mt-12 lg:gap-6">
            {serviceSlugs.map((slug, i) => {
              const key = slugToKey[slug];
              const Icon = serviceIconMap[key] ?? serviceIconMap.web;
              const highlights = tServices.raw(`${key}.highlights`) as string[];

              return (
                <FadeUp key={slug} delay={0.04 + i * 0.04}>
                  <article id={slug} className="service-card scroll-mt-28">
                    <div className="service-card-top">
                      <div className="service-icon-wrap">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <h2 className="service-card-title">{tServices(`${key}.title`)}</h2>
                    </div>

                    <p className="service-card-desc">{tServices(`${key}.description`)}</p>

                    <ul className="service-card-list">
                      {highlights.map((item) => (
                        <li key={item} className="service-card-list-item">
                          <Check size={14} className="shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact" className="service-card-link">
                      {tCommon("discussService")}
                      <ArrowUpRight size={15} />
                    </Link>
                  </article>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.2}>
            <div className="services-bottom-cta">
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                  {t("bottomTitle")}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {t("bottomDesc")}
                </p>
              </div>
              <Button href="/contact">{tCommon("contactMe")}</Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <ProcessSection />
      <CtaBanner />
    </>
  );
}
