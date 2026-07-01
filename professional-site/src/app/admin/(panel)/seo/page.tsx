import { getSeoReports } from "@/lib/analytics";

export default async function AdminSeoPage() {
  const reports = await getSeoReports();
  const good = reports.filter((r) => r.issues.length === 0).length;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">SEO analytics</h1>
      <p className="mt-1 text-sm text-muted">
        Meta title and description health across site pages
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-5">
          <p className="text-xs uppercase text-muted">Pages analyzed</p>
          <p className="font-display mt-2 text-3xl font-semibold">{reports.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <p className="text-xs uppercase text-muted">Healthy</p>
          <p className="font-display mt-2 text-3xl font-semibold text-green-600">{good}</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <p className="text-xs uppercase text-muted">Needs attention</p>
          <p className="font-display mt-2 text-3xl font-semibold text-yellow-600">
            {reports.length - good}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {reports.map((r) => (
          <div key={r.path} className="rounded-xl border border-border bg-background p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{r.path}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  r.issues.length === 0
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {r.issues.length === 0 ? "Good" : `${r.issues.length} issues`}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium">{r.title}</p>
            <p className="mt-1 text-sm text-muted">{r.description}</p>
            <div className="mt-3 flex gap-4 text-xs text-muted">
              <span>
                Title: {r.titleLength} chars ({r.titleScore})
              </span>
              <span>
                Description: {r.descriptionLength} chars ({r.descriptionScore})
              </span>
            </div>
            {r.issues.length > 0 && (
              <ul className="mt-3 list-inside list-disc text-xs text-yellow-700">
                {r.issues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
