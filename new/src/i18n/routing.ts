import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ta", "de", "ja", "ru", "zh"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const localeNames: Record<Locale, string> = {
  en: "English",
  ta: "தமிழ்",
  de: "Deutsch",
  ja: "日本語",
  ru: "Русский",
  zh: "中文",
};
