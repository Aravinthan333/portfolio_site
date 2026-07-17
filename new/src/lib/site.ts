import { SITE as SITE_DATA } from "@/data/site";

export const SITE = {
  name: SITE_DATA.name,
  title: SITE_DATA.title,
  tagline: SITE_DATA.tagline,
  domain: SITE_DATA.domain,
  location: SITE_DATA.location,
  availability: SITE_DATA.availability,
  email: SITE_DATA.email,
};

export const getSiteUrl = (): string =>
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aravinthanbalaji.com";

export const getEmail = (): string =>
  process.env.NEXT_PUBLIC_EMAIL ?? SITE.email;

export const getLinkedIn = (): string =>
  process.env.NEXT_PUBLIC_LINKEDIN ?? SITE_DATA.linkedIn;

export const getGitHub = (): string =>
  process.env.NEXT_PUBLIC_GITHUB ?? SITE_DATA.github;

export const getGoogleCalendar = (): string =>
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL?.trim() || "/book-call";
