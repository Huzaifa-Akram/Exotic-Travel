/**
 * The homepage's line icons, hand-drawn as inline SVG so they ship no
 * request and inherit `currentColor` (always gold at the call sites —
 * §14: gold icons, no second accent). One weight — 1.3, matching the
 * arrow glyphs in the header and hero — and one 24-unit grid, so mixing
 * them in a row never looks borrowed from two sets.
 */

function Svg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className ?? "h-6 w-6"}
    >
      {children}
    </svg>
  );
}

type IconProps = { className?: string };

/** 24/7 availability. */
export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Svg>
  );
}

/** Licensed & insured. */
export function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </Svg>
  );
}

/** Meet & greet — the name board held inside arrivals. */
export function NameBoardIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="5" width="16" height="10" rx="1" />
      <path d="M7.5 9h9M7.5 11.5h5" />
      <path d="M12 15v3M9 21c.5-1.8 1.6-3 3-3s2.5 1.2 3 3" />
    </Svg>
  );
}

/** Live flight monitoring. */
export function PlaneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 19h18" />
      <path d="M4 14.5l4.5 1.2 10-5.4c1-.55 1.6-1.3 1.3-2.2-.3-.9-1.4-1-2.4-.7l-4.2 1.3-7.7-2.6-1.8 1 5.6 3.4-4 1.6-2.6-1-1 .9 2.3 2.5z" />
    </Svg>
  );
}

/** Luggage, handled. */
export function LuggageIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="6" y="8" width="12" height="12" rx="1.5" />
      <path d="M9.5 8V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V8" />
      <path d="M9.5 12v4M14.5 12v4" />
    </Svg>
  );
}

/** A journey, door to door. */
export function RouteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" strokeDasharray="0" />
    </Svg>
  );
}
