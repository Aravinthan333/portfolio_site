import type { Project as StaticProject } from "@/data/projects";
import { projects as staticProjects } from "@/data/projects";
import { prisma } from "@/lib/db";

export type ProjectCaseStudy = {
  id?: string;
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
  accent?: string;
  published?: boolean;
};

function parseList(json: string): string[] {
  try {
    const parsed = JSON.parse(json) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function fromDb(row: {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  role: string;
  challenge: string;
  solution: string;
  highlights: string;
  outcome: string;
  stack: string;
  tags: string;
  liveUrl: string | null;
  year: string;
  image: string;
  accent: string | null;
  published: boolean;
}) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    overview: row.overview,
    role: row.role,
    challenge: row.challenge,
    solution: row.solution,
    highlights: parseList(row.highlights),
    outcome: row.outcome,
    stack: parseList(row.stack),
    tags: parseList(row.tags),
    liveUrl: row.liveUrl ?? undefined,
    year: row.year,
    image: row.image,
    accent: row.accent ?? undefined,
    published: row.published,
  } satisfies ProjectCaseStudy;
}

export async function getPublishedProjects(): Promise<ProjectCaseStudy[]> {
  try {
    const rows = await prisma.projectCaseStudy.findMany({
      where: { published: true },
      orderBy: [{ year: "desc" }, { updatedAt: "desc" }],
    });
    if (rows.length > 0) return rows.map(fromDb);
  } catch {
    /* DB unavailable - fall back to static */
  }
  return staticProjects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectCaseStudy | null> {
  try {
    const row = await prisma.projectCaseStudy.findFirst({
      where: { slug, published: true },
    });
    if (row) return fromDb(row);
  } catch {
    /* fall through */
  }
  return staticProjects.find((project) => project.slug === slug) ?? null;
}

export async function getAllProjectsAdmin() {
  return prisma.projectCaseStudy.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getProjectByIdAdmin(id: string) {
  return prisma.projectCaseStudy.findUnique({ where: { id } });
}

export function serializeList(items: string[]) {
  return JSON.stringify(items);
}

export function staticProjectsToSeedData(projects: StaticProject[]) {
  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
    overview: project.overview,
    role: project.role,
    challenge: project.challenge,
    solution: project.solution,
    highlights: serializeList(project.highlights),
    outcome: project.outcome,
    stack: serializeList(project.stack),
    tags: serializeList(project.tags),
    liveUrl: project.liveUrl ?? null,
    year: project.year,
    image: project.image,
    accent: project.accent,
    published: true,
  }));
}
