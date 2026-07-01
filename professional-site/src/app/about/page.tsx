import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { values, experience } from "@/data/profile";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Learn about ${SITE.name}, a ${SITE.title} specializing in web development, APIs, SaaS products, and cloud systems.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <div className="hero-section section-block pt-24">
        <div className="container-main">
          <SectionHeader
            label="About me"
            title={SITE.name}
            subtitle={SITE.tagline}
          />

          <FadeUp delay={0.08}>
            <div className="mx-auto mt-12 max-w-2xl space-y-5 text-center text-base leading-relaxed text-muted">
              <p>
                I&apos;m {SITE.name}, a {SITE.title.toLowerCase()} based in India. I help startups
                and businesses design, build, and ship production-grade software - from
                customer-facing web applications to backend APIs and cloud infrastructure.
              </p>
              <p>
                My work spans e-commerce platforms, fintech systems, real-time messaging
                consoles, and enterprise ERP software. I take projects from requirements through
                architecture, test-driven development, deployment, and ongoing support.
              </p>
              <p>
                I believe in transparent communication, clean architecture, and delivering
                software that solves real business problems.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.14}>
            <h2 className="font-display mt-20 text-center text-2xl font-semibold tracking-tight">
              What I stand for
            </h2>
            <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="gradient-border p-6 text-center md:p-7">
                  <h3 className="font-display text-base font-semibold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{v.description}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-display mt-20 text-center text-2xl font-semibold tracking-tight">
              Experience
            </h2>
            <div className="mx-auto mt-10 max-w-2xl">
              {experience.map((job) => (
                <div key={job.company} className="border-b border-border/70 py-7 last:border-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {job.period}
                  </p>
                  <p className="font-display mt-2 text-base font-semibold">
                    {job.role} · {job.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{job.description}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.26}>
            <div className="mt-16 text-center">
              <Button href="/contact">Work With Me</Button>
            </div>
          </FadeUp>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
