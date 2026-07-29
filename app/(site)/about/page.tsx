import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fleet from "@/public/image-6.jpg";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  GemIcon,
  PhoneIcon,
  ShieldIcon,
  SteeringWheelIcon,
  TagIcon,
  WhatsAppIcon,
} from "@/components/home/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A premium chauffeur service, not a taxi company — licensed and insured, available 24/7, with every journey quoted by hand and no upfront online payment.",
  alternates: { canonical: "/about" },
};

/**
 * About — deliberately a statement of standards rather than a company
 * history, because the brief contains no history to tell.
 *
 * TODO(client) — this page is honest but thin, and these are the five
 * things that would make it genuinely persuasive. Every one of them has
 * to come from the client; none may be guessed:
 *   1. When the business started, or how long the owner has been driving.
 *   2. The private hire licence number and issuing authority (§18 —
 *      needed for the "licensed and insured" wording anyway).
 *   3. How many chauffeurs and vehicles, even roughly.
 *   4. Anything true and specific about the owner — why they started it,
 *      what they did before. One honest paragraph beats a page of
 *      adjectives, and it is the part no competitor can copy.
 *   5. Real client types or testimonials (§18 also has these outstanding).
 * Until then: no numbers, no founding year, no team size anywhere below.
 */

const principles = [
  {
    icon: TagIcon,
    title: "Quoted by hand, then fixed",
    text: "No meter and no surge pricing. A person reads your journey, prices it, and that price holds — whatever the traffic, the hour or the date does afterwards.",
  },
  {
    icon: SteeringWheelIcon,
    title: "A chauffeur assigned in advance",
    text: "Not whoever happens to be nearest. Your chauffeur is allocated to the booking, briefed on the journey, and expected to be in position before the appointed time.",
  },
  {
    icon: ShieldIcon,
    title: "Licensed, insured, accountable",
    text: `${site.licence}, with professional, vetted chauffeurs — and details available on request for any company whose travel policy asks for them.`,
  },
  {
    icon: GemIcon,
    title: "Discretion, as the default",
    text: "Calls are taken and papers are read as though the front seat were empty. Where you went and who you were with is not discussed anywhere.",
  },
] as const;

const coverage = [
  { value: "5", label: "London airports covered" },
  { value: "24/7", label: "Every day of the year" },
  { value: "Nationwide", label: "Beyond London by road" },
  { value: "By hand", label: "Every quotation prepared" },
] as const;

