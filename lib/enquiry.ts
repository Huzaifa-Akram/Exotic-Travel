/**
 * Field data for the enquiry flow, in one place so the hero quick-start
 * form, the full form on /quote and (later) the admin dashboard all read
 * the same options. Every list here is dictated by CLIENT_BRIEF.md §4
 * and §5 — change the brief before changing these.
 */

/**
 * §4a opens with "select Airport Pick-up or Airport Drop-off", but the
 * brief is emphatic elsewhere (§1) that we are not airport-only, so the
 * non-airport journeys sit alongside them rather than behind a toggle.
 */
export const journeyTypes = [
  { value: "airport-pickup", label: "Airport pick-up" },
  { value: "airport-dropoff", label: "Airport drop-off" },
  { value: "point-to-point", label: "Point to point" },
  { value: "hourly", label: "Hourly hire" },
] as const;

export type JourneyType = (typeof journeyTypes)[number]["value"];

/** Journeys that should prompt for flight details. */
export const airportJourneyTypes: readonly string[] = [
  "airport-pickup",
  "airport-dropoff",
];

/** The five airports the brief wants dedicated pages for (§8), plus an escape hatch. */
export const airportOptions = [
  { value: "heathrow", label: "Heathrow (LHR)" },
  { value: "gatwick", label: "Gatwick (LGW)" },
  { value: "luton", label: "Luton (LTN)" },
  { value: "stansted", label: "Stansted (STN)" },
  { value: "london-city", label: "London City (LCY)" },
  { value: "other", label: "Another airport" },
];

/**
 * §5: customers choose a CATEGORY, never a specific car, and the example
 * vehicles must always carry "or similar" so we are never locked into one
 * model. The disclaimer under the picker is a brief requirement, not
 * decoration — do not remove it.
 */
export const vehicleCategories = [
  {
    value: "executive-saloon",
    label: "Executive Saloon",
    passengers: "Up to 4 passengers",
    luggage: "Up to 3 suitcases",
    examples: "Mercedes S-Class, BMW 7 Series, Audi A8 or similar",
  },
  {
    value: "executive-mpv",
    label: "Executive MPV",
    passengers: "Up to 7 passengers",
    luggage: "Up to 6 suitcases",
    examples: "Mercedes V-Class, Ford Tourneo, VW Multivan or similar",
  },
  {
    value: "recommend",
    label: "Not sure yet",
    passengers: "Tell us the party size",
    luggage: "We will recommend",
    examples: "We match the vehicle to your passengers and luggage",
  },
] as const;

export const vehicleDisclaimer =
  "Example vehicles only. We always provide a vehicle that meets or exceeds your chosen category, subject to availability.";

/** §4b — "child seat request". Named seats rather than a yes/no so we know what to fit. */
export const childSeatOptions = [
  { value: "none", label: "Not required" },
  { value: "infant", label: "Infant carrier (0–12 months)" },
  { value: "child", label: "Child seat (1–4 years)" },
  { value: "booster", label: "Booster seat (4–11 years)" },
];

/** §12 — confirmations go out by email / SMS / WhatsApp, so we ask which. */
export const contactPreferences = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const returnOptions = [
  { value: "one-way", label: "One way" },
  { value: "return", label: "Return" },
] as const;
