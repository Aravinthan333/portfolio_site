"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common");

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:shadow-lg"
      >
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main-content" className="min-h-[70vh] pt-20 sm:pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
