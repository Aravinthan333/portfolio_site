"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, Send } from "lucide-react";
import { SITE } from "@/data/site";
import { useLocalizedServices } from "@/hooks/useLocalizedContent";

export function ContactForm() {
  const t = useTranslations("forms.contact");
  const services = useLocalizedServices();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          service: String(data.get("service") ?? "").trim(),
          message: String(data.get("message") ?? "").trim() || undefined,
          type: "general",
        }),
      });
      if (res.ok) {
        setStatus("success");
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
          <Link href="/book-call" className="btn-primary">
            {t("bookInstead")}
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
          <label htmlFor="service" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
            {t("serviceNeeded")}
          </label>
          <select id="service" name="service" required className="input-field" defaultValue="">
            <option value="" disabled>
              {t("selectService")}
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.shortTitle}>
                {s.shortTitle}
              </option>
            ))}
            <option value="Other">{t("other")}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium text-[var(--fg-muted)]">
          {t("projectDetails")}
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
