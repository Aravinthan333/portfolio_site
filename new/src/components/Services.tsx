"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { useLocalizedServices } from "@/hooks/useLocalizedContent";

export function Services() {
  const t = useTranslations("sections");
  const services = useLocalizedServices();

  return (
    <section id="services" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <AtmosphereBg variant="mesh" />
      <div className="section-wrap relative">
        <ScrollReveal>
          <div className="section-header">
            <p className="section-label">{t("whatIDo")}</p>
            <h2 className="font-display mt-3 text-[clamp(1.35rem,4.8vw,3.25rem)] font-medium leading-tight tracking-tight text-[var(--fg)] text-balance">
              {t("servicesTitle")}
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.06)] bg-white shadow-[var(--shadow-lg)]">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className={`group relative flex flex-col gap-4 px-5 py-6 transition-colors sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-7 ${
                  i !== services.length - 1 ? "border-b border-[rgba(15,23,42,0.06)]" : ""
                } hover:bg-[var(--blue-50)]/70`}
              >
                <span className="font-display shrink-0 text-2xl font-medium tabular-nums text-[var(--green-300)] sm:w-14 sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--green-700)] sm:text-xl">
                      {service.shortTitle}
                    </h3>
                    <span className="hidden text-xs text-[var(--fg-subtle)] sm:inline">
                      {service.title}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)] sm:text-[0.9375rem]">
                    {service.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full border border-[var(--green-200)] bg-[var(--surface)] text-[var(--green-600)] shadow-[var(--shadow-sm)] transition-colors group-hover:border-[var(--green-400)] group-hover:bg-[var(--green-100)] sm:self-center"
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  aria-hidden
                >
                  <ArrowUpRight size={16} />
                </motion.span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
