/**
 * Marketing-site layout.
 *
 * Deliberately a route group so that when the Phase 2 admin dashboard
 * arrives it can live at app/(admin)/ with its own chrome, without the
 * public header/footer leaking into it — and without moving any of
 * these files. Header and footer land here in the next step.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
