"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useInView } from "framer-motion";
import { metrics } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtmosphereBg } from "@/components/AtmosphereBg";

const metricKeys = ["ownership", "delivered", "types", "remote"] as const;

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
  const isNumeric = !isNaN(numeric);
  const [display, setDisplay] = useState(isNumeric ? "0" : value);

  useEffect(() => {
    if (!inView) return;
    const suffix = value.replace(/[0-9.]/g, "");
    if (!isNumeric) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      setDisplay(
        Number.isInteger(numeric)
          ? `${Math.round(current)}${suffix}`
          : `${current.toFixed(1)}${suffix}`,
      );
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, isNumeric, numeric]);

  return <span ref={ref}>{display}</span>;
}

export function Metrics() {
  const t = useTranslations("metrics");

  return (
    <section className="section-band relative overflow-hidden py-16 sm:py-20">
      <AtmosphereBg variant="band" />
      <div className="section-wrap relative">
        <div className="w-full rounded-[2rem] border border-white/70 bg-white/70 px-4 py-8 shadow-[var(--shadow-md)] backdrop-blur-md sm:px-8 sm:py-10 lg:px-12">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:grid-cols-4 md:gap-x-10 lg:gap-x-14">
            {metrics.map((m, i) => {
              const key = metricKeys[i];
              const value = m.value === "End-to-End" ? t("endToEnd") : m.value;
              return (
                <ScrollReveal key={key} delay={i * 0.1}>
                  <div className="min-w-0 text-center">
                    <p className="metric-value">
                      <Counter value={value} />
                    </p>
                    <h3 className="mt-3 text-sm font-semibold text-[var(--fg)] sm:text-base">
                      {t(key)}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--fg-subtle)] sm:text-sm">
                      {t(`${key}Sub`)}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