export default function AboutPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `${site.url}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* ---------------- Masthead ---------------- */}
      <section className="surface-marble section pt-32 md:pt-40">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">About Us</p>
                <h1 className="font-display text-h1 mt-5 font-light text-balance">
                  A chauffeur service,{" "}
                  <span className="text-metal">not a taxi company</span>
                </h1>
                <div className="rule-gold mt-7" />
                <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                  Exotic Travel exists for the journeys where arriving well
                  matters — the flight that lands at six, the client who must
                  be collected properly, the morning of a wedding. Executive
                  cars, professional chauffeurs, and a price agreed by a
                  person before you travel.
                </p>
              </Reveal>

              <Reveal
                delay={100}
                className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <Link href="/quote" className="btn btn-primary">
                  Get Instant Quote
                </Link>
                <Link href="/chauffeur-services" className="btn btn-ghost">
                  Our Services
                </Link>
              </Reveal>
            </div>

            <Reveal delay={90} className="relative">
              <div
                aria-hidden
                className="border-gold/30 absolute -top-4 -right-4 bottom-4 left-4 rounded-md border md:-top-5 md:-right-5 md:bottom-5 md:left-5"
              />
              <div className="grain relative aspect-4/3 overflow-hidden rounded-md border border-white/10">
                <Image
                  src={fleet}
                  alt="The Exotic Travel fleet — a Range Rover, Mercedes S-Class and Mercedes V-Class lined up at Heathrow Terminal 3"
                  fill
                  preload
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="from-ink/60 absolute inset-0 bg-linear-to-t via-transparent to-transparent"
                />
              </div>
            </Reveal>
          </div>

          {/* ---------------- Coverage ---------------- */}
          <Reveal className="mt-16 border-t border-white/10 pt-10 lg:mt-20">
            <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
              {coverage.map((c, i) => (
                <div
                  key={c.label}
                  className={`px-2 text-center md:px-6 ${
                    i % 2 === 1 ? "border-l border-white/10" : ""
                  } ${i >= 2 ? "md:border-l" : ""}`}
                >
                  <dd className="font-display text-h3 text-gold font-light">
                    {c.value}
                  </dd>
                  <dt className="text-muted mt-2 text-xs tracking-[0.08em] uppercase">
                    {c.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------- The distinction ---------------- */}
      <section className="section" aria-labelledby="about-distinction">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">The Distinction</p>
              <h2
                id="about-distinction"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                The difference is{" "}
                <span className="text-metal">everything around the car</span>
              </h2>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-8 text-lg text-pretty">
                Any company can move you across a city. What separates a
                chauffeur service is what happens either side of the driving:
                a flight watched from take-off so a delay costs you nothing, a
                chauffeur standing inside arrivals with a name board rather
                than texting from a car park, a boot opened for your luggage,
                and a price that was settled before you left home.
              </p>
              <p className="text-muted mt-6 text-lg text-pretty">
                None of that is expensive to promise. It is simply expensive to
                do badly — which is why we would rather quote each journey
                properly than run a meter and hope.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- How we work ---------------- */}
      <section
        className="surface-marble section"
        aria-labelledby="about-principles"
      >
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">How We Work</p>
            <h2
              id="about-principles"
              className="font-display text-h2 mt-5 max-w-3xl font-light text-balance"
            >
              Four things we{" "}
              <span className="text-metal">do not compromise</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 90}>
                <article className="card card-interactive flex h-full gap-5 p-8">
                  <span className="border-gold/30 text-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-full border">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-white">
                      {p.title}
                    </h3>
                    <p className="text-muted mt-2.5 text-sm text-pretty">
                      {p.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="mx-auto max-w-2xl text-center text-sm text-white/45 text-pretty">
              {site.paymentNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Where to go next ---------------- */}
      <section
        className="surface-raised border-y border-white/10"
        aria-labelledby="about-next"
      >
        <div className="container-x section">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">What We Do</p>
              <h2
                id="about-next"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                Rather more than{" "}
                <span className="text-metal">the airport run</span>
              </h2>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-7 text-lg text-pretty">
                Airport transfers are where most guests meet us. Corporate
                accounts, weddings, events, proms, long-distance journeys and
                a private concierge are the rest of it.
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-10">
              <ul className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "Airport Transfers", href: "/airport-transfers" },
                  { label: "Executive Chauffeur", href: "/chauffeur-services" },
                  { label: "Corporate Travel", href: "/corporate-travel" },
                  { label: "Weddings", href: "/services/weddings" },
                  { label: "Events", href: "/services/events" },
                  { label: "Concierge", href: "/concierge" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="hover:border-gold/60 hover:text-gold ease-luxe block rounded-sm border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.12em] text-white/75 uppercase transition-colors duration-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Closing ---------------- */}
      <section className="relative" aria-labelledby="about-cta">
        <div className="meander opacity-30" />
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Begin</p>
              <h2
                id="about-cta"
                className="font-display text-h1 mt-6 font-light text-balance"
              >
                Travel with us once{" "}
                <span className="text-metal">and you will see it.</span>
              </h2>
              <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                Send a journey and judge us on the quotation, the car and the
                chauffeur — in that order.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <Link href="/quote" className="btn btn-primary">
                Get Instant Quote
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
              <a href={site.phone.href} className="btn btn-ghost">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                Call Now
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
