# Exotic Travel — Client Brief & Requirements

> Source: Client messages. This document is a structured extraction of everything the client
> has communicated. **Status: reference only — no build has started yet.**

---

## 1. Business Overview

**Business name:** Exotic Travel

**What we are:** A premium, high-end chauffeur service — NOT a standard taxi/minicab company.

**Positioning / brand feel:** Luxury travel / concierge brand. Benchmark quality against
**Uber Black, Blacklane, Bolt Business, luxury hotel transfers, and private chauffeur companies.**
The site must NOT look like a cheap minicab site. Wording should be elegant, simple, and premium,
making customers feel they are booking a safe, reliable, high-end service.

**Services provided:**
- Airport Transfers
- Chauffeur Services
- Taxi Services
- Corporate Travel
- Events
- Weddings
- Proms
- VIP Travel
- Long Distance Travel

**Full list of chauffeur requirements catered for** (make clear we are NOT airport-only):
- Airport Transfers
- Corporate Travel
- Business Meetings
- Weddings
- Proms
- Festivals
- Concerts
- Boxing and Sporting Events
- VIP Events
- Hotel Transfers
- Cruise Port Transfers
- Hourly Chauffeur Hire
- Private Hire for any occasion

---

## 2. Design & UX Requirements

- Premium, luxury feel reflecting a high-end chauffeur service.
- Modern, easy to use, **mobile-friendly**.
- Make the enquiry process **as simple as possible**.
- Elegant and exclusive design, high-quality imagery, smooth booking experience.
- Strong branding, clear call-to-action buttons, instant enquiry options.
- Objective: make customers feel they are booking a **premium chauffeur service rather than a standard taxi**.

**Main homepage buttons / CTAs:**
- Book Now
- Get a Quote
- Call Us
- WhatsApp Us

---

## 3. Navigation / Menu Structure (as specified by client)

- Home
- Chauffeur Services
- Airport Transfers
- Corporate Travel
- Concierge
- About
- Contact

---

## 4. Booking / Enquiry Form

### 4a. Core airport-focused booking form fields (first message)
- Select **Airport Pick-up** or **Airport Drop-off**
- Choose the airport
- Flight details: airline, flight number, date and time
- Pick-up address and destination address
- Vehicle **category** (not a specific vehicle)
- Number of passengers
- Number of suitcases
- Special requests

### 4b. Full booking/enquiry form fields (second message)
- Pickup location
- Drop-off location
- Date and time
- **Return journey option**
- Flight number
- Airport terminal
- Number of passengers
- Number of suitcases
- Vehicle type preference
- Child seat request
- Meet & greet request
- Special requests
- (Option for customer to **upload extra journey details**)

### Booking model
- **No instant / automated pricing.** Customer submits an **enquiry**, we provide a **bespoke quotation**.
- After enquiry submitted: **both customer and admin receive a confirmation**.
- Admin can **view and manage all enquiries from an admin dashboard**.
- Admin can **send a custom quote after enquiry**.

---

## 5. Vehicle Categories

Customers choose a **vehicle category**, NOT a specific vehicle. Must be made clear that
example vehicles are **examples only** and that we will always provide a vehicle that
**meets or exceeds** the chosen category, depending on availability. Use **"or similar"** wording
so we are never locked into one exact model.

### Executive Saloon
- Up to 4 passengers
- Up to 3 suitcases
- Example vehicles: Mercedes S-Class, BMW 7 Series, Audi A8 — or an equivalent executive saloon.

### Executive MPV
- Up to 7 passengers
- Up to 6 suitcases
- Example vehicles: Mercedes V-Class, Ford Tourneo Custom, Volkswagen Multivan — or an equivalent premium MPV.

### Vehicle tiers referenced elsewhere (use "or similar" wording)
- **Premium saloon vehicles** such as Mercedes E-Class, BMW 5 Series or similar.
- **Executive vehicles** such as Mercedes S-Class, BMW 7 Series or similar.
- **Large vehicles** such as Mercedes V-Class, Ford Tourneo or similar.

---

## 6. Airport Transfer Service — Highlight Strongly

For airport bookings, strongly highlight:
- Meet & greet service
- Live flight tracking / live flight monitoring
- Driver waiting **inside arrivals with a name board**
- Help with luggage
- Flight delay monitoring (automatically track delays and early arrivals)
- Airport pickup instructions
- Professional, reliable airport transfers
- 24/7 airport transfer availability

---

## 7. Premium Service Selling Points

