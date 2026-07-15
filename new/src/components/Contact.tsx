"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Mail, Code2, Briefcase } from "lucide-react";
import { SITE } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";
import { BookCallButton } from "@/components/BookCallButton";
import { AtmosphereBg } from "@/components/AtmosphereBg";

export function Contact() {
  const t = useTranslations("sections");
  const tCommon = useTranslations("common");
  const tHero = useTranslations("hero");
  const tSite = useTranslations("site");

  return (
    <section id="contact" className="section-band relative overflow-hidden py-20 sm:py-28">
      <AtmosphereBg variant="band" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header mb-14">
            <p className="section-label">{t("contactLabel")}</p>
            <h2 className="section-title mt-3">{t("contactTitle")}</h2>
            <p className="section-desc mt-4">
              {tSite("availability")} {t("contactDesc")}
            </p>
          </div>
        </ScrollReveal>

        <div className="overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.06)] bg-white shadow-[var(--shadow-lg)]">
          <div className="grid lg:grid-cols-2">
            <div className="relative overflow-hidden bg-gradient-to-br from-[var(--blue-50)] via-white to-[var(--blue-100)]/40 p-8 text-center sm:p-12 sm:text-left">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-70 blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)" }}
                aria-hidden
              />
              <ScrollReveal delay={0.05}>
                <div className="relative space-y-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center justify-center gap-3 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--blue-600)] sm:justify-start"
                  >
                    <Mail size={16} />
                    {SITE.email}
                  </a>
                  <a
                    href={SITE.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--blue-600)] sm:justify-start"
                  >
                    <Briefcase size={16} />
                    LinkedIn
                  </a>
                  <a
                    href={SITE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--blue-600)] sm:justify-start"
                  >
                    <Code2 size={16} />
                    GitHub
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
                  <Link href="/contact" className="btn-primary inline-flex">
                    {tCommon("hireMe")}
                    <ArrowUpRight size={16} />
                  </Link>
                  <BookCallButton
                    label={tHero("bookCall")}
                    className="btn-secondary inline-flex"
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="border-t border-[var(--border)] bg-[var(--grey-100)]/50 p-8 sm:p-12 lg:border-t-0 lg:border-l">
              <ScrollReveal delay={0.1}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
