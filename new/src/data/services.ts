export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  outcomes: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "web-development",
    shortTitle: "Web Development",
    title: "Custom Web & Business Applications",
    description:
      "Custom web applications, company websites, and internal tools designed for clarity, performance, and long-term maintainability.",
    summary:
      "I help businesses establish and improve their digital presence with custom web applications, landing pages, and business websites. Engagements cover architecture, interface implementation, API integration, and production deployment — software that is practical, scalable, and aligned with how your team operates.",
    outcomes: [
      "Custom web applications tailored to business workflows",
      "Company websites and landing pages built for conversion and clarity",
      "Internal tools that replace ad-hoc spreadsheets and manual processes",
      "Clean, maintainable codebases ready for future feature growth",
    ],
    tags: ["Web Apps", "Business Sites", "Next.js"],
    seoTitle: "Hire Freelance Web Developer",
    seoDescription:
      "Hire Aravinthan Balaji for custom web applications, business websites, and full stack development for startups and growing companies.",
  },
  {
    slug: "ecommerce-development",
    shortTitle: "E-Commerce",
    title: "E-Commerce & Retail Platforms",
    description:
      "E-commerce platforms and POS-integrated retail systems that connect storefront experience with real operational workflows.",
    summary:
      "From online catalogs to order operations and inventory integration, I build commerce systems that support how retail and service businesses actually sell. Work often includes admin consoles, delivery coordination, and connections to existing POS or inventory sources when full replacement is not an option.",
    outcomes: [
      "Customer-facing storefronts with reliable checkout and order flows",
      "Admin tooling for catalog, orders, and operational reporting",
      "POS and inventory integration for hybrid retail operations",
      "Production hosting suited to traffic, media, and growth",
    ],
    tags: ["E-Commerce", "POS", "Retail"],
    seoTitle: "Hire E-Commerce Developer",
    seoDescription:
      "Freelance e-commerce and retail platform development — storefronts, admin tools, and POS integration by Aravinthan Balaji.",
  },
  {
    slug: "backend-apis",
    shortTitle: "Backend & APIs",
    title: "Backend Systems & API Development",
    description:
      "REST APIs, database design, and backend systems that power business applications with stability and clear contracts.",
    summary:
      "Strong backends turn product ideas into systems teams can operate. I design APIs, data models, authentication, and integrations for ERP modules, CRM workflows, messaging platforms, and custom business software — with an emphasis on maintainability and reliability.",
    outcomes: [
      "Well-structured REST APIs with validation and clear error handling",
      "Database design matched to access patterns and growth",
      "Integrations with third-party services, webhooks, and job queues",
      "Backend foundations for real-time and business-critical applications",
    ],
    tags: ["APIs", "Backend", "Databases"],
    seoTitle: "Hire Backend Developer",
    seoDescription:
      "Hire a freelance backend engineer for REST APIs, databases, and business system integrations — delivered by Aravinthan Balaji.",
  },
  {
    slug: "saas-cloud",
    shortTitle: "SaaS & ERP",
    title: "SaaS, ERP & CRM Solutions",
    description:
      "SaaS products, ERP and CRM solutions, and business management software that automate operations and improve efficiency.",
    summary:
      "I develop SaaS platforms and business systems — including ERP and CRM capabilities — that help organizations automate workflows and gain visibility. Delivery includes feature development, technical consulting, maintenance, and performance work for products that must remain dependable after launch.",
    outcomes: [
      "SaaS dashboards and multi-user business applications",
      "ERP and CRM capabilities tailored to operational needs",
      "Feature development, maintenance, and performance optimization",
      "Technical consulting for architecture and delivery decisions",
    ],
    tags: ["SaaS", "ERP", "CRM"],
    seoTitle: "Hire SaaS & ERP Developer",
    seoDescription:
      "Freelance SaaS, ERP, and CRM development for businesses modernizing operations — consulting and delivery by Aravinthan Balaji.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
