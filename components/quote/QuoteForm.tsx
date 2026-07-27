"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "@/components/ui/Select";
import { TimePicker } from "@/components/ui/TimePicker";
import {
  airportJourneyTypes,
  airportOptions,
  childSeatOptions,
  contactPreferences,
  journeyTypes,
  returnOptions,
  vehicleCategories,
  vehicleDisclaimer,
} from "@/lib/enquiry";
import { initialEnquiryState, submitEnquiry } from "@/lib/actions/enquiry";
import { site } from "@/lib/site";

/**
 * The full enquiry, covering every field the client listed in §4a and
 * §4b of the brief. The three values from the hero search bar arrive as
 * props and prefill the top so nothing is typed twice.
 *
 * A Client Component because two sections appear conditionally and the
 * validation messages come back through useActionState. With JavaScript
 * off, the text inputs, radios, checkbox and textarea still post to the
 * Server Action — the enquiry lands, just without the conditional
 * flight fields (which are optional, and can go in Special requests).
 */

export type QuotePrefill = {
  from: string;
  to: string;
  date: string;
  time: string;
};

/**
 * Preselects the journey type from what was typed in the hero bar, so a
 * visitor who wrote "Heathrow T5" lands with the flight fields already
 * open instead of hunting for them. Only ever a starting guess — the
 * segmented control above it is the real answer.
 */
const AIRPORT_WORDS =
  /\b(airport|heathrow|gatwick|luton|stansted|london city|lhr|lgw|ltn|stn|lcy|terminal)\b/i;

function guessJourney({ from, to }: QuotePrefill) {
  if (AIRPORT_WORDS.test(to)) return "airport-dropoff";
  if (AIRPORT_WORDS.test(from)) return "airport-pickup";
  return "point-to-point";
}

/* -------------------------------------------------------------- */

