import { FadeUp } from "@/components/ui/FadeUp";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  delay?: number;
};

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  delay = 0,
}: Props) {
  return (
    <FadeUp delay={delay}>
      <div className={`section-header ${align === "left" ? "mx-0 max-w-none text-left" : ""}`}>
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
    </FadeUp>
  );
}
