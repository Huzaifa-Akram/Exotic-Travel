import type { ReactElement } from "react";
import type { StaticImageData } from "next/image";
import { site } from "@/lib/site";
import savoy from "@/public/image-2.jpg";
import claridges from "@/public/image-3.jpg";
import bulgari from "@/public/image-1.png";
import fleet from "@/public/image-6.jpg";
import {
  CarIcon,
  ClockIcon,
  HeartIcon,
  LuggageIcon,
  NameBoardIcon,
  RouteIcon,
  ShieldIcon,
  StarIcon,
  SteeringWheelIcon,
  TagIcon,
  WaterIcon,
} from "@/components/home/icons";

/**
 * The occasion pages, as data — the second of §17's two content
 * templates, and the same rule applies: add a service here and its page
 * exists, with nothing else to edit. Airport transfers, executive
 * chauffeur and corporate travel each have their own top-level route
 * (they are nav items, per §3), so this file covers the four occasion
 * pages §8 lists beneath them.
 *
 * Copy discipline: every claim here is something §1–§13 of the brief
 * says we do. Where a detail is plausible but unconfirmed — dressing a
 * wedding car, say — it is phrased as arranged on request rather than
 * included, so the page never promises what the office has not agreed.
 *
 * The photography is the same six hotel and airport frames the rest of
 * the site uses; none of them depicts a wedding, a concert or a prom, so
 * the alt text describes what is actually in the picture (§15's plate
 * artifacts also keep the crops high).
 */

type Feature = {
  icon: (props: { className?: string }) => ReactElement;
  title: string;
  text: string;
};

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Short label for cross-links — "Weddings" */
  name: string;
  /** Nav / metadata title — "Wedding Transport" */
  fullName: string;
  eyebrow: string;
  /** The h1, split so the template can set the second half in gold. */
  titleLead: string;
  titleAccent: string;
  /** Masthead lead paragraph. */
  intro: string;
  /** The four things this service actually gives you. */
  features: Feature[];
  /** Heading and body for the mid-page detail section. */
  detailTitle: string;
  detailBody: string;
  /** Checklist under the detail copy. */
  included: string[];
  faqs: ServiceFaq[];
  image: StaticImageData;
  imageAlt: string;
  metaDescription: string;
};

