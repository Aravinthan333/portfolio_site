import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-elevated px-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold">Admin login</h1>
        <p className="mt-2 text-sm text-muted">Sign in to manage your portfolio</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
