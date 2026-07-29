/**
 * Single source of truth for site-wide details: business info, contact
 * points, navigation and footer link groups. Header, footer and every
 * page read from here so nothing drifts out of sync.
 *
 * TODO(client): the email below is still a placeholder — the domain is
 * confirmed, the mailbox is not. Replace it once the client tells us which
 * address they actually read. It lives only in this object.
 *
 * There is deliberately no `address` field. The client has confirmed the
 * registered address is not to be published, so it is absent from the
 * data rather than merely unrendered: nothing can put it on the page by
 * reading this object, and anyone adding LocalBusiness structured data
 * later will find there is no address to hand it. See §16 of
 * CLIENT_BRIEF.md for the SEO trade-off that accepts.
 */

export const site = {
  name: "Exotic Travel",
  tagline: "Premium Chauffeur & Airport Transfers",
  serviceArea: "London & Nationwide",

  /**
   * The live domain, bought by the client (confirmed 27 Jul 2026). Canonical
   * URLs, `metadataBase`, the sitemap and OG tags all need an absolute origin,
   * so it belongs here rather than being retyped per page. Includes the `www.`
   * host the client registered — pick one host and stay on it, or the same
   * page ends up indexed twice.
   */
  url: "https://www.exoticexecutive.com",

  // --- Contact ---
  // One number, used for both calls and WhatsApp (client, 26 Jul 2026).
  phone: {
    display: "+44 7470 200517",
    href: "tel:+447470200517",
  },
  whatsapp: {
    display: "WhatsApp Us",
    // wa.me expects the number in full international form, no + or spaces
    href: "https://wa.me/447470200517",
  },
  // Domain confirmed; mailbox not. Safe to show — it is on the client's own
  // domain — but confirm the address exists and is monitored before launch,
  // and before the Resend pipeline starts replying from it.
  email: "reservations@exoticexecutive.com",

  // Trust wording (add licence number once supplied by client)
  licence: "Licensed & Insured Private Hire Operator",

  // Payment stance from the brief — no forced online payment
  paymentNote:
    "No upfront online payment required. Pay by cash, bank transfer, or card at destination.",
} as const;

/** Airports with dedicated pages, driven by content/airports.ts. */
export const airports = [
  { label: "Heathrow", href: "/airport-transfers/heathrow" },
  { label: "Gatwick", href: "/airport-transfers/gatwick" },
  { label: "Luton", href: "/airport-transfers/luton" },
  { label: "Stansted", href: "/airport-transfers/stansted" },
  { label: "London City", href: "/airport-transfers/london-city" },
] as const;

export type NavLinkItem = { label: string; href: string };

/**
 * A nav item's dropdown. `overview` is the featured link at the top of
 * the panel, pointing at the parent's own `href` — which is what makes
 * the parent page reachable on a touch device, where tapping the parent
 * opens the menu rather than navigating.
 */
export type NavMenu = {
  overview: { label: string; note: string };
  links: readonly NavLinkItem[];
};

export type NavItem = NavLinkItem & { menu?: NavMenu };

/**
 * Primary navigation — the seven items the client specified (§3), two of
 * them now carrying a dropdown.
 *
 * The dropdowns exist because nine pages had no route into them from the
 * header at all: the five airports and the four occasion pages were
 * reachable only from their hub page or the footer.
 *
 * "Executive Chauffeur" rather than "Chauffeur Services": the label used
 * to imply a category containing weddings and events, when it is in fact
 * one specific service — hire by the journey, the hour or the day. The
 * footer and the page's own title already called it this; the header was
 * the odd one out. The occasion pages now sit under it in the dropdown,
 * where the relationship is visible rather than guessed at.
 */
export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Executive Chauffeur",
    href: "/chauffeur-services",
    menu: {
      overview: {
        label: "Executive Chauffeur",
        note: "By the journey, the hour or the day",
      },
      links: [
        { label: "Weddings", href: "/services/weddings" },
        { label: "Events & Concerts", href: "/services/events" },
        { label: "Proms", href: "/services/proms" },
        { label: "Long Distance", href: "/services/long-distance" },
      ],
    },
  },
  {
    label: "Airport Transfers",
    href: "/airport-transfers",
    menu: {
      overview: {
        label: "All London Airports",
        note: "Met inside arrivals, flights tracked",
      },
      links: airports,
    },
  },
  { label: "Corporate Travel", href: "/corporate-travel" },
  { label: "Concierge", href: "/concierge" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Service pages (built later as a [service] template). */
export const services = [
  { label: "Airport Transfers", href: "/airport-transfers" },
  { label: "Executive Chauffeur", href: "/chauffeur-services" },
  { label: "Corporate Travel", href: "/corporate-travel" },
  { label: "Wedding Transport", href: "/services/weddings" },
  { label: "Event Transport", href: "/services/events" },
  { label: "Prom Transport", href: "/services/proms" },
  { label: "Long Distance Travel", href: "/services/long-distance" },
  { label: "Concierge", href: "/concierge" },
] as const;

/** Company / info links. */
export const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/quote" },
  { label: "FAQ", href: "/faq" },
] as const;
