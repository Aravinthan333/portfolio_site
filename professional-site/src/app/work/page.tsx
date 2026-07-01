import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { WorkPageContent } from "@/components/sections/WorkPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: `Case studies and client projects delivered by ${SITE.name} - e-commerce, fintech, ERP, and cloud engineering.`,
  path: "/work",
});

export default function WorkPage() {
  return <WorkPageContent />;
}
