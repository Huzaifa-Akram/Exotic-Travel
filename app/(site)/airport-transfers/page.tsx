import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fleet from "@/public/image-6.jpg";
import { airportPages } from "@/content/airports";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  ClockIcon,
  LuggageIcon,
  NameBoardIcon,
  PlaneIcon,
  WhatsAppIcon,
} from "@/components/home/icons";

export const metadata: Metadata = {
  title: "London Airport Transfers",
  description:
    "Chauffeur-driven transfers to and from Heathrow, Gatwick, Luton, Stansted and London City — meet & greet inside arrivals, live flight tracking and fixed bespoke quotes, 24/7.",
  alternates: { canonical: "/airport-transfers" },
};

/**
 * The airport hub — the "Airport Transfers" nav item lands here, and its
 * one job is routing: say the promise once, then hand the visitor to
 * their airport's own page, where the detail lives. The five cards are
 * the page; everything else frames them.
 */

const assurances = [
  {
    icon: NameBoardIcon,
    title: "Met inside arrivals",
    text: "A name board, not a phone call — and help with the luggage from the doors to the car.",
  },
  {
    icon: PlaneIcon,
    title: "Flights tracked",
    text: "Delays and early landings move the pick-up automatically. The price never moves at all.",
  },
  {
    icon: LuggageIcon,
    title: "Instructions sent ahead",
    text: "Clear pick-up directions for your terminal, in your inbox before the wheels touch down.",
  },
  {
    icon: ClockIcon,
    title: "24 hours, every day",
    text: "First flights out and last flights in — the service is scheduled to aircraft, not office hours.",
  },
] as const;

export default function AirportTransfersPage() {
  return (
    <>
      {/* ---------------- Masthead ---------------- */}
      <section className="surface-marble section pt-32 md:pt-40">
        <div className="container-x">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Airport Transfers</p>
              <h1 className="font-display text-h1 mt-5 font-light text-balance">
                Every London airport,{" "}
                <span className="text-metal">around the clock</span>
              </h1>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
                Chauffeur-driven transfers to and from Heathrow, Gatwick,
                Luton, Stansted and London City — met inside arrivals,
                tracked from take-off, and quoted before you fly.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <Link href="/quote" className="btn btn-primary">
                Get a Quote
              </Link>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                WhatsApp Us
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- The five airports ---------------- */}
      <section className="section" aria-labelledby="airport-list">
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">Choose Yours</p>
            <h2
              id="airport-list"
              className="font-display text-h2 mt-5 font-light text-balance"
            >
              Five airports, <span className="text-metal">one standard</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {airportPages.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 90}>
                <Link
                  href={`/airport-transfers/${a.slug}`}
                  className="card card-interactive group flex h-full flex-col p-8"
                >
                  {/* Fixed-height box so six marks of very different
                      proportions all reserve the same room and the
                      headings below them line up across the grid. */}
                  <div className="flex h-14 items-center">
                    <Image
                      src={a.logo}
                      alt={a.fullName}
                      sizes="220px"
                      className={`logo-mono w-auto max-w-full object-contain opacity-70 transition-opacity duration-500 ease-luxe group-hover:opacity-100 ${a.logoSize}`}
                    />
                  </div>
                  <h3 className="mt-5 text-base font-medium text-white">
                    {a.fullName} Transfers
                  </h3>
                  <p className="text-muted mt-2.5 text-sm">
                    <span className="text-gold">{a.code}</span> · {a.distance}{" "}
                    {a.direction} · {a.journeyTime} typical
                  </p>
                  <span className="text-gold mt-auto flex items-center gap-2.5 pt-6 text-[11px] tracking-[0.14em] uppercase">
                    View transfers
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                    >
                      <path
                        d="M0 4h12M9 1l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}

            {/* Anywhere the six don't cover. Full width rather than a
                seventh tile: six airports fill two clean rows of three,
                and a lone card in a third row reads as a gap. */}
            <Reveal delay={180} className="sm:col-span-2 lg:col-span-3">
              <div className="card flex flex-col items-start gap-6 border-dashed p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-medium text-white">
                    Another airport, or a cruise port?
                  </h3>
                  <p className="text-muted mt-2 max-w-xl text-sm text-pretty">
                    Regional airports and cruise terminals anywhere in the
                    country are quoted exactly the same way — by hand, and
                    fixed before you travel.
                  </p>
                </div>
                <Link href="/quote" className="btn btn-secondary shrink-0">
                  Get a Quote
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- The promise, once ---------------- */}
      <section
        className="surface-raised border-y border-white/10"
        aria-labelledby="airport-promise"
      >
        <div className="container-x section">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative">
              <div
                aria-hidden
                className="border-gold/30 absolute -top-4 -left-4 right-4 bottom-4 rounded-md border md:-top-5 md:-left-5 md:right-5 md:bottom-5"
              />
              <div className="grain relative aspect-4/3 overflow-hidden rounded-md border border-white/10">
                <Image
                  src={fleet}
                  alt="The Exotic Travel fleet — a Range Rover, Mercedes S-Class and Mercedes V-Class lined up at Heathrow Terminal 3"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow">Whichever Airport</p>
                <h2
                  id="airport-promise"
                  className="font-display text-h2 mt-5 font-light text-balance"
                >
                  The same four promises,{" "}
                  <span className="text-metal">every time</span>
                </h2>
                <div className="rule-gold mt-7" />
              </Reveal>

              <ul className="mt-10 space-y-8">
                {assurances.map((f, i) => (
                  <Reveal key={f.title} delay={i * 80}>
                    <li className="flex gap-5">
                      <f.icon className="text-gold mt-1 h-6 w-6 shrink-0" />
                      <div>
                        <h3 className="text-base font-medium text-white">
                          {f.title}
                        </h3>
                        <p className="text-muted mt-1.5 text-sm text-pretty">
                          {f.text}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Closing ---------------- */}
      <section className="relative" aria-labelledby="airport-cta">
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Begin</p>
              <h2
                id="airport-cta"
                className="font-display text-h1 mt-6 font-light text-balance"
              >
                Tell us the flight —{" "}
                <span className="text-metal">we do the rest.</span>
              </h2>
              <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                A fixed, bespoke quote usually within the hour. No upfront
                online payment, and nothing charged until the journey is
                confirmed.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <Link href="/quote" className="btn btn-primary">
                Get a Quote
              </Link>
              <a href={site.phone.href} className="btn btn-ghost">
                Call {site.phone.display}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
