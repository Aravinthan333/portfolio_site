"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";

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
        <div className="section-wrap flex items-center justify-between gap-2 !py-3.5 sm:gap-3 sm:!py-4">
          <Link href="/" className="group flex shrink-0 items-center gap-1.5 overflow-visible sm:gap-2">
            <span className="-ml-1 relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--blue-600)] shadow-[var(--shadow-sm)] transition-shadow duration-300 group-hover:shadow-[0_0_0_3px_rgba(37,99,235,0.18),0_8px_20px_-6px_rgba(37,99,235,0.55)] sm:-ml-1.5 sm:h-10 sm:w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 14"
                className="absolute top-1/2 left-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 text-white"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <g
                  transform="translate(-620, -374.5)"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.85"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  paintOrder="stroke fill"
                >
                  <path d="M632.316228,374.051317 C632.802747,374.21349 633.081651,374.71338 632.97918,375.203464 L632.948683,375.316228 L628.948683,387.316228 C628.774036,387.840171 628.207716,388.123331 627.683772,387.948683 C627.197253,387.78651 626.918349,387.28662 627.02082,386.796536 L627.051317,386.683772 L631.051317,374.683772 C631.225964,374.159829 631.792284,373.876669 632.316228,374.051317 Z M625.8,377.4 C626.105881,377.807841 626.053113,378.373293 625.695675,378.718504 L625.6,378.8 L622.667,381 L625.6,383.2 C626.007841,383.505881 626.11551,384.063489 625.86903,384.494975 L625.8,384.6 C625.494119,385.007841 624.936511,385.11551 624.505025,384.86903 L624.4,384.8 L620.4,381.8 C619.902222,381.426667 619.869037,380.704889 620.300444,380.285096 L620.4,380.2 L624.4,377.2 C624.841828,376.868629 625.468629,376.958172 625.8,377.4 Z M635.494975,377.13097 L635.6,377.2 L639.6,380.2 C640.097778,380.573333 640.130963,381.295111 639.699556,381.714904 L639.6,381.8 L635.6,384.8 C635.158172,385.131371 634.531371,385.041828 634.2,384.6 C633.894119,384.192159 633.946887,383.626707 634.304325,383.281496 L634.4,383.2 L637.333,381 L634.4,378.8 C633.992159,378.494119 633.88449,377.936511 634.13097,377.505025 L634.2,377.4 C634.505881,376.992159 635.063489,376.88449 635.494975,377.13097 Z" />
                </g>
              </svg>
            </span>
            <span
              className="font-script inline-block overflow-visible px-1.5 pt-2 pb-1 text-xl font-semibold leading-[1.4] tracking-normal text-[var(--fg)] normal-case transition-[text-shadow] duration-300 group-hover:[text-shadow:0_4px_14px_rgba(37,99,235,0.45)] sm:text-2xl md:text-[1.75rem]"
              aria-label="Aravinthan B"
            >
              <span className="inline-block text-[1.35em] font-bold text-[var(--blue-600)]">
                A
              </span>
              <span className="normal-case">ravinthan</span>{" "}
              <span className="inline-block pr-1 font-bold text-[var(--blue-600)]">
                B
              </span>
            </span>
            <span className="ml-0.5 hidden items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-emerald-700 uppercase md:inline-flex md:ml-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              {t("online")}
            </span>
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
