"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { SITE } from "@/data/site";

const navHrefs = [
  { key: "work" as const, href: "/projects" },
  { key: "services" as const, href: "/services" },
  { key: "blog" as const, href: "/blog" },
  { key: "faq" as const, href: "/faq" },
  { key: "contact" as const, href: "/contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 w-full border-b border-t-0 border-[rgba(15,23,42,0.08)] rounded-b-2xl backdrop-blur-xl transition-all duration-500 ${
        scrolled
          ? "bg-white/95 shadow-[var(--shadow-md)]"
          : "bg-white/80 shadow-[var(--shadow-sm)]"
      }`}
    >
      <div className="section-wrap flex items-center justify-between gap-3 !py-3 sm:!py-3.5">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--blue-400)] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--blue-500)]" />
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-[var(--fg)] group-hover:text-[var(--blue-600)]">
            {SITE.shortName}
          </span>
          <span className="hidden text-xs text-[var(--fg-subtle)] sm:inline">{t("online")}</span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-[rgba(15,23,42,0.06)] bg-[var(--grey-100)]/70 px-2 py-1.5 md:flex"
          aria-label={tA11y("primaryNav")}
        >
          {navHrefs.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-white font-medium text-[var(--blue-600)] shadow-[var(--shadow-sm)]"
                    : "text-[var(--fg-muted)] hover:bg-white/70 hover:text-[var(--fg)]"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <ResumeDownloadButton
            label={t("downloadResume")}
            iconOnly
            iconSize={16}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/80 text-[var(--fg-muted)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)] sm:hidden"
          />
          <ResumeDownloadButton
            label={t("downloadResume")}
            className="btn-secondary !hidden !px-3 !py-2 !text-xs sm:!inline-flex sm:!px-4 sm:!py-2.5 sm:!text-sm"
            iconSize={15}
          />
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="btn-primary !px-4 !py-2 !text-xs sm:!px-5 sm:!py-2.5 sm:!text-sm"
            >
              {t("hireMe")}
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
