import { site } from "@/lib/site";

/**
 * Every question the site answers, in one place. The homepage shows the
 * six marked `featured`; /faq shows all of them, grouped. Keeping both
 * in one file is the point — an answer edited for the homepage used to
 * mean the same answer going stale on the FAQ page.
 *
 * Answers state only what the brief establishes. Where a detail is still
 * outstanding — the private hire licence number (§18) — the answer says
 * it is available on request rather than inventing one.
 *
 * The per-page questions are deliberately NOT here: content/airports.ts
 * and content/services.ts carry their own, because those answers are
 * specific to one airport or occasion and belong beside that content.
 */

export type FaqEntry = {
  q: string;
  a: string;
  /** Shown in the homepage's shortlist. Keep to six. */
  featured?: true;
};

export type FaqGroup = {
  id: string;
  title: string;
  entries: FaqEntry[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "quotes",
    title: "Quotes & booking",
    entries: [
      {
        q: "How is the price worked out?",
        a: "Every journey is quoted individually — by a person, not a meter. Send the enquiry and we reply with a fixed, bespoke price, usually within the hour and always within 24. We aim to beat comparable Uber and Bolt prices while providing a far higher standard of car and chauffeur.",
        featured: true,
      },
      {
        q: "Why is there no instant price on the website?",
        a: "Because an instant price is a guess, and a guess either overcharges you or gets revised later. A quotation prepared by hand accounts for the route, the hour, the luggage and the waiting time — then holds, whatever the traffic does.",
      },
      {
        q: "How quickly will I hear back?",
        a: "Usually within the hour, and always within 24. If you are travelling sooner than that, call or send a WhatsApp message instead and we will deal with it straight away — a person answers at any hour.",
      },
      {
        q: "How far in advance should I book?",
        a: "A day or two is comfortable, and standing arrangements are welcome. We also take same-day bookings whenever a car and chauffeur are free, so it is always worth asking.",
      },
      {
        q: "Can I book a return, or keep the car for a few hours?",
        a: "Yes — the enquiry form has a return journey option, and hourly hire keeps the car and chauffeur with you between engagements. Child seats and meet & greet can be added to any booking.",
        featured: true,
      },
      {
        q: "Can I change or cancel a booking?",
        a: "Yes. Tell us as early as you can and we will move it — changes of time, address or vehicle are normal and usually straightforward. Anything that affects the price is re-quoted and confirmed with you before it stands.",
      },
    ],
  },
  {
    id: "airports",
    title: "Airport transfers",
    entries: [
      {
        q: "What happens if my flight is delayed?",
        a: "Nothing you need to manage. We monitor the flight itself, so delays and early arrivals simply move your pick-up time. Your chauffeur waits inside arrivals with a name board whenever meet & greet is included.",
        featured: true,
      },
      {
        q: "Where exactly will my chauffeur meet me?",
        a: "Inside the arrivals hall of your terminal, holding a name board — not at the kerb and not by phone. Clear pick-up instructions are sent before you land, and your chauffeur helps with luggage from the doors to the car.",
      },
      {
        q: "Which airports do you cover?",
        a: "Heathrow, Gatwick, Luton, Stansted and London City, in both directions, 24 hours a day. Regional airports, private terminals and cruise ports are quoted the same way — by hand, before you travel.",
      },
      {
        q: "Do you charge for waiting time or parking at the airport?",
        a: "Reasonable waiting time is built into an airport quotation rather than added afterwards, and the same applies to airport parking charges. If a flight is delayed by hours rather than minutes we will talk to you about it — you will not simply find it on an invoice.",
      },
      {
        q: "Can you collect me in the middle of the night?",
        a: "Yes — airport transfers run 24 hours, every day of the year. First flights out and last flights in are a normal part of the work, not an exception we charge extra to make.",
      },
    ],
  },
  {
    id: "vehicles",
    title: "Vehicles & passengers",
    entries: [
      {
        q: "Which car will actually arrive?",
        a: "You book a vehicle category rather than a specific model — an Executive Saloon such as a Mercedes S-Class or similar, or an Executive MPV such as a Mercedes V-Class or similar. We always provide a car that meets or exceeds the chosen category, subject to availability.",
        featured: true,
      },
      {
        q: "How many passengers and suitcases can you take?",
        a: "An Executive Saloon carries up to 4 passengers with up to 3 suitcases; an Executive MPV carries up to 7 with up to 6. If the party or the luggage is larger, we run more than one car to the same schedule.",
      },
      {
        q: "Can you provide child seats?",
        a: "Yes — infant carriers, child seats and booster seats can all be requested on the enquiry form at no surprise cost. Tell us the ages and we will fit the right ones.",
      },
      {
        q: "Is there anything in the car as standard?",
        a: "Complimentary bottled water on every journey, climate set before you step in, and a car valeted for your booking rather than for the one before it.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment",
    entries: [
      {
        q: "When and how do I pay?",
        a: `${site.paymentNote} Nothing is charged when you submit an enquiry — you confirm the quote first.`,
        featured: true,
      },
      {
        q: "Do I have to pay a deposit?",
        a: "Not as a rule. Most journeys are settled at the end, by the means that suits you. Where a booking is unusually large — a full day, a wedding with several cars — we will discuss it with you openly when we quote.",
      },
      {
        q: "Will the price change after I have agreed it?",
        a: "No. A quoted price is fixed for the journey quoted. It only changes if the journey itself changes — an extra stop, a later return, a bigger vehicle — and then only after we have confirmed the new figure with you.",
      },
    ],
  },
  {
    id: "chauffeurs",
    title: "Chauffeurs & safety",
    entries: [
      {
        q: "Are you licensed and insured?",
        a: `Yes — ${site.licence.toLowerCase()}, with professional, vetted chauffeurs. Licensing and insurance details are available on request, and corporate clients are welcome to ask for them for their travel policy.`,
      },
      {
        q: "Who will be driving?",
        a: "A professional chauffeur, assigned to your booking in advance rather than whoever happens to be nearest — suited, briefed on the journey, and expected to arrive early as a matter of course.",
      },
      {
        q: "Can I request the same chauffeur again?",
        a: "Yes, and many regular clients do. Tell us who you travelled with and we will assign them where their schedule allows.",
      },
      {
        q: "Is my travel kept private?",
        a: "Entirely. Calls are taken and papers are read as though the front seat were empty, and nothing about your travel — destinations, companions or conversations — is discussed outside the people arranging it.",
      },
    ],
  },
  {
    id: "areas",
    title: "Where we go",
    entries: [
      {
        q: "Where do you operate?",
        a: `${site.serviceArea}. Airport transfers cover Heathrow, Gatwick, Luton, Stansted and London City around the clock, and long-distance journeys are quoted the same way as any other.`,
        featured: true,
      },
      {
        q: "Do you drive outside London?",
        a: "Regularly. Cross-country journeys, regional airports, cruise ports and multi-stop days are all normal work, with one car and one chauffeur door to door and a fixed price agreed before you set off.",
      },
      {
        q: "Do you take corporate accounts?",
        a: "Yes. Agreed rates for your regular routes, named people who can book, and one monthly invoice instead of forty receipts — with no minimum spend and no contract.",
      },
      {
        q: "What is the concierge, exactly?",
        a: "A private concierge for guests travelling with us: restaurant and hotel reservations, VIP tables, event tickets, private jet and helicopter charter, close protection, personal shopping and gifts. Asking costs nothing, and nothing is booked until you have approved the detail and the price.",
      },
    ],
  },
];

/** The homepage's shortlist, in the order the groups declare them. */
export const featuredFaqs = faqGroups
  .flatMap((g) => g.entries)
  .filter((e) => e.featured)
  .map(({ q, a }) => ({ q, a }));

/** Flat list for FAQPage structured data. */
export const allFaqs = faqGroups
  .flatMap((g) => g.entries)
  .map(({ q, a }) => ({ q, a }));
