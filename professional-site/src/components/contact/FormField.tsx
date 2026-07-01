type Props = {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
};

export function FormField({ label, error, required, hint, children }: Props) {
  return (
    <div className="contact-field">
      <label className="contact-label">
        {label}
        {required && <span className="text-accent"> *</span>}
        {!required && <span className="contact-label-optional"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="contact-hint">{hint}</p>}
      {error && <p className="contact-error">{error}</p>}
    </div>
  );
}

export const contactInputClass =
  "contact-input w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

export const contactSelectClass =
  "contact-input w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";
