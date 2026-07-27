import Image from "next/image";
import Link from "next/link";
import dorchester from "@/public/image-5.jpg";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The concierge — §9 calls it a major selling point, and it is the one
 * offer none of the ride-hail benchmarks can copy, so it gets the
 * page's second full-bleed photographic moment. The photograph is the
 * Dorchester frame the services grid also uses, but sunk to a near-black
 * texture under the scrim — at 85% ink it reads as atmosphere, not as a
 * repeated picture, and none of the six supplied images depict the
 * concierge services themselves anyway.
 */

const offerings = [
  "Restaurant reservations",
  "Luxury hotel reservations",
  "VIP nightclub bookings",
  "Event & concert tickets",
  "Private jet & helicopter charter",
  "Close protection",
  "Personal shopping",
  "Flowers & gift delivery",
];

export function Concierge() {
  return (
    <section
      className="relative isolate overflow-hidden"
      aria-labelledby="concierge-heading"
    >
      {/* Backdrop, sunk almost to black */}
      <div aria-hidden className="grain absolute inset-0 -z-10">
        <Image
          src={dorchester}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="container-x section">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal className="flex flex-col items-center">
            <p className="eyebrow">Concierge</p>
            <h2
              id="concierge-heading"
              className="font-display text-h2 mt-5 font-light text-balance"
            >
              Beyond <span className="text-metal">the drive</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
            <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
              The car is often the beginning. Our concierge arranges the
              evening around it — quietly, and to the same standard.
            </p>
          </Reveal>

          <Reveal delay={90} className="mt-12 w-full">
            <ul className="grid gap-x-10 gap-y-4 text-left sm:grid-cols-2">
              {offerings.map((o) => (
                <li
                  key={o}
                  className="flex items-center gap-4 border-b border-white/10 pb-4"
                >
                  <span aria-hidden className="bg-gold h-px w-5 shrink-0" />
                  <span className="text-sm text-white/80">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="mt-12">
            <Link href="/concierge" className="btn btn-secondary">
              Discover the Concierge
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
