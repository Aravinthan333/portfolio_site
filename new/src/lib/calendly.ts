import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/db";

type CalendlyLocation = {
  type?: string;
  location?: string;
  join_url?: string;
};

type CalendlyScheduledEvent = {
  uri?: string;
  name?: string;
  status?: string;
  start_time?: string;
  end_time?: string;
  location?: CalendlyLocation | null;
  event_type?: string;
};

type CalendlyQuestionAnswer = {
  question?: string;
  answer?: string;
};

export type CalendlyInviteePayload = {
  uri?: string;
  email?: string;
  name?: string;
  status?: string;
  timezone?: string;
  text_reminder_number?: string | null;
  cancel_url?: string;
  reschedule_url?: string;
  created_at?: string;
  updated_at?: string;
  cancellation?: {
    canceled_by?: string;
    reason?: string | null;
    canceler_type?: string;
  } | null;
  questions_and_answers?: CalendlyQuestionAnswer[];
  scheduled_event?: CalendlyScheduledEvent | null;
};

export type CalendlyWebhookBody = {
  event?: string;
  created_at?: string;
  payload?: CalendlyInviteePayload;
};

function formatLocation(location?: CalendlyLocation | null): string | null {
  if (!location) return null;
  if (location.join_url) return location.join_url;
  if (location.location) return location.location;
  if (location.type) return location.type;
  return null;
}

function formatAnswers(answers?: CalendlyQuestionAnswer[]): string | null {
  if (!answers?.length) return null;
  return answers
    .map((qa) => `${qa.question ?? "Question"}: ${qa.answer ?? ""}`)
    .join("\n");
}

/** Verify Calendly-Webhook-Signature: `t=...,v1=...` over `timestamp.body`. */
export function verifyCalendlySignature(
  rawBody: string,
  signatureHeader: string | null,
  signingKey: string,
  maxAgeSeconds = 300
): boolean {
  if (!signatureHeader || !signingKey) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [k, ...rest] = part.trim().split("=");
      return [k, rest.join("=")];
    })
  );

  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > maxAgeSeconds) return false;

  const expected = createHmac("sha256", signingKey)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function mapInviteeToRecord(
  payload: CalendlyInviteePayload,
  canceled: boolean
) {
  const event = payload.scheduled_event;
  const startAt = event?.start_time ? new Date(event.start_time) : null;
  if (!payload.uri || !payload.email || !payload.name || !startAt || Number.isNaN(startAt.getTime())) {
    return null;
  }

  return {
    calendlyInviteeUri: payload.uri,
    calendlyEventUri: event?.uri ?? null,
    name: payload.name,
    email: payload.email,
    phone: payload.text_reminder_number ?? null,
    timezone: payload.timezone ?? null,
    eventName: event?.name ?? null,
    startAt,
    endAt: event?.end_time ? new Date(event.end_time) : null,
    location: formatLocation(event?.location),
    cancelUrl: payload.cancel_url ?? null,
    rescheduleUrl: payload.reschedule_url ?? null,
    inviteeAnswers: formatAnswers(payload.questions_and_answers),
    status: canceled || payload.status === "canceled" ? "cancelled" : "scheduled",
    canceledAt: canceled ? new Date() : null,
    cancelReason: payload.cancellation?.reason ?? null,
  };
}

export async function upsertScheduledCallFromInvitee(
  payload: CalendlyInviteePayload,
  options: { canceled?: boolean } = {}
) {
  const canceled = Boolean(options.canceled);
  const data = mapInviteeToRecord(payload, canceled);
  if (!data) return null;

  const existing = await prisma.scheduledCall.findUnique({
    where: { calendlyInviteeUri: data.calendlyInviteeUri },
  });

  // Preserve admin notes and completed/no_show unless this is a cancel event.
  const status =
    canceled
      ? "cancelled"
      : existing?.status === "completed" || existing?.status === "no_show"
        ? existing.status
        : data.status;

  return prisma.scheduledCall.upsert({
    where: { calendlyInviteeUri: data.calendlyInviteeUri },
    create: {
      ...data,
      status,
      notes: null,
    },
    update: {
      calendlyEventUri: data.calendlyEventUri,
      name: data.name,
      email: data.email,
      phone: data.phone,
      timezone: data.timezone,
      eventName: data.eventName,
      startAt: data.startAt,
      endAt: data.endAt,
      location: data.location,
      cancelUrl: data.cancelUrl,
      rescheduleUrl: data.rescheduleUrl,
      inviteeAnswers: data.inviteeAnswers,
      status,
      canceledAt: canceled ? data.canceledAt : existing?.canceledAt ?? null,
      cancelReason: canceled ? data.cancelReason : existing?.cancelReason ?? null,
    },
  });
}

