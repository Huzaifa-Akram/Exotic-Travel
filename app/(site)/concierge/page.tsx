import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dorchester from "@/public/image-5.jpg";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import {
  ChampagneIcon,
  DiningIcon,
  GiftIcon,
  KeyIcon,
  PhoneIcon,
  PlaneIcon,
  ShieldIcon,
  ShoppingBagIcon,
  TicketIcon,
  WhatsAppIcon,
} from "@/components/home/icons";

export const metadata: Metadata = {
  title: "Concierge",
  description:
    "A private concierge for guests travelling with us — restaurant and hotel reservations, VIP tables, event tickets, private jet and helicopter charter, close protection, personal shopping and gifts.",
  alternates: { canonical: "/concierge" },
};

/**
 * The concierge page — §9 of the brief calls this a major selling point,
 * and it is the one offer none of the ride-hail benchmarks can copy, so
 * it gets the site's most typographic treatment: no card chrome on the
 * service list, just hairlines and space.
 *
 * TODO(client): §9 lists these eight services but never says how they
 * are fulfilled — in-house, or through partners. Every line below is
 * therefore written as a request we take and arrange, quoted before
 * anything is committed, rather than a capability we claim to own. If
 * the client has standing arrangements (a charter broker, an SIA
 * security partner, particular restaurant relationships), the copy can
 * be made much more specific — and should be. Ask before launch.
 *
 * None of the six supplied photographs depicts a concierge service, so
 * the page carries one scrimmed hotel frame at the masthead and nothing
 * else. The alternative was decorative stock imagery, which on a page
 * about discretion would undercut the argument.
 */

const services = [
  {
    icon: DiningIcon,
    title: "Restaurant reservations",
    text: "The table on the night you actually want it. Tell us the party and the part of town; where a table genuinely cannot be had, you will hear so quickly, with an alternative worth taking.",
  },
  {
    icon: KeyIcon,
    title: "Luxury hotel reservations",
    text: "Rooms and suites arranged around the journey rather than booked in isolation — including the late check-out that makes a morning flight civilised.",
  },
  {
    icon: ChampagneIcon,
    title: "VIP nightclub bookings",
    text: "Tables and guest list at the rooms worth the evening, with your car waiting at the end of it rather than a queue in the cold.",
  },
  {
    icon: TicketIcon,
    title: "Event and concert tickets",
    text: "Fixtures, premieres, title fights and the nights that sold out in an hour. Ask early where you can; ask anyway where you cannot.",
  },
  {
    icon: PlaneIcon,
    title: "Private jet and helicopter charter",
    text: "Point-to-point charter quoted per trip, with the car meeting you on both sides of the flight so the transfer is never the loose end.",
  },
  {
    icon: ShieldIcon,
    title: "Close protection",
    text: "Discreet, licensed security for guests who need it — arranged quietly, briefed properly, and never announced by its own presence.",
  },
  {
    icon: ShoppingBagIcon,
    title: "Personal shopping",
    text: "Appointments made, collections held, purchases brought to the car. An afternoon on Bond Street without the carrying or the queueing.",
  },
  {
    icon: GiftIcon,
    title: "Flowers and gift delivery",
    text: "Waiting in the suite, on the seat, or at a door you are not going to be at. The gesture arrives on time and unmistakably well chosen.",
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Send the request",
    text: "A message on WhatsApp or a phone call, at any hour. No form to complete and no membership to hold — describe what you would like and leave the arranging to us.",
  },
  {
    n: "02",
    title: "We come back with a price",
    text: "Once we know what is possible, you receive the detail and the cost together — including anything a venue or operator charges — before a single booking is made.",
  },
  {
    n: "03",
    title: "Nothing moves until you say so",
    text: "Approve it and it is arranged, confirmed in writing, and looked after end to end. Decline it and there is nothing to pay and nothing to unwind.",
  },
] as const;

const faqs = [
  {
    q: "Do I have to be a chauffeur client to ask?",
    a: "The concierge exists for guests travelling with us, and that is who it is built around — but we will always take the enquiry. If a request stands on its own, tell us what you need and we will say honestly whether we can arrange it.",
  },
  {
    q: "What does the concierge cost?",
    a: "Asking costs nothing. Each request is quoted individually once we know what is involved, and any venue, operator or supplier charge is shown in that quotation — never added afterwards. You approve the figure before anything is booked.",
  },
  {
    q: "How much notice do you need?",
    a: "The sooner the better, particularly for tables on a Saturday, sold-out fixtures and charter at short notice. That said, a great deal can still be arranged the same day, and a request made late is better than one never made.",
  },
  {
    q: "Is it discreet?",
    a: "Entirely. Discretion is the service, not a feature of it — our chauffeurs and our office treat everything about your travel and your arrangements as private, and nothing is discussed outside the people arranging it.",
  },
];

