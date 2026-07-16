import Link from "next/link";
import { getAnalyticsSummary } from "@/lib/analytics";
import { StatCard } from "@/components/admin/StatCard";

export default async function AdminDashboardPage() {
  const data = await getAnalyticsSummary();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overview of your portfolio site</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total page views" value={data.totalViews} />
        <StatCard label="Visitors today" value={data.uniqueVisitorsToday} hint={`${data.todayViews} page views`} />
        <StatCard label="New applications" value={data.newSubmissions} />
        <StatCard label="Call requests" value={data.newCalls} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="font-medium">Top pages (7 days)</h2>
          <ul className="mt-4 space-y-2">
            {data.topPages.length === 0 ? (
              <li className="text-sm text-muted">No data yet</li>
            ) : (
              data.topPages.map((p) => (
                <li key={p.path} className="flex justify-between text-sm">
                  <span className="text-muted">{p.path}</span>
                  <span className="font-medium">{p.views}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="font-medium">Recent actions</h2>
          <ul className="mt-4 space-y-2">
            {data.recentActions.length === 0 ? (
              <li className="text-sm text-muted">No actions logged</li>
            ) : (
              data.recentActions.map((a) => (
                <li key={a.id} className="text-sm">
                  <span className="font-medium capitalize">{a.action}</span>{" "}
                  <span className="text-muted">{a.entity}</span>
                  {a.details && <span className="text-muted"> - {a.details}</span>}
                  <span className="ml-2 text-xs text-muted">
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/blogs/new" className="rounded-full bg-accent px-5 py-2 text-sm text-white">
          New blog post
        </Link>
        <Link href="/admin/projects/new" className="rounded-full border border-border px-5 py-2 text-sm">
          New project
        </Link>
        <Link href="/admin/submissions" className="rounded-full border border-border px-5 py-2 text-sm">
          View applications
        </Link>
        <Link href="/admin/seo" className="rounded-full border border-border px-5 py-2 text-sm">
          SEO report
        </Link>
      </div>
    </div>
  );
}
