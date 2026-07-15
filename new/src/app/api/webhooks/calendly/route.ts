import { NextResponse } from "next/server";
import {
  processCalendlyWebhook,
  verifyCalendlySignature,
  type CalendlyWebhookBody,
} from "@/lib/calendly";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY ?? "";
  const signature = req.headers.get("calendly-webhook-signature");

  if (signingKey) {
    const valid = verifyCalendlySignature(rawBody, signature, signingKey);
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "CALENDLY_WEBHOOK_SIGNING_KEY is not configured" },
      { status: 500 }
    );
  }

  let body: CalendlyWebhookBody;
  try {
    body = JSON.parse(rawBody) as CalendlyWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const result = await processCalendlyWebhook(body);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Calendly webhook failed", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
