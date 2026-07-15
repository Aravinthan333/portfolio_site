"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BlueInitials } from "@/components/BlueInitials";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";

export type ServiceListItem = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
};

type Props = {
  services: ServiceListItem[];
  title: string;
  subtitle: string;
  learnMoreLabel: string;
};

export function ServicesPageView({
  services,
  title,
  subtitle,
  learnMoreLabel,
}: Props) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <header className="mb-4 text-center sm:mb-5">
            <h1 className="font-display text-[clamp(1.65rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)] text-balance">
              <BlueInitials text={title} />
            </h1>
          </header>
          <p className="section-desc mx-auto mb-8 max-w-xl px-1 text-center sm:mb-12">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-[rgba(15,23,42,0.06)] bg-white/90 shadow-[var(--shadow-md)]">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className={`group relative flex flex-col gap-3 px-5 py-6 transition-colors sm:flex-row sm:items-center sm:gap-6 sm:px-7 sm:py-7 ${
                  i !== services.length - 1 ? "border-b border-[rgba(15,23,42,0.06)]" : ""
                } hover:bg-[var(--blue-50)]/70`}
              >
                <span className="font-display shrink-0 text-2xl font-medium tabular-nums text-[var(--blue-300)] sm:w-12 sm:text-[1.75rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1 text-left">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--blue-600)] sm:text-xl">
                    {service.shortTitle}
                  </h2>
                  <p className="mt-1 hidden text-xs text-[var(--fg-subtle)] sm:block">
                    {service.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)] sm:text-[0.9375rem]">
                    {service.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-[var(--blue-600)]/12 bg-[var(--blue-50)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--blue-600)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--blue-600)] sm:hidden">
                    {learnMoreLabel}
                    <ArrowUpRight size={14} aria-hidden />
                  </span>
                </div>

                <span
                  className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--blue-200)] bg-white text-[var(--blue-600)] shadow-[var(--shadow-sm)] transition-colors group-hover:border-[var(--blue-400)] group-hover:bg-[var(--blue-50)] sm:inline-flex"
                  aria-hidden
                >
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
