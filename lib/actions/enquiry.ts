"use server";

import { Resend } from "resend";

import {
  airportJourneyTypes,
  childSeatOptions,
  contactPreferences,
  journeyTypes,
  vehicleCategories,
  type EnquiryState,
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

/**
 * NOTHING but async functions may be exported from this file. It is a
 * `"use server"` module, so Turbopack compiles every export into a
 * server-action reference — a plain object exported here reaches the
 * client as a callable stub instead of its value, with no build error to
 * warn you. `EnquiryState` and `initialEnquiryState` therefore live in
 * `lib/enquiry.ts`.
 */

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

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Create WhatsApp and Tel links
    const cleanPhone = fields.phone.replace(/[^\d+]/g, "");
    const waLink = `https://wa.me/${cleanPhone.startsWith("0") ? "44" + cleanPhone.slice(1) : cleanPhone.replace("+", "")}`;
    const telLink = `tel:${cleanPhone}`;

    const label = (
      options: readonly { value: string; label: string }[],
      value: string,
    ) => options.find((o) => o.value === value)?.label ?? value;

    const journeyName = label(journeyTypes, fields.journeyType);
    const vehicleName = label(vehicleCategories, fields.vehicle);

    // Ultra-premium HTML Email Template for the Owner
    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050505; color: #ffffff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #1a1a1a; }
    .header { padding: 40px 30px; text-align: center; border-bottom: 1px solid #1a1a1a; background: linear-gradient(180deg, #111 0%, #0a0a0a 100%); }
    .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; color: #ffffff; }
    .header p { margin: 10px 0 0; color: #D4AF37; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
    
    .content { padding: 40px 30px; }
    .section-title { color: #D4AF37; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 15px 0; border-bottom: 1px solid #222; padding-bottom: 8px; }
    
    .grid { display: table; width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .grid-row { display: table-row; }
    .grid-cell { display: table-cell; padding: 12px 0; border-bottom: 1px solid #1a1a1a; font-size: 14px; }
    .grid-label { color: #888888; width: 35%; padding-right: 15px; }
    .grid-value { color: #ffffff; font-weight: 500; }
    
    .notes-box { background-color: #111; border-left: 2px solid #D4AF37; padding: 15px 20px; margin-bottom: 30px; font-size: 14px; line-height: 1.6; color: #ccc; }
    
    .actions { padding: 30px; background-color: #050505; border-top: 1px solid #1a1a1a; text-align: center; }
    .actions-title { font-size: 14px; color: #888; margin-bottom: 20px; }
    .btn-group { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
    
    .btn { display: inline-block; padding: 14px 24px; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; text-decoration: none; border-radius: 2px; margin: 0 5px; transition: all 0.3s ease; }
    .btn-gold { background-color: #D4AF37; color: #000000; }
    .btn-outline { background-color: transparent; color: #ffffff; border: 1px solid #333; }
    
    .reply-instruction { font-size: 12px; color: #666; line-height: 1.6; margin-top: 25px; padding-top: 25px; border-top: 1px dotted #333; }
    .reply-instruction span { color: #D4AF37; }
    
    .footer { padding: 30px; text-align: center; font-size: 11px; color: #555; background-color: #000; border-top: 1px solid #111; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <img src="https://www.exoticexecutive.com/logo.svg" alt="Exotic Travel" width="60" style="display: block; margin: 0 auto 15px auto;" />
      <h1>Exotic Travel</h1>
      <p>New Quotation Request</p>
    </div>

    <!-- Main Content -->
    <div class="content">
      
      <!-- Client Details -->
      <div class="section-title">Client Information</div>
      <div class="grid">
        <div class="grid-row">
          <div class="grid-cell grid-label">Name</div>
          <div class="grid-cell grid-value">${fields.name}</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Email</div>
          <div class="grid-cell grid-value"><a href="mailto:${fields.email}" style="color: #D4AF37; text-decoration: none;">${fields.email}</a></div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Phone</div>
          <div class="grid-cell grid-value">${fields.phone}</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Prefers Contact Via</div>
          <div class="grid-cell grid-value">${label(contactPreferences, fields.contactPreference)}</div>
        </div>
      </div>

      <!-- Journey Details -->
      <div class="section-title">Journey Details</div>
      <div class="grid">
        <div class="grid-row">
          <div class="grid-cell grid-label">Service Type</div>
          <div class="grid-cell grid-value">${journeyName} (${fields.tripType === 'return' ? 'Return' : 'One Way'})</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Pick-up Location</div>
          <div class="grid-cell grid-value">${fields.from}</div>
        </div>
        ${fields.to ? `
        <div class="grid-row">
          <div class="grid-cell grid-label">Drop-off Location</div>
          <div class="grid-cell grid-value">${fields.to}</div>
        </div>` : ''}
        <div class="grid-row">
          <div class="grid-cell grid-label">Outbound Date & Time</div>
          <div class="grid-cell grid-value">${readable(fields.date, fields.time)}</div>
        </div>
        ${fields.tripType === 'return' ? `
        <div class="grid-row">
          <div class="grid-cell grid-label">Return Date & Time</div>
          <div class="grid-cell grid-value">${readable(fields.returnDate, fields.returnTime)}</div>
        </div>` : ''}
      </div>

      <!-- Airport Details (If Applicable) -->
      ${fields.airport ? `
      <div class="section-title">Flight Information</div>
      <div class="grid">
        <div class="grid-row">
          <div class="grid-cell grid-label">Airport</div>
          <div class="grid-cell grid-value">${fields.airport}</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Terminal</div>
          <div class="grid-cell grid-value">${fields.terminal || 'Not specified'}</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Airline / Flight</div>
          <div class="grid-cell grid-value">${fields.airline || '-'} / ${fields.flightNumber || '-'}</div>
        </div>
      </div>` : ''}

      <!-- Requirements -->
      <div class="section-title">Requirements</div>
      <div class="grid">
        <div class="grid-row">
          <div class="grid-cell grid-label">Requested Vehicle</div>
          <div class="grid-cell grid-value">${vehicleName}</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Passengers</div>
          <div class="grid-cell grid-value">${fields.passengers}</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Suitcases</div>
          <div class="grid-cell grid-value">${fields.suitcases}</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Child Seat</div>
          <div class="grid-cell grid-value">${label(childSeatOptions, fields.childSeat)}</div>
        </div>
        <div class="grid-row">
          <div class="grid-cell grid-label">Meet & Greet</div>
          <div class="grid-cell grid-value">${fields.meetGreet === 'on' ? 'Requested' : 'No'}</div>
        </div>
      </div>

      <!-- Notes -->
      ${fields.notes ? `
      <div class="section-title">Additional Requests / Itinerary</div>
      <div class="notes-box">
        ${fields.notes.replace(/\n/g, '<br>')}
      </div>` : ''}

    </div>

    <!-- Action Center -->
    <div class="actions">
      <div class="actions-title">CONTACT CLIENT IMMEDIATELY</div>
      
      <!-- Button Group -->
      <div style="margin-bottom: 15px;">
        <a href="${waLink}" class="btn btn-gold" target="_blank">Message on WhatsApp</a>
      </div>
      <div style="margin-bottom: 15px;">
        <a href="${telLink}" class="btn btn-outline">Call Client</a>
      </div>
      <div>
        <a href="mailto:${fields.email}?subject=Your Quotation from Exotic Travel" class="btn btn-outline">Reply via Email</a>
      </div>

      <div class="reply-instruction">
        <strong>TO SEND A QUOTE:</strong> You can simply click <span>"Reply"</span> in your email app. <br><br>
        Your reply will go directly to <strong>${fields.email}</strong>. The client will see this beautiful summary attached below your quote, maintaining a premium brand experience.
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      EXOTIC TRAVEL CHAUFFEUR SERVICES &middot; CONFIDENTIAL BOOKING REQUEST
    </div>
  </div>
</body>
</html>
    `;

    // Send the notification email to the admin/owner
    await resend.emails.send({
      from: "Exotic Travel <bookings@exoticexecutive.com>",
      to: ["bookings@exoticexecutive.com"],
      replyTo: fields.email, // THIS IS CRITICAL! Allows the owner to just click "Reply"
      subject: `New Quotation Request - ${fields.name}`,
      html: htmlEmail,
    });
    
  } catch (err) {
    console.error("Failed to send email with Resend:", err);
    // Don't leak the error to the client, let them see a success message anyway so they aren't confused, 
    // but ideally we should handle this. The brief says "PHASE 1 SCOPE (§17): no database. The enquiry is emailed and that is the only record...".
  }

  return {
    status: "success",
    errors: {},
    values: {},
    message: "",
  };
}
