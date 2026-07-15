"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProfileForm = {
  name: string;
  title: string;
  tagline: string;
  domain: string;
  location: string;
  availability: string;
  email: string;
  linkedIn: string;
  github: string;
  calendly: string;
};

export function ProfileForm() {
  const router = useRouter();
  const [form, setForm] = useState<ProfileForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setForm({
            name: data.name,
            title: data.title,
            tagline: data.tagline,
            domain: data.domain,
            location: data.location,
            availability: data.availability,
            email: data.email,
            linkedIn: data.linkedIn,
            github: data.github,
            calendly: data.calendly,
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const update = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => {
    setForm((f) => (f ? { ...f, [key]: value } : f));
    setSuccess(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError("");
    setSuccess(false);

    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Failed to save profile. Check all fields are valid.");
      return;
    }
    setSuccess(true);
    router.refresh();
  };

  const input =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

  if (loading) {
    return <p className="text-sm text-muted">Loading profile…</p>;
  }

  if (!form) {
    return <p className="text-sm text-red-500">Could not load profile.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      <section className="rounded-xl border border-border bg-background p-6">
        <h2 className="font-display text-lg font-semibold">Public identity</h2>
        <p className="mt-1 text-sm text-muted">Shown on the homepage, about page, and site metadata.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <input className={input} value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </Field>
          <Field label="Professional title">
            <input className={input} value={form.title} onChange={(e) => update("title", e.target.value)} required />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Tagline">
            <textarea className={input} rows={3} value={form.tagline} onChange={(e) => update("tagline", e.target.value)} required />
          </Field>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Location line">
            <input className={input} value={form.location} onChange={(e) => update("location", e.target.value)} required />
          </Field>
          <Field label="Availability">
            <input className={input} value={form.availability} onChange={(e) => update("availability", e.target.value)} required />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Domain">
            <input className={input} value={form.domain} onChange={(e) => update("domain", e.target.value)} required />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-background p-6">
        <h2 className="font-display text-lg font-semibold">Contact links</h2>
        <p className="mt-1 text-sm text-muted">Used on the contact page, footer, and hero social links.</p>
        <div className="mt-5 space-y-4">
          <Field label="Email">
            <input type="email" className={input} value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </Field>
          <Field label="LinkedIn URL">
            <input type="url" className={input} value={form.linkedIn} onChange={(e) => update("linkedIn", e.target.value)} required />
          </Field>
          <Field label="GitHub URL">
            <input type="url" className={input} value={form.github} onChange={(e) => update("github", e.target.value)} required />
          </Field>
          <Field label="Calendly URL">
            <input type="url" className={input} value={form.calendly} onChange={(e) => update("calendly", e.target.value)} required />
          </Field>
        </div>
      </section>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">Profile saved successfully.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white hover:bg-accent-hover disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
