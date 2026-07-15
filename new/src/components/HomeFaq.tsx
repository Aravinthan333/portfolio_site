"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { useLocalizedFaqs } from "@/hooks/useLocalizedContent";

export function HomeFaq() {
  const t = useTranslations("sections");
  const faqs = useLocalizedFaqs(4);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="home-faq-heading">
      <AtmosphereBg variant="section" />
      <div className="section-wrap relative">
        <div className="section-header mb-10">
          <p className="section-label">{t("faq")}</p>
          <h2 id="home-faq-heading" className="section-title mt-3">
            {t("faqTitle")}
          </h2>
        </div>
        <FaqAccordion items={faqs} />
        <p className="mt-6 text-center text-sm text-[var(--fg-muted)]">
          {t("faqMore")}{" "}
          <Link href="/faq" className="font-medium text-[var(--blue-600)] underline-offset-4 hover:underline">
            {t("faqPage")}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
