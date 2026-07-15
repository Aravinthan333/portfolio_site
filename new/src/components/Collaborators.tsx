"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";

const keys = ["startups", "modernize", "retail", "teams"] as const;

export function Collaborators() {
  const t = useTranslations("collaborators");
  const tSec = useTranslations("sections");

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <AtmosphereBg variant="section" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">{tSec("whoIWorkWith")}</p>
            <h2 className="section-title mt-3">{tSec("collaboratorsTitle")}</h2>
            <p className="section-desc mt-4">{tSec("collaboratorsDesc")}</p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {keys.map((key, i) => (
            <ScrollReveal key={key} delay={i * 0.08}>
              <div className="card-flat p-6 text-center transition-all hover:border-[var(--green-200)] hover:shadow-[var(--shadow-md)] sm:p-7 sm:text-left">
                <h3 className="text-base font-semibold text-[var(--fg)] sm:text-lg">{t(key)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
