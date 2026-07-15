"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Phone,
  BarChart3,
  Search,
  LogOut,
  ExternalLink,
  UserCircle,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Site profile", icon: UserCircle },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/submissions", label: "Applications", icon: Inbox },
  { href: "/admin/calls", label: "Call Requests", icon: Phone },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/seo", label: "SEO", icon: Search },
];

export function AdminShell({
  adminName,
  children,
}: {
  adminName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-surface-elevated">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-border bg-background">
        <div className="border-b border-border px-5 py-5">
          <p className="font-display text-sm font-semibold">{adminName}</p>
          <p className="text-xs text-muted">Portfolio dashboard</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-muted hover:bg-accent-soft/50 hover:text-foreground"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-border p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-accent"
          >
            <ExternalLink size={16} />
            View site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-red-600"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>
      <main className="ml-60 flex-1 p-8">{children}</main>
    </div>
  );
}
