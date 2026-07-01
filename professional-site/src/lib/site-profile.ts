import { cache } from "react";
import { prisma } from "@/lib/db";
import { SITE } from "@/lib/site";

export type SiteProfileData = {
  name: string;
  title: string;
  tagline: string;
  domain: string;
  location: string;
  availability: string;
  email: string;
  linkedIn: string;
  github: string;
  calendly: string;
};

const FALLBACK: SiteProfileData = {
  name: SITE.name,
  title: SITE.title,
  tagline: SITE.tagline,
  domain: SITE.domain,
  location: SITE.location,
  availability: SITE.availability,
  email: SITE.email,
  linkedIn: "https://www.linkedin.com/in/aravinthanbalaji/",
  github: "https://github.com/Aravinthan333",
  calendly: "https://calendly.com/aravinthanbalaji",
};

export const getSiteProfile = cache(async (): Promise<SiteProfileData> => {
  try {
    const profile = await prisma.siteProfile.findUnique({ where: { id: "default" } });
    if (profile) {
      return {
        name: profile.name,
        title: profile.title,
        tagline: profile.tagline,
        domain: profile.domain,
        location: profile.location,
        availability: profile.availability,
        email: profile.email,
        linkedIn: profile.linkedIn,
        github: profile.github,
        calendly: profile.calendly,
      };
    }
  } catch {
    /* database may not be ready during build */
  }
  return FALLBACK;
});

export type SiteProfileInput = Omit<SiteProfileData, never>;
