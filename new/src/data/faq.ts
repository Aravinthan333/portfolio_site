export type FaqItem = {
  question: string;
  answer: string;
};

/** Keys under messages.*.faqItems — order matches homepage (first 4) then full FAQ page */
export const faqItemKeys = [
  "whatKinds",
  "remote",
  "aloneAndTeam",
  "delivery",
  "industries",
  "howStart",
] as const;

export type FaqItemKey = (typeof faqItemKeys)[number];

/** English fallback used for seeds/schema when locale messages unavailable */
export const faqs: FaqItem[] = [
  {
    question: "What kinds of software do you build?",
    answer:
      "Custom web applications, business management software, SaaS platforms, ERP and CRM solutions, e-commerce systems, POS-integrated applications, landing pages, company websites, internal tools, REST APIs, and real-time systems.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. I work remotely with flexible hours and am available for freelance projects, contract roles, and full-time remote opportunities. Progress stays visible through clear updates and scheduled reviews.",
  },
  {
    question: "Can you work alone and with a team?",
    answer:
      "Yes. I am comfortable owning delivery independently or integrating into an existing engineering team. When required, I can also lead development efforts through design, build, and release.",
  },
  {
    question: "How do you approach delivery?",
    answer:
      "I focus on understanding business requirements, clean architecture, maintainable code, and reliable communication. Ownership and on-time delivery are priorities throughout the engagement.",
  },
  {
    question: "Which industries do you support?",
    answer:
      "Logistics, retail, e-commerce, startups, small and service businesses, manufacturing, education, finance, and teams pursuing business automation and digital transformation.",
  },
  {
    question: "How do we start?",
    answer:
      "Book a short call or share a project brief through the contact form. We clarify goals, constraints, and next steps before any commitment.",
  },
];

export const homepageFaqs = faqs.slice(0, 4);