export async function processCalendlyWebhook(body: CalendlyWebhookBody) {
  const event = body.event;
  const payload = body.payload;
  if (!payload) return { handled: false as const, reason: "missing_payload" };

  if (event === "invitee.created") {
    const row = await upsertScheduledCallFromInvitee(payload, { canceled: false });
    return { handled: true as const, action: "created", id: row?.id ?? null };
  }

  if (event === "invitee.canceled") {
    const row = await upsertScheduledCallFromInvitee(payload, { canceled: true });
    return { handled: true as const, action: "canceled", id: row?.id ?? null };
  }

  return { handled: false as const, reason: "unhandled_event" };
}

type CalendlyApiInvitee = {
  uri: string;
  email: string;
  name: string;
  status: string;
  timezone?: string;
  text_reminder_number?: string | null;
  cancel_url?: string;
  reschedule_url?: string;
  questions_and_answers?: CalendlyQuestionAnswer[];
  cancellation?: CalendlyInviteePayload["cancellation"];
};

type CalendlyApiEvent = {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  location?: CalendlyLocation | null;
};

async function calendlyFetch<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`https://api.calendly.com${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Calendly API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

/** Pull recent/upcoming scheduled events from Calendly into the DB. */
export async function syncScheduledCallsFromCalendly(options?: {
  daysBack?: number;
  daysForward?: number;
}) {
  const token = process.env.CALENDLY_API_TOKEN;
  if (!token) {
    throw new Error("CALENDLY_API_TOKEN is not configured");
  }

  const me = await calendlyFetch<{ resource: { uri: string } }>("/users/me", token);
  const userUri = me.resource.uri;

  const daysBack = options?.daysBack ?? 30;
  const daysForward = options?.daysForward ?? 90;
  const min = new Date();
  min.setDate(min.getDate() - daysBack);
  const max = new Date();
  max.setDate(max.getDate() + daysForward);

  const eventsPath =
    `/scheduled_events?user=${encodeURIComponent(userUri)}` +
    `&min_start_time=${encodeURIComponent(min.toISOString())}` +
    `&max_start_time=${encodeURIComponent(max.toISOString())}` +
    `&count=100`;

  const events = await calendlyFetch<{ collection: CalendlyApiEvent[] }>(eventsPath, token);
  let upserted = 0;

  for (const event of events.collection ?? []) {
    const uuid = event.uri.split("/").pop();
    if (!uuid) continue;

    const invitees = await calendlyFetch<{ collection: CalendlyApiInvitee[] }>(
      `/scheduled_events/${uuid}/invitees?count=100`,
      token
    );

    for (const invitee of invitees.collection ?? []) {
      const canceled =
        invitee.status === "canceled" || event.status === "canceled";
      const payload: CalendlyInviteePayload = {
        uri: invitee.uri,
        email: invitee.email,
        name: invitee.name,
        status: invitee.status,
        timezone: invitee.timezone,
        text_reminder_number: invitee.text_reminder_number,
        cancel_url: invitee.cancel_url,
        reschedule_url: invitee.reschedule_url,
        questions_and_answers: invitee.questions_and_answers,
        cancellation: invitee.cancellation,
        scheduled_event: {
          uri: event.uri,
          name: event.name,
          status: event.status,
          start_time: event.start_time,
          end_time: event.end_time,
          location: event.location,
        },
      };
      const row = await upsertScheduledCallFromInvitee(payload, { canceled });
      if (row) upserted += 1;
    }
  }

  return { upserted, events: events.collection?.length ?? 0 };
}
