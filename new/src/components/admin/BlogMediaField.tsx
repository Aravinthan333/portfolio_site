"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Link2 } from "lucide-react";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  kind?: "image" | "gif" | "video";
  preview?: boolean;
};

export function BlogMediaField({
  label,
  value,
  onChange,
  kind = "image",
  preview = true,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");

  const accept =
    kind === "video"
      ? "video/mp4,video/webm"
      : kind === "gif"
        ? "image/gif"
        : "image/jpeg,image/png,image/webp";

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("kind", kind);

    const res = await fetch("/api/admin/uploads", { method: "POST", body });
    setUploading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Upload failed");
      return;
    }

    const data = await res.json();
    onChange(data.url);
  };

  const fieldClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex rounded-lg border border-border p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`rounded-md px-2 py-1 ${mode === "upload" ? "bg-accent-soft text-accent" : "text-muted"}`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`rounded-md px-2 py-1 ${mode === "url" ? "bg-accent-soft text-accent" : "text-muted"}`}
          >
            URL
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 px-4 py-8 text-center transition-colors hover:border-accent/50"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <Upload className="h-6 w-6 text-muted" />
          <p className="mt-2 text-sm text-muted">
            {uploading ? "Uploading…" : "Click to upload or drag a file here"}
          </p>
          <p className="mt-1 text-xs text-muted/70">
            {kind === "video" ? "MP4 or WebM, max 30MB" : kind === "gif" ? "GIF, max 10MB" : "JPG, PNG, WebP, max 5MB"}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.target.value = "";
            }}
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-muted">
            <Link2 size={16} />
          </span>
          <input
            type="url"
            className={fieldClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://… or /uploads/blogs/…"
          />
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {preview && value && kind !== "video" && (
        <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-surface">
          <Image src={value} alt="" fill className="object-cover" unoptimized />
        </div>
      )}

      {preview && value && kind === "video" && (
        <video src={value} controls className="w-full rounded-lg border border-border" />
      )}
    </div>
  );
}
