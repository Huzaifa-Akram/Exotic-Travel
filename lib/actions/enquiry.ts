"use server";

import {
  airportJourneyTypes,
  childSeatOptions,
  contactPreferences,
  journeyTypes,
  vehicleCategories,
} from "@/lib/enquiry";

/**
 * Enquiry submission.
 *
 * §4 of the brief: there is no automated pricing. This takes the journey
 * details, validates them, and hands them to the office — a bespoke
 * quotation goes back by hand. Nothing here should ever return a price.
 *
 * PHASE 1 SCOPE (§17): no database. The enquiry is emailed and that is
 * the only record, which is exactly why validation is strict here — a
 * malformed enquiry we cannot reply to is a lost booking.
 *
 * TODO(step 4): wire the Resend email pipeline — owner notification to
 * two addresses (§17 mitigates a spam-filtered notification losing the
 * enquiry) plus the customer confirmation the client asked for in §12.
 * Until then submissions are logged server-side only; see summarise().
 */

export type EnquiryState = {
  status: "idle" | "error" | "success";
  /** Keyed by field name so inputs can show their own message. */
  errors: Record<string, string>;
  /**
   * What was submitted, echoed back on failure. React 19 resets a form
   * automatically once a function action resolves, which on a form this
   * long would throw away everything the visitor typed the moment one
   * field failed validation. Feeding these straight back into each
   * input's defaultValue means the reset restores their own answers.
   */
  values: Record<string, string>;
  message: string;
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  errors: {},
  values: {},
  message: "",
};

const text = (data: FormData, key: string) =>
  (data.get(key) as string | null)?.trim() ?? "";

const inOptions = (value: string, options: readonly { value: string }[]) =>
  options.some((o) => o.value === value);

/** Deliberately loose. Rejecting an unusual but valid address costs a booking. */
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/** UK numbers arrive with spaces, +44, (0) and dashes — count the digits. */
const looksLikePhone = (value: string) => (value.match(/\d/g) ?? []).length >= 9;

const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);
const isTime = (value: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

/**
 * Date and time arrive as separate fields — the pickers are separate
 * controls, and a split pair survives a browser that only supports one
 * of the two native input types. Parsed in local time on purpose: a
 * pick-up at 07:00 means 07:00 where the car is.
 */
function toDeparture(date: string, time: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm);
}

