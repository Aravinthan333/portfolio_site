"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center">
      <p className="section-label">Something went wrong</p>
      <h1 className="section-title mt-3">Unexpected error</h1>
      <p className="section-desc mx-auto mt-4 max-w-md">
        {error.message || "An unexpected error occurred. You can retry, or reach out to hire me."}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-secondary">
          <RotateCcw size={16} />
          Try again
        </button>
        <Link href="/" className="btn-secondary">
          Home
        </Link>
        <Link href="/contact" className="btn-primary">
          Hire Me
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
