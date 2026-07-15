"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { scheduledCallStatuses } from "@/lib/admin-status";

export function CallSchedulesFilters({
  status,
  from,
  to,
}: {
  status: string;
  from: string;
  to: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState(status);
  const [localFrom, setLocalFrom] = useState(from);
  const [localTo, setLocalTo] = useState(to);

  const apply = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (localStatus) params.set("status", localStatus);
    else params.delete("status");
    if (localFrom) params.set("from", localFrom);
    else params.delete("from");
    if (localTo) params.set("to", localTo);
    else params.delete("to");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clear = () => {
    setLocalStatus("");
    setLocalFrom("");
    setLocalTo("");
    startTransition(() => router.push(pathname));
  };

  return (
    <form
      onSubmit={apply}
      className="mt-6 grid gap-3 rounded-xl border border-border bg-background p-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      <label className="block text-xs text-muted">
        Status
        <select
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value)}
          className="admin-status-select mt-1.5 w-full"
        >
          <option value="">All statuses</option>
          {scheduledCallStatuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs text-muted">
        From date
        <input
          type="date"
          value={localFrom}
          onChange={(e) => setLocalFrom(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
      </label>
      <label className="block text-xs text-muted">
        To date
        <input
          type="date"
          value={localTo}
          onChange={(e) => setLocalTo(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
      </label>
      <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50"
        >
          Apply filters
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={pending}
          className="rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-foreground disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
