import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { airportPages, getAirport } from "@/content/airports";
import { vehicleCategories, vehicleDisclaimer } from "@/lib/enquiry";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PhoneIcon, WhatsAppIcon } from "@/components/home/icons";

/**
 * The airport page template — §8's five dedicated pages rendered from
 * content/airports.ts, per §17's rule that these are one template and a
 * data file, never five hand-written pages. Everything airport-specific
 * comes from the data; everything structural lives here once.
 *
 * Statically generated for exactly the airports the data declares —
 * dynamicParams is off, so an unknown slug is a 404 at the router, not
 * a half-rendered page.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return airportPages.map((a) => ({ airport: a.slug }));
}

type Props = { params: Promise<{ airport: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { airport } = await params;
  const a = getAirport(airport);
  if (!a) return {};
  return {
    title: `${a.fullName} Transfers (${a.code})`,
    description: a.metaDescription,
    alternates: { canonical: `/airport-transfers/${a.slug}` },
  };
}

/* -------------------------------------------------------------- */

const arrivalSteps = [
  {
    n: "01",
    title: "Before you land",
    text: "Your flight is tracked from departure. A delay or an early landing moves the pick-up automatically — nothing to call, nothing to rebook, nothing extra to pay.",
  },
  {
    n: "02",
    title: "Inside arrivals",
    text: "Your chauffeur waits in the arrivals hall with a name board and clear instructions already in your inbox, ready to help with luggage the moment you clear the doors.",
  },
  {
    n: "03",
    title: "Straight to the car",
    text: "A pre-cooled executive car, bottled water waiting, and a fixed quote agreed before you flew. Pay by cash, bank transfer, or card at your destination.",
  },
] as const;

