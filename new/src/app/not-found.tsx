import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center">
      <p className="section-label">404</p>
      <h1 className="section-title mt-3">Page not found</h1>
      <p className="section-desc mx-auto mt-4 max-w-md">
        That URL doesn&apos;t exist. Try one of these instead — or get in touch if you&apos;re
        looking to hire.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-secondary">
          Home
        </Link>
        <Link href="/projects" className="btn-secondary">
          Projects
        </Link>
        <Link href="/services" className="btn-secondary">
          Services
        </Link>
        <Link href="/contact" className="btn-primary">
          Hire Me
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
