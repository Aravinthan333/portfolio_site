import { process } from "@/data/profile";
import { processIconMap } from "@/lib/icons";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProcessSection() {
  return (
    <section className="dark-band section-block">
      <div className="container-wide">
        <SectionHeader
          label="Approach"
          title="How I deliver value"
          subtitle="Understanding your business goals and delivering tailored digital solutions with modern technology."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {process.map((step, i) => {
            const Icon = processIconMap[step.icon] ?? processIconMap["01"];
            return (
              <FadeUp key={step.step} delay={0.05 + i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-7">
                  <div className="process-icon-wrap !bg-white/10 !text-accent">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-sm font-semibold text-accent">
                    {step.step}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{step.description}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
