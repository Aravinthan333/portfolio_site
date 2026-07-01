import { getAnalyticsSummary } from "@/lib/analytics";
import { StatCard } from "@/components/admin/StatCard";

export default async function AdminAnalyticsPage() {
  const data = await getAnalyticsSummary();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Analytics</h1>
      <p className="mt-1 text-sm text-muted">Visitor and traffic insights</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="All-time views" value={data.totalViews} />
        <StatCard label="This week" value={data.weekViews} />
        <StatCard label="Today" value={data.todayViews} />
        <StatCard label="Unique today" value={data.uniqueVisitorsToday} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="font-medium">Daily views (7 days)</h2>
          <ul className="mt-4 space-y-2">
            {data.dailyViews.length === 0 ? (
              <li className="text-sm text-muted">No data yet</li>
            ) : (
              data.dailyViews.map((d) => (
                <li key={d.day} className="flex justify-between text-sm">
                  <span className="text-muted">{d.day}</span>
                  <span className="font-medium">{Number(d.count)}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-background p-5">
          <h2 className="font-medium">Top pages (7 days)</h2>
          <ul className="mt-4 space-y-2">
            {data.topPages.map((p) => (
              <li key={p.path} className="flex justify-between text-sm">
                <span className="truncate text-muted">{p.path}</span>
                <span className="ml-4 font-medium">{p.views}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
