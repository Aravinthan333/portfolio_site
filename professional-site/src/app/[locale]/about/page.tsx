import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getSiteProfile } from "@/lib/site-profile";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  const profile = await getSiteProfile();
  return buildMetadata({
    title: t("label"),
    description: t("para1", {
      name: profile.name,
      title: profile.title.toLowerCase(),
    }),
    path: "/about",
  });
}

const valueKeys = ["outcomes", "quality", "partnerships"] as const;
const experienceKeys = ["wonderwhy", "independent"] as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const profile = await getSiteProfile();
  const t = await getTranslations("pages.about");
  const tProfile = await getTranslations("profile");
  const tValues = await getTranslations("values");
  const tExperience = await getTranslations("experience");
  const tCommon = await getTranslations("common");
  const title = tProfile("title").toLowerCase();

  return (
    <>
      <div className="hero-section section-block pt-16 sm:pt-20">
        <div className="container-main">
          <SectionHeader
            label={t("label")}
            title={profile.name}
            subtitle={tProfile("tagline")}
          />

          <FadeUp delay={0.08}>
            <div className="mx-auto mt-8 max-w-2xl space-y-4 text-center text-sm leading-relaxed text-muted sm:mt-12 sm:space-y-5 sm:text-base">
              <p>{t("para1", { name: profile.name, title })}</p>
              <p>{t("para2")}</p>
              <p>{t("para3")}</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.14}>
            <h2 className="font-display mt-14 text-center text-xl font-semibold tracking-tight sm:mt-20 sm:text-2xl">
              {t("standFor")}
            </h2>
            <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
              {valueKeys.map((key) => (
                <div key={key} className="gradient-border p-5 text-center sm:p-6 md:p-7">
                  <h3 className="font-display text-sm font-semibold sm:text-base">
                    {tValues(`${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {tValues(`${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-display mt-14 text-center text-xl font-semibold tracking-tight sm:mt-20 sm:text-2xl">
              {t("experience")}
            </h2>
            <div className="mx-auto mt-8 max-w-2xl sm:mt-10">
              {experienceKeys.map((key) => (
                <div key={key} className="border-b border-border/70 py-6 last:border-0 sm:py-7">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {tExperience(`${key}.period`)}
                  </p>
                  <p className="font-display mt-2 text-base font-semibold">
                    {tExperience(`${key}.role`)} · {tExperience(`${key}.company`)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {tExperience(`${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.26}>
            <div className="mt-12 text-center sm:mt-16">
              <Button href="/contact">{tCommon("workWithMe")}</Button>
            </div>
          </FadeUp>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
