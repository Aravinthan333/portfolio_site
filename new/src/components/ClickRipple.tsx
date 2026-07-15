"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Ripple = { id: number; x: number; y: number };

export function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let id = 0;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [data-no-ripple]")) return;

      const ripple = { id: ++id, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-8), ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 700);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--blue-200)] bg-[var(--blue-100)]"
          style={{ left: r.x, top: r.y }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 14, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
