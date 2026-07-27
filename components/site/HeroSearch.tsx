import Form from "next/form";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePicker } from "@/components/ui/TimePicker";

/**
 * Hero quick-start. Four fields and an arrow — §2 of the brief asks to
 * "make the enquiry process as simple as possible", and the benchmark
 * brands all open with a short journey form rather than a wall of
 * buttons.
 *
 * next/form with a string action gives three things a hand-rolled widget
 * would not: /quote is prefetched as soon as the bar scrolls into view,
 * submitting is a client-side navigation rather than a page reload, and
 * with JavaScript unavailable it degrades to a plain GET form that still
 * lands on /quote with the values in the query string. §17 treats a lost
 * enquiry as lost revenue, so that fallback matters.
 *
 * The values arrive at /quote as ?from=&to=&date=&time= and prefill the
 * top of the full form, so nothing is ever typed twice.
 */

function Labelled({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function HeroSearch() {
  return (
    <Form action="/quote">
      <div className="glass relative overflow-hidden rounded-md p-4 sm:p-5">
        {/* Specular streak. A separate element rather than a pseudo so it
            paints under the fields with no z-index guesswork. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(102deg,transparent_26%,rgba(255,255,255,0.06)_44%,transparent_60%)]"
        />

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-[10.5rem_8.5rem_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
          <Labelled label="Pick-up Date">
            <DatePicker
              name="date"
              label="Pick-up date"
              placeholder="Choose date"
              variant="bar"
            />
          </Labelled>

          <Labelled label="Pick-up Time">
            <TimePicker
              name="time"
              label="Pick-up time"
              placeholder="Choose time"
              variant="bar"
            />
          </Labelled>

          <Labelled label="Pick-up Address" htmlFor="hero-from">
            <input
              id="hero-from"
              name="from"
              placeholder="Address, hotel or airport"
              /* 16px, not the 14px the density wants: iOS zooms the whole
                 page in when a focused input is under 16px, which throws
                 the hero layout across the screen on the most common
                 device we have. */
              className="w-full rounded-sm border border-white/12 bg-white/5 px-4 py-2.5 text-base text-white transition-colors duration-300 placeholder:text-white/35 hover:border-white/25 focus:border-gold/60 focus:bg-white/8 focus:outline-none"
            />
          </Labelled>

          <Labelled label="Drop-off Address" htmlFor="hero-to">
            <input
              id="hero-to"
              name="to"
              placeholder="Address, hotel or airport"
              className="w-full rounded-sm border border-white/12 bg-white/5 px-4 py-2.5 text-base text-white transition-colors duration-300 placeholder:text-white/35 hover:border-white/25 focus:border-gold/60 focus:bg-white/8 focus:outline-none"
            />
          </Labelled>

          {/* Nothing is required here on purpose — the arrow doubles as
              "just take me to the full form". /quote does the enforcing. */}
          <button
            type="submit"
            aria-label="Continue to the full enquiry"
            className="group bg-gold text-ink hover:bg-gold-bright flex h-[46px] w-full items-center justify-center gap-3 rounded-sm transition-colors duration-500 ease-luxe sm:col-span-2 lg:col-span-1 lg:w-[46px] lg:rounded-full"
          >
            {/* The word carries the button while the bar is stacked; once
                it is a single row, the circle speaks for itself. */}
            <span className="text-[12px] font-medium tracking-[0.16em] uppercase lg:hidden">
              Continue
            </span>
            <svg
              width="15"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-500 ease-luxe group-hover:translate-x-1"
            >
              <path
                d="M0 5h13M10 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Form>
  );
}
