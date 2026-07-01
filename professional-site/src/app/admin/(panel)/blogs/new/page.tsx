import { BlogForm } from "@/components/admin/BlogForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FileText } from "lucide-react";

export default function NewBlogPage() {
  return (
    <div>
      <AdminPageHeader
        icon={FileText}
        title="New blog post"
        description="Create a new post for the public blog."
        backHref="/admin/blogs"
        backLabel="All posts"
      />
      <div className="mt-8">
        <BlogForm />
      </div>
    </div>
  );
}
