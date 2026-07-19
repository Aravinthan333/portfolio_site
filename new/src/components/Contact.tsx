"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { SITE } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookCallButton } from "@/components/BookCallButton";
import { AtmosphereBg } from "@/components/AtmosphereBg";

export function Contact() {
  const t = useTranslations("sections");
  const tCommon = useTranslations("common");
  const tHero = useTranslations("hero");
  const tSite = useTranslations("site");

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <AtmosphereBg variant="section" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--blue-700)] px-5 py-8 text-white shadow-[var(--shadow-xl)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div
              className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border-[3rem] border-white/5"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-[var(--blue-500)]/30 blur-3xl"
              aria-hidden
            />

            <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
              <div className="max-w-2xl text-center lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--blue-200)]">
                  {t("contactLabel")}
                </p>
                <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-tight">
                  {t("contactTitle")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base lg:mx-0">
                  {tSite("availability")} {t("contactDesc")}
                </p>

                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  <Mail size={15} aria-hidden />
                  {SITE.email}
                </a>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center lg:w-auto lg:flex-col lg:items-stretch">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--blue-700)] shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5 sm:min-w-44 sm:w-auto"
                >
                  {tCommon("hireMe")}
                  <ArrowUpRight size={16} aria-hidden />
                </Link>
                <BookCallButton
                  label={tHero("bookCall")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:min-w-44 sm:w-auto"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
