import { getTranslations } from "next-intl/server";
import type { SiteProfileData } from "@/lib/site-profile";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";

type Props = {
  profile: SiteProfileData;
};

export async function WhyChooseSection({ profile }: Props) {
  const t = await getTranslations("home");
  const tProfile = await getTranslations("profile");
  const tCommon = await getTranslations("common");

  return (
    <section className="section-block" id="about">
      <div className="container-wide">
        <FadeUp>
          <h2 className="section-heading">{t("aboutMe")}</h2>
        </FadeUp>

        <div className="about-panel mx-auto max-w-3xl text-center">
          <FadeUp delay={0.06}>
            <h3 className="text-xl font-bold text-accent sm:text-2xl md:text-3xl">
              {tProfile("title")}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {t("aboutIntro", { name: profile.name, title: tProfile("title").toLowerCase() })}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {tProfile("availability")}
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="mt-8">
              <Button href="/about">{tCommon("learnMore")}</Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
