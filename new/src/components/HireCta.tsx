"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";
import { AtmosphereBg } from "@/components/AtmosphereBg";

type HireCtaProps = {
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
};

export function HireCta({ title, description, className = "", compact = false }: HireCtaProps) {
  const t = useTranslations("hireCta");
  const tCommon = useTranslations("common");

  return (
    <section
      className={`relative overflow-hidden rounded-[1.5rem] border border-[rgba(15,23,42,0.06)] text-center shadow-[var(--shadow-md)] ${
        compact ? "px-5 py-6 sm:px-7 sm:py-7" : "rounded-[2rem] p-8 shadow-[var(--shadow-lg)] sm:p-12"
      } ${className}`}
    >
      <AtmosphereBg variant="cta" />
      <div className="relative">
        {!compact && <p className="section-label">{t("label")}</p>}
        <h2
          className={`section-title ${
            compact
              ? "!text-[clamp(1.25rem,2.5vw,1.65rem)] !leading-snug"
              : "mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)]"
          }`}
        >
          {title ?? t("title")}
        </h2>
        <p
          className={`section-desc mx-auto ${
            compact
              ? "mt-2 !text-sm whitespace-nowrap"
              : "mt-4 max-w-xl"
          }`}
        >
          {description ?? t("description")}
        </p>
        <div className={`flex flex-wrap items-center justify-center gap-2.5 ${compact ? "mt-5" : "mt-8 gap-3"}`}>
          <Link
            href="/contact"
            className={compact ? "btn-primary !px-4 !py-2 !text-xs sm:!text-sm" : "btn-primary"}
          >
            {tCommon("hireMe")}
            <ArrowUpRight size={compact ? 14 : 16} />
          </Link>
          <Link
            href="/book-call"
            className={compact ? "btn-secondary !px-4 !py-2 !text-xs sm:!text-sm" : "btn-secondary"}
          >
            <Calendar size={compact ? 14 : 16} />
            {tCommon("bookCall")}
          </Link>
          {!compact && (
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--blue-600)] underline-offset-4 hover:underline"
            >
              {tCommon("openCalendly")}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
