import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import claridges from "@/public/image-3.jpg";
import dorchester from "@/public/image-5.jpg";
import savoy from "@/public/image-2.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

/**
 * What we arrange, beyond the airport run the next section owns. Three
 * photographic cards for the services with pages of their own, then the
 * full roll-call of occasions from §1 as a single quiet line — the brief
 * is emphatic that we are not airport-only, and the list is how every
 * occasion gets named without ten thin cards nobody reads.
 */

type Service = {
  title: string;
  text: string;
  href: string;
  image: StaticImageData;
  alt: string;
  /** Crop bias. image-2/-3 carry AI plate artifacts low in the frame
      (§15) — keeping the crop high keeps them out of it. */
  position: string;
};

const services: Service[] = [
  {
    title: "Executive Chauffeur",
    text: "A professional chauffeur and an executive car, for the evening or the week. Discretion as standard.",
    href: "/chauffeur-services",
    image: claridges,
    alt: "A chauffeur holding the door of a black Mercedes S-Class outside Claridge's at dusk",
    position: "object-[50%_30%]",
  },
  {
    title: "Corporate Travel",
    text: "Punctual, accountable travel for teams and visiting partners, with simple monthly invoicing on account.",
    href: "/corporate-travel",
    image: dorchester,
    alt: "A black Mercedes S-Class waiting outside The Dorchester, chauffeur holding the rear door open",
    position: "object-[50%_45%]",
  },
  {
    title: "Weddings & Events",
    text: "Immaculate cars and unhurried chauffeurs for the days photographed — weddings, proms and red-carpet evenings.",
    href: "/services/weddings",
    image: savoy,
    alt: "A top-hatted doorman opening the door of a black Mercedes S-Class outside The Savoy",
    position: "object-[50%_30%]",
  },
];

const occasions = [
  "Business Meetings",
  "Proms",
  "Festivals",
  "Concerts",
  "Sporting Events",
  "VIP Events",
  "Hotel Transfers",
  "Cruise Ports",
  "Hourly Hire",
  "Long Distance",
];

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        href={service.href}
        className="card card-interactive group block overflow-hidden"
      >
        {/* The photograph is clipped by its own box, not the card, so
            the hover zoom can breathe without pushing the text. */}
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            placeholder="blur"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-slow ease-luxe group-hover:scale-[1.04] ${service.position}`}
          />
          {/* Seats the photograph into the card's dark chrome */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-elevated via-transparent to-transparent"
          />
        </div>

        <div className="p-7 pt-5">
          <h3 className="font-display text-h3 font-light text-white">
            {service.title}
          </h3>
          <p className="text-muted mt-3 text-sm">{service.text}</p>
          <span className="text-gold mt-5 flex items-center gap-2.5 text-[11px] tracking-[0.14em] uppercase">
            Discover
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
        </div>
      </Link>
    </Reveal>
  );
}

export function Services() {
  return (
    <section className="section" aria-labelledby="services-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Chauffeur Services"
          title={
            <span id="services-heading">
              One standard, <span className="text-metal">every occasion</span>
            </span>
          }
          lead="Airport runs are where most guests meet us — rarely where it ends. The same chauffeurs, the same cars, whatever the day asks."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.href} service={s} delay={i * 90} />
          ))}
        </div>

        {/* §1's full list of catered occasions, in one breath.
            A wrapping flex row rather than a paragraph of spans: adjacent
            JSX elements have no whitespace between them, so an inline
            version gives the browser no break opportunity and the line
            runs off the side of a phone. Flex wraps on the boxes
            themselves, and each name stays whole. */}
        <Reveal className="mt-14 text-center">
          <p className="eyebrow text-white/45">Also arranged</p>
          <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2.5 text-sm text-white/60">
            {occasions.map((o, i) => (
              <li key={o} className="flex items-center gap-x-3">
                {o}
                {i < occasions.length - 1 && (
                  <span aria-hidden className="text-gold/60">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
