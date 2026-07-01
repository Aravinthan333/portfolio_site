"use client";

import { usePathname } from "next/navigation";
import { Shell } from "@/components/layout/Shell";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return <>{children}</>;
  return <Shell>{children}</Shell>;
}
