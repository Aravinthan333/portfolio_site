"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlogMediaField } from "@/components/admin/BlogMediaField";

type ProjectFormData = {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  role: string;
  challenge: string;
  solution: string;
  highlights: string;
  outcome: string;
  stack: string;
  tags: string;
  liveUrl: string;
  year: string;
  image: string;
  accent: string;
  published: boolean;
};

type Props = {
  initial?: Partial<ProjectFormData>;
};

function linesToList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProjectForm({ initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ProjectFormData>({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    subtitle: initial?.subtitle ?? "",
    description: initial?.description ?? "",
    overview: initial?.overview ?? "",
    role: initial?.role ?? "",
    challenge: initial?.challenge ?? "",
    solution: initial?.solution ?? "",
    highlights: initial?.highlights ?? "",
    outcome: initial?.outcome ?? "",
    stack: initial?.stack ?? "",
    tags: initial?.tags ?? "",
    liveUrl: initial?.liveUrl ?? "",
    year: initial?.year ?? new Date().getFullYear().toString(),
    image: initial?.image ?? "",
    accent: initial?.accent ?? "",
    published: initial?.published ?? true,
  });

  const update = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      highlights: linesToList(form.highlights),
      stack: linesToList(form.stack),
      tags: linesToList(form.tags),
      liveUrl: form.liveUrl.trim() || undefined,
      accent: form.accent.trim() || undefined,
    };

    const url = initial?.id ? `/api/admin/projects/${initial.id}` : "/api/admin/projects";
    const method = initial?.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Failed to save. Check slug is unique and required fields are filled.");
      return;
    }

    router.push("/admin/projects");
    router.refresh();
  };

  const input =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

  return (
    <form onSubmit={onSubmit} className="max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-6">
          <FormSection title="Project details" step={initial?.id ? undefined : "1"}>
            <Field label="Title">
              <input
                className={input}
                value={form.title}
                onChange={(e) => {
                  update("title", e.target.value);
                  if (!initial?.id && !form.slug) {
                    update(
                      "slug",
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")
                    );
                  }
                }}
                required
              />
            </Field>
            <Field label="Slug">
              <input
                className={input}
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                pattern="[a-z0-9-]+"
                required
                disabled={Boolean(initial?.id)}
              />
            </Field>
            <Field label="Subtitle">
              <input
                className={input}
                value={form.subtitle}
                onChange={(e) => update("subtitle", e.target.value)}
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Year">
                <input
                  className={input}
                  value={form.year}
                  onChange={(e) => update("year", e.target.value)}
                  required
                />
              </Field>
              <Field label="Accent (optional)">
                <input
                  className={input}
                  value={form.accent}
                  onChange={(e) => update("accent", e.target.value)}
                  placeholder="#3b82f6"
                />
              </Field>
            </div>
            <Field label="Live URL (optional)">
              <input
                type="url"
                className={input}
                value={form.liveUrl}
                onChange={(e) => update("liveUrl", e.target.value)}
                placeholder="https://example.com"
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => update("published", e.target.checked)}
              />
              Published on public site
            </label>
          </FormSection>

          <FormSection title="Project image" step={initial?.id ? undefined : "2"}>
            <BlogMediaField
              label="Cover image"
              value={form.image}
              onChange={(url) => update("image", url)}
              kind="image"
            />
          </FormSection>

          <FormSection title="Quick copy" step={initial?.id ? undefined : "3"}>
            <Field label="Card description">
              <textarea
                className={input}
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                required
              />
            </Field>
            <Field label="Outcome">
              <textarea
                className={input}
                rows={4}
                value={form.outcome}
                onChange={(e) => update("outcome", e.target.value)}
                required
              />
            </Field>
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Case study content" step={initial?.id ? undefined : "4"}>
            <Field label="Overview">
              <textarea className={input} rows={5} value={form.overview} onChange={(e) => update("overview", e.target.value)} required />
            </Field>
            <Field label="My role">
              <textarea className={input} rows={4} value={form.role} onChange={(e) => update("role", e.target.value)} required />
            </Field>
            <Field label="Challenge">
              <textarea className={input} rows={5} value={form.challenge} onChange={(e) => update("challenge", e.target.value)} required />
            </Field>
            <Field label="Solution">
              <textarea className={input} rows={5} value={form.solution} onChange={(e) => update("solution", e.target.value)} required />
            </Field>
          </FormSection>

          <FormSection title="Lists" step={initial?.id ? undefined : "5"}>
            <Field label="Highlights - one per line">
              <textarea className={input} rows={6} value={form.highlights} onChange={(e) => update("highlights", e.target.value)} required />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Technologies - one per line">
                <textarea className={input} rows={6} value={form.stack} onChange={(e) => update("stack", e.target.value)} required />
              </Field>
              <Field label="Tags - one per line">
                <textarea className={input} rows={6} value={form.tags} onChange={(e) => update("tags", e.target.value)} required />
              </Field>
            </div>
          </FormSection>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white hover:bg-accent-hover disabled:opacity-50"
        >
          {saving ? "Saving…" : initial?.id ? "Update project" : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-border px-6 py-2.5 text-sm text-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function FormSection({
  title,
  step,
  children,
}: {
  title: string;
  step?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-background p-5">
      <div className="mb-4 flex items-center gap-2">
        {step && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
            {step}
          </span>
        )}
        <h2 className="font-display text-base font-semibold">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
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
