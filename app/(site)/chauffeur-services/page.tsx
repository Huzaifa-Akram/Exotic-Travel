import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import claridges from "@/public/image-3.jpg";
import { vehicleCategories, vehicleDisclaimer } from "@/lib/enquiry";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import {
  CarIcon,
  ClockIcon,
  GemIcon,
  PhoneIcon,
  RouteIcon,
  SteeringWheelIcon,
  WaterIcon,
  WhatsAppIcon,
} from "@/components/home/icons";

export const metadata: Metadata = {
  title: "Executive Chauffeur Service",
  description:
    "A professional chauffeur and an executive car — by the journey, by the hour or by the day. Discreet, punctual, licensed and insured, with every price quoted by hand.",
  alternates: { canonical: "/chauffeur-services" },
};

/**
 * The executive chauffeur page — §8's "Executive Chauffeur Service", and
 * the page carrying the brief's central positioning argument (§1): this
 * is not a minicab company. That argument is made by describing what the
 * service actually is rather than by naming competitors, which would
 * read as defensive on a page selling composure.
 *
 * The three hire models are the part of this page that exists nowhere
 * else on the site — §1 lists hourly chauffeur hire and private hire for
 * any occasion, and neither has had a home until now.
 */

const standards = [
  {
    icon: SteeringWheelIcon,
    title: "A chauffeur, not a driver",
    text: "Suited, professionally licensed and trained to hold a door rather than a conversation. They know the routes, the hotels and the side entrance that saves you ten minutes.",
  },
  {
    icon: ClockIcon,
    title: "Early, as a matter of course",
    text: "Your chauffeur is in position before the appointed time, every time. Punctuality is not something we aim at — it is the product you are buying.",
  },
  {
    icon: GemIcon,
    title: "Discretion as standard",
    text: "Calls are taken, papers are read and conversations happen as though the front seat were empty. Nothing about your travel is discussed anywhere else.",
  },
  {
    icon: WaterIcon,
    title: "The car, prepared",
    text: "Valeted before you step in, climate set, bottled water waiting. A late-model executive Mercedes or similar, kept to the standard the badge implies.",
  },
] as const;

const hireModels = [
  {
    icon: RouteIcon,
    title: "By the journey",
    text: "Point to point, at a fixed price agreed before you travel. Ideal for a meeting across town, a restaurant in the evening or a transfer between hotels.",
    detail: "One pick-up, one destination, one price.",
  },
  {
    icon: ClockIcon,
    title: "By the hour",
    text: "The car and chauffeur stay with you between engagements, waiting where you are rather than being rebooked each time you move.",
    detail: "As directed, with a minimum booking.",
  },
  {
    icon: CarIcon,
    title: "By the day",
    text: "A full day at your disposal — a schedule of meetings, a shoot, a visiting client to look after, or a wedding that runs from morning to midnight.",
    detail: "One chauffeur, the whole day.",
  },
] as const;

const occasions = [
  { label: "Airport Transfers", href: "/airport-transfers" },
  { label: "Corporate Travel", href: "/corporate-travel" },
  { label: "Weddings", href: "/services/weddings" },
  { label: "Events & Concerts", href: "/services/events" },
  { label: "Proms", href: "/services/proms" },
  { label: "Long Distance", href: "/services/long-distance" },
  { label: "Concierge", href: "/concierge" },
];

const plainOccasions = [
  "Business Meetings",
  "Hotel Transfers",
  "Cruise Port Transfers",
  "Sporting Events",
  "Festivals",
  "VIP Events",
  "Hourly Hire",
  "Private Hire for any occasion",
];

const faqs = [
  {
    q: "What makes this different from a taxi or a minicab?",
    a: "The chauffeur, the car and the certainty. Your driver is assigned in advance and dressed for the occasion, the vehicle is an executive Mercedes or similar rather than whatever was nearest, and the price is fixed by hand before you travel instead of counted upward as you go. The service is the point, not the transport.",
  },
  {
    q: "Is it more expensive than a ride-hailing app?",
    a: "Less often than people expect. We aim to beat comparable Uber and Bolt prices — the executive tiers, like it for like — while providing a significantly higher standard of car and chauffeur. Because every quotation is prepared by hand, there is no surge pricing and the figure you agree is the figure you pay.",
  },
  {
    q: "Can I request the same chauffeur again?",
    a: "Yes, and many regular clients do. Tell us who you travelled with and we will assign them where their schedule allows — it is one of the quiet advantages of a chauffeur service over an app that sends whoever is closest.",
  },
  {
    q: "How far in advance should I book?",
    a: "A day or two is comfortable, and standing arrangements are welcome. We also take same-day bookings whenever a car and chauffeur are free, so it is always worth calling — a person answers at any hour.",
  },
];