function Legend({ n, title }: { n: string; title: string }) {
  return (
    <legend className="mb-7 flex w-full items-center gap-4 border-b border-white/10 pb-4">
      <span className="text-gold/60 font-display text-lg leading-none">{n}</span>
      <span className="text-[13px] font-medium tracking-[0.16em] text-white uppercase">
        {title}
      </span>
    </legend>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-xs text-white/40">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-danger mt-2 text-xs">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Segmented radio group. Native radios under the styling, so the choice
 * survives without JavaScript and arrives in the FormData either way.
 */
function Segmented({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-px rounded-sm border border-white/10 bg-white/10 p-px">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <label
            key={o.value}
            className={`flex-1 cursor-pointer rounded-[1px] px-4 py-3 text-center text-[13px] whitespace-nowrap transition-colors duration-300 ease-luxe has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-gold ${
              active
                ? "bg-gold/15 text-gold"
                : "bg-elevated text-muted hover:text-white"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={active}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------- */

function Confirmation() {
  return (
    <div className="card mt-14 p-10 text-center md:p-14">
      <div className="rule-gold mx-auto" />
      <h2 className="font-display mt-8 text-h2 font-light">
        Enquiry <span className="text-metal">received</span>
      </h2>
      <p className="text-muted mx-auto mt-6 max-w-lg">
        Thank you. One of our team will review the journey and reply with a
        bespoke quotation — usually within the hour, and always within 24
        hours. Nothing is charged until the journey is confirmed.
      </p>
      <p className="text-muted mx-auto mt-6 max-w-lg text-sm">
        Travelling sooner, or have documents to send us? Call or message
        and we will handle it straight away.
      </p>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
        <a href={site.phone.href} className="btn btn-primary">
          Call {site.phone.display}
        </a>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          WhatsApp Us
        </a>
      </div>

      <Link
        href="/"
        className="text-muted hover:text-gold mt-8 inline-block text-sm transition-colors"
      >
        Return to homepage
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------- */

export function QuoteForm({ prefill }: { prefill: QuotePrefill }) {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialEnquiryState,
  );
  const uid = useId();

  const [journeyType, setJourneyType] = useState(() => guessJourney(prefill));
  const [tripType, setTripType] = useState("one-way");

  if (state.status === "success") return <Confirmation />;

  // Echoed submissions win over the hero prefill: after a failed attempt
  // the visitor's own edits are the newer truth.
  const was = (name: string, fallback = "") => state.values[name] ?? fallback;
  const err = (name: string) => state.errors[name];
  const showFlight = airportJourneyTypes.includes(journeyType);

  /** Marks an input invalid and points it at its own message. */
  const invalid = (name: string, id: string) =>
    err(name)
      ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` }
      : {};

  return (
    <form action={formAction} className="mt-14">
      {/* Bots fill every field they can see. Humans never see this one. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="space-y-14">
        {/* ---------------- 01 Journey ---------------- */}
        <fieldset>
          <Legend n="01" title="The journey" />

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Type of journey" className="md:col-span-2">
              <Segmented
                name="journeyType"
                options={journeyTypes}
                value={journeyType}
                onChange={setJourneyType}
              />
            </Field>

            <Field
              label="Pick-up location"
              htmlFor={`${uid}-from`}
              error={err("from")}
            >
              <input
                id={`${uid}-from`}
                name="from"
                defaultValue={was("from", prefill.from)}
                placeholder="Address, hotel or airport"
                {...invalid("from", `${uid}-from`)}
                className="field"
              />
            </Field>

            <Field
              label={
                journeyType === "hourly"
                  ? "Where are you heading? (optional)"
                  : "Drop-off location"
              }
              htmlFor={`${uid}-to`}
              error={err("to")}
              hint={
                journeyType === "hourly"
                  ? "Hourly hire keeps the car and chauffeur with you."
                  : undefined
              }
            >
              <input
                id={`${uid}-to`}
                name="to"
                defaultValue={was("to", prefill.to)}
                placeholder="Address, hotel or airport"
                {...invalid("to", `${uid}-to`)}
                className="field"
              />
            </Field>

            <Field label="Pick-up date" error={err("date")}>
              <DatePicker
                name="date"
                label="Pick-up date"
                defaultValue={was("date", prefill.date)}
                invalid={!!err("date")}
              />
            </Field>

            <Field label="Pick-up time" error={err("time")}>
              <TimePicker
                name="time"
                label="Pick-up time"
                defaultValue={was("time", prefill.time)}
                invalid={!!err("time")}
              />
            </Field>

            <Field label="One way or return" className="md:col-span-2">
              <Segmented
                name="tripType"
                options={returnOptions}
                value={tripType}
                onChange={setTripType}
              />
            </Field>

            {tripType === "return" && (
              <>
                <Field label="Return date" error={err("returnDate")}>
                  <DatePicker
                    name="returnDate"
                    label="Return date"
                    defaultValue={was("returnDate")}
                    invalid={!!err("returnDate")}
                  />
                </Field>

                <Field label="Return time" error={err("returnTime")}>
                  <TimePicker
                    name="returnTime"
                    label="Return time"
                    defaultValue={was("returnTime")}
                    invalid={!!err("returnTime")}
                  />
                </Field>
              </>
            )}
          </div>
        </fieldset>

        {/* ---------------- 02 Flight ---------------- */}
        {showFlight && (
          <fieldset>
            <Legend n="02" title="Flight details" />
            <p className="text-muted -mt-3 mb-7 text-sm">
              We track your flight from the moment it leaves, so a delay or
              an early landing simply moves your pick-up. Your chauffeur
              waits inside arrivals with a name board.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Airport" htmlFor={`${uid}-airport`}>
                <Select
                  id={`${uid}-airport`}
                  name="airport"
                  options={airportOptions}
                  defaultValue={was("airport")}
                  placeholder="Select an airport"
                />
              </Field>

              <Field label="Airline" htmlFor={`${uid}-airline`}>
                <input
                  id={`${uid}-airline`}
                  name="airline"
                  defaultValue={was("airline")}
                  placeholder="British Airways"
                  className="field"
                />
              </Field>

              <Field label="Flight number" htmlFor={`${uid}-flightNumber`}>
                <input
                  id={`${uid}-flightNumber`}
                  name="flightNumber"
                  defaultValue={was("flightNumber")}
                  placeholder="BA 216"
                  className="field"
                />
              </Field>

              <Field
                label="Terminal"
                htmlFor={`${uid}-terminal`}
                hint="Leave blank if you are not sure — we will confirm it."
              >
                <input
                  id={`${uid}-terminal`}
                  name="terminal"
                  defaultValue={was("terminal")}
                  placeholder="Terminal 5"
                  className="field"
                />
              </Field>
            </div>
          </fieldset>
        )}

        {/* ---------------- 03 Vehicle ---------------- */}
        <fieldset>
          <Legend n={showFlight ? "03" : "02"} title="Vehicle and party" />

          <div
            role="radiogroup"
            aria-label="Vehicle category"
            className="grid gap-4 md:grid-cols-3"
          >
            {vehicleCategories.map((v) => (
              <label
                key={v.value}
                className="card card-interactive has-[:checked]:border-gold/60 has-[:checked]:bg-gold/5 has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-gold cursor-pointer p-6"
              >
                <input
                  type="radio"
                  name="vehicle"
                  value={v.value}
                  defaultChecked={was("vehicle", "recommend") === v.value}
                  className="sr-only"
                />
                <span className="font-display block text-h3 font-light text-white">
                  {v.label}
                </span>
                <span className="text-gold mt-3 block text-xs tracking-[0.08em]">
                  {v.passengers} · {v.luggage}
                </span>
                <span className="text-muted mt-3 block text-sm">
                  {v.examples}
                </span>
              </label>
            ))}
          </div>

          {/* §5 requires this wording verbatim in spirit — we are never
              locked into one model. Do not delete. */}
          <p className="mt-4 text-xs text-white/40">{vehicleDisclaimer}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Field label="Passengers" htmlFor={`${uid}-passengers`}>
              <input
                id={`${uid}-passengers`}
                name="passengers"
                type="number"
                min={1}
                max={16}
                defaultValue={was("passengers", "1")}
                className="field"
              />
            </Field>

            <Field label="Suitcases" htmlFor={`${uid}-suitcases`}>
              <input
                id={`${uid}-suitcases`}
                name="suitcases"
                type="number"
                min={0}
                max={16}
                defaultValue={was("suitcases", "0")}
                className="field"
              />
            </Field>

            <Field label="Child seat" htmlFor={`${uid}-childSeat`}>
              <Select
                id={`${uid}-childSeat`}
                name="childSeat"
                options={childSeatOptions}
                defaultValue={was("childSeat", "none")}
                placeholder="Not required"
              />
            </Field>
          </div>
        </fieldset>

        {/* ---------------- 04 Requirements ---------------- */}
        <fieldset>
          <Legend n={showFlight ? "04" : "03"} title="Anything else" />

          <label className="flex cursor-pointer items-start gap-4 rounded-sm border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/20">
            <input
              type="checkbox"
              name="meetGreet"
              defaultChecked={
                state.status === "idle" ? true : was("meetGreet") === "on"
              }
              className="accent-gold mt-0.5 h-4 w-4 shrink-0"
            />
            <span>
              <span className="block text-sm font-medium text-white">
                Meet &amp; greet
              </span>
              <span className="text-muted mt-1 block text-sm">
                Your chauffeur parks, comes inside with a name board and
                helps with the luggage.
              </span>
            </span>
          </label>

          <Field
            label="Special requests"
            htmlFor={`${uid}-notes`}
            className="mt-6"
            hint="Have an itinerary or documents to send? Reply to your confirmation email and attach them."
          >
            <textarea
              id={`${uid}-notes`}
              name="notes"
              rows={4}
              defaultValue={was("notes")}
              placeholder="Multiple stops, a waiting car at the other end, accessibility needs, preferred temperature — anything at all."
              className="field"
            />
          </Field>
        </fieldset>

        {/* ---------------- 05 Contact ---------------- */}
        <fieldset>
          <Legend n={showFlight ? "05" : "04"} title="Your details" />

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Full name"
              htmlFor={`${uid}-name`}
              error={err("name")}
              className="md:col-span-2"
            >
              <input
                id={`${uid}-name`}
                name="name"
                autoComplete="name"
                defaultValue={was("name")}
                {...invalid("name", `${uid}-name`)}
                className="field"
              />
            </Field>

            <Field label="Email" htmlFor={`${uid}-email`} error={err("email")}>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={was("email")}
                {...invalid("email", `${uid}-email`)}
                className="field"
              />
            </Field>

            <Field label="Phone" htmlFor={`${uid}-phone`} error={err("phone")}>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                defaultValue={was("phone")}
                {...invalid("phone", `${uid}-phone`)}
                className="field"
              />
            </Field>

            <Field
              label="Preferred way to reach you"
              className="md:col-span-2"
              hint="Confirmations go out by email as standard."
            >
              <ContactPreference initial={was("contactPreference", "email")} />
            </Field>
          </div>
        </fieldset>
      </div>

      {/* ---------------- Submit ---------------- */}
      <div className="mt-12 border-t border-white/10 pt-10">
        {state.status === "error" && state.message && (
          <p role="alert" className="text-danger mb-6 text-sm">
            {state.message}
          </p>
        )}

        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={pending}
            className="btn btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send Enquiry"}
          </button>
          <p className="text-xs text-white/45 sm:max-w-sm sm:text-right">
            {site.paymentNote}
          </p>
        </div>
      </div>
    </form>
  );
}

/** Split out purely so the segmented control can hold its own state. */
function ContactPreference({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  return (
    <Segmented
      name="contactPreference"
      options={contactPreferences}
      value={value}
      onChange={setValue}
    />
  );
}
