export const SITE = {
  name: "Aravinthan Balaji",
  title: "Software Engineer",
  tagline:
    "I design and build production-grade web applications, APIs, and cloud infrastructure for businesses that need reliable software — from architecture through deployment.",
  domain: "aravinthanbalaji.com",
  location: "India · Available Worldwide (Remote)",
  availability:
    "Open to remote and contract-based engagements with teams worldwide.",
  email: "aravinthanbaalaji@gmail.com",
};

export const getSiteUrl = (): string =>
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aravinthanbalaji.com";

export const getEmail = (): string =>
  process.env.NEXT_PUBLIC_EMAIL ?? SITE.email;

export const getLinkedIn = (): string =>
  process.env.NEXT_PUBLIC_LINKEDIN ?? "https://www.linkedin.com/in/aravinthanbalaji/";

export const getGitHub = (): string =>
  process.env.NEXT_PUBLIC_GITHUB ?? "https://github.com/Aravinthan333";

export const getCalendly = (): string =>
  process.env.NEXT_PUBLIC_CALENDLY ?? "https://calendly.com/aravinthanbalaji";
