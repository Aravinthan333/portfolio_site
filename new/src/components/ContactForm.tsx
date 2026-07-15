"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { SITE } from "@/data/site";
import { BookCallButton } from "@/components/BookCallButton";
import { ThemedSelect } from "@/components/ThemedSelect";

const PURPOSE_KEYS = [
  "projectDiscussion",
  "hire",
  "scheduleCall",
  "other",
] as const;

export function ContactForm() {
  const t = useTranslations("forms.contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [purpose, setPurpose] = useState("");

  const purposeOptions = useMemo(
    () =>
      PURPOSE_KEYS.map((key) => ({
        value: t(`purposes.${key}`),
        label: t(`purposes.${key}`),
      })),
    [t]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!purpose) return;

    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          company: String(data.get("company") ?? "").trim() || undefined,
          service: purpose,
          message: String(data.get("message") ?? "").trim() || undefined,
          type: "general",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setPurpose("");
        form.reset();
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
            {t("sendAnother")}
          </button>
          <BookCallButton label={t("bookInstead")} />
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
            {t("company")} <span className="text-[var(--fg-subtle)]">{t("optional")}</span>
          </label>
          <input
            id="company"
            name="company"
            className="input-field"
            placeholder={t("placeholderCompany")}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="purpose" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
            {t("purpose")}
          </label>
          <ThemedSelect
            id="purpose"
            name="purpose"
            label={t("purpose")}
            placeholder={t("selectPurpose")}
            options={purposeOptions}
            value={purpose}
            onChange={setPurpose}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="input-field min-h-[120px] resize-y"
          placeholder={t("placeholderMessage")}
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("error", { email: SITE.email })}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary">
        <Send size={16} />
        {status === "loading" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
