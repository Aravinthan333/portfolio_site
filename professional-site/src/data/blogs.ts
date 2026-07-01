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
    slug: "whatsapp-operations-platform-valathi-chits",
    title: "Building a WhatsApp Operations Platform for a Chit Fund",
    excerpt:
      "How I replaced fragmented phone-based communication with a real-time messaging console, bulk campaign engine, and integrated website administration.",
    category: "Case Study",
    date: "2024-11-15",
    readTime: "8 min read",
    relatedProject: "valathi-chits",
    content: [
      {
        type: "paragraph",
        text: "In India, customer communication for financial businesses happens on WhatsApp. Valathi Chit Funds needed more than a chat widget - they needed an internal operations platform where agents could handle conversations, run campaigns, manage customer records, and administer their public website, all in one place.",
      },
      { type: "heading", text: "The challenge" },
      {
        type: "paragraph",
        text: "Agents used personal phones with no central visibility. Bulk outreach to thousands of members required manual effort with no scheduling or delivery tracking. WhatsApp's 24-hour reply window meant delayed responses cost money. Member records lived in spreadsheets, disconnected from conversation history.",
      },
      { type: "heading", text: "My approach" },
      {
        type: "paragraph",
        text: "I built a two-package monorepo - Next.js frontend and Express backend - deployed to AWS EC2 behind Nginx. Async outbound messaging via BullMQ, webhook-first inbound handling, and room-based real-time updates through Socket.IO and Redis pub/sub.",
      },
      {
        type: "paragraph",
        text: "The chat interface delivers WhatsApp-parity UX: reply, forward, edit, delivery receipts, template composer, and media gallery. A 3-stage campaign wizard handles bulk outreach with scheduling, retry logic, and delivery reporting.",
      },
      { type: "heading", text: "The outcome" },
      {
        type: "paragraph",
        text: "The platform now serves three Tamil Nadu branches at valathichits.com, with agents managing customer conversations, SLA-aware ticketing, and website content from a single console.",
      },
    ],
  },
  {
    slug: "grocery-ecommerce-raja-supermart",
    title: "Full-Stack Grocery E-Commerce for Raja Supermart",
    excerpt:
      "A production grocery platform with legacy POS integration, phone-order support, delivery logistics, and a full admin operations console.",
    category: "Case Study",
    date: "2024-09-20",
    readTime: "7 min read",
    relatedProject: "raja-supermart",
    content: [
      {
        type: "paragraph",
        text: "Raja Supermart is a grocery supermarket in India running on an Optech POS system while customers increasingly expected online ordering and home delivery. The challenge was building e-commerce that stayed in sync with legacy inventory, supported phone-based ordering, and gave staff tools to manage the full order lifecycle.",
      },
      { type: "heading", text: "Architecture decisions" },
      {
        type: "paragraph",
        text: "I designed a dual-database system: MongoDB for application data and SQL Server as the inventory source of truth. A cron job syncs stock every minute from Optech. Three user roles - customers, admins, and delivery partners - each get tailored interfaces and API access.",
      },
      { type: "heading", text: "Key features" },
      {
        type: "paragraph",
        text: "Hierarchical product catalog with variants, phone-order placement by admins, delivery partner assignment grouped by address, return pickup flows, and analytics dashboards for orders, revenue, and category performance.",
      },
      { type: "heading", text: "The outcome" },
      {
        type: "paragraph",
        text: "Live at rajasupermart.com with the API at api.rajasupermart.com - a complete grocery operations platform bridging online and in-store retail.",
      },
    ],
  },
  {
    slug: "serverless-motorsport-storefront-race-parts-india",
    title: "A Serverless Motorsport Storefront for Race Parts India",
    excerpt:
      "Why I chose a static-first architecture with WhatsApp checkout - matching technology to business reality for a lean motorsport retailer.",
    category: "Case Study",
    date: "2024-07-10",
    readTime: "6 min read",
    relatedProject: "race-parts-india",
    content: [
      {
        type: "paragraph",
        text: "Race Parts India needed a credible, high-performance storefront for motorsport racing parts and simulator rigs - without the overhead of a full e-commerce backend, payment integrations, or dedicated ops team at launch.",
      },
      { type: "heading", text: "Serverless-first architecture" },
      {
        type: "paragraph",
        text: "I proposed a static React SPA with client-side state management and WhatsApp as the checkout channel. Fast time-to-market, low hosting cost on a single EC2 instance, and mobile-optimized product views for a traffic-heavy audience.",
      },
      { type: "heading", text: "Infrastructure" },
      {
        type: "paragraph",
        text: "Terraform-managed AWS infrastructure, Nginx reverse proxy, and GitHub Actions CI/CD for zero-downtime deploys. The clean separation allows a backend to be added later without rebuilding the storefront.",
      },
      { type: "heading", text: "The outcome" },
      {
        type: "paragraph",
        text: "Live at racepartsindia.com - a premium motorsport catalog that digitizes the sales funnel while keeping the client's existing WhatsApp-based order workflow intact.",
      },
    ],
  },
  {
    slug: "fleet-management-erp-wondermove",
    title: "Enterprise Fleet Management ERP for Wondermove",
    excerpt:
      "Trip management, GST tracking, ledger maintenance, and profit forecasting - built with test-driven development for a logistics operator.",
    category: "Case Study",
    date: "2025-06-01",
    readTime: "5 min read",
    relatedProject: "wondermove-erp",
    content: [
      {
        type: "paragraph",
        text: "Wondermove needed an enterprise logistics ERP to replace manual spreadsheets and fragmented tools. The system had to handle trip management, GST compliance, financial ledgers, and profit forecasting for a growing fleet operation.",
      },
      { type: "heading", text: "Engineering approach" },
      {
        type: "paragraph",
        text: "Built with React, Express, TypeScript, and PostgreSQL on AWS. Test-driven development practices ensured financial calculations and GST logic were reliable from day one. Terraform managed the cloud infrastructure.",
      },
      { type: "heading", text: "The outcome" },
      {
        type: "paragraph",
        text: "Reduced manual work and improved financial visibility across the fleet operation - giving management real-time insight into trips, costs, and profitability.",
      },
    ],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const getLatestPosts = (count = 3) =>
  [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
