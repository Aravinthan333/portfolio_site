/** Top padding for inner pages under the fixed header. Header/footer live in PublicSiteLayout. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div className="pt-[4.5rem] sm:pt-24">{children}</div>;
}
