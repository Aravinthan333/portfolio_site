import type { Metadata } from "next";
import { getSiteUrl, SITE } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
};

export const buildMetadata = (input: SeoInput): Metadata => {
  const url = `${getSiteUrl()}${input.path ?? ""}`;
  const fullTitle = input.path ? `${input.title} | ${SITE.name}` : input.title;
  return {
    title: fullTitle,
    description: input.description,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: input.description },
    robots: { index: true, follow: true },
  };
};
