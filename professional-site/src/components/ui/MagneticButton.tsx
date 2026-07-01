"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.15}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const base =
    "magnetic-btn inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300";
  const styles = {
    primary:
      "bg-accent text-background font-bold shadow-[0_0_1rem_rgba(89,178,244,0.35)] hover:bg-surface hover:text-foreground hover:shadow-[0_0_1rem_rgba(255,255,255,0.2)]",
    secondary:
      "border border-border bg-surface text-foreground hover:border-accent/40 hover:bg-accent-soft",
    ghost: "text-accent hover:text-accent-hover",
  };

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
