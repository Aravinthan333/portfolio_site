"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, RefreshCw } from "lucide-react";
import { AdminPageHeader, AdminHeroButton } from "@/components/admin/AdminPageHeader";
import { CallSchedulesFilters } from "@/components/admin/CallSchedulesFilters";
import {
  CallSchedulesTable,
  type ScheduledCallItem,
} from "@/components/admin/CallSchedulesTable";

export function CallSchedulesView({
  items,
  status,
  from,
  to,
  canSync,
}: {
  items: ScheduledCallItem[];
  status: string;
  from: string;
  to: string;
  canSync: boolean;
}) {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const sync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch("/api/admin/call-schedules/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setSyncMessage(data.error ?? "Sync failed");
      } else {
        setSyncMessage(`Synced ${data.upserted} invitee(s) from ${data.events} event(s).`);
        router.refresh();
      }
    } catch {
      setSyncMessage("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        icon={CalendarClock}
        title="Call schedules"
        description="Calendly bookings with status, private notes, and date filters."
        actions={
          canSync ? (
            <AdminHeroButton onClick={sync} variant="outline">
              <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
              {syncing ? "Syncing…" : "Sync from Calendly"}
            </AdminHeroButton>
          ) : undefined
        }
      />

      {syncMessage && (
        <p className="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
          {syncMessage}
        </p>
      )}

      <CallSchedulesFilters status={status} from={from} to={to} />

      <div className="mt-6">
        <CallSchedulesTable items={items} />
      </div>
    </div>
  );
}
