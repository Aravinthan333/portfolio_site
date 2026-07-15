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
};

export function HireCta({ title, description, className = "" }: HireCtaProps) {
  const t = useTranslations("hireCta");
  const tCommon = useTranslations("common");

  return (
    <section
      className={`relative overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.06)] p-8 text-center shadow-[var(--shadow-lg)] sm:p-12 ${className}`}
    >
      <AtmosphereBg variant="cta" />
      <div className="relative">
        <p className="section-label">{t("label")}</p>
        <h2 className="section-title mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)]">
          {title ?? t("title")}
        </h2>
        <p className="section-desc mx-auto mt-4 max-w-xl">
          {description ?? t("description")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            {tCommon("hireMe")}
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/book-call" className="btn-secondary">
            <Calendar size={16} />
            {tCommon("bookCall")}
          </Link>
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--blue-600)] underline-offset-4 hover:underline"
          >
            {tCommon("openCalendly")}
          </a>
        </div>
      </div>
    </section>
  );
}
