import { SITE, getSiteUrl } from "@/lib/site";
import { prisma } from "@/lib/db";
import { projects } from "@/data/projects";

export type SeoPageReport = {
  path: string;
  title: string;
  description: string;
  titleLength: number;
  descriptionLength: number;
  titleScore: "good" | "warning" | "poor";
  descriptionScore: "good" | "warning" | "poor";
  issues: string[];
};

const STATIC_PAGES: { path: string; title: string; description: string }[] = [
  {
    path: "/",
    title: `${SITE.name} — Software Engineer & Full Stack Developer`,
    description: SITE.tagline,
  },
  {
    path: "/projects",
    title: "Projects & Case Studies",
    description:
      "Case studies by Aravinthan Balaji — e-commerce, fintech, retail platforms, and business software delivered end to end.",
  },
  {
    path: "/services",
    title: "Software Development Services",
    description:
      "Custom web applications, e-commerce, backend APIs, SaaS, ERP, and CRM development by Aravinthan Balaji.",
  },
  {
    path: "/blog",
    title: "Engineering Blog & Insights",
    description:
      "Practical articles on full-stack delivery, business software, and hiring a freelance software engineer.",
  },
  {
    path: "/contact",
    title: "Hire Me — Contact",
    description:
      "Contact Aravinthan Balaji for freelance, contract, or remote software engineering engagements.",
  },
  {
    path: "/book-call",
    title: "Book a Call",
    description:
      "Schedule a discovery call with Aravinthan Balaji to discuss scope, timeline, and next steps.",
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions",
    description:
      "Answers about remote delivery, services, collaboration styles, and how to start a project with Aravinthan Balaji.",
  },
];
function scoreLength(
  length: number,
  goodMin: number,
  goodMax: number
): "good" | "warning" | "poor" {
  if (length >= goodMin && length <= goodMax) return "good";
  if (length === 0) return "poor";
  return "warning";
}

function analyzePage(path: string, title: string, description: string): SeoPageReport {
  const titleLength = title.length;
  const descriptionLength = description.length;
  const issues: string[] = [];

  if (titleLength < 30) issues.push("Title may be too short for SEO");
  if (titleLength > 60) issues.push("Title may be truncated in search results");
  if (descriptionLength < 120) issues.push("Meta description is short");
  if (descriptionLength > 160) issues.push("Meta description may be truncated");
  if (!description) issues.push("Missing meta description");

  return {
    path,
    title,
    description,
    titleLength,
    descriptionLength,
    titleScore: scoreLength(titleLength, 30, 60),
    descriptionScore: scoreLength(descriptionLength, 120, 160),
    issues,
  };
}

export async function getSeoReports(): Promise<SeoPageReport[]> {
  const reports = STATIC_PAGES.map((p) => analyzePage(p.path, p.title, p.description));

  for (const project of projects) {
    reports.push(
      analyzePage(`/projects/${project.slug}`, project.title, project.description)
    );
  }

  try {
    const blogs = await prisma.blogPost.findMany({ where: { published: true } });
    for (const blog of blogs) {
      reports.push(
        analyzePage(`/blog/${blog.slug}`, blog.title, blog.excerpt)
      );
    }
  } catch {
    /* ignore */
  }

  return reports;
}

export async function getAnalyticsSummary() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(todayStart);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const [
    totalViews,
    todayViews,
    weekViews,
    uniqueSessionsToday,
    topPages,
    recentActions,
    newSubmissions,
    newCalls,
    publishedBlogs,
  ] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.pageView.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.pageView.groupBy({
      by: ["sessionId"],
      where: { createdAt: { gte: todayStart }, sessionId: { not: null } },
    }),
    prisma.pageView.groupBy({
      by: ["path"],
      _count: { path: true },
      where: { createdAt: { gte: weekAgo } },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    prisma.adminAction.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.callRequest.count({ where: { status: "new" } }),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  const dailyViews = await prisma.$queryRaw<{ day: string; count: number }[]>`
    SELECT date(createdAt) as day, COUNT(*) as count
    FROM PageView
    WHERE createdAt >= ${weekAgo.toISOString()}
    GROUP BY date(createdAt)
    ORDER BY day ASC
  `;

  return {
    siteUrl: getSiteUrl(),
    totalViews,
    todayViews,
    weekViews,
    uniqueVisitorsToday: uniqueSessionsToday.length,
    topPages: topPages.map((p) => ({ path: p.path, views: p._count.path })),
    dailyViews,
    recentActions,
    newSubmissions,
    newCalls,
    publishedBlogs,
  };
}