- Meet & Greet at airports
- Live flight monitoring (automatically track delays and early arrivals)
- Professional, courteous chauffeurs
- Luxury executive vehicles
- Reliable, punctual service
- **We aim to beat comparable Uber and Bolt prices** while providing a significantly higher
  level of service and comfort.
- Bespoke quotes
- WhatsApp booking support
- Booking confirmation by email / SMS / WhatsApp

---

## 8. Dedicated Pages Required

- Heathrow Airport Transfers
- Gatwick Airport Transfers
- Luton Airport Transfers
- Stansted Airport Transfers
- London City Airport Transfers
- Executive Chauffeur Service
- Corporate Accounts
- Wedding Transport
- Event Transport
- Prom Transport
- Long Distance Travel

---

## 9. Concierge Page (Major Selling Point)

The Concierge page should be developed as a major selling point, with services including:
- Restaurant reservations
- VIP nightclub bookings
- Personal shopping
- Luxury hotel reservations
- Private jet and helicopter charter
- Close protection / security
- Event and concert tickets
- Flowers and gift delivery

---

## 10. Trust-Building Features

- Google reviews section
- Testimonials
- Professional photos
- Licensed and insured wording
- Safe and reliable drivers
- Clear pricing / quote process
- FAQ section
- Payment options
- Business / corporate account enquiry
- Contact page with phone, WhatsApp, email and service area

---

## 11. Payment

Payment options should be clear but simple. Customers can pay by:
- Cash
- Bank transfer
- Card payment at destination

- **Do NOT force online payment at the booking stage.** Allow customer to submit the
  booking/enquiry first, then we confirm the quote and payment method.
- Suggested wording: **"No upfront online payment required. Pay by cash, bank transfer, or card at destination."**

---

## 12. Admin / Notifications

- **Instant notification when an enquiry comes in** (important to the client).
- Both customer and admin receive confirmation on enquiry submission.
- Admin dashboard to view and manage all enquiries.
- Admin can send a custom/bespoke quote after enquiry.
- Confirmation channels: email / SMS / WhatsApp.

---

## 13. Summary of "Stand Out" Premium Experience Checklist

- Live flight monitoring
- Meet & greet
- Bespoke quotes
- Premium vehicles
- Polite professional drivers
- WhatsApp booking support
- 24/7 airport transfer availability
- Booking confirmation by email / SMS / WhatsApp
- Option for customer to upload extra journey details
- Option for admin to send custom quote after enquiry

---

## 14. Visual Identity / Art Direction (client-specified)

- **Black background**
- **Gold buttons and icons**
- **White text**
- **Minimalist design with plenty of spacing**
- **Subtle black marble or textured background** on some sections
- **Smooth animations rather than lots of colours**

Palette in practice: near-black base, gold as the single accent (buttons, icons, dividers,
hover states), white/off-white body text. No secondary accent colours. Motion should be
restrained and smooth — fades, slow reveals, gentle parallax — not bouncy or colourful.

---

## 15. Brand Assets (already in `public/`)

- `logo.svg` — the brand emblem: gold **ET monogram inside a Greek-key roundel**, on
  transparent background. Huzaifa deliberately cropped the original client artwork down to
  just this roundel (via the SVG viewBox/transform) — the original also had an "EXOTIC TRAVEL"
  wordmark and a services strip, which were intentionally removed as clutter. **The roundel is
  the final, intended logo** — do not reinstate the wordmark/services. Renders correctly as-is;
  use `/logo.svg` directly (no CSS cropping). Minor future optimisation only: the file is a
  ~424KB PNG embedded in an SVG wrapper, so a lighter exported asset could be produced later.

**Photography** — 6 client-supplied images, mostly AI-generated, all consistent with the
black + gold art direction (black Mercedes fleet, suited chauffeur, luxury London locations):

| File | Content | Suggested use |
|---|---|---|
| `image-1.jpg` | Black Mercedes S 580 saloon, chauffeur opening rear door, luxury hotel entrance (Bulgari) | Hero, or Executive Saloon category |
| `image-2.jpg` | Black S 580 outside **The Savoy**, top-hatted doorman opening door | Hotel Transfers / homepage feature |
| `image-3.jpg` | Black S 580 outside **Claridge's**, chauffeur at door, dusk | Chauffeur Services / VIP |
| `image-4.jpg` | Black Mercedes V-Class at **Heathrow Terminal 2** drop-off, chauffeur at sliding door | Airport Transfers / Executive MPV |
| `image-5.jpg` | Black S-Class outside **The Dorchester**, chauffeur holding door open | Corporate Travel / Concierge |
| `image-6.jpg` | Fleet line-up (Range Rover, S-Class, V-Class) at **Heathrow Terminal 3**, wet tarmac | Fleet / vehicle category section |

