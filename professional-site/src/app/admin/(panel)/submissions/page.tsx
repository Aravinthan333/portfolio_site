import { prisma } from "@/lib/db";
import { SubmissionsTable } from "@/components/admin/SubmissionsTable";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Inbox } from "lucide-react";

export default async function AdminSubmissionsPage() {
  const items = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = items.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
  }));

  return (
    <div>
      <AdminPageHeader
        icon={Inbox}
        title="Applications"
        description="Contact form submissions - update status as you review and reply."
      />
      <div className="mt-8">
        <SubmissionsTable items={serialized} />
      </div>
    </div>
  );
}
