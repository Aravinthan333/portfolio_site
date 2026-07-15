"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Save } from "lucide-react";
import {
  scheduledCallStatuses,
  scheduledCallStatusClass,
} from "@/lib/admin-status";

export type ScheduledCallItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  timezone: string | null;
  eventName: string | null;
  startAt: string;
  endAt: string | null;
  location: string | null;
  cancelUrl: string | null;
  rescheduleUrl: string | null;
  inviteeAnswers: string | null;
  notes: string | null;
  status: string;
  cancelReason: string | null;
  createdAt: string;
};

function formatWhen(iso: string, timezone?: string | null) {
  const date = new Date(iso);
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: timezone || undefined,
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

export function CallSchedulesTable({ items }: { items: ScheduledCallItem[] }) {
  const router = useRouter();
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const item of items) next[item.id] = item.notes ?? "";
    setNotesDraft(next);
  }, [items]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/call-schedules/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  const saveNotes = async (id: string) => {
    setSavingId(id);
    try {
      await fetch(`/api/admin/call-schedules/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesDraft[id] ?? "" }),
      });
      router.refresh();
    } finally {
      setSavingId(null);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this scheduled call?")) return;
    await fetch(`/api/admin/call-schedules/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="admin-list">
      {items.map((item) => {
        const dirty = (notesDraft[item.id] ?? "") !== (item.notes ?? "");
        return (
          <div key={item.id} className="admin-list-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{item.name}</p>
                  <span className={scheduledCallStatusClass(item.status)}>
                    {item.status.replace("_", " ")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-accent">{item.email}</p>
                {item.phone && (
                  <p className="mt-1 text-sm text-foreground">{item.phone}</p>
                )}
                <div className="mt-3 space-y-1 rounded-lg bg-surface/80 p-3 text-sm">
                  {item.eventName && (
                    <p>
                      <span className="font-medium text-foreground">Event: </span>
                      <span className="text-muted">{item.eventName}</span>
                    </p>
                  )}
                  <p>
                    <span className="font-medium text-foreground">When: </span>
                    <span className="text-accent">
                      {formatWhen(item.startAt, item.timezone)}
                    </span>
                    {item.timezone && (
                      <span className="text-muted"> ({item.timezone})</span>
                    )}
                  </p>
                  {item.location && (
                    <p>
                      <span className="font-medium text-foreground">Location: </span>
                      {item.location.startsWith("http") ? (
                        <a
                          href={item.location}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline-offset-2 hover:underline"
                        >
                          Join link
                        </a>
                      ) : (
                        <span className="text-muted">{item.location}</span>
                      )}
                    </p>
                  )}
                  {item.cancelReason && (
                    <p>
                      <span className="font-medium text-foreground">Cancel reason: </span>
                      <span className="text-muted">{item.cancelReason}</span>
                    </p>
                  )}
                </div>
                {(item.cancelUrl || item.rescheduleUrl) && (
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    {item.rescheduleUrl && (
                      <a
                        href={item.rescheduleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent hover:underline"
                      >
                        Reschedule <ExternalLink size={12} />
                      </a>
                    )}
                    {item.cancelUrl && (
                      <a
                        href={item.cancelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-muted hover:underline"
                      >
                        Cancel link <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}
                <p className="mt-2 text-xs text-muted">
                  Booked {new Date(item.createdAt).toLocaleString()}
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
                    {scheduledCallStatuses.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="text-xs text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>

            {item.inviteeAnswers && (
              <p className="mt-4 whitespace-pre-wrap rounded-lg bg-surface/80 p-4 text-sm leading-relaxed text-muted">
                {item.inviteeAnswers}
              </p>
            )}

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium text-muted">
                Your notes
              </label>
              <textarea
                value={notesDraft[item.id] ?? ""}
                onChange={(e) =>
                  setNotesDraft((prev) => ({ ...prev, [item.id]: e.target.value }))
                }
                rows={3}
                placeholder="Prep notes, follow-ups, outcomes…"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  disabled={!dirty || savingId === item.id}
                  onClick={() => saveNotes(item.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface disabled:opacity-40"
                >
                  <Save size={12} />
                  {savingId === item.id ? "Saving…" : "Save notes"}
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <p className="text-center text-sm text-muted">
          No scheduled calls for these filters. Bookings appear when Calendly
          sends a webhook, or after you sync from Calendly.
        </p>
      )}
    </div>
  );
}
