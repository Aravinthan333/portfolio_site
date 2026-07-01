import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticPages = [
    "",
    "/work",
    "/services",
    "/about",
    "/expertise",
    "/blog",
    "/contact",
  ];
  const routes = staticPages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const workPages = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const blogPages = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...routes, ...workPages, ...blogPages];
}
