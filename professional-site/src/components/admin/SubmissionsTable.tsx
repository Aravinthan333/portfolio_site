"use client";

import { useRouter } from "next/navigation";
import {
  submissionStatuses,
  submissionStatusClass,
} from "@/lib/admin-status";

type Item = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string | null;
  type: string;
  status: string;
  createdAt: string;
};

export function SubmissionsTable({ items }: { items: Item[] }) {
  const router = useRouter();

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
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
                <span className={submissionStatusClass(item.status)}>{item.status.replace("_", " ")}</span>
              </div>
              <p className="mt-1 text-sm text-accent">{item.email}</p>
              {item.service && <p className="mt-1 text-sm font-medium">{item.service}</p>}
              {item.company && <p className="text-sm text-muted">{item.company}</p>}
              <p className="mt-2 text-xs text-muted">
                {item.type} · {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 text-xs text-muted">
                Status
                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  className="admin-status-select"
                >
                  {submissionStatuses.map((s) => (
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
          {item.message ? (
            <p className="mt-4 rounded-lg bg-surface/80 p-4 text-sm leading-relaxed text-muted">
              {item.message}
            </p>
          ) : (
            <p className="mt-4 text-sm italic text-muted">No description provided.</p>
          )}
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center text-sm text-muted">No submissions yet.</p>
      )}
    </div>
  );
}
