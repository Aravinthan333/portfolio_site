"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  ExternalLink,
  FileText,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminPageHeader, AdminHeroButton } from "@/components/admin/AdminPageHeader";

type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  year: string;
  liveUrl?: string | null;
  published: boolean;
  updatedAt: string;
};

export function AdminProjectsList() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleting, setDeleting] = useState(false);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) setProjects(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProjects();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadProjects]);

  const openDelete = (project: Project) => {
    setDeleteId(project.id);
    setDeleteTitle(project.title);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/projects/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      await loadProjects();
      router.refresh();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        icon={BriefcaseBusiness}
        title="Projects"
        description="Manage works listings and case study pages."
        onRefresh={() => void loadProjects()}
        refreshing={loading}
        actions={
          <AdminHeroButton href="/admin/projects/new">
            <Plus size={16} />
            New project
          </AdminHeroButton>
        }
      />

      <div className="mt-6 text-xs text-muted">
        {loading ? "Loading…" : `${projects.length} project${projects.length === 1 ? "" : "s"}`}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <p className="col-span-full py-12 text-center text-sm text-muted">Loading projects…</p>
        ) : projects.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-border py-16 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted/40" />
            <p className="mt-4 font-medium">No projects yet</p>
            <p className="mt-1 text-sm text-muted">Create your first project case study.</p>
            <div className="mt-4 flex justify-center">
              <AdminHeroButton href="/admin/projects/new" variant="primary">
                <Plus size={16} />
                New project
              </AdminHeroButton>
            </div>
          </div>
        ) : (
          projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-background"
            >
              <div className="relative h-44 w-full border-b border-border bg-surface">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized={project.image.startsWith("/uploads/")}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="line-clamp-2 text-sm font-semibold">{project.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted">{project.subtitle}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      project.published
                        ? "bg-green-500/15 text-green-700"
                        : "bg-yellow-500/15 text-yellow-700"
                    }`}
                  >
                    {project.published ? "Live" : "Draft"}
                  </span>
                </div>

                <p className="text-xs text-muted">
                  {project.year} · Updated {new Date(project.updatedAt).toLocaleDateString()}
                </p>

                <div className="mt-auto flex flex-wrap gap-3 border-t border-border pt-3 text-xs font-semibold">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    <Pencil size={12} />
                    Edit
                  </Link>
                  {project.published && (
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-muted hover:text-accent"
                    >
                      <ExternalLink size={12} />
                      View
                    </Link>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted hover:text-accent"
                    >
                      <ExternalLink size={12} />
                      Live
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => openDelete(project)}
                    className="inline-flex items-center gap-1 text-red-500 hover:underline"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-xl">
            <h3 className="font-display text-lg font-semibold">Delete project</h3>
            <p className="mt-2 text-sm text-muted">
              Delete <strong>{deleteTitle}</strong>? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="rounded-lg border border-border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
