import { BriefcaseBusiness } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader
        icon={BriefcaseBusiness}
        title="New project"
        description="Create a new work card and case study."
        backHref="/admin/projects"
        backLabel="All projects"
      />
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
