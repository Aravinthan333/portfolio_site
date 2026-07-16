/** Top padding for inner pages under the fixed header. Header/footer live in PublicSiteLayout. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div className="pt-16 sm:pt-20">{children}</div>;
}
