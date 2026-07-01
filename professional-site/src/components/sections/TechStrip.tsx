import { heroHighlights } from "@/data/profile";
import { serviceIconMap } from "@/lib/icons";
import { FadeUp } from "@/components/ui/FadeUp";

export function TechStrip() {
  return (
    <section className="tech-strip border-y border-white/10">
      <div className="container-wide py-6 md:py-10">
        <FadeUp>
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/50 md:mb-6">
            Expertise across
          </p>
        </FadeUp>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 md:gap-x-12">
          {heroHighlights.map((item, i) => {
            const Icon = serviceIconMap[item.icon] ?? serviceIconMap.web;
            return (
              <FadeUp key={item.label} delay={0.04 + i * 0.04}>
                <div className="tech-strip-item justify-center sm:justify-start">
                  <Icon size={20} strokeWidth={1.5} className="shrink-0 text-accent md:h-[22px] md:w-[22px]" />
                  <span className="text-xs sm:text-sm">{item.label}</span>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
