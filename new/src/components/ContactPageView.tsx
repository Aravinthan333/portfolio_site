"use client";

import { Calendar, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { BookCallButton } from "@/components/BookCallButton";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ScrollReveal } from "@/components/ScrollReveal";

type Props = {
  title: string;
  subtitle: string;
  preferTitle: string;
  preferBody: string;
};

export function ContactPageView({
  title,
  subtitle,
  preferTitle,
  preferBody,
}: Props) {
  const tCommon = useTranslations("common");

  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <header className="mb-4 flex flex-col items-center justify-center gap-2 text-center sm:mb-5 sm:flex-row sm:gap-3.5">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--blue-600)]/15 bg-[var(--blue-50)] text-[var(--blue-600)] shadow-sm [&_svg]:h-5 [&_svg]:w-5">
              <Mail strokeWidth={2} aria-hidden />
            </span>
            <h1 className="font-display text-[clamp(1.65rem,4vw,2.75rem)] font-medium tracking-tight text-[var(--fg)] text-balance">
              {title}
            </h1>
          </header>
          <p className="section-desc mx-auto mb-8 max-w-xl px-1 text-center sm:mb-12">
            {subtitle}
          </p>
        </ScrollReveal>

        <div className="mx-auto grid max-w-6xl gap-4 md:gap-5 lg:grid-cols-[1.35fr_auto_0.85fr] lg:items-stretch lg:gap-0">
          <ScrollReveal delay={0.06} className="h-full min-w-0 lg:pr-8">
            <div className="relative h-full overflow-hidden rounded-xl border border-[rgba(15,23,42,0.06)] bg-white/90 p-4 shadow-[var(--shadow-md)] sm:p-7 lg:p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--blue-50)]/70 via-transparent to-transparent"
                aria-hidden
              />
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>

          <div
            className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.45)] to-transparent lg:mx-1 lg:h-auto lg:w-px lg:self-stretch lg:bg-gradient-to-b"
            aria-hidden
          />

          <ScrollReveal delay={0.1} className="h-full min-w-0 lg:pl-8">
            <aside className="relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-xl border border-[rgba(59,130,246,0.18)] bg-white/70 shadow-[var(--shadow-md)] lg:min-h-0">
              <AtmosphereBg variant="cta" />
              <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-8 text-center sm:px-8 sm:py-10">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--blue-600)]/15 bg-[var(--blue-50)] text-[var(--blue-600)] shadow-sm">
                  <Calendar size={22} strokeWidth={2} aria-hidden />
                </span>
                <h2 className="font-display mt-5 text-[clamp(1.35rem,2.4vw,1.75rem)] font-medium leading-snug tracking-tight text-[var(--fg)]">
                  {preferTitle}
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--fg-muted)] sm:max-w-sm">
                  {preferBody}
                </p>
                <div className="mt-6 w-full max-w-xs sm:mt-7">
                  <BookCallButton
                    label={tCommon("bookCall")}
                    className="btn-primary w-full justify-center !px-4 !py-2.5 !text-sm"
                    iconSize={15}
                  />
                </div>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