export default function ConciergePage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Concierge",
        item: `${site.url}/concierge`,
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
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="grain absolute inset-0 -z-10">
          <Image
            src={dorchester}
            alt="A black Mercedes S-Class waiting outside The Dorchester, chauffeur holding the rear door open"
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            quality={85}
            className="object-cover object-[50%_40%]"
          />
          {/* Sunk almost to black. The photograph is atmosphere here —
              the page's argument is made in words. */}
          <div className="bg-ink/80 absolute inset-0" />
          <div className="from-ink/90 to-ink absolute inset-0 bg-linear-to-b via-transparent" />
        </div>

        <div className="container-x section pt-36 md:pt-44">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Concierge</p>
              <h1 className="font-display text-h1 mt-5 font-light text-balance">
                Anything the evening needs,{" "}
                <span className="text-metal">quietly arranged.</span>
              </h1>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
                The car is usually the beginning. Our concierge arranges what
                sits either side of it — the table, the suite, the tickets,
                the flight — to the same standard, and without ever making it
                your job to chase.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                Message the Concierge
              </a>
              <a href={site.phone.href} className="btn btn-ghost">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                Call Now
              </a>
            </Reveal>

            <Reveal delay={160} className="mt-8">
              <p className="text-xs text-white/45">
                {site.phone.display} · Answered at any hour
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- The eight ----------------
          Hairlines and space rather than eight cards. A grid of tiles
          would make this read as a product menu; the page is selling
          the opposite of self-service. */}
      <section className="section" aria-labelledby="concierge-services">
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">What We Arrange</p>
            <h2
              id="concierge-services"
              className="font-display text-h2 mt-5 max-w-3xl font-light text-balance"
            >
              Ask for one thing, or{" "}
              <span className="text-metal">the whole evening</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
          </Reveal>

          <ul className="mt-14 grid gap-x-14 lg:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 90}>
                <li className="flex h-full gap-6 border-b border-white/10 py-8">
                  <span className="border-gold/30 text-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-full border">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-h3 font-light text-white">
                      {s.title}
                    </h3>
                    <p className="text-muted mt-3 text-sm text-pretty">
                      {s.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10">
            <p className="mx-auto max-w-2xl text-center text-sm text-white/45 text-pretty">
              Not listed is not the same as not possible. If it can be
              arranged in this city, it is worth asking us first.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section
        className="surface-marble section"
        aria-labelledby="concierge-how"
      >
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">How It Works</p>
            <h2
              id="concierge-how"
              className="font-display text-h2 mt-5 font-light text-balance"
            >
              One message, <span className="text-metal">then nothing to do</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
            <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
              No membership, no retainer, and no charge for asking — the same
              enquiry-first way the journeys work.
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <li className="h-full md:px-2">
                  <div className="flex items-center gap-5">
                    <span className="font-display text-metal text-h1 leading-none font-light">
                      {s.n}
                    </span>
                    <span
                      aria-hidden
                      className="via-gold/30 h-px flex-1 bg-linear-to-r from-transparent to-transparent"
                    />
                  </div>
                  <h3 className="mt-6 text-base font-medium text-white">
                    {s.title}
                  </h3>
                  <p className="text-muted mt-3 text-sm text-pretty">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- The car is part of it ---------------- */}
      <section
        className="surface-raised border-y border-white/10"
        aria-labelledby="concierge-travel"
      >
        <div className="container-x section">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Travel Included</p>
              <h2
                id="concierge-travel"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                Arranged around{" "}
                <span className="text-metal">the same car</span>
              </h2>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-7 text-lg text-pretty">
                This is the advantage of asking the people already driving
                you. The table is booked knowing what time the flight lands;
                the car is waiting outside the restaurant when it ends; the
                chauffeur who took you to dinner is the one who takes you
                home. Nothing is handed between three companies who have
                never spoken.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <Link href="/airport-transfers" className="btn btn-secondary">
                Airport Transfers
              </Link>
              <Link href="/quote" className="btn btn-ghost">
                Get a Quote
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section" aria-labelledby="concierge-faq">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <p className="eyebrow">Questions</p>
              <h2
                id="concierge-faq"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                Before <span className="text-metal">you ask</span>
              </h2>
              <div className="rule-gold mx-auto mt-7" />
            </Reveal>

            <Reveal delay={80} className="mt-12">
              <FaqAccordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Closing ---------------- */}
      <section className="relative" aria-labelledby="concierge-cta">
        <div className="meander opacity-30" />
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Begin</p>
              <h2
                id="concierge-cta"
                className="font-display text-h1 mt-6 font-light text-balance"
              >
                Tell us what you would like.{" "}
                <span className="text-metal">Consider it arranged.</span>
              </h2>
              <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                A message is enough to start. Nothing is booked, committed or
                charged until you have seen the detail and agreed the price.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                Message the Concierge
              </a>
              <a href={site.phone.href} className="btn btn-ghost">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                Call {site.phone.display}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
