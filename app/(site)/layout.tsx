import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

/**
 * Marketing-site layout.
 *
 * A route group so the Phase 2 admin dashboard can live at app/(admin)/
 * with its own chrome, without this header/footer leaking into it — and
 * without moving any files.
 *
 * The header is fixed/overlaid, so pages that don't open with a
 * full-height hero should add their own top spacing.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
