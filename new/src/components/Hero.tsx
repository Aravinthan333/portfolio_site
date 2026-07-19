"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/data/site";
import { BlueInitials } from "@/components/BlueInitials";
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
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden pt-[calc(4rem+env(safe-area-inset-top))] pb-16 sm:pt-[calc(5rem+env(safe-area-inset-top))] sm:pb-20 lg:pt-24 lg:pb-24">
      <AtmosphereBg variant="hero" />

      <div className="section-wrap relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:gap-16 xl:gap-24">
          <div className="text-center lg:text-left">
            <ScrollReveal delay={0.08}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--blue-600)] sm:text-sm">
                {t("roleLine")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <h1 className="font-display mt-4 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[var(--fg)] lg:max-w-4xl">
                <BlueInitials text={SITE.name} />
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
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
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg lg:mx-0">
                {tSite("bio")}
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--fg-subtle)] sm:text-base lg:mx-0">
                {tSite("tagline")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-col items-stretch gap-2.5 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center min-[480px]:justify-center min-[480px]:gap-3 lg:justify-start">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/contact" className="btn-primary w-full min-[480px]:w-auto">
                    {tCommon("hireMe")}
                    <ArrowUpRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <BookCallButton
                    label={t("bookCall")}
                    className="btn-secondary w-full min-[480px]:w-auto"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/projects" className="btn-secondary w-full min-[480px]:w-auto">
                    {t("viewWork")}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <ResumeDownloadButton
                    label={tCommon("downloadResume")}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--blue-200)] bg-gradient-to-r from-white to-[var(--blue-50)] px-5 py-2.5 text-sm font-semibold text-[var(--blue-700)] shadow-[var(--shadow-sm)] transition-[border-color,box-shadow,background-color] hover:border-[var(--blue-400)] hover:shadow-[var(--shadow-md)] min-[480px]:w-auto [&_svg]:transition-transform group-hover:[&_svg]:translate-y-0.5"
                  />
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-[var(--blue-200)]/60 via-[var(--blue-100)]/25 to-transparent blur-3xl" />
              <motion.div
                className="relative mx-auto aspect-[4/5] max-w-[19rem] overflow-hidden rounded-[2.5rem] border-[7px] border-white bg-white shadow-[var(--shadow-xl)] ring-1 ring-[var(--blue-100)] sm:max-w-[22rem] lg:max-w-none"
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt={`${SITE.name}, ${tSite("title")}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 24rem, 22rem"
                  className="object-cover"
                />
              </motion.div>
              <div className="relative mx-auto -mt-6 flex w-fit items-center gap-2 rounded-full border border-[rgba(15,23,42,0.08)] bg-white/95 px-3 py-2 shadow-[var(--shadow-md)] backdrop-blur">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--fg-muted)] transition-colors hover:bg-[var(--blue-50)] hover:text-[var(--blue-600)]"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
