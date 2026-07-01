import Link from "next/link";
import { services } from "@/data/profile";
import { serviceIconMap } from "@/lib/icons";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = {
  showViewAll?: boolean;
};

export function ServicesPreview({ showViewAll = false }: Props) {
  return (
    <section id="services" className="platform-band section-block">
      <div className="container-wide">
        <SectionHeader
          label="Services"
          title="What I do"
          subtitle="Web apps, APIs, SaaS products, and cloud infrastructure - available for remote and contract engagements."
        />

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = serviceIconMap[s.icon] ?? serviceIconMap.web;
            return (
              <FadeUp key={s.title} delay={0.05 + i * 0.05}>
                <div className="platform-card h-full">
                  <div className="service-icon-wrap">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                  <Link href={s.href} className="apple-link mt-5 inline-flex">
                    Learn more
                  </Link>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {showViewAll && (
          <FadeUp delay={0.2}>
            <div className="mt-12 text-center">
              <Link href="/services" className="apple-link">
                View all services
              </Link>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
