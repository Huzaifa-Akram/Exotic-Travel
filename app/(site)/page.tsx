import Link from "next/link";

/**
 * Placeholder. The real homepage is built once the design system
 * has been signed off — see CLIENT_BRIEF.md §17, build order step 3.
 */
export default function HomePage() {
  return (
    <main className="surface-marble flex min-h-screen items-center">
      <div className="container-x text-center">
        <p className="eyebrow">Exotic Travel</p>
        <h1 className="font-display text-display mt-6 font-light">
          <span className="text-metal">Coming Soon</span>
        </h1>
        <div className="rule-gold mx-auto mt-8" />
        <p className="text-muted mx-auto mt-8 max-w-md text-lg">
          The design system is ready. The homepage is next.
        </p>
        <Link href="/styleguide" className="btn btn-secondary mt-10">
          View Design System
        </Link>
      </div>
    </main>
  );
}
