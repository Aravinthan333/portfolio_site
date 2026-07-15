import { getTranslations } from "next-intl/server";
import { processIconMap } from "@/lib/icons";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionHeader } from "@/components/ui/SectionHeader";

const processKeys = ["understand", "design", "build", "launch"] as const;
const processSteps = ["01", "02", "03", "04"] as const;

export async function ProcessSection() {
  const t = await getTranslations("pages.process");
  const tProcess = await getTranslations("process");

  return (
    <section className="dark-band section-block">
      <div className="container-wide">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2">
          {processKeys.map((key, i) => {
            const Icon = processIconMap[processSteps[i]] ?? processIconMap["01"];
            return (
              <FadeUp key={key} delay={0.05 + i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6 md:p-7">
                  <div className="process-icon-wrap !bg-white/10 !text-accent">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-sm font-semibold text-accent">
                    {processSteps[i]}
                  </span>
                  <h3 className="font-display mt-3 text-base font-semibold tracking-tight text-white sm:text-lg">
                    {tProcess(`${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {tProcess(`${key}.description`)}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
