import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { expertise, industries, services } from "@/data/profile";
import { serviceIconMap } from "@/lib/icons";
import { FadeUp } from "@/components/ui/FadeUp";

type Props = {
  showServices?: boolean;
};

export function ExpertiseGrid({ showServices = false }: Props) {
  return (
    <>
      {!showServices && (
        <FadeUp>
          <h2 className="section-heading">My Skills</h2>
        </FadeUp>
      )}

      {showServices && (
        <FadeUp delay={0.06}>
          <h3 className="expertise-subheading">Services I provide</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = serviceIconMap[service.icon] ?? serviceIconMap.web;

              return (
                <article key={service.slug} className="expertise-service-card">
                  <div className="expertise-service-top">
                    <div className="service-icon-wrap">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <h4 className="expertise-service-title">{service.title}</h4>
                  </div>
                  <p className="expertise-service-desc">{service.description}</p>
                  <Link href="/contact" className="expertise-service-link">
                    Discuss this service
                    <ArrowUpRight size={14} />
                  </Link>
                </article>
              );
            })}
          </div>
        </FadeUp>
      )}

      <FadeUp delay={showServices ? 0.12 : 0.06}>
        <h3 className={`expertise-subheading ${showServices ? "mt-14" : ""}`}>
          {showServices ? "Technical skills" : "Technologies"}
        </h3>
        <div className="skills-grid">
          {expertise.map((skill) => (
            <div key={skill} className="skill-box">
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={showServices ? 0.18 : 0.12}>
        <h3 className="expertise-subheading mt-14">Industries</h3>
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <span key={industry} className="industry-pill">
              {industry}
            </span>
          ))}
        </div>
      </FadeUp>
    </>
  );
}
