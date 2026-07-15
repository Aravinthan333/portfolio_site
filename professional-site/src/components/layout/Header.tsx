"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/expertise", label: t("skills") },
    { href: "/work", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const closeMenu = () => setOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="site-header sticky top-0 z-50 w-full">
      <div className="site-header-bar">
        <Link href="/" className="site-header-logo" onClick={closeMenu}>
          {tCommon("brand")}
        </Link>

        <nav className="site-header-nav hidden lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`site-header-link ${isActive(l.href) ? "is-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <LanguageSwitcher />
          <Link href="/contact" className="site-header-hire-btn hidden sm:inline-flex" onClick={closeMenu}>
            {t("hireMe")}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="site-header-menu-btn lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="site-header-mobile lg:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className={`site-header-mobile-link ${isActive(l.href) ? "is-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="site-header-mobile-hire"
          >
            {t("hireMe")}
          </Link>
        </nav>
      )}
    </header>
  );
}