**Note:** these are AI-generated. A couple contain minor text artifacts in the rendered
badge/plate (e.g. "TRAVEÉ" misspelling in `image-2` / `image-3`). Prefer crops that avoid
the plate area, or ask the client for clean replacements before launch.

---

## 16. Confirmed Decisions

- **Domain:** already purchased by client.
- **Logo:** supplied — `public/logo.svg`.
- **Tech stack:** **Next.js** (preferred).
- **Imagery:** supplied — 6 images in `public/` (see above).
- **Brand colours:** black / gold / white (see section 14).
- **24/7 airport transfers:** confirmed — safe to advertise.
- **Phone / WhatsApp:** `+44 7470 200517` — one number for both (client, 26 Jul 2026).
  Lives in `lib/site.ts`; header, footer and quote page all read it from there.
- **Address:** **not to be published.** The client has an address
  (8 Junction Mews, Paddington, W2 1PN) but has asked for it not to appear on the site,
  so `lib/site.ts` carries no `address` field at all.
  - Trade-off, flagged: without a published address the site cannot carry a
    LocalBusiness address in its structured data, which is the strongest signal
    Google uses for local map results. A Google Business Profile can still hold the
    address privately (service-area business, address hidden) and get most of that
    back — worth raising with the client before launch rather than after.

---

## 17. Build Decisions (internal — agreed with Huzaifa)

- **Stack:** Next.js 16.2.10, React 19.2.4, Tailwind v4. Server Actions for the enquiry form
  (progressive enhancement — form still submits if JS fails; a lost enquiry is lost revenue).
- **No 3D models.** Client asked for minimalism + "smooth animations rather than lots of colours";
  3D would hurt mobile performance and none of the benchmark brands (Blacklane, Uber Black) use it.
  Do not add unless the client explicitly requests it.
- **Typography:** light serif display (e.g. Cormorant Garamond) + clean sans body (e.g. Inter).
  Heritage-luxury pairing that complements the gold monogram logo.
- **Notifications:** email to admin via Resend. WhatsApp deferred (Business API needs Meta
  verification + approved templates — weeks of lead time). Telegram is the cheap instant backup
  if the client wants push-to-phone later.
- **Scope split — IMPORTANT:**
  - **Phase 1 (launch):** marketing site + enquiry form that emails owner & customer. **No database.**
  - **Phase 2 (separate milestone):** admin dashboard, stored enquiries, quote management,
    file uploads. These are the *only* features requiring a backend/DB.
  - Risk accepted at launch: email-only means a bounced/spam-filtered notification loses the
    enquiry with no record. Mitigate by sending to two addresses. Flag to client explicitly.

### Build order
0. Lock stack decisions
1. Design tokens + `/styleguide` route  ← the "Figma replacement"
2. Layout shell (header, nav, mobile menu, footer)
3. Homepage → **client sign-off before building remaining pages**
4. Enquiry form + email pipeline
5. Content pages from 2 templates: `app/airport-transfers/[airport]` and `app/services/[service]`,
   driven by `content/airports.ts` + `content/services.ts` (never 11 hand-written pages)
6. Concierge, FAQ, trust sections
7. SEO, performance, launch
8. *(Phase 2)* Admin dashboard + persistence

### Design system rules (how consistency is enforced without a designer)
- ~6 colour tokens only: ink, surface, gold, gold-hover, text, text-muted, hairline. No second accent.
- ~7 type steps. If a size isn't in the scale, it can't be used.
- One section-rhythm spacing token → delivers the "plenty of spacing" requirement uniformly.
- One easing curve, two durations. All motion feels like one hand made it.
- Tear out the scaffold's light-mode `:root` + `prefers-color-scheme` block in `app/globals.css` —
  this site is always black.

---

## 18. Still Missing / To Confirm With Client

- Email address for enquiries — the last placeholder in `lib/site.ts`.
  (Phone and WhatsApp received; address settled as not-to-be-published — both §16.)
- Service area / regions covered.
- Licensing details for "licensed and insured" wording (private hire licence number / authority).
- Google reviews source (Google Business Profile link / place ID) for the reviews section.
- Real testimonials content (or placeholder for now).
- Social media links (if any).
- Preferred font (or we choose something that complements the logo).
