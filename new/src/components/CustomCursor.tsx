"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  const disabled = pathname.startsWith("/admin") || !!reduceMotion;

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(finePointer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("admin-route", pathname.startsWith("/admin"));
  }, [pathname]);

  useEffect(() => {
    if (disabled || !enabled) {
      setVisible(false);
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [disabled, enabled, x, y]);

  if (disabled || !enabled || !visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--blue-500)] md:block"
        style={{ x: springX, y: springY }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--blue-200)] md:block"
        style={{ x: springX, y: springY }}
        aria-hidden
      />
    </>
  );
}
