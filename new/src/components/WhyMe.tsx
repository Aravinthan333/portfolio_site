"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";

const keys = ["solve", "ship", "communicate", "own"] as const;

export function WhyMe() {
  const t = useTranslations("whyMe");
  const tSec = useTranslations("sections");

  return (
    <section className="section-band-blue relative overflow-hidden py-20 sm:py-28">
      <AtmosphereBg variant="band" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">{tSec("whyMe")}</p>
            <h2 className="section-title mt-3">{tSec("whyMeTitle")}</h2>
            <p className="section-desc mx-auto mt-4 max-w-xl">{tSec("whyMeDesc")}</p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {keys.map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.08}>
              <div className="card-flat bg-gradient-to-br from-[var(--surface)] to-[var(--green-50)] p-6 text-center sm:p-7 sm:text-left">
                <h3 className="text-base font-semibold text-[var(--fg)] sm:text-lg">{t(key)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {t(`${key}Desc`)}
                </p>
                <p className="mt-4 text-xs font-medium text-[var(--green-600)]">{t(`${key}Stat`)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
