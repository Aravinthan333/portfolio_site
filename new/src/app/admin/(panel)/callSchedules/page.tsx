import type { Prisma } from "@prisma/client";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { scheduledCallStatuses } from "@/lib/admin-status";
import { CallSchedulesView } from "@/components/admin/CallSchedulesView";

type Props = {
  searchParams: Promise<{ status?: string; from?: string; to?: string }>;
};

export default async function AdminCallSchedulesPage({ searchParams }: Props) {
  const params = await searchParams;
  const status = params.status?.trim() ?? "";
  const from = params.from?.trim() ?? "";
  const to = params.to?.trim() ?? "";

  const where: Prisma.ScheduledCallWhereInput = {};

  if (status && scheduledCallStatuses.some((s) => s.value === status)) {
    where.status = status;
  }

  if (from || to) {
    where.startAt = {};
    if (from) {
      const fromDate = new Date(`${from}T00:00:00.000Z`);
      if (!Number.isNaN(fromDate.getTime())) where.startAt.gte = fromDate;
    }
    if (to) {
      const toDate = new Date(`${to}T23:59:59.999Z`);
      if (!Number.isNaN(toDate.getTime())) where.startAt.lte = toDate;
    }
  }

  const items = await prisma.scheduledCall.findMany({
    where,
    orderBy: { startAt: "desc" },
  });

  const serialized = items.map((i) => ({
    id: i.id,
    name: i.name,
    email: i.email,
    phone: i.phone,
    timezone: i.timezone,
    eventName: i.eventName,
    startAt: i.startAt.toISOString(),
    endAt: i.endAt?.toISOString() ?? null,
    location: i.location,
    cancelUrl: i.cancelUrl,
    rescheduleUrl: i.rescheduleUrl,
    inviteeAnswers: i.inviteeAnswers,
    notes: i.notes,
    status: i.status,
    cancelReason: i.cancelReason,
    createdAt: i.createdAt.toISOString(),
  }));

  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading schedules…</p>}>
      <CallSchedulesView
        items={serialized}
        status={status}
        from={from}
        to={to}
        canSync={Boolean(process.env.CALENDLY_API_TOKEN)}
      />
    </Suspense>
  );
}
