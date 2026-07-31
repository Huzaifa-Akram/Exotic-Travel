import type { StaticImageData } from "next/image";
import heathrowImage from "@/public/image-4.jpg";
import gatwickImage from "@/public/image-1.png";
import lutonImage from "@/public/image-3.jpg";
import stanstedImage from "@/public/image-5.jpg";
import cityImage from "@/public/image-2.jpg";
import farnboroughImage from "@/public/image-6.jpg";
// Filenames are as the client supplied them — note `heathrow.png` is the
// one in lower case. Windows does not care; a Linux build host does.
import farnboroughLogo from "@/public/airport-logo/Farnborough.png";
import gatwickLogo from "@/public/airport-logo/Gatwick.png";
import heathrowLogo from "@/public/airport-logo/heathrow.png";
import londonCityLogo from "@/public/airport-logo/London-City.png";
import lutonLogo from "@/public/airport-logo/Luton.png";
import stanstedLogo from "@/public/airport-logo/Stansted.png";

/**
 * The five dedicated airport pages the brief requires (§8), as data —
 * §17's build order is explicit that these are one template driven from
 * this file, never five hand-written pages. Add an airport here and its
 * page, sitemap entry and links exist; there is nothing else to edit.
 *
 * Facts (distances, journey times) are deliberately approximate and
 * phrased as such — traffic owns the truth, and a page that promises
 * "45 minutes" is a complaint waiting to happen. Only image-4 and the
 * fleet shot actually depict Heathrow; the other pages wear the hotel
 * photography, whose alt text describes what is really in frame.
 */

export type AirportFaq = { q: string; a: string };

export type Airport = {
  slug: string;
  /** Short name — "Heathrow" */
  name: string;
  /** Full name for headings and metadata — "Heathrow Airport" */
  fullName: string;
  /** IATA code — "LHR" */
  code: string;
  /** Approximate distance, pre-formatted — "≈ 16 miles" */
  distance: string;
  /** Compass relation to central London — "west of central London" */
  direction: string;
  /** Typical drive, pre-formatted — "45–60 min" */
  journeyTime: string;
  /** What the terminals stat cell says — "4 terminals" */
  terminalsStat: string;
  terminals: string[];
  /** One sentence under the terminal chips. */
  terminalNote: string;
  /** Masthead lead paragraph. */
  intro: string;
  /** Supporting paragraph in the pick-up section. */
  body: string;
  /** Pre-fills the quote form's pick-up field via /quote?from= */
  quotePrefill: string;
  image: StaticImageData;
  imageAlt: string;
  /**
   * The airport's own mark. Always rendered through `.logo-mono`, which
   * flattens it to white — every one of these is dark artwork on
   * transparency, and Farnborough's is near-black, so untreated they
   * range from hard to read to invisible on the site's ink.
   */
  logo: StaticImageData;
  /**
   * Optical height for the mark. They cannot share one value: the set
   * runs from 3.19:1 to 0.88:1 (London City is the only portrait mark),
   * and internal padding varies wildly — Heathrow's wordmark floats in
   * the middle third of its canvas, Stansted's is cropped tight. These
   * even out apparent size, not box size.
   */
  logoSize: string;
  metaDescription: string;
  faqs: AirportFaq[];
};

