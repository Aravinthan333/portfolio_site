"use client";

import { useTranslations } from "next-intl";
import { HelpCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLocalizedFaqs } from "@/hooks/useLocalizedContent";

export function HomeFaq() {
  const t = useTranslations("sections");
  const faqs = useLocalizedFaqs(4);

  return (
    <section className="section-band-blue relative overflow-hidden py-20 sm:py-28" aria-labelledby="home-faq-heading">
      <AtmosphereBg variant="band" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header mb-10">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--blue-200)] bg-white text-[var(--blue-600)] shadow-[var(--shadow-sm)]">
              <HelpCircle size={20} strokeWidth={1.85} />
            </div>
            <p className="section-label">{t("faq")}</p>
            <h2 id="home-faq-heading" className="section-title mt-3">
              {t("faqTitle")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>

        <p className="mt-8 text-center text-sm text-[var(--fg-muted)]">
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
