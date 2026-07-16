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
  tags: string[];
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
      "End-to-end grocery commerce for an Indian supermarket - storefront, operations console, delivery workflows, and inventory sync with a legacy POS.",
    overview:
      "Raja Supermart needed an online ordering channel that respected how the store already ran day to day. I designed and shipped a full-stack platform covering customer browsing and checkout, staff tools for catalog and phone orders, delivery coordination, and returns - while keeping stock aligned with an existing Optech POS database.",
    role: "Freelance full-stack engineer responsible for architecture, APIs, customer and admin interfaces, and AWS deployment.",
    challenge:
      "Inventory and pricing lived in a legacy SQL Server POS that could not be replaced. Orders still arrived by phone as well as the web. Delivery partners needed address-grouped assignments, and leadership required clear revenue and category reporting - all without disrupting in-store operations.",
    solution:
      "I delivered a React storefront and Node.js API with MongoDB for commerce data, Redis for sessions and cache, and scheduled jobs that reconcile stock with Optech SQL Server. The admin console handles catalog structure, phone-order entry, partner assignment, returns, and analytics. Assets and hosting sit on AWS with S3 for media.",
    highlights: [
      "Dual-database design keeping MongoDB commerce data in step with Optech SQL Server inventory",
      "Customer experience covering catalog, cart, wishlist, checkout, and returns",
      "Operations console for phone orders, deliveries, catalog, and revenue insights",
      "Production hosting on AWS with reliable media delivery via S3",
    ],
    outcome:
      "A live grocery platform at rajasupermart.com where online and in-store operations stay synchronized.",
    stack: ["React", "Node.js", "MongoDB", "SQL Server", "Redis", "AWS"],
    tags: ["E-Commerce", "React", "Node.js", "AWS"],
    liveUrl: "https://rajasupermart.com",
    year: "2024",
    image: "/images/projects/raja-supermart.svg",
    accent: "#10b981",
  },
  {
    slug: "valathi-chits",
    title: "Valathi Chit Funds",
    subtitle: "FinTech Web Platform",
    description:
      "Regulated chit fund public site with bilingual content, online membership applications, return calculators, and automated legal PDF generation.",
    overview:
      "Valathi Chit Funds operates three Tamil Nadu branches under government registration. I built valathichits.com so prospective members can review active groups, estimate returns, apply online with digital signatures, and receive compliant documentation - backed by a PostgreSQL API and ops-ready admin tooling. A companion WhatsApp operations console later unified agent messaging and branch workflows.",
    role: "Freelance full-stack engineer for the public site, REST API, PDF automation, and AWS infrastructure.",
    challenge:
      "The product had to serve English and Tamil audiences, satisfy regulatory expectations for applications, and automate branded legal forms - while remaining operable by a small team without a dedicated engineering staff.",
    solution:
      "I shipped a Next.js bilingual experience with group browsing, domain-specific calculators, and an application flow with signature capture. PostgreSQL stores content and applications; Puppeteer generates multi-brand legal PDFs. Deployment runs on AWS EC2 behind Nginx with S3 storage and GitHub Actions releases.",
    highlights: [
      "Bilingual English/Tamil public site with calculators and group discovery",
      "Online membership applications with digital signature support",
      "Automated multi-brand legal PDF pipeline for compliance paperwork",
      "PostgreSQL-backed API ready for content and application administration",
    ],
    outcome:
      "Serving three branches at valathichits.com with streamlined applications and automated legal documents.",
    stack: ["Next.js", "Express", "PostgreSQL", "Redis", "AWS"],
    tags: ["FinTech", "Next.js", "PostgreSQL", "AWS"],
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
      "High-performance motorsport catalog with WhatsApp checkout, Terraform-managed AWS hosting, and automated CI/CD.",
    overview:
      "Race Parts India needed a credible, mobile-first storefront for racing components and simulator hardware without the cost of a full commerce backend at launch. I delivered the React storefront, production AWS footprint, and release automation as one engagement - from UI through zero-downtime deploys.",
    role: "Freelance engineer for the frontend application, cloud infrastructure, and CI/CD pipelines.",
    challenge:
      "The business required polished browsing, filtering, cart, and product detail experiences while preferring a lightweight checkout model. Hosting, SSL, and repeatable releases had to remain dependable without constant manual server work.",
    solution:
      "I built a React SPA with a responsive catalog, cart flows, and image-rich product pages, routing checkout through WhatsApp for a familiar mobile purchase path. Terraform provisions AWS EC2 with Nginx and automated SSL. GitHub Actions pipelines standardize builds and rsync-based deployments.",
    highlights: [
      "Category-filtered catalog with responsive cart and product detail experiences",
      "WhatsApp checkout that avoids early backend order-management overhead",
      "Terraform-provisioned AWS EC2 with Nginx and automated SSL renewal",
      "GitHub Actions CI/CD for consistent, low-friction releases",
    ],
    outcome:
      "Live at racepartsindia.com with automated deployments and a clear path to add a backend later.",
    stack: ["React", "Vite", "Terraform", "Nginx", "GitHub Actions"],
    tags: ["E-Commerce", "React", "Terraform", "CI/CD"],
    liveUrl: "https://racepartsindia.com",
    year: "2024",
    image: "/images/projects/race-parts-india.svg",
    accent: "#ef4444",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
