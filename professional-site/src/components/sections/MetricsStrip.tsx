import { metrics } from "@/data/profile";
import { FadeUp } from "@/components/ui/FadeUp";

export function MetricsStrip() {
  return (
    <section className="metrics-band border-y border-border/60">
      <div className="container-main py-14 md:py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {metrics.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.04}>
              <div className="text-center">
                <p className="font-display text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
                  {m.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">
                  {m.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
