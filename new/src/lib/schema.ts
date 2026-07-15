import { getSiteUrl, SITE, getEmail, getLinkedIn, getGitHub } from "@/lib/site";

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.title,
    description: SITE.tagline,
    url: getSiteUrl(),
    email: getEmail(),
    image: `${getSiteUrl()}/images/profile.jpg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: [getLinkedIn(), getGitHub()],
    knowsAbout: [
      "Full Stack Development",
      "Custom Web Applications",
      "Business Software",
      "SaaS Platforms",
      "Backend Systems",
      "REST APIs",
      "E-Commerce",
      "ERP Systems",
      "CRM Solutions",
      "Software Architecture",
    ],
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} — Software Engineering`,
    description: SITE.tagline,
    url: getSiteUrl(),
    email: getEmail(),
    areaServed: "Worldwide",
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: SITE.name,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: getSiteUrl(),
    description: SITE.tagline,
    author: { "@type": "Person", name: SITE.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${getSiteUrl()}${item.path}`,
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function blogPostingSchema(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: `${getSiteUrl()}${input.path}`,
    datePublished: input.date,
    author: {
      "@type": "Person",
      name: SITE.name,
    },
    image: input.image ?? `${getSiteUrl()}/images/profile.jpg`,
  };
}

export function creativeWorkSchema(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.description,
    url: `${getSiteUrl()}${input.path}`,
    creator: {
      "@type": "Person",
      name: SITE.name,
    },
    image: input.image,
  };
}
