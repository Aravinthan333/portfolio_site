"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { BookCallButton } from "@/components/BookCallButton";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";

const tagKeys = ["webApps", "business", "saas", "backend"] as const;

const socialLinks = [
  { href: SITE.linkedIn, label: "LinkedIn", Icon: LinkedInIcon },
  { href: SITE.github, label: "GitHub", Icon: GitHubIcon },
];

export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const tSite = useTranslations("site");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20 text-center sm:px-8 sm:pt-32">
      <AtmosphereBg variant="hero" />

      <div className="relative mx-auto w-full max-w-4xl">
        <ScrollReveal delay={0.08}>
          <p className="text-sm font-semibold tracking-wide text-[var(--blue-600)] sm:text-base">
            {t("roleLine")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="mt-3 flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-5 lg:gap-y-3">
            <h1 className="font-display text-[clamp(2.75rem,7vw,4.75rem)] font-medium leading-[1.06] tracking-tight text-[var(--fg)]">
              {SITE.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {tagKeys.map((key, i) => (
                <motion.span
                  key={key}
                  className={i % 2 === 0 ? "pill" : "pill pill-blue"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  {t(`tags.${key}`)}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-5 flex items-center justify-center gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(15,23,42,0.08)] bg-white/80 text-[var(--fg-muted)] shadow-[var(--shadow-sm)] transition-colors hover:border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.28}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
            {tSite("bio")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.32}>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--fg-subtle)] sm:text-base">
            {tSite("tagline")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.38}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="btn-primary">
                {tCommon("hireMe")}
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <BookCallButton label={t("bookCall")} className="btn-secondary" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/projects" className="btn-secondary">
                {t("viewWork")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <ResumeDownloadButton label={tCommon("downloadResume")} />
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <motion.div
            className="relative mx-auto mt-14 aspect-square w-40 sm:w-48"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[var(--blue-200)]/50 via-[var(--blue-100)]/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-full border-[6px] border-white bg-white p-1 shadow-[var(--shadow-xl)] ring-1 ring-[var(--blue-100)]">
              <Image
                src="/images/profile.jpg"
                alt={`${SITE.name}, ${tSite("title")}`}
                width={200}
                height={200}
                priority
                className="rounded-full object-cover"
              />
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
