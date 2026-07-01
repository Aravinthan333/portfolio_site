"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/expertise", label: "Skills" },
  { href: "/work", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="site-header sticky top-0 z-50 w-full">
      <div className="site-header-bar">
        <Link href="/" className="site-header-logo" onClick={closeMenu}>
          Portfolio
        </Link>

        <nav className="site-header-nav hidden md:flex" aria-label="Main">
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
          <Link href="/contact" className="site-header-hire-btn" onClick={closeMenu}>
            Hire me
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="site-header-menu-btn md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="site-header-mobile md:hidden" aria-label="Mobile">
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
        </nav>
      )}
    </header>
  );
}
