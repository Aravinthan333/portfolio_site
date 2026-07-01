import { ProfileForm } from "@/components/admin/ProfileForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminProfilePage() {
  return (
    <div>
      <AdminPageHeader
        title="Site profile"
        description="Edit your name, title, tagline, and contact details shown on the public site."
      />
      <div className="mt-8">
        <ProfileForm />
      </div>
    </div>
  );
}
