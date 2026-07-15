export const metrics = [
  { value: "3+", label: "Years Experience" },
  { value: "5+", label: "Projects Delivered" },
  { value: "4", label: "Industry Verticals" },
  { value: "100%", label: "Remote Delivery" },
];

export const heroHighlights = [
  { label: "Web Development", icon: "web" },
  { label: "API & Backend", icon: "backend" },
  { label: "Cloud & DevOps", icon: "cloud" },
  { label: "SaaS Products", icon: "saas" },
];

export const services = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "Modern, high-performance web applications using React, Next.js, and TypeScript - from business websites to advanced enterprise platforms.",
    icon: "web",
    href: "/services#web-development",
  },
  {
    title: "Backend & API Development",
    slug: "backend",
    description:
      "Scalable REST APIs, microservices, authentication, database design, and third-party integrations built for production workloads.",
    icon: "backend",
    href: "/services#backend",
  },
  {
    title: "SaaS & Product Engineering",
    slug: "saas",
    description:
      "MVPs, admin dashboards, multi-tenant architectures, and subscription flows - shipped with clean architecture and test-driven practices.",
    icon: "saas",
    href: "/services#saas",
  },
  {
    title: "Cloud & DevOps",
    slug: "cloud",
    description:
      "AWS infrastructure, Docker, Terraform, CI/CD pipelines, and zero-downtime deployments for reliable production systems.",
    icon: "cloud",
    href: "/services#cloud",
  },
];

export const contactServiceOptions = [
  ...services.map((s) => s.title),
  "Other / Not sure yet",
];

export const whyChoose = [
  {
    title: "Production-grade engineering",
    description:
      "Clean architecture, automated testing, and code structured to perform reliably under real-world load.",
    icon: "engineering",
  },
  {
    title: "End-to-end delivery",
    description:
      "Requirements through architecture, development, deployment, and post-launch support - one accountable owner.",
    icon: "delivery",
  },
  {
    title: "Clear communication",
    description:
      "Defined milestones, regular progress updates, and direct access throughout the engagement.",
    icon: "communication",
  },
  {
    title: "Modern, proven stack",
    description:
      "React, Next.js, Node.js, PostgreSQL, Redis, Docker, and AWS - technologies validated in production.",
    icon: "stack",
  },
];

export const process = [
  {
    step: "01",
    title: "Understand",
    description:
      "I learn your business goals, users, and constraints - then define scope, milestones, and success metrics.",
    icon: "01",
  },
  {
    step: "02",
    title: "Design & Architect",
    description:
      "System design, database schema, and a delivery plan that balances speed with long-term maintainability.",
    icon: "02",
  },
  {
    step: "03",
    title: "Build & Ship",
    description:
      "Iterative development with staging environments, code reviews, and transparent progress throughout.",
    icon: "03",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "Production deployment, monitoring, documentation, and ongoing support for a smooth handoff.",
    icon: "04",
  },
];

export const experience = [
  {
    company: "Wonderwhy Solution",
    role: "Full Stack Engineer",
    period: "Nov 2024 - Nov 2025",
    description:
      "Delivered enterprise logistics software end-to-end - trip management, GST compliance, financial reporting, and AWS infrastructure for a fleet operations platform.",
  },
  {
    company: "Independent Consultant",
    role: "Software Engineer",
    period: "Jan 2023 - Present",
    description:
      "Partner with businesses across e-commerce, fintech, and messaging to architect, build, and deploy production systems - from MVP to scale.",
  },
];

export const values = [
  {
    title: "Business outcomes first",
    description:
      "Technical decisions are measured by the results they create - not by complexity or novelty.",
  },
  {
    title: "Quality and reliability",
    description:
      "Software that holds up in production: tested, documented, and built for the long term.",
  },
  {
    title: "Trusted partnerships",
    description:
      "Consistent delivery, honest communication, and support that extends beyond launch day.",
  },
];

export const expertise = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "AWS",
  "Terraform",
  "GitHub Actions",
  "Socket.IO",
  "REST APIs",
  "TDD",
  "Nginx",
];

export const industries = [
  "E-Commerce",
  "FinTech",
  "Enterprise ERP",
  "Real-time Messaging",
];
