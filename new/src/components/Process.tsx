"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";

const steps = [
  { step: "01", key: "discover" as const },
  { step: "02", key: "design" as const },
  { step: "03", key: "build" as const },
  { step: "04", key: "deliver" as const },
];

function StepCard({
  title,
  description,
  className = "",
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[rgba(15,23,42,0.06)] bg-white/90 p-4 shadow-[var(--shadow-md)] backdrop-blur-sm sm:p-5 ${className}`}
    >
      <h3 className="font-display text-lg font-medium tracking-tight text-[var(--fg)] sm:text-xl xl:text-2xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{description}</p>
    </div>
  );
}

export function Process() {
  const t = useTranslations("process");
  const tSec = useTranslations("sections");

  return (
    <section id="process" className="section-band relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <AtmosphereBg variant="band" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">{tSec("process")}</p>
            <h2 className="section-title mt-3">{tSec("processTitle")}</h2>
            <p className="section-desc mx-auto mt-4 max-w-xl">{tSec("processDesc")}</p>
          </div>
        </ScrollReveal>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-10 md:hidden">
          <div
            className="absolute bottom-8 left-[1.375rem] top-8 w-px bg-gradient-to-b from-[var(--green-300)] via-[var(--blue-300)] to-[var(--green-300)]"
            aria-hidden
          />
          <ol className="relative grid auto-rows-fr gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.08} className="h-full">
                <li className="relative flex h-full gap-4 sm:gap-5">
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--green-300)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
                    <span className="text-xs font-bold tabular-nums text-[var(--green-600)]">
                      {step.step}
                    </span>
                  </div>
                  <StepCard
                    title={t(step.key)}
                    description={t(`${step.key}Desc`)}
                    className="h-full min-w-0 flex-1"
                  />
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>

        {/* Tablet: 2x2 grid */}
        <ol className="mt-10 hidden auto-rows-fr gap-5 md:grid md:grid-cols-2 xl:hidden">
          {steps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.08} className="h-full">
              <li className="flex h-full gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[var(--green-300)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
                  <span className="text-xs font-bold tabular-nums text-[var(--green-600)]">
                    {step.step}
                  </span>
                </div>
                <StepCard
                  title={t(step.key)}
                  description={t(`${step.key}Desc`)}
                  className="h-full min-w-0 flex-1"
                />
              </li>
            </ScrollReveal>
          ))}
        </ol>

        {/* Desktop: horizontal 4-column */}
        <div className="mt-14 hidden xl:block">
          <ol className="relative grid grid-cols-4 gap-0">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-[2.25rem] h-0.5 bg-gradient-to-r from-[var(--green-300)] via-[var(--blue-300)] to-[var(--green-400)]"
              aria-hidden
            />

            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1} className="h-full">
                <li className="relative flex h-full flex-col items-center px-3 text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[var(--green-300)] bg-[var(--surface)] shadow-[var(--shadow-md)] ring-4 ring-[var(--bg-alt)]">
                    <span className="text-sm font-bold tabular-nums text-[var(--green-600)]">
                      {step.step}
                    </span>
                  </div>

                  {i < steps.length - 1 && (
                    <span
                      className="absolute right-0 top-[2rem] z-20 translate-x-1/2 text-[var(--blue-300)]"
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6 3l5 5-5 5V3z" />
                      </svg>
                    </span>
                  )}

                  <StepCard
                    title={t(step.key)}
                    description={t(`${step.key}Desc`)}
                    className="mt-6 w-full flex-1 text-center transition-all hover:border-[rgba(59,130,246,0.28)] hover:shadow-[var(--shadow-lg)]"
                  />
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
