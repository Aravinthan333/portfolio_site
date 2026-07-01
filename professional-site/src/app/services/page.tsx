import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description: `${SITE.name} offers web development, backend APIs, SaaS engineering, and cloud infrastructure for startups and businesses.`,
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
