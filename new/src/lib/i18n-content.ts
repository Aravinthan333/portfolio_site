import { getTranslations } from "next-intl/server";
import type { BlogContentBlock } from "@/types/blog";
import type { FaqItem } from "@/data/faq";
import type { Service } from "@/data/services";
import type { Project } from "@/data/projects";
import type { BlogPost } from "@/lib/blogs";
import { services as serviceMeta } from "@/data/services";
import { projects as projectMeta } from "@/data/projects";
import { faqItemKeys } from "@/data/faq";

export async function getLocalizedServices(): Promise<Service[]> {
  const t = await getTranslations("servicesContent");
  return serviceMeta.map((s) => ({
    ...s,
    shortTitle: t(`${s.slug}.shortTitle`),
    title: t(`${s.slug}.title`),
    description: t(`${s.slug}.description`),
    summary: t(`${s.slug}.summary`),
    outcomes: t.raw(`${s.slug}.outcomes`) as string[],
    tags: t.raw(`${s.slug}.tags`) as string[],
    seoTitle: t(`${s.slug}.seoTitle`),
    seoDescription: t(`${s.slug}.seoDescription`),
  }));
}

export async function getLocalizedService(slug: string): Promise<Service | null> {
  const all = await getLocalizedServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getLocalizedProjects(): Promise<Project[]> {
  const t = await getTranslations("projectsContent");
  return projectMeta.map((p) => ({
    ...p,
    title: t(`${p.slug}.title`),
    subtitle: t(`${p.slug}.subtitle`),
    description: t(`${p.slug}.description`),
    overview: t(`${p.slug}.overview`),
    role: t(`${p.slug}.role`),
    challenge: t(`${p.slug}.challenge`),
    solution: t(`${p.slug}.solution`),
    highlights: t.raw(`${p.slug}.highlights`) as string[],
    outcome: t(`${p.slug}.outcome`),
    tags: t.raw(`${p.slug}.tags`) as string[],
  }));
}

export async function getLocalizedProject(slug: string): Promise<Project | null> {
  const all = await getLocalizedProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getLocalizedFaqs(): Promise<FaqItem[]> {
  const t = await getTranslations("faqItems");
  return faqItemKeys.map((key) => ({
    question: t(`${key}.question`),
    answer: t(`${key}.answer`),
  }));
}

export async function getLocalizedHomepageFaqs(): Promise<FaqItem[]> {
  const faqs = await getLocalizedFaqs();
  return faqs.slice(0, 4);
}

export async function localizeBlogPost(post: BlogPost): Promise<BlogPost> {
  try {
    const t = await getTranslations(`blogContent.${post.slug}`);
    return {
      ...post,
      title: t("title"),
      excerpt: t("excerpt"),
      category: t("category"),
      readTime: t("readTime"),
      content: t.raw("content") as BlogContentBlock[],
    };
  } catch {
    return post;
  }
}

export async function localizeBlogPosts(posts: BlogPost[]): Promise<BlogPost[]> {
  return Promise.all(posts.map(localizeBlogPost));
}
