import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTracker } from "@/components/analytics/PageTracker";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell relative">
      <PageTracker />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
