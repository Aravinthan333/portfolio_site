"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogContentBlock } from "@/types/blog";
import { isMediaBlock, isTextBlock } from "@/types/blog";
import {
  emptyMediaBlock,
  emptyTextBlock,
  filterEmptyBlocks,
} from "@/lib/blog-content";
import { BlogMediaField } from "@/components/admin/BlogMediaField";

type BlogFormData = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readTime: string;
  relatedProject: string;
  published: boolean;
  publishedAt: string;
  content: BlogContentBlock[];
};

type Props = {
  initial?: Partial<BlogFormData>;
};

export function BlogForm({ initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<BlogFormData>({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    category: initial?.category ?? "Case Study",
    coverImage: initial?.coverImage ?? "",
    readTime: initial?.readTime ?? "5 min read",
    relatedProject: initial?.relatedProject ?? "",
    published: initial?.published ?? false,
    publishedAt: initial?.publishedAt ?? new Date().toISOString().split("T")[0],
    content: initial?.content?.length ? initial.content : [emptyTextBlock()],
  });

  const update = <K extends keyof BlogFormData>(key: K, value: BlogFormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const updateBlock = (index: number, block: BlogContentBlock) => {
    const content = [...form.content];
    content[index] = block;
    update("content", content);
  };

  const addBlock = (block: BlogContentBlock) => {
    update("content", [...form.content, block]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      coverImage: form.coverImage.trim() || undefined,
      relatedProject: form.relatedProject || undefined,
      content: filterEmptyBlocks(form.content),
    };

    const url = initial?.id ? `/api/admin/blogs/${initial.id}` : "/api/admin/blogs";
    const method = initial?.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      setError("Failed to save. Check slug is unique and fields are valid.");
      return;
    }
    router.push("/admin/blogs");
    router.refresh();
  };

  const input =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

  return (
    <form onSubmit={onSubmit} className="max-w-5xl">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <FormSection title="Post details" step={initial?.id ? undefined : "1"}>
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
            <Field label="Category">
              <input
                className={input}
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Read time">
                <input
                  className={input}
                  value={form.readTime}
                  onChange={(e) => update("readTime", e.target.value)}
                />
              </Field>
              <Field label="Date">
                <input
                  type="date"
                  className={input}
                  value={form.publishedAt}
                  onChange={(e) => update("publishedAt", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Related project slug">
              <input
                className={input}
                value={form.relatedProject}
                onChange={(e) => update("relatedProject", e.target.value)}
                placeholder="raja-supermart"
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

          <FormSection title="Cover image" step={initial?.id ? undefined : "2"}>
            <BlogMediaField
              label="Cover"
              value={form.coverImage}
              onChange={(url) => update("coverImage", url)}
              kind="image"
            />
            {form.coverImage && (
              <button
                type="button"
                onClick={() => update("coverImage", "")}
                className="text-xs text-red-500 hover:underline"
              >
                Remove cover
              </button>
            )}
          </FormSection>
        </div>

        <div className="space-y-6">
          <FormSection title="Summary" step={initial?.id ? undefined : "3"}>
            <Field label="Excerpt">
              <textarea
                className={input}
                rows={4}
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                required
              />
            </Field>
          </FormSection>

          <FormSection title="Content" step={initial?.id ? undefined : "4"}>
            <div className="mb-3 flex flex-wrap gap-2">
              <AddBlockButton label="+ Paragraph" onClick={() => addBlock(emptyTextBlock("paragraph"))} />
              <AddBlockButton label="+ Heading" onClick={() => addBlock(emptyTextBlock("heading"))} />
              <AddBlockButton label="+ Image" onClick={() => addBlock(emptyMediaBlock("image"))} />
              <AddBlockButton label="+ GIF" onClick={() => addBlock(emptyMediaBlock("gif"))} />
              <AddBlockButton label="+ Video" onClick={() => addBlock(emptyMediaBlock("video"))} />
            </div>
            <div className="space-y-3">
              {form.content.map((block, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-muted">{block.type}</span>
                    <button
                      type="button"
                      className="text-xs text-red-500"
                      onClick={() =>
                        update(
                          "content",
                          form.content.filter((_, idx) => idx !== i)
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>

                  {isTextBlock(block) && (
                    <textarea
                      className={input}
                      rows={block.type === "heading" ? 1 : 4}
                      value={block.text}
                      onChange={(e) => updateBlock(i, { ...block, text: e.target.value })}
                      placeholder={block.type === "heading" ? "Section heading" : "Paragraph text"}
                    />
                  )}

                  {isMediaBlock(block) && (
                    <div className="space-y-3">
                      <BlogMediaField
                        label={block.type === "video" ? "Video file" : block.type === "gif" ? "GIF" : "Image"}
                        value={block.url}
                        onChange={(url) => updateBlock(i, { ...block, url })}
                        kind={block.type}
                        preview
                      />
                      {block.type !== "video" && (
                        <Field label="Alt text">
                          <input
                            className={input}
                            value={block.alt ?? ""}
                            onChange={(e) => updateBlock(i, { ...block, alt: e.target.value })}
                            placeholder="Describe the media for accessibility"
                          />
                        </Field>
                      )}
                      <Field label="Caption (optional)">
                        <input
                          className={input}
                          value={block.caption ?? ""}
                          onChange={(e) => updateBlock(i, { ...block, caption: e.target.value })}
                          placeholder="Shown below the media"
                        />
                      </Field>
                    </div>
                  )}
                </div>
              ))}
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
          {saving ? "Saving…" : initial?.id ? "Update post" : "Create post"}
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

function AddBlockButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-accent hover:bg-accent-soft"
      onClick={onClick}
    >
      {label}
    </button>
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
