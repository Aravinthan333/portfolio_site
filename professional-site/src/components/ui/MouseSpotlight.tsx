"use client";

import { useEffect, useState } from "react";

export function MouseSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, var(--spotlight), transparent 70%)`,
      }}
    />
  );
}
