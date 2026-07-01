"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { AdminPageHeader, AdminHeroButton } from "@/components/admin/AdminPageHeader";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage?: string | null;
  published: boolean;
  publishedAt: string;
  updatedAt: string;
};

export function AdminBlogsList() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleting, setDeleting] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        setPosts(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["", ...Array.from(set).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    if (!categoryFilter) return posts;
    return posts.filter((p) => p.category === categoryFilter);
  }, [posts, categoryFilter]);

  const openDelete = (post: BlogPost) => {
    setDeleteId(post.id);
    setDeleteTitle(post.title);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/blogs/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      await loadPosts();
      router.refresh();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        icon={BookOpen}
        title="Blogs"
        description="Manage blog posts on your public site."
        onRefresh={() => void loadPosts()}
        refreshing={loading}
        actions={
          <AdminHeroButton href="/admin/blogs/new">
            <Plus size={16} />
            New post
          </AdminHeroButton>
        }
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label htmlFor="category-filter" className="text-sm font-medium text-muted">
          Category
        </label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat || "all"} value={cat}>
              {cat || "All categories"}
            </option>
          ))}
        </select>
        <span className="text-xs text-muted">
          {loading ? "Loading…" : `${filtered.length} post${filtered.length === 1 ? "" : "s"}`}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <p className="col-span-full py-12 text-center text-sm text-muted">Loading posts…</p>
        ) : filtered.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-border py-16 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted/40" />
            <p className="mt-4 font-medium">
              {categoryFilter ? "No posts in this category" : "No blog posts yet"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {categoryFilter ? "Try another category or create a new post." : "Create your first post."}
            </p>
            {!categoryFilter && (
              <AdminHeroButton href="/admin/blogs/new" variant="primary">
                <Plus size={16} />
                New post
              </AdminHeroButton>
            )}
          </div>
        ) : (
          filtered.map((post) => (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-background"
            >
              <div className="relative h-36 w-full border-b border-border bg-surface">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized={post.coverImage.startsWith("/uploads/")}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FileText className="h-8 w-8 text-muted/40" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 text-sm font-semibold">{post.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      post.published
                        ? "bg-green-500/15 text-green-400"
                        : "bg-yellow-500/15 text-yellow-500"
                    }`}
                  >
                    {post.published ? "Live" : "Draft"}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs text-muted">{post.excerpt}</p>
                <p className="text-xs text-muted">
                  {post.category} · {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                <div className="mt-auto flex flex-wrap gap-3 border-t border-border pt-3 text-xs font-semibold">
                  <Link
                    href={`/admin/blogs/${post.id}/edit`}
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    <Pencil size={12} />
                    Edit
                  </Link>
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-muted hover:text-accent"
                    >
                      <ExternalLink size={12} />
                      View
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => openDelete(post)}
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
            <h3 className="font-display text-lg font-semibold">Delete blog post</h3>
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
