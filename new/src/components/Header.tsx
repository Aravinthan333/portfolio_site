"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (pathname?.startsWith("/admin")) return null;

  const navLinkClass = (active: boolean) =>
    active
      ? "bg-[var(--blue-50)] font-medium text-[var(--blue-600)]"
      : "text-[var(--fg-muted)] hover:bg-[var(--grey-100)] hover:text-[var(--fg)]";

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 w-full border-b border-t-0 border-[rgba(15,23,42,0.08)] rounded-b-2xl backdrop-blur-xl transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-white/95 shadow-[var(--shadow-md)]"
            : "bg-white/80 shadow-[var(--shadow-sm)]"
        }`}
      >
        <div className="section-wrap flex items-center justify-between gap-2 !py-3 sm:gap-3 sm:!py-3.5">
          <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--blue-400)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--blue-500)]" />
            </span>
            <span className="truncate font-display text-sm font-semibold tracking-tight text-[var(--fg)] group-hover:text-[var(--blue-600)] sm:text-base">
              {SITE.shortName}
            </span>
            <span className="hidden text-xs text-[var(--fg-subtle)] md:inline">{t("online")}</span>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-[rgba(15,23,42,0.06)] bg-[var(--grey-100)]/70 px-2 py-1.5 lg:flex"
            aria-label={tA11y("primaryNav")}
          >
            {navHrefs.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
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

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher compact />
            <ResumeDownloadButton
              label={t("downloadResume")}
              iconOnly
              iconSize={16}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/80 text-[var(--fg-muted)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)] md:hidden"
            />
            <ResumeDownloadButton
              label={t("downloadResume")}
              className="btn-secondary !hidden !px-3 !py-2 !text-xs md:!inline-flex lg:!px-4 lg:!py-2.5 lg:!text-sm"
              iconSize={15}
            />
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="hidden sm:block">
              <Link
                href="/contact"
                className="btn-primary !px-3 !py-2 !text-xs lg:!px-5 lg:!py-2.5 lg:!text-sm"
              >
                {t("hireMe")}
              </Link>
            </motion.div>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(15,23,42,0.08)] bg-white/80 text-[var(--fg-muted)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(15,23,42,0.35)] backdrop-blur-[2px] lg:hidden"
          aria-hidden
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        id="mobile-nav"
        className={`fixed top-[3.25rem] right-0 left-0 z-40 max-h-[calc(100svh-3.25rem)] overflow-y-auto border-b border-[rgba(15,23,42,0.08)] bg-white/98 px-4 py-4 shadow-[var(--shadow-lg)] backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
        aria-label={tA11y("primaryNav")}
      >
        <ul className="space-y-1">
          {navHrefs.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm transition-colors ${navLinkClass(active)}`}
                >
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 space-y-2 border-t border-[rgba(15,23,42,0.06)] pt-4 sm:hidden">
          <ResumeDownloadButton
            label={t("downloadResume")}
            className="btn-secondary w-full justify-center !text-sm"
            iconSize={15}
          />
          <Link href="/contact" className="btn-primary w-full justify-center !text-sm" onClick={() => setMenuOpen(false)}>
            {t("hireMe")}
          </Link>
        </div>
      </nav>
    </>
  );
}
