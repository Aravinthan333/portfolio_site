import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { RefreshCw } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  onRefresh?: () => void;
  refreshing?: boolean;
  actions?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
};

export function AdminPageHeader({
  title,
  description,
  icon: Icon,
  onRefresh,
  refreshing,
  actions,
  backHref,
  backLabel = "Back",
}: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {backHref && (
          <Link href={backHref} className="mb-2 inline-block text-sm text-accent hover:underline">
            ← {backLabel}
          </Link>
        )}
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Icon size={20} />
            </span>
          )}
          <div>
            <h1 className="font-display text-2xl font-semibold">{title}</h1>
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted hover:text-foreground disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        )}
        {actions}
      </div>
    </div>
  );
}

export function AdminHeroButton({
  children,
  onClick,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
      : "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
