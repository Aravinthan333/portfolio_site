import type { BlogContentBlock } from "@/types/blog";

export type { BlogContentBlock } from "@/types/blog";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  relatedProject?: string;
  content: BlogContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "bridging-legacy-pos-with-modern-grocery-commerce",
    title: "Bridging a Legacy POS with Modern Grocery Commerce",
    excerpt:
      "How dual-database design, phone-order workflows, and delivery tooling let a traditional supermarket sell online without replacing its existing POS.",
    category: "Engineering",
    date: "2024-09-22",
    readTime: "7 min read",
    relatedProject: "raja-supermart",
    content: [
      {
        type: "paragraph",
        text: "Many Indian retailers already run stable point-of-sale systems. Replacing that foundation is rarely the first move when customers start expecting home delivery. The practical path is to introduce an online channel that treats the POS as the inventory source of truth.",
      },
      { type: "heading", text: "Keep inventory ownership clear" },
      {
        type: "paragraph",
        text: "For Raja Supermart, stock and pricing remained in Optech SQL Server. Application data - carts, orders, customer accounts - lived in MongoDB. A scheduled sync job reconciled quantities so the storefront never drifted far from what the cash counter knew.",
      },
      { type: "heading", text: "Design for how orders actually arrive" },
      {
        type: "paragraph",
        text: "Phone orders remain common in grocery retail. Admins needed to place and manage those orders in the same console that handled website checkouts, partner assignment, and returns. One operational surface reduced training cost and missed handoffs.",
      },
      { type: "heading", text: "Ship with operational visibility" },
      {
        type: "paragraph",
        text: "Dashboards for revenue, category performance, and delivery status matter as much as a polished catalog. When leadership can answer basic questions without exporting spreadsheets, the platform earns trust quickly.",
      },
    ],
  },
  {
    slug: "bilingual-fintech-sites-that-stay-compliant",
    title: "Building Bilingual FinTech Sites That Stay Compliant",
    excerpt:
      "Lessons from delivering a chit fund public platform with English/Tamil content, online applications, and automated legal PDF generation.",
    category: "Case Study",
    date: "2024-11-18",
    readTime: "6 min read",
    relatedProject: "valathi-chits",
    content: [
      {
        type: "paragraph",
        text: "Regulated financial products need more than a marketing landing page. Members must understand offerings in their language, complete applications with clear consent, and receive documents that match legal requirements across brands or branches.",
      },
      { type: "heading", text: "Localize the journey, not just the labels" },
      {
        type: "paragraph",
        text: "For Valathi Chit Funds, bilingual support covered browsing, calculators, and application copy. Localization only works when return estimates and form language stay consistent with how staff explain products in the branch.",
      },
      { type: "heading", text: "Automate paperwork carefully" },
      {
        type: "paragraph",
        text: "Puppeteer-driven PDF generation produced multi-brand legal forms from structured application data. The goal was fewer manual edits and fewer mismatched fields - especially valuable when multiple offices share one public site.",
      },
      { type: "heading", text: "Plan for operations after launch" },
      {
        type: "paragraph",
        text: "A public site is only half the story. Agent workflows, messaging, and admin content updates determine whether the digital channel stays useful. Building with an operations console in mind reduces the need for ad-hoc tools later.",
      },
    ],
  },
  {
    slug: "when-whatsapp-checkout-beats-a-payments-stack",
    title: "When WhatsApp Checkout Beats a Full Payments Stack",
    excerpt:
      "Choosing a static-first motorsport storefront with WhatsApp ordering - matching technology investment to business readiness.",
    category: "Architecture",
    date: "2024-07-12",
    readTime: "5 min read",
    relatedProject: "race-parts-india",
    content: [
      {
        type: "paragraph",
        text: "Not every catalog needs card processing on day one. For specialty retailers with existing WhatsApp sales conversations, a fast storefront that hands off checkout to chat can outperform a half-finished payment integration.",
      },
      { type: "heading", text: "Optimize for trust and speed" },
      {
        type: "paragraph",
        text: "Race Parts India needed polished product presentation, filtering, and cart clarity on mobile. WhatsApp already hosted buyer trust. Connecting those flows cut time-to-market and hosting complexity.",
      },
      { type: "heading", text: "Invest in infrastructure you will keep" },
      {
        type: "paragraph",
        text: "Terraform, Nginx, SSL automation, and GitHub Actions still matter in a lean architecture. They protect release quality and leave a clean path to introduce a backend when order volume justifies it.",
      },
    ],
  },
  {
    slug: "hiring-a-freelance-full-stack-engineer",
    title: "What to Expect When You Hire a Freelance Full-Stack Engineer",
    excerpt:
      "A practical guide for founders and operations leads: scope, communication, delivery cadence, and how remote engagements stay on schedule.",
    category: "Guide",
    date: "2025-02-10",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "Hiring a freelance engineer works best when the engagement looks like a product partnership rather than a ticket queue. Clear outcomes, decision ownership, and realistic milestones beat vague feature lists every time.",
      },
      { type: "heading", text: "Define the business outcome first" },
      {
        type: "paragraph",
        text: "Whether you need an e-commerce channel, an internal ERP module, or a business website, describe success in operational terms: who uses it, what decisions it enables, and what must stay reliable after launch.",
      },
      { type: "heading", text: "Expect architectural judgment" },
      {
        type: "paragraph",
        text: "A strong full-stack contractor should recommend what not to build. Lightweight checkout, phased migrations, and deliberate cloud choices often save more money than another library or dashboard screen.",
      },
      { type: "heading", text: "Remote delivery still needs rhythm" },
      {
        type: "paragraph",
        text: "Flexible hours work when demos, written updates, and staging reviews stay predictable. On-time delivery is a process - not a personality trait. Ask how risk, scope changes, and handoffs are handled before the kickoff call ends.",
      },
    ],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const getLatestPosts = (count = 3) =>
  [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
