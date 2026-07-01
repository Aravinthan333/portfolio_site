import { FadeUp } from "@/components/ui/FadeUp";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  delay?: number;
  dark?: boolean;
};

export function PageHero({
  label,
  title,
  subtitle,
  align = "center",
  delay = 0,
  dark = false,
}: Props) {
  return (
    <section className={dark ? "page-hero page-hero-dark" : "page-hero"}>
      <div className="container-wide">
        <FadeUp delay={delay}>
          <div
            className={`page-hero-inner ${align === "left" ? "text-left" : "text-center"}`}
          >
            <p className="page-hero-label">{label}</p>
            <h1 className="page-hero-title">{title}</h1>
            {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
