"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import type { Service } from "@/data/services";
import { services as serviceMeta } from "@/data/services";
import type { Project } from "@/data/projects";
import { projects as projectMeta } from "@/data/projects";
import type { FaqItem } from "@/data/faq";
import { faqItemKeys } from "@/data/faq";

export function useLocalizedServices(): Service[] {
  const t = useTranslations("servicesContent");
  return useMemo(
    () =>
      serviceMeta.map((s) => ({
        ...s,
        shortTitle: t(`${s.slug}.shortTitle`),
        title: t(`${s.slug}.title`),
        description: t(`${s.slug}.description`),
        summary: t(`${s.slug}.summary`),
        outcomes: t.raw(`${s.slug}.outcomes`) as string[],
        tags: t.raw(`${s.slug}.tags`) as string[],
        seoTitle: t(`${s.slug}.seoTitle`),
        seoDescription: t(`${s.slug}.seoDescription`),
      })),
    [t],
  );
}

export function useLocalizedProjects(): Project[] {
  return projectMeta;
}

export function useLocalizedFaqs(limit?: number): FaqItem[] {
  const t = useTranslations("faqItems");
  return useMemo(() => {
    const items = faqItemKeys.map((key) => ({
      question: t(`${key}.question`),
      answer: t(`${key}.answer`),
    }));
    return limit ? items.slice(0, limit) : items;
  }, [t, limit]);
}