function readable(date: string, time: string) {
  if (!isDate(date)) return "—";
  const d = toDeparture(date, isTime(time) ? time : "00:00");
  return d.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function summarise(fields: Record<string, string>) {
  const label = (
    options: readonly { value: string; label: string }[],
    value: string,
  ) => options.find((o) => o.value === value)?.label ?? value;

  return [
    `Journey:        ${label(journeyTypes, fields.journeyType)}`,
    `Trip:           ${fields.tripType === "return" ? "Return" : "One way"}`,
    `Pick-up:        ${fields.from}`,
    `Drop-off:       ${fields.to || "—"}`,
    `Departing:      ${readable(fields.date, fields.time)}`,
    `Returning:      ${
      fields.tripType === "return"
        ? readable(fields.returnDate, fields.returnTime)
        : "—"
    }`,
    `Airport:        ${fields.airport || "—"}`,
    `Airline:        ${fields.airline || "—"}`,
    `Flight number:  ${fields.flightNumber || "—"}`,
    `Terminal:       ${fields.terminal || "—"}`,
    `Vehicle:        ${label(vehicleCategories, fields.vehicle)}`,
    `Passengers:     ${fields.passengers}`,
    `Suitcases:      ${fields.suitcases}`,
    `Child seat:     ${label(childSeatOptions, fields.childSeat)}`,
    `Meet & greet:   ${fields.meetGreet === "on" ? "Yes" : "No"}`,
    `Requests:       ${fields.notes || "—"}`,
    "",
    `Name:           ${fields.name}`,
    `Email:          ${fields.email}`,
    `Phone:          ${fields.phone}`,
    `Prefers:        ${label(contactPreferences, fields.contactPreference)}`,
  ].join("\n");
}

export async function submitEnquiry(
  _prev: EnquiryState,
  data: FormData,
): Promise<EnquiryState> {
  // Honeypot. A field no human sees, so anything in it came from a bot.
  // Answered with success rather than an error so the bot stops retrying.
  if (text(data, "company")) {
    return { status: "success", errors: {}, values: {}, message: "" };
  }

  const fields: Record<string, string> = {
    journeyType: text(data, "journeyType") || "point-to-point",
    tripType: text(data, "tripType") || "one-way",
    from: text(data, "from"),
    to: text(data, "to"),
    date: text(data, "date"),
    time: text(data, "time"),
    returnDate: text(data, "returnDate"),
    returnTime: text(data, "returnTime"),
    airport: text(data, "airport"),
    airline: text(data, "airline"),
    flightNumber: text(data, "flightNumber"),
    terminal: text(data, "terminal"),
    vehicle: text(data, "vehicle") || "recommend",
    passengers: text(data, "passengers") || "1",
    suitcases: text(data, "suitcases") || "0",
    childSeat: text(data, "childSeat") || "none",
    meetGreet: text(data, "meetGreet"),
    notes: text(data, "notes"),
    name: text(data, "name"),
    email: text(data, "email"),
    phone: text(data, "phone"),
    contactPreference: text(data, "contactPreference") || "email",
  };

  const errors: Record<string, string> = {};

  if (!fields.from) errors.from = "Tell us where to collect you.";

  // Hourly hire has no fixed destination — the brief lists it as its own
  // service (§1, "Hourly Chauffeur Hire"), so requiring one would block it.
  if (!fields.to && fields.journeyType !== "hourly") {
    errors.to = "Tell us where you are going.";
  }

  if (!isDate(fields.date)) {
    errors.date = "Choose a pick-up date.";
  } else if (!isTime(fields.time)) {
    errors.time = "Choose a pick-up time.";
  } else {
    const departure = toDeparture(fields.date, fields.time);
    // An hour of slack: a booking made for "now" while the clock ticks
    // over, or a traveller a timezone behind us, is still a real booking.
    if (departure.getTime() < Date.now() - 60 * 60 * 1000) {
      errors.date = "Please choose a date and time in the future.";
    }
  }

  if (fields.tripType === "return") {
    if (!isDate(fields.returnDate)) {
      errors.returnDate = "Add the return date.";
    } else if (!isTime(fields.returnTime)) {
      errors.returnTime = "Add the return time.";
    } else if (
      isDate(fields.date) &&
      isTime(fields.time) &&
      toDeparture(fields.returnDate, fields.returnTime) <=
        toDeparture(fields.date, fields.time)
    ) {
      errors.returnDate = "The return must be after the outbound journey.";
    }
  } else {
    fields.returnDate = fields.returnTime = "";
  }

  if (!fields.name) errors.name = "Please add your name.";

  if (!fields.email) errors.email = "Please add an email address.";
  else if (!looksLikeEmail(fields.email))
    errors.email = "That email address does not look right.";

  if (!fields.phone) errors.phone = "Please add a contact number.";
  else if (!looksLikePhone(fields.phone))
    errors.phone = "That number looks too short.";

  // Guard the selects too — they post arbitrary strings, and a value we
  // do not recognise would reach the office as gibberish.
  if (!inOptions(fields.journeyType, journeyTypes))
    fields.journeyType = "point-to-point";
  if (!inOptions(fields.vehicle, vehicleCategories)) fields.vehicle = "recommend";
  if (!inOptions(fields.childSeat, childSeatOptions)) fields.childSeat = "none";
  if (!inOptions(fields.contactPreference, contactPreferences))
    fields.contactPreference = "email";
  if (!airportJourneyTypes.includes(fields.journeyType)) {
    fields.airport = fields.airline = fields.flightNumber = fields.terminal = "";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      values: fields,
      message: "Please check the highlighted fields.",
    };
  }

  // Stand-in for the email pipeline. Logged rather than dropped so an
  // enquiry made during the build is still recoverable from the server
  // output — but it does NOT reach the client yet.
  console.info(`\n=== NEW ENQUIRY ===\n${summarise(fields)}\n`);

  return {
    status: "success",
    errors: {},
    values: {},
    message: "",
  };
}