export const airportPages: Airport[] = [
  {
    slug: "heathrow",
    name: "Heathrow",
    fullName: "Heathrow Airport",
    code: "LHR",
    distance: "≈ 16 miles",
    direction: "west of central London",
    journeyTime: "45–60 min",
    terminalsStat: "4 terminals",
    terminals: ["Terminal 2", "Terminal 3", "Terminal 4", "Terminal 5"],
    terminalNote:
      "Every Heathrow terminal is covered, in both directions — including transfers between terminals and onward journeys anywhere in the country.",
    intro:
      "Chauffeur-driven transfers to and from every Heathrow terminal — met inside arrivals with a name board, tracked from take-off, and driven into London in an executive Mercedes or similar.",
    body: "Heathrow is the journey we drive most, and it shows in the small things: which arrivals door your terminal actually uses, where the trolleys run out, and how long the walk from gate to kerb really takes. Your quote is fixed before you fly, whatever the M4 decides.",
    quotePrefill: "Heathrow Airport (LHR)",
    image: heathrowImage,
    logo: heathrowLogo,
    logoSize: "h-11 md:h-13",
    imageAlt:
      "A chauffeur waiting with a black Mercedes V-Class at the Heathrow Terminal 2 drop-off",
    metaDescription:
      "Executive chauffeur transfers to and from all Heathrow terminals. Meet & greet inside arrivals, live flight tracking and fixed bespoke quotes — 24/7.",
    faqs: [
      {
        q: "Where will my chauffeur meet me at Heathrow?",
        a: "Inside the arrivals hall of your terminal, holding a name board — not at the kerb, and never by phone-and-hope. Clear pick-up instructions are sent before you land, and your chauffeur helps with luggage from the moment you clear the doors.",
      },
      {
        q: "Which Heathrow terminals do you cover?",
        a: "All of them — Terminals 2, 3, 4 and 5, arrivals and departures, plus transfers between terminals. If your airline moves terminals, we confirm the right one from your flight number.",
      },
      {
        q: "What happens if my flight into Heathrow is delayed?",
        a: "Nothing you need to manage. We track the aircraft itself, so a delay or an early landing simply moves your pick-up time. The price does not change and there is nothing to rebook.",
      },
    ],
  },
  {
    slug: "gatwick",
    name: "Gatwick",
    fullName: "Gatwick Airport",
    code: "LGW",
    distance: "≈ 28 miles",
    direction: "south of central London",
    journeyTime: "70–90 min",
    terminalsStat: "2 terminals",
    terminals: ["North Terminal", "South Terminal"],
    terminalNote:
      "North or South, arrivals or departures — we confirm the terminal from your flight number before you travel, so there is nothing to look up.",
    intro:
      "Executive transfers between Gatwick and London, around the clock — North or South terminal confirmed from your flight number, a chauffeur inside arrivals, and a fixed quote agreed before you fly.",
    body: "Gatwick's distance is exactly why a fixed quote matters: whatever the M23 and the hour decide, the price you agreed is the price you pay. Early departures are met with the same calm as midnight landings — the car is scheduled to your flight, not to office hours.",
    quotePrefill: "Gatwick Airport (LGW)",
    image: gatwickImage,
    logo: gatwickLogo,
    logoSize: "h-10 md:h-12",
    imageAlt:
      "A chauffeur opening the rear door of a black Mercedes S-Class at a luxury hotel entrance",
    metaDescription:
      "Chauffeur-driven Gatwick airport transfers, North and South terminal, 24/7. Meet & greet, live flight tracking and fixed bespoke quotes to and from London.",
    faqs: [
      {
        q: "Do you cover both Gatwick terminals?",
        a: "Yes — North and South, in both directions. You do not need to know which is yours: we confirm the terminal from your flight number and send clear pick-up instructions before you land.",
      },
      {
        q: "Can you manage a very early Gatwick departure?",
        a: "That is most of what we do at Gatwick. The service runs 24 hours, every day — a 3am collection for a 6am departure is scheduled, confirmed the evening before, and waiting when you step out.",
      },
      {
        q: "What if my flight into Gatwick is delayed?",
        a: "We track the flight itself, so the pick-up moves with it — delays and early arrivals alike. Your chauffeur is inside arrivals with a name board whenever meet & greet is included, however the schedule lands.",
      },
    ],
  },
  {
    slug: "luton",
    name: "Luton",
    fullName: "Luton Airport",
    code: "LTN",
    distance: "≈ 33 miles",
    direction: "north of central London",
    journeyTime: "50–70 min",
    terminalsStat: "1 terminal",
    terminals: ["Main Terminal"],
    terminalNote:
      "One terminal, no guesswork — your chauffeur waits inside arrivals with a name board, and departures are dropped kerbside with time in hand.",
    intro:
      "From Luton's single terminal to anywhere in London or the country — an executive car waiting inside arrivals, however early the departure or late the landing.",
    body: "Luton serves more red-eyes than most, and a red-eye is precisely when a tracked flight and a waiting chauffeur earn their keep. The quote is fixed before you fly, the car is scheduled to the aircraft, and the M1 is our problem rather than yours.",
    quotePrefill: "Luton Airport (LTN)",
    image: lutonImage,
    logo: lutonLogo,
    logoSize: "h-9 md:h-11",
    imageAlt:
      "A chauffeur at the door of a black Mercedes S-Class outside Claridge's at dusk",
    metaDescription:
      "Executive Luton airport transfers with meet & greet inside arrivals, live flight tracking and fixed bespoke quotes. London and nationwide, 24 hours a day.",
    faqs: [
      {
        q: "Where will my chauffeur meet me at Luton?",
        a: "Inside the arrivals hall with a name board, with clear pick-up instructions sent before you land. Your chauffeur helps with luggage and walks you to a pre-cooled car.",
      },
      {
        q: "Do you only drive Luton to London?",
        a: "No — the service is nationwide. Long-distance journeys from Luton are quoted the same way as any other: a fixed, bespoke price agreed before you travel.",
      },
      {
        q: "What happens if my flight into Luton is delayed?",
        a: "The pick-up moves with the aircraft — we monitor the flight, not the booking. Early arrivals are met early; delays cost you nothing and change nothing.",
      },
    ],
  },
  {
    slug: "stansted",
    name: "Stansted",
    fullName: "Stansted Airport",
    code: "STN",
    distance: "≈ 40 miles",
    direction: "north-east of central London",
    journeyTime: "60–80 min",
    terminalsStat: "1 terminal",
    terminals: ["Main Terminal"],
    terminalNote:
      "A single terminal, covered in both directions — met inside arrivals, dropped kerbside for departures, 24 hours a day.",
    intro:
      "Stansted's early departures and late arrivals, handled — a chauffeur inside the terminal, a fixed quote before you travel, and an executive car for the M11 however it behaves.",
    body: "Stansted rewards leaving nothing to chance: it is the furthest of London's main airports, and its schedule leans early and late. We plan the departure around your flight, track the return leg from take-off, and hold the same fixed price at 4am as at 4pm.",
    quotePrefill: "Stansted Airport (STN)",
    image: stanstedImage,
    logo: stanstedLogo,
    logoSize: "h-9 md:h-11",
    imageAlt:
      "A black Mercedes S-Class outside The Dorchester, chauffeur holding the rear door open",
    metaDescription:
      "Chauffeur-driven Stansted airport transfers, 24/7. Meet & greet inside arrivals, live flight monitoring and fixed bespoke quotes to and from London.",
    faqs: [
      {
        q: "Can you collect me from Stansted in the middle of the night?",
        a: "Yes — airport transfers run 24 hours, every day of the year. Late arrivals are tracked from take-off and met inside the terminal, whatever the hour.",
      },
      {
        q: "Where does my chauffeur wait at Stansted?",
        a: "Inside the arrivals hall with a name board. You receive clear pick-up instructions before you land, and your chauffeur helps with luggage out to the car.",
      },
      {
        q: "What if my flight into Stansted is delayed?",
        a: "We track the aircraft itself, so the collection moves automatically with a delay or an early landing. The quoted price stays exactly as agreed.",
      },
    ],
  },
  {
    slug: "london-city",
    name: "London City",
    fullName: "London City Airport",
    code: "LCY",
    distance: "≈ 9 miles",
    direction: "east of central London",
    journeyTime: "30–45 min",
    terminalsStat: "1 terminal",
    terminals: ["Main Terminal"],
    terminalNote:
      "A compact terminal built for speed — minutes from gate to kerb, and your chauffeur is there for all of them.",
    intro:
      "Minutes from Canary Wharf and the Square Mile, London City is built for business — and so is the car that meets it: a chauffeur at arrivals, an executive saloon at the kerb, no waiting either side.",
    body: "City is the airport where minutes matter most, and its short walk from gate to kerb is an advantage only if the car is already there. Ours is — scheduled to the flight, tracked in the air, with a chauffeur who knows that a City landing usually has a meeting on the other end.",
    quotePrefill: "London City Airport (LCY)",
    image: cityImage,
    logo: londonCityLogo,
    logoSize: "h-12 md:h-14",
    imageAlt:
      "A top-hatted doorman opening the door of a black Mercedes S-Class outside The Savoy",
    metaDescription:
      "Executive London City airport transfers for business travel. Meet & greet, live flight tracking and fixed bespoke quotes — Canary Wharf, the City and beyond.",
    faqs: [
      {
        q: "How quickly can I be in Canary Wharf or the City?",
        a: "London City is the closest airport to both — the drive is often under half an hour, traffic permitting. Your chauffeur is at arrivals before you are, so none of that time is spent waiting for a car.",
      },
      {
        q: "Do you offer corporate accounts for regular LCY travel?",
        a: "Yes — corporate travel is a core service, with simple monthly invoicing on account. Tell us your usual routes and we will set up pricing for the pattern, not just the journey.",
      },
      {
        q: "What if my flight into London City is delayed?",
        a: "The pick-up follows the aircraft. We monitor the flight from departure, so delays and early arrivals move the collection automatically and the price never changes.",
      },
    ],
  },

  /**
   * Added at the client's request — it is not in the brief's §8, and it
   * is the only one here that is not a scheduled commercial airport, so
   * the copy is written for a different traveller: no concourse, no
   * arrivals hall, and a departure timed to an aircraft that leaves when
   * its passengers do. Distances and times stay approximate, as above.
   */
  {
    slug: "farnborough",
    name: "Farnborough",
    fullName: "Farnborough Airport",
    code: "FAB",
    distance: "≈ 35 miles",
    direction: "south-west of central London",
    journeyTime: "60–80 min",
    terminalsStat: "1 terminal",
    terminals: ["Private Terminal"],
    terminalNote:
      "Farnborough handles private and business aviation through a single dedicated terminal — so there is no concourse to be found in and no arrivals hall to wait in. Your chauffeur is at the door.",
    intro:
      "Chauffeur transfers to and from Britain's dedicated business aviation airport — a car timed to your aircraft rather than to a published schedule, and a chauffeur who understands that private travel is chosen for its discretion.",
    body: "Private aviation moves when its passengers do, which makes a fixed schedule the wrong tool for the job. Give us the tail or flight number and we watch it exactly as we would a commercial arrival, so the car is at the terminal when you walk out — whether that is the hour you planned or two hours later.",
    quotePrefill: "Farnborough Airport (FAB)",
    image: farnboroughImage,
    logo: farnboroughLogo,
    logoSize: "h-8 md:h-10",
    imageAlt:
      "The Exotic Travel fleet — a Range Rover, Mercedes S-Class and Mercedes V-Class lined up on wet airport tarmac",
    metaDescription:
      "Chauffeur-driven Farnborough Airport transfers for private and business aviation. A car timed to your aircraft, discreet professional chauffeurs and fixed bespoke quotes.",
    faqs: [
      {
        q: "Do you meet private jet arrivals at Farnborough?",
        a: "Yes, and it is a large part of what we do there. Give us the tail or flight number when you book and we track the aircraft in, so the car is waiting at the terminal when you step out rather than being called for once you have landed.",
      },
      {
        q: "How long is the drive from Farnborough into London?",
        a: "Usually between an hour and an hour and twenty, traffic on the M3 allowing — and the quotation is fixed before you travel either way, so a slow stretch of motorway is our problem rather than yours.",
      },
      {
        q: "Can you arrange the aircraft as well as the car?",
        a: "Our concierge arranges private jet and helicopter charter, quoted per trip, with the car meeting you at both ends so the transfer is never the loose end. Ask when you enquire and we will put the whole journey together.",
      },
    ],
  },
];

export const getAirport = (slug: string) =>
  airportPages.find((a) => a.slug === slug);
