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

/** Professional chauffeurs — the wheel in trained hands. */
export function SteeringWheelIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 12h6M15 12h6M12 15v6" />
    </Svg>
  );
}

/** Complimentary bottled water. */
export function WaterIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 3h4" />
      <path d="M10.3 3v2.4c0 1.1-2.3 2.1-2.3 4V19a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9.4c0-1.9-2.3-2.9-2.3-4V3" />
      <path d="M8 13.5h8" />
    </Svg>
  );
}

/** The executive fleet. */
export function CarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 16.5v-1.2c0-.9.6-1.6 1.4-1.8l2.1-.5 1.7-3a2 2 0 0 1 1.7-1h4.6a2 2 0 0 1 1.6.8l2.2 3.2 2.3.5c.8.2 1.4 1 1.4 1.8v1.2" />
      <circle cx="7.5" cy="16.5" r="1.8" />
      <circle cx="16.5" cy="16.5" r="1.8" />
      <path d="M9.3 16.5h5.4" />
    </Svg>
  );
}

/** 24/7 customer support — a person on the line. */
export function HeadsetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3.5" y="13" width="3.5" height="5" rx="1.2" />
      <rect x="17" y="13" width="3.5" height="5" rx="1.2" />
      <path d="M20.5 18v.8a2.7 2.7 0 0 1-2.7 2.7H14" />
    </Svg>
  );
}

/** Luxury, without the luxury price. */
export function GemIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 4h10l4 5-9 11L3 9l4-5z" />
      <path d="M3 9h18" />
      <path d="M9.5 4L8 9l4 11" />
      <path d="M14.5 4L16 9l-4 11" />
    </Svg>
  );
}

/** Fixed prices — the label written before the journey. */
export function TagIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1" />
    </Svg>
  );
}

/** Call Now. */
export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
  );
}

/**
 * The WhatsApp mark — the one glyph on the site that is not ours, so it
 * is the official filled logo rather than a redrawn line icon: a brand
 * mark people scan for, and the client asked for it by name.
 */
export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className ?? "h-4 w-4"}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Gold tick for the hero's trust ribbon. */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 12 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className ?? "h-2.5 w-3"}
    >
      <path d="M1 5.5L4.5 9L11 1" />
    </svg>
  );
}
