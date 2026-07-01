"use client";

import { useRouter } from "next/navigation";
import { callStatuses, callStatusClass } from "@/lib/admin-status";

type Item = {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string | null;
  phoneNumber: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  preferredTimezone: string | null;
  preferredTimeLabel: string | null;
  preferredTimeIst: string | null;
  message: string | null;
  status: string;
  createdAt: string;
};

export function CallsTable({ items }: { items: Item[] }) {
  const router = useRouter();

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/calls/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this call request?")) return;
    await fetch(`/api/admin/calls/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="admin-list">
      {items.map((item) => (
        <div key={item.id} className="admin-list-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{item.name}</p>
                <span className={callStatusClass(item.status)}>{item.status}</span>
              </div>
              <p className="mt-1 text-sm text-accent">{item.email}</p>
              <p className="mt-1 text-sm text-foreground">{item.phone}</p>
              {(item.preferredTimeLabel || item.preferredTimeIst) && (
                <div className="mt-3 space-y-1 rounded-lg bg-surface/80 p-3 text-sm">
                  {item.preferredTimeLabel && (
                    <p>
                      <span className="font-medium text-foreground">Client time: </span>
                      <span className="text-muted">{item.preferredTimeLabel}</span>
                    </p>
                  )}
                  {item.preferredTimeIst && (
                    <p>
                      <span className="font-medium text-foreground">IST: </span>
                      <span className="text-accent">{item.preferredTimeIst}</span>
                    </p>
                  )}
                </div>
              )}
              <p className="mt-2 text-xs text-muted">{new Date(item.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 text-xs text-muted">
                Status
                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  className="admin-status-select"
                >
                  {callStatuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={() => onDelete(item.id)} className="text-xs text-red-500">
                Delete
              </button>
            </div>
          </div>
          {item.message && (
            <p className="mt-4 rounded-lg bg-surface/80 p-4 text-sm leading-relaxed text-muted">
              {item.message}
            </p>
          )}
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center text-sm text-muted">No call requests yet.</p>
      )}
    </div>
  );
}
