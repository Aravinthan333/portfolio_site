"use client";

import { useTranslations } from "next-intl";
import { skillGroups } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";

const skillLabelKeys = ["languages", "frameworks", "infra", "databases"] as const;

export function Skills() {
  const t = useTranslations("sections");
  const tSkills = useTranslations("skills");

  return (
    <section id="skills" className="relative overflow-hidden py-20 sm:py-28">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">{t("expertise")}</p>
            <h2 className="section-title mt-3">{t("skillsTitle")}</h2>
            <p className="section-desc mx-auto mt-4 max-w-xl">{t("skillsDesc")}</p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={skillLabelKeys[i]} delay={i * 0.08}>
              <div className="card-flat p-6 text-center sm:text-left">
                <h3 className="text-sm font-semibold text-[var(--fg-muted)]">
                  {tSkills(skillLabelKeys[i])}
                </h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[var(--border)] bg-[var(--grey-100)] px-3 py-1.5 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:border-[var(--green-200)] hover:bg-[var(--green-50)] hover:text-[var(--green-700)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
