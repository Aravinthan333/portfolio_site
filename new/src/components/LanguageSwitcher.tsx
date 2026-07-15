"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/routing";
import { LanguageIcon } from "@/components/icons/LanguageIcon";

const locales = Object.keys(localeNames) as Locale[];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("language")}
        title={localeNames[locale]}
        className={`inline-flex items-center justify-center transition-colors active:scale-95 ${
          compact
            ? "h-10 w-10 rounded-xl text-[var(--fg-muted)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]"
            : "h-10 w-10 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/80 text-[var(--fg-muted)] shadow-[var(--shadow-sm)] hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]"
        }`}
      >
        <LanguageIcon className="h-5 w-5" />
        <span className="sr-only">{t("language")}</span>
      </button>

      {open && (
        <ul
          className="absolute right-0 z-50 mt-2 min-w-[10.5rem] overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white py-1 shadow-[var(--shadow-lg)]"
          role="listbox"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                className={`flex w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  l === locale
                    ? "bg-[var(--blue-50)] font-medium text-[var(--blue-600)]"
                    : "text-[var(--fg-muted)] hover:bg-[var(--grey-100)] hover:text-[var(--fg)]"
                }`}
                onClick={() => switchLocale(l)}
              >
                {localeNames[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
