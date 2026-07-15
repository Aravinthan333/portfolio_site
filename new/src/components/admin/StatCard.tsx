export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{label}</p>
      <p className="font-display mt-2 text-3xl font-semibold text-gradient">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
