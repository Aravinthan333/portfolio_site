import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/FadeUp";
import { getSiteProfile } from "@/lib/site-profile";

export async function CtaBanner() {
  const profile = await getSiteProfile();
  const t = await getTranslations("common");

  return (
    <section className="section-block" id="contact">
      <div className="container-wide">
        <FadeUp>
          <h2 className="section-heading">{t("contactMe")}</h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm leading-relaxed text-muted sm:mb-10 sm:text-base">
            {t("ctaSubtitle")}
          </p>
          <div className="text-center">
            <Button href="/contact">{t("sendMessage")}</Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted">{profile.location}</p>
        </FadeUp>
      </div>
    </section>
  );
}
