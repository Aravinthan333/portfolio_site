"use client";

import { useTranslations } from "next-intl";
import { Calendar, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";

const socials = [
  { href: SITE.linkedIn, label: "LinkedIn", Icon: LinkedInIcon, external: true },
  { href: SITE.github, label: "GitHub", Icon: GitHubIcon, external: true },
  { href: `mailto:${SITE.email}`, label: "Email", Icon: Mail, external: false },
];

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tHero = useTranslations("hero");

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(59,130,246,0.12)]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom left, #eff6ff 0%, #f0f9ff 40%, #ffffff 100%)",
        }}
      />

      <div className="section-wrap relative py-7 sm:py-8">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[rgba(59,130,246,0.14)] bg-white/80 px-5 py-5 shadow-[var(--shadow-sm)] backdrop-blur-sm sm:flex-row sm:gap-6 sm:px-6 sm:py-5">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--blue-400)] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--blue-500)]" />
                </span>
                <p className="font-display text-lg font-medium tracking-tight text-[var(--fg)]">
                  {SITE.name}
                </p>
              </div>
              <p className="mt-1 text-xs text-[var(--fg-muted)] sm:text-sm">{tHero("roleLine")}</p>
            </div>

            <div className="flex items-center gap-2 sm:ml-2">
              {socials.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--blue-600)]/15 bg-[var(--blue-50)] text-[var(--blue-600)] transition-colors hover:bg-white hover:shadow-[var(--shadow-sm)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-end">
            <ResumeDownloadButton
              label={t("downloadResume")}
              className="btn-secondary !px-4 !py-2.5 !text-sm"
              iconSize={15}
            />
            <Link
              href="/book-call"
              className="btn-primary !gap-2 !px-5 !py-2.5 !text-sm shadow-[0_8px_22px_-8px_rgba(37,99,235,0.55)]"
            >
              <Calendar size={16} strokeWidth={2} />
              {t("bookCall")}
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-[var(--fg-subtle)]">
          {tCommon("copyright", { year: new Date().getFullYear(), name: SITE.name })}
        </p>
      </div>
    </footer>
  );
}