export default function ChauffeurServicesPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Executive Chauffeur Service",
        item: `${site.url}/chauffeur-services`,
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
                <p className="eyebrow">Executive Chauffeur</p>
                <h1 className="font-display text-h1 mt-5 font-light text-balance">
                  An executive car,{" "}
                  <span className="text-metal">and someone to drive it</span>
                </h1>
                <div className="rule-gold mt-7" />
                <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                  By the journey, by the hour or by the day. A professional
                  chauffeur, a late-model Mercedes or similar, and a price
                  settled by hand before you travel — for the meeting, the
                  evening, or the whole of a very long day.
                </p>
              </Reveal>

              <Reveal
                delay={100}
                className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
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

            <Reveal delay={90} className="relative">
              <div
                aria-hidden
                className="border-gold/30 absolute -top-4 -right-4 bottom-4 left-4 rounded-md border md:-top-5 md:-right-5 md:bottom-5 md:left-5"
              />
              <div className="grain relative aspect-4/3 overflow-hidden rounded-md border border-white/10">
                <Image
                  src={claridges}
                  alt="A chauffeur at the door of a black Mercedes S-Class outside Claridge's at dusk"
                  fill
                  preload
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  className="object-cover object-[50%_30%]"
                />
                <div
                  aria-hidden
                  className="from-ink/60 absolute inset-0 bg-linear-to-t via-transparent to-transparent"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- The standard ---------------- */}
      <section className="section" aria-labelledby="chauffeur-standard">
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">The Standard</p>
            <h2
              id="chauffeur-standard"
              className="font-display text-h2 mt-5 max-w-3xl font-light text-balance"
            >
              What you are actually{" "}
              <span className="text-metal">paying for</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
            <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
              Anyone can move you across a city. The difference is in who is
              driving, how early they arrive, and what they do not say.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
            {standards.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 90}>
                <article className="card card-interactive flex h-full gap-5 p-8">
                  <span className="border-gold/30 text-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-full border">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-white">
                      {s.title}
                    </h3>
                    <p className="text-muted mt-2.5 text-sm text-pretty">
                      {s.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Three ways to hire ---------------- */}
      <section
        className="surface-marble section"
        aria-labelledby="chauffeur-hire"
      >
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">Ways to Hire</p>
            <h2
              id="chauffeur-hire"
              className="font-display text-h2 mt-5 font-light text-balance"
            >
              Take the car for a trip,{" "}
              <span className="text-metal">an evening or a day</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
            {hireModels.map((h, i) => (
              <Reveal key={h.title} delay={i * 90}>
                <article className="card card-interactive flex h-full flex-col p-8">
                  <span className="border-gold/30 text-gold flex h-12 w-12 items-center justify-center rounded-full border">
                    <h.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-h3 mt-6 font-light text-white">
                    {h.title}
                  </h3>
                  <p className="text-muted mt-3 text-sm text-pretty">
                    {h.text}
                  </p>
                  <div className="rule my-6" />
                  <p className="text-gold mt-auto text-xs tracking-[0.08em] uppercase">
                    {h.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="mx-auto max-w-2xl text-center text-sm text-white/45 text-pretty">
              Not sure which suits the day? Describe it when you enquire and we
              will quote the arrangement that costs you least.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Occasions ---------------- */}
      <section className="section" aria-labelledby="chauffeur-occasions">
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">Every Requirement</p>
            <h2
              id="chauffeur-occasions"
              className="font-display text-h2 mt-5 max-w-3xl font-light text-balance"
            >
              Far more than{" "}
              <span className="text-metal">the airport run</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
            <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
              Airport transfers are where most guests meet us. They are
              nowhere near the whole of what we do.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <ul className="flex flex-wrap justify-center gap-3">
              {occasions.map((o) => (
                <li key={o.href}>
                  <Link
                    href={o.href}
                    className="hover:border-gold/60 hover:text-gold ease-luxe block rounded-sm border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.12em] text-white/75 uppercase transition-colors duration-400"
                  >
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* The remainder of §1's roll-call — named, but without a page
              of their own to link to. */}
          <Reveal delay={90} className="mt-10 text-center">
            <p className="eyebrow text-white/45">Also catered for</p>
            <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2.5 text-sm text-white/60">
              {plainOccasions.map((o, i) => (
                <li key={o} className="flex items-center gap-x-3">
                  {o}
                  {i < plainOccasions.length - 1 && (
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

      {/* ---------------- Vehicles ---------------- */}
      <section
        className="surface-raised border-y border-white/10"
        aria-labelledby="chauffeur-vehicles"
      >
        <div className="container-x section">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">The Fleet</p>
            <h2
              id="chauffeur-vehicles"
              className="font-display text-h2 mt-5 font-light text-balance"
            >
              Choose the category —{" "}
              <span className="text-metal">we send the car</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-8">
            {vehicleCategories
              .filter((v) => v.value !== "recommend")
              .map((v, i) => (
                <Reveal key={v.value} delay={i * 90}>
                  <article className="card card-interactive flex h-full flex-col p-8">
                    <h3 className="font-display text-h3 font-light text-white">
                      {v.label}
                    </h3>
                    <p className="text-gold mt-3 text-xs tracking-[0.08em] uppercase">
                      {v.passengers} · {v.luggage}
                    </p>
                    <div className="rule my-6" />
                    <p className="text-muted text-sm">{v.examples}</p>
                  </article>
                </Reveal>
              ))}
          </div>

          <Reveal className="mt-6">
            <p className="text-center text-xs text-white/40">
              {vehicleDisclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section" aria-labelledby="chauffeur-faq">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <p className="eyebrow">Questions</p>
              <h2
                id="chauffeur-faq"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                Chauffeur service, <span className="text-metal">explained</span>
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
      <section className="relative" aria-labelledby="chauffeur-cta">
        <div className="meander opacity-30" />
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Begin</p>
              <h2
                id="chauffeur-cta"
                className="font-display text-h1 mt-6 font-light text-balance"
              >
                Tell us the day —{" "}
                <span className="text-metal">consider it arranged.</span>
              </h2>
              <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                {site.paymentNote}
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
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
