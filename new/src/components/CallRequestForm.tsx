"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import { SITE } from "@/data/site";
import { ThemedSelect } from "@/components/ThemedSelect";
import {
  formatTimezoneLabel,
  getBrowserTimezone,
  getSupportedTimezones,
} from "@/lib/timezone";

export function CallRequestForm() {
  const t = useTranslations("forms.call");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const timezones = useMemo(() => getSupportedTimezones(), []);
  const minDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setTimezone(getBrowserTimezone());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();

    try {
      const res = await fetch("/api/call-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone,
          phoneNumber: phone,
          preferredDate: String(data.get("preferredDate") ?? "").trim(),
          preferredTime: String(data.get("preferredTime") ?? "").trim(),
          preferredTimezone: String(data.get("preferredTimezone") ?? "").trim(),
          message: String(data.get("message") ?? "").trim() || undefined,
        }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimezone(getBrowserTimezone());
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-[var(--green-600)]" />
        <p className="mt-4 text-lg font-semibold text-[var(--fg)]">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">{t("successBody")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setStatus("idle")} className="btn-secondary">
            {t("submitAnother")}
          </button>
          <Link href="/contact" className="btn-primary">
            {t("hireViaMessage")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
            {t("fullName")}
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            className="input-field"
            placeholder={t("placeholderName")}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input-field"
            placeholder={t("placeholderEmail")}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
          {t("phone")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="input-field"
          placeholder={t("placeholderPhone")}
          autoComplete="tel"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="preferredDate"
            className="mb-2 block text-xs font-medium text-[var(--fg-muted)]"
          >
            {t("preferredDate")}
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={minDate}
            className="input-field"
          />
        </div>
        <div>
          <label
            htmlFor="preferredTime"
            className="mb-2 block text-xs font-medium text-[var(--fg-muted)]"
          >
            {t("preferredTime")}
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="time"
            required
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="preferredTimezone"
          className="mb-2 block text-xs font-medium text-[var(--fg-muted)]"
        >
          {t("timezone")}
        </label>
        <ThemedSelect
          id="preferredTimezone"
          name="preferredTimezone"
          label={t("timezone")}
          placeholder={t("timezone")}
          required
          value={timezone}
          onChange={setTimezone}
          options={timezones.map((tz) => ({
            value: tz,
            label: formatTimezoneLabel(tz),
          }))}
        />
        <p className="mt-1.5 text-xs text-[var(--fg-subtle)]">{t("timezoneHint")}</p>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
          {t("note")} <span className="text-[var(--fg-subtle)]">{t("optional")}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="input-field resize-y"
          placeholder={t("placeholderNote")}
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("errorBefore")}{" "}
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            Calendly
          </a>
          {t("errorAfter")}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary">
        <Phone size={16} />
        {status === "loading" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
