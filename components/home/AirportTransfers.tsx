import Image from "next/image";
import Link from "next/link";
import heathrow from "@/public/image-4.jpg";
import { airports } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  ClockIcon,
  LuggageIcon,
  NameBoardIcon,
  PlaneIcon,
} from "@/components/home/icons";

/**
 * The airport service, given the biggest block on the page — §6 of the
 * brief names it the thing to "highlight strongly", and every claim
 * below is drawn from that list. Left-aligned where the other sections
 * centre: a split layout earns the photograph a full column instead of
 * a card crop, and the change of rhythm marks this as the flagship.
 */

const features = [
  {
    icon: NameBoardIcon,
    title: "Met inside arrivals",
    text: "Your chauffeur waits inside the arrivals hall with a personalised name board — no calls, no searching the concourse.",
  },
  {
    icon: PlaneIcon,
    title: "Live flight monitoring",
    text: "We track the aircraft, not the booking. Delays and early landings simply move your pick-up.",
  },
  {
    icon: LuggageIcon,
    title: "Luggage, handled",
    text: "Help from the carousel to a pre-cooled car, with clear pick-up instructions sent before you land.",
  },
  {
    icon: ClockIcon,
    title: "Around the clock",
    text: "First flights out and last flights in — airport transfers run 24 hours, every day.",
  },
] as const;

export function AirportTransfers() {
  return (
    <section
      className="surface-marble section overflow-hidden"
      aria-labelledby="airports-heading"
    >
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---------------- Copy ---------------- */}
          <div>
            <Reveal>
              <p className="eyebrow">Airport Transfers</p>
              <h2
                id="airports-heading"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                The journey home begins{" "}
                <span className="text-metal">inside arrivals</span>
              </h2>
              <div className="rule-gold mt-7" />
            </Reveal>

            <ul className="mt-10 space-y-8">
              {features.map((f, i) => (
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

            <Reveal delay={120} className="mt-10">
              <Link href="/quote" className="btn btn-secondary">
                Arrange an Airport Transfer
              </Link>
            </Reveal>
          </div>

          {/* ---------------- Photograph ---------------- */}
          <Reveal delay={90} className="relative">
            {/* Offset gold frame — the one flourish this section gets.
                Behind and askew of the photograph, so the pair reads as
                mounted rather than boxed. */}
            <div
              aria-hidden
              className="border-gold/30 absolute -top-4 -right-4 bottom-4 left-4 rounded-md border md:-top-5 md:-right-5 md:bottom-5 md:left-5"
            />
            <div className="grain relative aspect-4/3 overflow-hidden rounded-md border border-white/10">
              <Image
                src={heathrow}
                alt="A chauffeur waiting with a black Mercedes V-Class at the Heathrow Terminal 2 drop-off"
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
        </div>

        {/* ---------------- The five airports ---------------- */}
        <Reveal className="mt-16 border-t border-white/10 pt-10 lg:mt-20">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="eyebrow text-white/45 shrink-0">
              Serving every London airport
            </p>
            <ul className="flex flex-wrap gap-3">
              {airports.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="hover:border-gold/60 hover:text-gold block rounded-sm border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.12em] text-white/75 uppercase transition-colors duration-400 ease-luxe"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
