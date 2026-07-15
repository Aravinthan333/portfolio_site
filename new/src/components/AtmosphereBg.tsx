type AtmosphereBgProps = {
  variant?: "hero" | "section" | "cta" | "band" | "mesh";
  className?: string;
};

/** Theme blue gradients: top-right → bottom-left. No decorative objects. */
export function AtmosphereBg({ variant = "section", className = "" }: AtmosphereBgProps) {
  const gradients: Record<NonNullable<AtmosphereBgProps["variant"]>, string> = {
    hero: "linear-gradient(to bottom left, #ffffff 0%, #f8fafc 22%, #eff6ff 58%, #f0f9ff 100%)",
    section: "linear-gradient(to bottom left, #ffffff 0%, #f8fafc 40%, #f0f9ff 100%)",
    band: "linear-gradient(to bottom left, #f8fafc 0%, #eff6ff 42%, #f0f9ff 100%)",
    mesh: "linear-gradient(to bottom left, #ffffff 0%, #f0f9ff 38%, #e0f2fe 100%)",
    cta: "linear-gradient(to bottom left, #dbeafe 0%, #eff6ff 32%, #ffffff 62%, #f0f9ff 100%)",
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{ background: gradients[variant] }}
    />
  );
}
