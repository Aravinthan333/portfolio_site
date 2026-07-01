"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getSessionId() {
  const key = "site_session_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || undefined,
        sessionId: getSessionId(),
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
