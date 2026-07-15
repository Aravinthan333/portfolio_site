import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { expertise } from "@/data/profile";
import { serviceIconMap } from "@/lib/icons";
import { FadeUp } from "@/components/ui/FadeUp";

const serviceSlugs = ["web", "backend", "saas", "cloud"] as const;
const industryKeys = ["ecommerce", "fintech", "erp", "messaging"] as const;

type Props = {
  showServices?: boolean;
};

export async function ExpertiseGrid({ showServices = false }: Props) {
  const t = await getTranslations("home");
  const tServices = await getTranslations("services");
  const tIndustries = await getTranslations("industries");
  const tCommon = await getTranslations("common");

  return (
    <>
      {!showServices && (
        <FadeUp>
          <h2 className="section-heading">{t("mySkills")}</h2>
        </FadeUp>
      )}

      {showServices && (
        <FadeUp delay={0.06}>
          <h3 className="expertise-subheading">{t("servicesProvide")}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceSlugs.map((slug) => {
              const Icon = serviceIconMap[slug] ?? serviceIconMap.web;

              return (
                <article key={slug} className="expertise-service-card">
                  <div className="expertise-service-top">
                    <div className="service-icon-wrap">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <h4 className="expertise-service-title">{tServices(`${slug}.title`)}</h4>
                  </div>
                  <p className="expertise-service-desc">{tServices(`${slug}.description`)}</p>
                  <Link href="/contact" className="expertise-service-link">
                    {tCommon("discussService")}
                    <ArrowUpRight size={14} />
                  </Link>
                </article>
              );
            })}
          </div>
        </FadeUp>
      )}

      <FadeUp delay={showServices ? 0.12 : 0.06}>
        <h3 className={`expertise-subheading ${showServices ? "mt-10 sm:mt-14" : ""}`}>
          {showServices ? t("technicalSkills") : t("technologies")}
        </h3>
        <div className="skills-grid">
          {expertise.map((skill) => (
            <div key={skill} className="skill-box">
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={showServices ? 0.18 : 0.12}>
        <h3 className="expertise-subheading mt-10 sm:mt-14">{t("industries")}</h3>
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 sm:gap-3">
          {industryKeys.map((key) => (
            <span key={key} className="industry-pill">
              {tIndustries(key)}
            </span>
          ))}
        </div>
      </FadeUp>
    </>
  );
}