export const servicePages: Service[] = [
  {
    slug: "weddings",
    name: "Weddings",
    fullName: "Wedding Transport",
    eyebrow: "Weddings",
    titleLead: "The one day that",
    titleAccent: "runs to time",
    intro:
      "Immaculate cars, unhurried chauffeurs, and a timetable nobody in the wedding party has to watch. We plan the route the week before, arrive early on the morning, and wait as long as the photographs take.",
    features: [
      {
        icon: HeartIcon,
        title: "Planned, not booked",
        text: "We agree every movement in advance — who is collected, from where, and in what order — then drive it as agreed while you think about other things.",
      },
      {
        icon: ClockIcon,
        title: "Time held in hand",
        text: "Your chauffeur arrives early and leaves when you do. Photographs overrun, ceremonies start late; neither costs you the car.",
      },
      {
        icon: CarIcon,
        title: "Presented properly",
        text: "The car is detailed the morning of the wedding, inside and out. Ribbons and decoration can be arranged on request.",
      },
      {
        icon: SteeringWheelIcon,
        title: "Chauffeurs who understand",
        text: "Suited, calm and quietly helpful with dresses, doors and the walk across gravel — and entirely out of the photographs.",
      },
    ],
    detailTitle: "More than one car, more than one journey",
    detailBody:
      "Most weddings need several movements rather than a single trip: the bridal party to the ceremony, guests between venues, and the couple away at the end of the night. Tell us the day and we will quote it as one arrangement — a fixed price agreed before the invitations, not a meter running while you pose.",
    included: [
      "Vehicles detailed on the morning",
      "Complimentary bottled water in every car",
      "Multiple pick-ups and venue-to-venue movements",
      "Guest transport in Executive MPVs",
      "Waiting time built into the schedule",
      "One fixed price, agreed in advance",
    ],
    faqs: [
      {
        q: "How far in advance should we book wedding cars?",
        a: "As early as you comfortably can — Saturdays in summer go first. That said, we quote and confirm short-notice weddings whenever a car is free, so it is always worth asking.",
      },
      {
        q: "Can you take guests as well as the wedding party?",
        a: "Yes. Executive MPVs carry up to seven, and several cars can run to the same schedule — church to reception, hotel to venue, or a late shuttle at the end of the night. It is all quoted as one arrangement.",
      },
      {
        q: "What if the day runs late?",
        a: "It usually does, and it is planned for. Waiting time is built into the schedule we agree, so an overrunning ceremony or a long set of photographs is not a problem and not an extra charge you did not expect.",
      },
    ],
    image: savoy,
    imageAlt:
      "A top-hatted doorman opening the door of a black Mercedes S-Class outside The Savoy",
    metaDescription:
      "Chauffeur-driven wedding transport — immaculate executive cars, planned timings, guest transport and waiting time included. One fixed quote, agreed in advance.",
  },
  {
    slug: "events",
    name: "Events",
    fullName: "Event Transport",
    eyebrow: "Events",
    titleLead: "Dropped at the door,",
    titleAccent: "collected at the end",
    intro:
      "Concerts, fixtures, festivals and the evenings that follow them. A chauffeur who knows where the drop-off actually is, and a car waiting when it finishes — rather than a surge price and a queue in the rain.",
    features: [
      {
        icon: StarIcon,
        title: "The right entrance",
        text: "Stadiums and arenas have several, and only one of them is quick. We plan the approach and the exit before the night, not during it.",
      },
      {
        icon: ClockIcon,
        title: "Waiting, not hailing",
        text: "Your car is confirmed for the end of the evening at the price agreed at the start. No surge, no queue, no walking to find a signal.",
      },
      {
        icon: RouteIcon,
        title: "Hourly hire for the night",
        text: "Dinner, then the event, then home. Hourly hire keeps the same car and chauffeur with you between stops instead of rebooking each leg.",
      },
      {
        icon: CarIcon,
        title: "Groups kept together",
        text: "Executive MPVs take up to seven, and several cars run to one schedule — so a party of twelve arrives as one party.",
      },
    ],
    detailTitle: "Every kind of evening",
    detailBody:
      "Boxing and sporting fixtures, concerts and festivals, VIP events, premieres and private parties — and the hotel transfers either side of them. If it has a start time and a crowd, it is the sort of night we plan for a living. Tell us the venue and the hour it ends, and the car will be there.",
    included: [
      "Venue approach and exit planned in advance",
      "A confirmed car at the end of the night",
      "Hourly hire across multiple stops",
      "Executive MPVs for groups up to seven",
      "Hotel transfers either side of the event",
      "Discretion as standard",
    ],
    faqs: [
      {
        q: "Can the car wait for us during the event?",
        a: "Yes — that is hourly hire, and for most evenings it works out simpler than booking each leg. The same car and chauffeur stay with you, so nothing has to be arranged again at midnight.",
      },
      {
        q: "What if the event finishes later than planned?",
        a: "Tell your chauffeur or the office and the collection moves. Fixtures go to extra time and encores happen; a running-late finish is normal and is handled without a renegotiation.",
      },
      {
        q: "Do you take groups to festivals and away fixtures?",
        a: "Yes, and beyond London too — long-distance journeys are quoted the same way as any other. Executive MPVs carry up to seven with luggage, and several vehicles can travel to one schedule.",
      },
    ],
    image: claridges,
    imageAlt:
      "A chauffeur at the door of a black Mercedes S-Class outside Claridge's at dusk",
    metaDescription:
      "Chauffeur-driven event transport for concerts, sporting fixtures, festivals and VIP evenings. Dropped at the door, a car waiting at the end, fixed quotes.",
  },
  {
    slug: "proms",
    name: "Proms",
    fullName: "Prom Transport",
    eyebrow: "Proms",
    titleLead: "The arrival they photograph,",
    titleAccent: "the ride home you trust",
    intro:
      "An executive car at the door for the entrance everyone films, and a licensed, insured, professional chauffeur for the journey either side of it — booked and paid for by the adult arranging it, not negotiated at the kerb.",
    features: [
      {
        icon: StarIcon,
        title: "An entrance worth filming",
        text: "A gleaming black executive saloon, a chauffeur holding the door, and thirty seconds of arriving properly.",
      },
      {
        icon: ShieldIcon,
        title: "Licensed and insured",
        text: "A fully licensed private hire operator with professional, vetted chauffeurs — the reassurance the evening is really being bought for.",
      },
      {
        icon: NameBoardIcon,
        title: "Parents kept informed",
        text: "The booking is confirmed to whoever arranges it, with the chauffeur's details in advance and a message once everyone is home.",
      },
      {
        icon: CarIcon,
        title: "Friends together",
        text: "Executive MPVs take groups up to seven, so the party arrives in one car rather than four separate ones.",
      },
    ],
    detailTitle: "Arranged by the person paying for it",
    detailBody:
      "Prom bookings are made with the parent or school arranging them, and confirmed in writing before the night. The price is fixed in advance, the chauffeur is named, and nothing is settled at the kerb by a sixteen-year-old at eleven at night. Return journeys are booked at the same time as the arrival, so getting home is never the part left to chance.",
    included: [
      "Fully licensed and insured private hire",
      "Professional, vetted chauffeurs",
      "Booking confirmed to the parent or school",
      "Return journey arranged with the outbound",
      "Groups up to seven in an Executive MPV",
      "One fixed price, paid however suits you",
    ],
    faqs: [
      {
        q: "Who do you deal with for a prom booking?",
        a: "Whoever is arranging it — a parent, a guardian or the school. The confirmation, the chauffeur's details and the price all go to them, and the fare is settled with them rather than at the kerb.",
      },
      {
        q: "Can the car take a group of friends?",
        a: "Yes. An Executive MPV such as a Mercedes V-Class or similar carries up to seven, and where a group is larger we run several cars to the same arrival time so everyone steps out together.",
      },
      {
        q: "Will you wait, or come back at the end?",
        a: "Either. Some bookings keep the car for the evening on hourly hire; most arrange the return at the same time as the arrival. We would always rather the journey home was booked in advance than left until it is needed.",
      },
    ],
    image: bulgari,
    imageAlt:
      "A chauffeur opening the rear door of a black Mercedes S-Class at a luxury hotel entrance",
    metaDescription:
      "Prom transport in chauffeur-driven executive cars — licensed and insured, vetted chauffeurs, groups up to seven, and the return journey arranged in advance.",
  },
  {
    slug: "long-distance",
    name: "Long Distance",
    fullName: "Long Distance Travel",
    eyebrow: "Long Distance",
    titleLead: "Anywhere in the country,",
    titleAccent: "door to door",
    intro:
      "One car, one chauffeur, and a fixed price agreed before you set off. No changing trains with luggage, no connections to miss, and no meter counting the miles between here and wherever you are going.",
    features: [
      {
        icon: TagIcon,
        title: "Priced before departure",
        text: "A long journey is exactly where a meter costs you most. Yours is quoted by hand and fixed, whatever the motorway decides on the day.",
      },
      {
        icon: RouteIcon,
        title: "One car, the whole way",
        text: "Collected at your door and delivered to theirs — no platforms, no transfers, and your luggage stays in the boot throughout.",
      },
      {
        icon: LuggageIcon,
        title: "Room to travel",
        text: "Executive saloons for two or three with cases; Executive MPVs when the party or the luggage grows. Nothing travels on your lap.",
      },
      {
        icon: WaterIcon,
        title: "Hours you can use",
        text: "A quiet cabin, bottled water and a smooth car. Work the whole way or sleep the whole way — the time is yours either way.",
      },
    ],
    detailTitle: "Where the train stops making sense",
    detailBody:
      "Cross-country journeys, airport runs beyond London, cruise port transfers, relocations and site visits with three stops on the way — all quoted the same way, by hand, before you travel. Rest stops are planned around you rather than the timetable, and a chauffeur who has driven the route before is driving it again.",
    included: [
      "A fixed, bespoke price agreed in advance",
      "Door-to-door, with no changes en route",
      "Executive saloons and MPVs, or similar",
      "Complimentary bottled water throughout",
      "Multiple stops and rest breaks planned in",
      "Cruise ports and regional airports covered",
    ],
    faqs: [
      {
        q: "How is a long-distance journey priced?",
        a: "By hand, and fixed before you travel. We look at the route, the timing and the vehicle you need, then quote one price for the journey — it does not change with traffic, and there is no meter running in the front.",
      },
      {
        q: "Do you cover the whole country?",
        a: `${site.serviceArea} — cross-country journeys are a normal part of the work, along with regional airports, cruise ports and multi-stop days. If it can be driven, we will quote it.`,
      },
      {
        q: "Can we stop on the way?",
        a: "Yes — tell us when you enquire and the stops are planned into the schedule and the price. Rest breaks on a long drive are arranged around you rather than squeezed in.",
      },
    ],
    image: fleet,
    imageAlt:
      "The Exotic Travel fleet — a Range Rover, Mercedes S-Class and Mercedes V-Class lined up at Heathrow Terminal 3",
    metaDescription:
      "Long distance chauffeur travel across the UK — one car door to door, a fixed price agreed in advance, executive saloons and MPVs, cruise ports and regional airports.",
  },
];

export const getService = (slug: string) =>
  servicePages.find((s) => s.slug === slug);
