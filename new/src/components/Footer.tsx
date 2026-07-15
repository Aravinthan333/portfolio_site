"use client";

import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";

const linkKeys = [
  { key: "projects" as const, href: "/projects" },
  { key: "services" as const, href: "/services" },
  { key: "blog" as const, href: "/blog" },
  { key: "faq" as const, href: "/faq" },
  { key: "contact" as const, href: "/contact" },
  { key: "bookCall" as const, href: "/book-call" },
];

const socials = [
  { href: SITE.linkedIn, label: "LinkedIn", Icon: LinkedInIcon },
  { href: SITE.github, label: "GitHub", Icon: GitHubIcon },
  { href: `mailto:${SITE.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tCommon = useTranslations("common");
  const tSite = useTranslations("site");
  const tA11y = useTranslations("a11y");

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-12">
      <div className="section-wrap flex flex-col gap-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          <div>
            <p className="font-display text-lg font-medium text-[var(--fg)]">{SITE.name}</p>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">{tHero("roleLine")}</p>
            <p className="mt-2 text-xs text-[var(--fg-subtle)]">{tSite("location")}</p>
            <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(15,23,42,0.08)] text-[var(--fg-muted)] transition-colors hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label={tA11y("footerNav")}>
            {linkKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--blue-600)]"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="btn-primary !px-5 !py-2.5 !text-sm">
            {tNav("hireMe")}
          </Link>
        </div>
        <p className="text-center text-xs text-[var(--fg-subtle)]">
          {tCommon("copyright", { year: new Date().getFullYear(), name: SITE.name })}
        </p>
      </div>
    </footer>
  );
}
