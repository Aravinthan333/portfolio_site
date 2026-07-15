import { prisma } from "@/lib/db";
import { CallsTable } from "@/components/admin/CallsTable";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Phone } from "lucide-react";

export default async function AdminCallsPage() {
  const items = await prisma.callRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = items.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
  }));

  return (
    <div>
      <AdminPageHeader
        icon={Phone}
        title="Call requests"
        description="Scheduled and requested calls - client time and IST conversion shown below."
      />
      <div className="mt-8">
        <CallsTable items={serialized} />
      </div>
    </div>
  );
}
