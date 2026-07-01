"use client";

import { useRouter } from "next/navigation";

export function DeleteBlogButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();

  const onDelete = async () => {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button type="button" onClick={onDelete} className="text-red-600 hover:underline">
      Delete
    </button>
  );
}
