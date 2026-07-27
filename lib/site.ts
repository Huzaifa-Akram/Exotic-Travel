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

/** Primary navigation — exactly the structure the client specified. */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Chauffeur Services", href: "/chauffeur-services" },
  { label: "Airport Transfers", href: "/airport-transfers" },
  { label: "Corporate Travel", href: "/corporate-travel" },
  { label: "Concierge", href: "/concierge" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Airports with dedicated pages (built later as a [airport] template). */
export const airports = [
  { label: "Heathrow", href: "/airport-transfers/heathrow" },
  { label: "Gatwick", href: "/airport-transfers/gatwick" },
  { label: "Luton", href: "/airport-transfers/luton" },
  { label: "Stansted", href: "/airport-transfers/stansted" },
  { label: "London City", href: "/airport-transfers/london-city" },
] as const;

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
