"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Code2,
  Globe2,
  MessageCircle,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { FaqItem } from "@/data/faq";
import { ScrollReveal } from "@/components/ScrollReveal";

const FAQ_ICONS: LucideIcon[] = [
  Code2,
  Globe2,
  Users,
  Rocket,
  Briefcase,
  MessageCircle,
];

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const Icon = FAQ_ICONS[index % FAQ_ICONS.length];

        return (
          <ScrollReveal key={item.question} delay={index * 0.05}>
            <div
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                open
                  ? "border-[rgba(59,130,246,0.22)] bg-white shadow-[var(--shadow-md)]"
                  : "border-[rgba(15,23,42,0.06)] bg-white/80 shadow-[var(--shadow-sm)] hover:border-[rgba(59,130,246,0.16)] hover:bg-white"
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--blue-50)]/80 via-transparent to-transparent transition-opacity duration-300 ${
                  open ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                }`}
                aria-hidden
              />

              <h2 className="relative">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center gap-3 px-3.5 py-3 text-left sm:gap-3.5 sm:px-4 sm:py-3.5"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--blue-600)]/15 bg-[var(--blue-50)] text-[var(--blue-600)] shadow-sm [&_svg]:h-4 [&_svg]:w-4">
                    <Icon strokeWidth={2} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-display text-base font-semibold tracking-tight sm:text-lg ${
                        open ? "text-[var(--fg)]" : "text-[var(--fg)]/80 group-hover:text-[var(--fg)]"
                      }`}
                    >
                      {item.question}
                    </span>
                  </span>

                  <span
                    className={`relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      open
                        ? "border-[var(--blue-200)] bg-[var(--blue-500)] text-white"
                        : "border-[var(--blue-600)]/15 bg-[var(--blue-50)] text-[var(--blue-600)]"
                    }`}
                    aria-hidden
                  >
                    <span className="absolute h-[1.5px] w-2.5 rounded-full bg-current" />
                    <span
                      className={`absolute h-2.5 w-[1.5px] rounded-full bg-current transition-transform duration-300 ${
                        open ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>
              </h2>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden"
                  >
                    <div className="border-t border-[rgba(59,130,246,0.1)] px-3.5 pb-3.5 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3">
                      <p className="w-full rounded-lg border border-[var(--blue-600)]/10 bg-[var(--blue-50)]/60 px-3.5 py-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
