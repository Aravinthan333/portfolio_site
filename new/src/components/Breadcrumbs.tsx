"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = useTranslations("breadcrumbs");

  return (
    <nav aria-label={t("ariaLabel")} className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--fg-subtle)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = index === 0 && item.href === "/" ? t("home") : item.label;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden>/</span>}
              {isLast || !item.href ? (
                <span className="text-[var(--fg-muted)]" aria-current={isLast ? "page" : undefined}>
                  {label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-[var(--blue-600)]">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
