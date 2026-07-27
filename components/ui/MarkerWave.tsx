/**
 * A gold marker stroke, drawn by hand down the side of a page.
 *
 * Two things make it read as a pen rather than a generated sine wave.
 * The amplitude and the spacing between turns are both irregular — a
 * regular wave is the one shape a hand cannot produce — and the mark is
 * laid down twice, a heavier pass with a lighter one beside it that
 * agrees in some places and drifts in others, the way a second stroke
 * over a first never quite lands on it. The gradient fades both ends to
 * nothing so the stroke tapers in and out instead of being cut off.
 *
 * The specks are separate elements rather than circles inside the SVG,
 * and that is the whole reason the geometry below works: the stroke is
 * stretched vertically to whatever height it is given, which would turn
 * any circle drawn in the same coordinate space into an oval. Held
 * outside, they stay round. Their positions are the path's own anchor
 * points converted to percentages — the curve passes exactly through
 * those, so the specks sit on the line — plus a handful deliberately
 * off it, because glitter scatters.
 */

/** The heavier pass. Anchors alternate left and right of centre; each
    control point sits directly above or below its anchor, which puts a
    vertical tangent at every turn and keeps the curve smooth. */
const STROKE =
  "M 30 4 C 36 34, 46 54, 46 84 C 46 120, 13 142, 13 178 C 13 224, 43 252, 43 298 C 43 334, 11 356, 11 392 C 11 436, 46 462, 46 506 C 46 540, 17 562, 17 596 C 17 642, 41 670, 41 716 C 41 756, 19 782, 19 822 C 19 858, 33 880, 33 916 C 33 946, 30 972, 30 996";

/** The second, lighter pass. Offset by a unit or two and a little out of
    step, so the two strokes converge and separate along the way. */
const STROKE_SECOND =
  "M 31.5 12 C 37 40, 47.5 58, 47.5 88 C 47.5 122, 14.5 146, 14.5 182 C 14.5 226, 44.5 254, 44.5 300 C 44.5 336, 12.5 358, 12.5 396 C 12.5 438, 47 464, 47 508 C 47 542, 18.5 566, 18.5 600 C 18.5 644, 42.5 672, 42.5 718 C 42.5 758, 20.5 786, 20.5 824 C 20.5 860, 34.5 882, 34.5 918 C 34.5 946, 31.5 970, 31.5 990";

/**
 * top / left as percentages of the strip, size in px, delay in ms.
 * `star` marks the larger four-pointed specks that sit on the turns of
 * the stroke; the rest are plain dust scattered around it. The delays
 * are deliberately unrelated to each other — an even stagger would read
 * as a sequence rather than as glitter.
 */
const GLINTS = [
  { top: 0.4, left: 50, size: 7, delay: 0, star: true },
  { top: 8.4, left: 76.7, size: 9, delay: 900, star: true },
  { top: 13, left: 63.3, size: 3, delay: 2100 },
  { top: 17.8, left: 21.7, size: 8, delay: 1500, star: true },
  { top: 25, left: 36.7, size: 2.5, delay: 3300 },
  { top: 29.8, left: 71.7, size: 9, delay: 600, star: true },
  { top: 39.2, left: 18.3, size: 7, delay: 2700, star: true },
  { top: 46, left: 41.7, size: 3, delay: 1200 },
  { top: 50.6, left: 76.7, size: 10, delay: 3000, star: true },
  { top: 59.6, left: 28.3, size: 7, delay: 400, star: true },
  { top: 65, left: 60, size: 2.5, delay: 2400 },
  { top: 71.6, left: 68.3, size: 9, delay: 1800, star: true },
  { top: 76, left: 43.3, size: 3, delay: 3600 },
  { top: 82.2, left: 31.7, size: 8, delay: 1000, star: true },
  { top: 91.6, left: 55, size: 6, delay: 2200, star: true },
];

/** Four-pointed sparkle with concave sides — a drawn glint, not a plus. */
const STAR =
  "M12 0c.5 7 4.5 11.5 12 12-7.5.5-11.5 5-12 12-.5-7-4.5-11.5-12-12 7.5-.5 11.5-5 12-12Z";

export function MarkerWave({ className = "" }: { className?: string }) {
  return (
    // Two elements, and the split is load-bearing. The specks need a
    // positioned ancestor to sit on, but putting `relative` on the root
    // would fight whatever position the caller passes in — and lose
    // silently, because Tailwind emits `.relative` after `.absolute`, so
    // the class order in the attribute counts for nothing and the root
    // stays relative. The inner wrapper owns the containing block; the
    // root owns nothing but what it was handed.
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 60 1000"
          /* Stretched to the height it is given rather than scaled to
             fit, so the stroke always runs the full length of the form
             however long the form happens to be. `non-scaling-stroke` on
             the paths is what makes that safe: the geometry stretches,
             the width of the mark does not, so a tall form does not get
             a fatter pen. */
          preserveAspectRatio="none"
          fill="none"
          className="h-full w-full drop-shadow-[0_0_6px_rgba(201,169,97,0.28)]"
        >
          <defs>
            {/* Rendered once per page, so a fixed id is safe — and two of
                them would reference an identical gradient anyway. */}
            <linearGradient id="marker-wave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-gold-deep)" stopOpacity="0" />
              <stop offset="6%" stopColor="var(--color-gold)" stopOpacity="0.55" />
              <stop offset="22%" stopColor="var(--color-gold-bright)" stopOpacity="0.95" />
              <stop offset="42%" stopColor="var(--color-gold)" stopOpacity="0.75" />
              <stop offset="60%" stopColor="var(--color-gold-bright)" stopOpacity="0.9" />
              <stop offset="80%" stopColor="var(--color-gold)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-gold-deep)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={STROKE}
            stroke="url(#marker-wave)"
            strokeWidth={1.75}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={STROKE_SECOND}
            stroke="url(#marker-wave)"
            strokeWidth={0.9}
            strokeLinecap="round"
            opacity={0.45}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {GLINTS.map((g) => (
          <span
            key={`${g.top}-${g.left}`}
            className="glint text-gold absolute block"
            style={{
              top: `${g.top}%`,
              left: `${g.left}%`,
              width: g.size,
              height: g.size,
              animationDelay: `${g.delay}ms`,
            }}
          >
            {g.star ? (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-full w-full"
              >
                <path d={STAR} />
              </svg>
            ) : (
              <span className="bg-gold block h-full w-full rounded-full" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
