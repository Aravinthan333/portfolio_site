"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BookCallButton } from "@/components/BookCallButton";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";

type ServiceDetail = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  outcomes: string[];
  tags: string[];
};

type Props = {
  service: ServiceDetail;
  labels: {
    backToServices: string;
    howIHelp: string;
    outcomes: string;
    contact: string;
    bookCall: string;
    nextStepsHint: string;
  };
};

export function ServiceDetailView({ service, labels }: Props) {
  return (
    <section className="relative overflow-hidden py-8 sm:py-10 md:py-12">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <article className="mx-auto w-full min-w-0 max-w-3xl xl:max-w-[48rem]">
          <ScrollReveal>
            <Link
              href="/services"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.08)] bg-white/90 px-3.5 py-2 text-sm font-medium text-[var(--fg-muted)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)] sm:mb-7"
            >
              <ArrowLeft size={15} strokeWidth={2} aria-hidden />
              {labels.backToServices}
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
              <span className="inline-flex items-center rounded-full border border-[var(--blue-600)]/15 bg-[var(--blue-50)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--blue-600)]">
                {service.shortTitle}
              </span>
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[rgba(15,23,42,0.08)] bg-[var(--grey-100)] px-2.5 py-1 text-[11px] font-medium text-[var(--fg-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-[var(--fg)] sm:text-[2.25rem] md:text-[2.5rem]">
              {service.title}
            </h1>

            <p className="mt-3 text-base leading-relaxed text-[var(--fg-muted)] sm:mt-4 sm:text-lg">
              {service.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="relative mt-8 overflow-hidden rounded-xl border border-[rgba(15,23,42,0.06)] bg-white/90 p-5 shadow-[var(--shadow-md)] sm:mt-10 sm:p-7">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--blue-50)]/70 via-transparent to-transparent"
                aria-hidden
              />
              <div className="relative space-y-8">
                <section>
                  <h2 className="font-display text-xl font-medium tracking-tight text-[var(--blue-600)] sm:text-2xl">
                    {labels.howIHelp}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--fg-muted)]">
                    {service.summary}
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-medium tracking-tight text-[var(--blue-600)] sm:text-2xl">
                    {labels.outcomes}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {service.outcomes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-relaxed text-[var(--fg-muted)]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue-500)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative mt-6 overflow-hidden rounded-xl border border-[rgba(59,130,246,0.18)] bg-white/70 shadow-[var(--shadow-md)] sm:mt-8">
              <AtmosphereBg variant="cta" />
              <div className="relative flex flex-col items-stretch justify-center gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-7">
                <p className="text-center text-sm leading-relaxed text-[var(--fg-muted)] sm:text-left sm:text-[0.9375rem]">
                  {labels.nextStepsHint}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
                  <Link
                    href="/contact"
                    className="btn-primary inline-flex justify-center !px-4 !py-2.5 !text-sm"
                  >
                    {labels.contact}
                    <ArrowUpRight size={15} aria-hidden />
                  </Link>
                  <BookCallButton
                    label={labels.bookCall}
                    className="btn-secondary inline-flex justify-center !px-4 !py-2.5 !text-sm"
                    iconSize={15}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </article>
      </div>
    </section>
  );
}
