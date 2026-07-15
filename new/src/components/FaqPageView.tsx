"use client";

import { HelpCircle } from "lucide-react";
import type { FaqItem } from "@/data/faq";
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
          <header className="mb-10 flex items-center justify-center gap-3 text-center sm:mb-12 sm:gap-3.5">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--blue-600)]/15 bg-[var(--blue-50)] text-[var(--blue-600)] shadow-sm [&_svg]:h-5 [&_svg]:w-5">
              <HelpCircle strokeWidth={2} aria-hidden />
            </span>
            <h1 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)]">
              {title}
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
