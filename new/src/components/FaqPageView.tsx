"use client";

import type { FaqItem } from "@/data/faq";
import { BlueInitials } from "@/components/BlueInitials";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HireCta } from "@/components/HireCta";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";

type Props = {
  faqs: FaqItem[];
  title: string;
  hireCtaTitle: string;
  hireCtaDescription: string;
};

export function FaqPageView({
  faqs,
  title,
  hireCtaTitle,
  hireCtaDescription,
}: Props) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <header className="mb-10 text-center sm:mb-12">
            <h1 className="font-display text-[clamp(1.65rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)] text-balance">
              <BlueInitials text={title} />
            </h1>
          </header>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <HireCta
            compact
            title={hireCtaTitle}
            description={hireCtaDescription}
          />
        </div>
      </div>
    </section>
  );
}
