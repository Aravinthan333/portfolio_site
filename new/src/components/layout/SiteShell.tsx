/** Top padding for inner pages under the fixed header. Header/footer live in PublicSiteLayout. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[calc(4rem+env(safe-area-inset-top))] sm:pt-[calc(5rem+env(safe-area-inset-top))]">
      {children}
    </div>
  );
}
