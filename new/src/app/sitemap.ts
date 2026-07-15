import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blogs";
import { services } from "@/data/services";
import { routing } from "@/i18n/routing";

function localizedPath(locale: string, path: string) {
  if (locale === routing.defaultLocale) return path || "/";
  return path ? `/${locale}${path}` : `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticPages = [
    "",
    "/projects",
    "/services",
    "/blog",
    "/contact",
    "/book-call",
    "/faq",
  ];

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPages) {
      routes.push({
        url: `${base}${localizedPath(locale, path)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const p of projects) {
      routes.push({
        url: `${base}${localizedPath(locale, `/projects/${p.slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        images: [`${base}${p.image}`],
      });
    }

    for (const s of services) {
      routes.push({
        url: `${base}${localizedPath(locale, `/services/${s.slug}`)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const p of blogPosts) {
      routes.push({
        url: `${base}${localizedPath(locale, `/blog/${p.slug}`)}`,
        lastModified: new Date(p.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
