import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data/profile";
import { serviceIconMap } from "@/lib/icons";
import { SITE } from "@/lib/site";
import { FadeUp } from "@/components/ui/FadeUp";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";

const serviceHighlights: Record<string, string[]> = {
  web: ["React & Next.js", "Responsive UI", "Performance tuning", "SEO-ready builds"],
  backend: ["REST APIs", "Auth & security", "Database design", "Third-party integrations"],
  saas: ["MVPs & dashboards", "Multi-tenant apps", "Subscription flows", "Clean architecture"],
  cloud: ["AWS infrastructure", "Docker & Terraform", "CI/CD pipelines", "Zero-downtime deploys"],
};

export function ServicesPageContent() {
  return (
    <>
      <PageHero
        label="Services"
        title="What I can build for you"
        subtitle="Web apps, APIs, SaaS products, and cloud infrastructure - tailored for remote and contract engagements."
      />

      <section className="section-block !pt-0">
        <div className="container-wide">
          <FadeUp>
            <div className="services-intro">
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {SITE.availability} I partner with founders and teams who need a reliable
                software engineer from architecture through production launch.
              </p>
            </div>
          </FadeUp>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6">
            {services.map((service, i) => {
              const Icon = serviceIconMap[service.icon] ?? serviceIconMap.web;
              const highlights = serviceHighlights[service.icon] ?? [];

              return (
                <FadeUp key={service.slug} delay={0.04 + i * 0.04}>
                  <article id={service.slug} className="service-card scroll-mt-28">
                    <div className="service-card-top">
                      <div className="service-icon-wrap">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <h2 className="service-card-title">{service.title}</h2>
                    </div>

                    <p className="service-card-desc">{service.description}</p>

                    <ul className="service-card-list">
                      {highlights.map((item) => (
                        <li key={item} className="service-card-list-item">
                          <Check size={14} className="shrink-0 text-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact" className="service-card-link">
                      Discuss this service
                      <ArrowUpRight size={15} />
                    </Link>
                  </article>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.2}>
            <div className="services-bottom-cta">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  Not sure which service fits?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Tell me about your goals and I&apos;ll recommend the right approach - fixed
                  scope, milestone-based, or ongoing contract.
                </p>
              </div>
              <Button href="/contact">Contact Me</Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <ProcessSection />
      <CtaBanner />
    </>
  );
}
