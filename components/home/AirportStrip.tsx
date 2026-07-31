import Image from "next/image";
import Link from "next/link";
import { airportPages } from "@/content/airports";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The airports we cover, immediately below the hero.
 *
 * Driven straight from content/airports.ts — the marks, their optical
 * heights and the pages they link to all live there, so this strip can
 * never list an airport the site cannot actually show you.
 *
 * The logos render white via `.logo-mono`; see the note beside that
 * class in globals.css for why they cannot be used in their own colours.
 * They also sit at 60% opacity, lifting to full on hover — a credentials
 * strip should read as quiet reassurance, not as six brands shouting
 * over the headline directly above them.
 *
 * TODO(client): these are third-party trademarks. Displaying them is
 * normal for a transfer company and reads as "airports we serve", but it
 * can imply an official partnership — worth confirming the client is
 * comfortable, since it is their name on the site.
 */
export function AirportStrip() {
  return (
    <section
      aria-labelledby="airport-strip-heading"
      className="surface-raised border-b border-white/10"
    >
      <div className="container-x section-tight">
        <Reveal className="text-center">
          <h2 id="airport-strip-heading" className="eyebrow">
            Airports We Serve
          </h2>
          <p className="text-muted mx-auto mt-4 max-w-xl text-sm text-pretty">
            Meet &amp; greet inside the terminal and live flight monitoring at
            every one, around the clock.
          </p>
        </Reveal>

        {/* Two across on a phone rather than three: these are wordmarks,
            not icons, and the widest is more than three times as wide as
            it is tall. No dividers — spacing carries the rhythm, and a
            ruled grid would fight the marks' own whitespace. */}
        <ul className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:mt-12 md:grid-cols-6 md:gap-x-8">
          {airportPages.map((a, i) => (
            <li key={a.slug} className="flex justify-center">
              <Reveal delay={(i % 3) * 70}>
                <Link
                  href={`/airport-transfers/${a.slug}`}
                  className="group flex items-center justify-center"
                >
                  {/* Height-constrained, so none of these ever paints
                      wider than about 130px. Without `sizes` Next ships
                      the 3840px variant of a logo the size of a postage
                      stamp — six times over, right below the hero. */}
                  <Image
                    src={a.logo}
                    alt={a.fullName}
                    sizes="160px"
                    className={`logo-mono w-auto max-w-full object-contain opacity-60 transition-opacity duration-500 ease-luxe group-hover:opacity-100 ${a.logoSize}`}
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
