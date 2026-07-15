export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  role: string;
  challenge: string;
  solution: string;
  highlights: string[];
  outcome: string;
  stack: string[];
  liveUrl?: string;
  year: string;
  image: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "raja-supermart",
    title: "Raja Supermart",
    subtitle: "Grocery E-Commerce Platform",
    description:
      "Production grocery e-commerce platform with admin console, delivery logistics, and legacy POS integration for an Indian supermarket chain.",
    overview:
      "Raja Supermart needed a modern online ordering channel without disrupting day-to-day store operations tied to a legacy Optech POS. I designed and delivered a full-stack platform where customers browse, cart, checkout, and track orders online, while staff manage catalog, phone orders, deliveries, returns, and revenue from a unified admin console.",
    role: "Freelance Full-Stack Engineer - architecture, backend APIs, customer storefront, admin console, and AWS deployment.",
    challenge:
      "The business ran on a legacy SQL Server POS while new features needed the flexibility of a modern web stack. Inventory had to stay accurate across both systems, phone orders and delivery workflows needed first-class support, and the team required operational dashboards without retraining on complex tooling.",
    solution:
      "I built a React customer storefront and Node.js API layer backed by MongoDB for product and order data, with scheduled sync jobs keeping stock aligned to the Optech SQL Server database. Redis supports session and cache layers. The admin console covers hierarchical catalog management, analytics, delivery partner coordination, phone-order workflows, and returns - all deployed on AWS with S3 for assets.",
    highlights: [
      "Dual-database architecture syncing MongoDB with legacy Optech SQL Server inventory",
      "Customer storefront with cart, wishlist, checkout, and returns management",
      "Admin console for catalog, phone orders, deliveries, and revenue reporting",
      "Production deployment on AWS with reliable asset delivery via S3",
    ],
    outcome:
      "Live production system serving Raja Supermart customers at rajasupermart.com, with online and in-store operations running in sync.",
    stack: ["React", "Node.js", "MongoDB", "SQL Server", "Redis", "AWS"],
    liveUrl: "https://rajasupermart.com",
    year: "2024",
    image: "/images/projects/raja-supermart.svg",
    accent: "#10b981",
  },
  {
    slug: "valathi-chits",
    title: "Valathi Chit Funds",
    subtitle: "FinTech Web & Operations Platform",
    description:
      "Regulated chit fund platform with bilingual content, online applications, financial calculators, and automated legal document generation.",
    overview:
      "Valathi Chit Funds operates across three Tamil Nadu branches under government registration. I built valathichits.com - a production Next.js platform that lets prospective members explore active chit groups, estimate returns, apply online with digital signatures, and download legally compliant forms, supported by a PostgreSQL-backed API and integrated admin tooling.",
    role: "Freelance Full-Stack Engineer - public website, REST API, PDF automation pipeline, and AWS infrastructure.",
    challenge:
      "The platform had to serve bilingual (English and Tamil) audiences, meet regulatory expectations for membership applications, and automate generation of multi-brand legal PDFs - all while remaining maintainable for a small operations team without dedicated engineering staff.",
    solution:
      "I delivered a Next.js frontend with localized content, domain-specific return calculators, and an online application flow with digital signature capture. A PostgreSQL API powers content and application data, with Puppeteer-based PDF generation for compliant forms. The stack runs on AWS EC2 with Nginx, S3 storage, and GitHub Actions for reliable deployments.",
    highlights: [
      "Bilingual (EN/TA) public site with chit group browsing and return calculators",
      "Online membership applications with digital signature support",
      "Automated multi-brand legal PDF generation pipeline",
      "PostgreSQL-backed API with admin-ready content management",
    ],
    outcome:
      "Serving three Tamil Nadu branches at valathichits.com with streamlined online applications and automated legal documentation.",
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "Socket.IO", "AWS"],
    liveUrl: "https://valathichits.com",
    year: "2024",
    image: "/images/projects/valathi-chits.svg",
    accent: "#3b82f6",
  },
  {
    slug: "race-parts-india",
    title: "Race Parts India",
    subtitle: "Motorsport E-Commerce",
    description:
      "Motorsport retail storefront with WhatsApp checkout, Terraform-managed AWS hosting, and automated CI/CD pipelines.",
    overview:
      "Race Parts India required a fast, mobile-first shopping experience for premium motorsport parts without the overhead of a full backend commerce stack. I delivered the React storefront, production AWS infrastructure, and deployment automation as a single end-to-end engagement - from UI to zero-downtime releases.",
    role: "Freelance Full-Stack Engineer - frontend application, cloud infrastructure, and CI/CD automation.",
    challenge:
      "The client needed a polished e-commerce experience with category filtering, cart flows, and product detail views, but preferred a lightweight checkout model. Production hosting, SSL, and repeatable deployments had to be reliable without ongoing manual server work.",
    solution:
      "I built a React 19 + Vite SPA with Tailwind CSS and Framer Motion for responsive catalog, cart, and image-zoom product pages, routing checkout through WhatsApp for a frictionless mobile flow. Terraform provisions EC2 on AWS with Nginx and Let's Encrypt SSL. GitHub Actions pipelines use reusable composite actions and rsync-based deploys for consistent releases.",
    highlights: [
      "Category-filtered product catalog with responsive cart and checkout flows",
      "Serverless WhatsApp checkout - no backend order management overhead",
      "Terraform-provisioned AWS EC2 with Nginx and automated SSL renewal",
      "GitHub Actions CI/CD with reusable actions and images-first deploys",
    ],
    outcome:
      "Live at racepartsindia.com with automated deployments and zero-downtime release capability.",
    stack: ["React", "Vite", "Terraform", "Nginx", "GitHub Actions"],
    liveUrl: "https://racepartsindia.com",
    year: "2024",
    image: "/images/projects/race-parts-india.svg",
    accent: "#ef4444",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getProjectImagePath = (slug: string) =>
  `/images/projects/${slug}.jpg`;
