type AtmosphereBgProps = {
  variant?: "hero" | "section" | "cta" | "band" | "mesh";
  className?: string;
};

/** Soft gradient washes + light grid — no circular ornaments. */
export function AtmosphereBg({ variant = "section", className = "" }: AtmosphereBgProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {variant === "hero" && <HeroAtmosphere />}
      {variant === "cta" && <CtaAtmosphere />}
      {variant === "band" && <BandAtmosphere />}
      {variant === "mesh" && <MeshAtmosphere />}
      {variant === "section" && <SectionAtmosphere />}
    </div>
  );
}

function SoftGrid({ opacity = 0.45 }: { opacity?: number }) {
  return <div className="absolute inset-0 bg-grid-light" style={{ opacity }} />;
}

function HeroAtmosphere() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#ffffff_0%,#f8fafc_32%,#eff6ff_68%,#f0f9ff_100%)]" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 15% 20%, rgba(59,130,246,0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, rgba(56,189,248,0.1), transparent 50%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.08), transparent 55%)",
        }}
      />
      <SoftGrid opacity={0.5} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_10%,transparent_0%,rgba(255,255,255,0.55)_75%,#ffffff_100%)]" />
      <div className="deco-beam absolute left-[12%] top-[42%] hidden lg:block" />
      <div className="deco-beam absolute right-[14%] top-[62%] hidden w-[110px] rotate-180 lg:block" />
      <div className="deco-squircle absolute right-[10%] bottom-[18%] hidden h-16 w-16 opacity-45 lg:block" />
    </>
  );
}

function CtaAtmosphere() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_28%,#ffffff_55%,#f0f9ff_100%)]" />
      <SoftGrid opacity={0.35} />
      <div className="deco-beam absolute left-[10%] top-[30%] opacity-60" />
      <div className="deco-squircle absolute bottom-[12%] right-[8%] h-14 w-14 opacity-50" />
    </>
  );
}

function BandAtmosphere() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_40%,#f0f9ff_70%,#f8fafc_100%)]" />
      <SoftGrid opacity={0.4} />
      <div className="deco-beam absolute left-[8%] top-[35%] hidden opacity-50 sm:block" />
      <div className="deco-beam absolute right-[10%] top-[55%] hidden w-[100px] opacity-45 sm:block" />
    </>
  );
}

function MeshAtmosphere() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_50%,#eff6ff_100%)]" />
      <SoftGrid opacity={0.42} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 0% 50%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(ellipse 50% 40% at 100% 40%, rgba(56,189,248,0.08), transparent 60%)",
        }}
      />
      <div className="deco-squircle absolute -right-4 top-16 hidden h-20 w-20 rotate-12 opacity-40 lg:block" />
      <div className="deco-beam absolute bottom-20 left-[8%] hidden lg:block" />
    </>
  );
}

function SectionAtmosphere() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fafbfd_100%)]" />
      <SoftGrid opacity={0.28} />
      <div className="deco-beam absolute right-[8%] top-[40%] hidden w-[120px] opacity-40 lg:block" />
    </>
  );
}
