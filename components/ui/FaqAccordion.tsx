/**
 * The site's one accordion. Native <details>/<summary>, so it opens
 * before hydration, costs no JavaScript, and is keyboard-accessible
 * without any of it being written here.
 *
 * Extracted because five pages carry a question list — the homepage, the
 * airport and service templates, concierge and /faq — and five copies of
 * the same markup is five places for the gold plus-to-minus detail to
 * drift out of step.
 */

export type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="border-t border-white/10">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-white/10">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <span className="group-open:text-gold text-base font-medium text-white transition-colors duration-300">
              {f.q}
            </span>
            {/* A plus that becomes a minus — drawn rather than typed, so
                it collapses on one axis instead of swapping glyphs. */}
            <span aria-hidden className="text-gold relative h-3.5 w-3.5 shrink-0">
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
              <span className="ease-luxe absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-400 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="text-muted -mt-1 pb-7 text-sm text-pretty">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
