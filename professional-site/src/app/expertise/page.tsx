import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ExpertiseGrid } from "@/components/sections/ExpertiseGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Skills & Services",
  description: `Technical skills and services ${SITE.name} offers — React, Next.js, Node.js, AWS, web development, APIs, SaaS, and cloud infrastructure.`,
  path: "/expertise",
});

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        label="Skills & Services"
        title="What I build and how I work"
        subtitle="From production web apps and APIs to cloud infrastructure — here are the services I deliver and the technologies behind them."
      />

      <section className="section-block section-alt !pt-0">
        <div className="container-wide">
          <ExpertiseGrid showServices />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