export default async function AirportPage({ params }: Props) {
  const { airport } = await params;
  const a = getAirport(airport);
  if (!a) notFound();

  const quoteHref = `/quote?from=${encodeURIComponent(a.quotePrefill)}`;
  const others = airportPages.filter((o) => o.slug !== a.slug);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Airport Transfers",
        item: `${site.url}/airport-transfers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${a.fullName} Transfers`,
        item: `${site.url}/airport-transfers/${a.slug}`,
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
                <nav aria-label="Breadcrumb">
                  <ol className="flex flex-wrap items-center gap-3 text-[11px] tracking-[0.16em] uppercase">
                    <li>
                      <Link
                        href="/airport-transfers"
                        className="text-muted hover:text-gold transition-colors"
                      >
                        Airport Transfers
                      </Link>
                    </li>
                    <li aria-hidden className="text-gold/60">
                      ·
                    </li>
                    <li className="text-gold">{a.code}</li>
                  </ol>
                </nav>

                <h1 className="font-display text-h1 mt-6 font-light text-balance">
                  {a.name} Airport <span className="text-metal">Transfers</span>
                </h1>
                <div className="rule-gold mt-7" />
                <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                  {a.intro}
                </p>
              </Reveal>

              <Reveal
                delay={100}
                className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <Link href={quoteHref} className="btn btn-primary">
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
              </Reveal>
            </div>

            <Reveal delay={90} className="relative">
              {/* The offset gold mount the homepage's airport section
                  introduced — repeated here so the two read as one
                  family. */}
              <div
                aria-hidden
                className="border-gold/30 absolute -top-4 -right-4 bottom-4 left-4 rounded-md border md:-top-5 md:-right-5 md:bottom-5 md:left-5"
              />
              <div className="grain relative aspect-4/3 overflow-hidden rounded-md border border-white/10">
                <Image
                  src={a.image}
                  alt={a.imageAlt}
                  fill
                  preload
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

          {/* ---------------- The facts ---------------- */}
          <Reveal className="mt-16 border-t border-white/10 pt-10 lg:mt-20">
            <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
              {(
                [
                  [a.distance, a.direction],
                  [a.journeyTime, "typical drive, traffic allowing"],
                  [a.terminalsStat, "covered in both directions"],
                  ["24/7", "every day of the year"],
                ] as const
              ).map(([value, label], i) => (
                <div
                  key={label}
                  className={`px-2 text-center md:px-6 ${
                    i % 2 === 1 ? "border-l border-white/10" : ""
                  } ${i >= 2 ? "md:border-l" : ""}`}
                >
                  <dd className="font-display text-h3 text-gold font-light">
                    {value}
                  </dd>
                  <dt className="text-muted mt-2 text-xs tracking-[0.08em] uppercase">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------- The arrival, arranged ---------------- */}
      <section className="section" aria-labelledby={`${a.slug}-arrival`}>
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">Meet &amp; Greet</p>
            <h2
              id={`${a.slug}-arrival`}
              className="font-display text-h2 mt-5 max-w-3xl font-light text-balance"
            >
              The arrival, <span className="text-metal">arranged</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
            <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
              {a.body}
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {arrivalSteps.map((s, i) => (
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

      {/* ---------------- Terminals & departures ---------------- */}
      <section
        className="surface-raised border-y border-white/10"
        aria-labelledby={`${a.slug}-terminals`}
      >
        <div className="container-x section">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow">Arrivals</p>
              <h2
                id={`${a.slug}-terminals`}
                className="font-display text-h3 mt-4 font-light"
              >
                Terminals covered
              </h2>
              <ul className="mt-7 flex flex-wrap gap-3">
                {a.terminals.map((t) => (
                  <li
                    key={t}
                    className="rounded-sm border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.12em] text-white/75 uppercase"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-muted mt-6 max-w-lg text-sm text-pretty">
                {a.terminalNote}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <p className="eyebrow">Departures</p>
              <h2 className="font-display text-h3 mt-4 font-light">
                Flying out of {a.code}
              </h2>
              <p className="text-muted mt-7 max-w-lg text-sm text-pretty">
                Departures are planned backwards from take-off: we watch the
                roads, leave margin the motorway cannot take away, and drop
                you kerbside at the right terminal with time in hand. Early
                flights are our speciality — the service runs 24 hours, so a
                4am collection is scheduled, confirmed the evening before,
                and waiting when you step out.
              </p>
              <p className="mt-6 text-sm">
                <a
                  href={site.phone.href}
                  className="text-gold hover:text-gold-bright transition-colors"
                >
                  {site.phone.display}
                </a>{" "}
                <span className="text-muted">
                  — a person answers, at any hour.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Vehicles ---------------- */}
      <section className="section" aria-labelledby={`${a.slug}-vehicles`}>
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">The Fleet</p>
            <h2
              id={`${a.slug}-vehicles`}
              className="font-display text-h2 mt-5 font-light text-balance"
            >
              Travel as <span className="text-metal">you prefer</span>
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
      <section
        className="surface-marble section"
        aria-labelledby={`${a.slug}-faq`}
      >
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <p className="eyebrow">Questions</p>
              <h2
                id={`${a.slug}-faq`}
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                {a.name}, <span className="text-metal">answered</span>
              </h2>
              <div className="rule-gold mx-auto mt-7" />
            </Reveal>

            <Reveal delay={80} className="mt-12">
              <FaqAccordion items={a.faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Closing ---------------- */}
      <section className="relative" aria-labelledby={`${a.slug}-cta`}>
        <div className="meander opacity-30" />
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Begin</p>
              <h2
                id={`${a.slug}-cta`}
                className="font-display text-h1 mt-6 font-light text-balance"
              >
                Flying via {a.code}?{" "}
                <span className="text-metal">Consider it arranged.</span>
              </h2>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <Link href={quoteHref} className="btn btn-primary">
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

            {/* The other four airports, one hop away */}
            <Reveal delay={160} className="mt-14 border-t border-white/10 pt-8">
              <p className="eyebrow text-white/45">Also serving</p>
              <ul className="mt-5 flex flex-wrap justify-center gap-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/airport-transfers/${o.slug}`}
                      className="hover:border-gold/60 hover:text-gold block rounded-sm border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.12em] text-white/75 uppercase transition-colors duration-400 ease-luxe"
                    >
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
