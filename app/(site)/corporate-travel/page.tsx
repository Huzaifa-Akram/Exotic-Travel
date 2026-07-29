import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dorchester from "@/public/image-5.jpg";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import {
  BriefcaseIcon,
  ClockIcon,
  GemIcon,
  HeadsetIcon,
  InvoiceIcon,
  PhoneIcon,
  PlaneIcon,
  ShieldIcon,
  WhatsAppIcon,
} from "@/components/home/icons";

export const metadata: Metadata = {
  title: "Corporate Travel & Accounts",
  description:
    "Corporate chauffeur travel with simple monthly invoicing — punctual, accountable and discreet. Airport runs, visiting clients, roadshows and multi-stop days, on one account.",
  alternates: { canonical: "/corporate-travel" },
};

/**
 * Corporate travel — a nav item (§3) and §8's "Corporate Accounts".
 * §10 also asks for a business / corporate account enquiry route, which
 * this page is: the closing CTA opens an account rather than booking a
 * single journey.
 *
 * Written for two readers at once — the executive assistant who will
 * book it and the finance manager who will approve it. Hence the
 * accounting section: for the second reader, "one invoice a month" is
 * the actual selling point, not the leather.
 *
 * TODO(client): invoicing terms are described as "agreed when the
 * account opens" because the client has not specified them. If there
 * are standard terms (30 days, monthly statement date, PO references,
 * credit limits), they belong on this page — a finance approver looks
 * for exactly that and its absence costs conversions.
 */

const advantages = [
  {
    icon: ClockIcon,
    title: "Punctuality you can plan around",
    text: "Chauffeurs arrive early as standard and flights are monitored from take-off, so a meeting is never rearranged around a car that has not turned up.",
  },
  {
    icon: InvoiceIcon,
    title: "One invoice, not forty receipts",
    text: "Every journey on the account appears on a single monthly invoice, with cost centres or references as you need them. Nobody has to expense a cab fare again.",
  },
  {
    icon: GemIcon,
    title: "Discretion in the back seat",
    text: "Calls are taken and papers are read as though the front seat were empty. Client names, destinations and conversations go no further than the car.",
  },
  {
    icon: ShieldIcon,
    title: "Duty of care, documented",
    text: "A licensed and insured private hire operator with professional, vetted chauffeurs — the answer to the question your travel policy asks.",
  },
  {
    icon: HeadsetIcon,
    title: "A person, at any hour",
    text: "Assistants and travelling staff reach a human on the phone or WhatsApp around the clock — never a ticket queue, and never an app with no one behind it.",
  },
  {
    icon: BriefcaseIcon,
    title: "Priced by arrangement",
    text: "Regular routes are quoted once and held, so the airport run costs the same in December as it did in June. No surge pricing, ever.",
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Tell us your pattern",
    text: "The routes you run most, roughly how often, who books and who approves. A short conversation is usually all it takes.",
  },
  {
    n: "02",
    title: "We set the account up",
    text: "Agreed rates for your regular journeys, named contacts who can book, references and cost centres as your finance team needs them, and invoicing terms confirmed in writing.",
  },
  {
    n: "03",
    title: "Book by whichever means suits",
    text: "Phone, WhatsApp or email — no login to remember and no seat licences to buy. Journeys are confirmed to the booker and invoiced monthly.",
  },
] as const;

const useCases = [
  "Airport transfers for staff and visiting partners",
  "Client collection and hosting",
  "Board meetings and site visits",
  "Roadshows and multi-stop days",
  "Hourly hire between engagements",
  "Conference and event transport",
  "Long-distance and regional travel",
  "Out-of-hours travel for late finishes",
];

const faqs = [
  {
    q: "How does invoicing work?",
    a: "Journeys taken on the account are gathered onto one monthly invoice rather than paid trip by trip, with purchase order numbers, cost centres or project references included where you need them. Exact terms are agreed in writing when the account opens.",
  },
  {
    q: "Is there a minimum spend or a contract?",
    a: "No minimum and no tie-in. An account exists to make booking and paying simpler, not to commit you to volume — some clients use it several times a week, others a few times a quarter.",
  },
  {
    q: "Can several people book on the same account?",
    a: "Yes. Name the assistants or managers who may book and they can arrange travel for anyone in the business, by phone, WhatsApp or email. Confirmations go to the booker and the passenger.",
  },
  {
    q: "Can you handle a visiting client we want looked after properly?",
    a: "That is one of the things an account is for. We meet them inside arrivals with a name board, keep the same chauffeur with them through their stay if you would like, and our concierge can arrange the dinner and the hotel around it.",
  },
];

export default function CorporateTravelPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Corporate Travel",
        item: `${site.url}/corporate-travel`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* ---------------- Masthead ----------------
          Photograph on the left, reversing the chauffeur-services page —
          the two are adjacent in the nav and shouldn't open identically.
          Ordered so the copy still comes first in the DOM. */}
      <section className="surface-marble section pt-32 md:pt-40">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="lg:order-2">
              <Reveal>
                <p className="eyebrow">Corporate Travel</p>
                <h1 className="font-display text-h1 mt-5 font-light text-balance">
                  Travel your board{" "}
                  <span className="text-metal">never has to chase</span>
                </h1>
                <div className="rule-gold mt-7" />
                <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                  Punctual, accountable, discreet chauffeur travel for teams,
                  visiting clients and the days with five appointments in
                  them — arranged on one account and invoiced once a month.
                </p>
              </Reveal>

              <Reveal
                delay={100}
                className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <Link href="/quote" className="btn btn-primary">
                  Open an Account
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

            <Reveal delay={90} className="relative lg:order-1">
              <div
                aria-hidden
                className="border-gold/30 absolute -top-4 right-4 bottom-4 -left-4 rounded-md border md:-top-5 md:right-5 md:bottom-5 md:-left-5"
              />
              <div className="grain relative aspect-4/3 overflow-hidden rounded-md border border-white/10">
                <Image
                  src={dorchester}
                  alt="A black Mercedes S-Class waiting outside The Dorchester, chauffeur holding the rear door open"
                  fill
                  preload
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  className="object-cover object-[50%_45%]"
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

      {/* ---------------- Why companies keep the account ---------------- */}
      <section className="section" aria-labelledby="corporate-advantages">
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">The Case</p>
            <h2
              id="corporate-advantages"
              className="font-display text-h2 mt-5 max-w-3xl font-light text-balance"
            >
              Six reasons finance{" "}
              <span className="text-metal">approves it twice</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
            <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
              The people travelling notice the car. The people signing it off
              notice everything else.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 90}>
                <article className="card card-interactive h-full p-8">
                  <span className="border-gold/30 text-gold flex h-12 w-12 items-center justify-center rounded-full border">
                    <a.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-base font-medium text-white">
                    {a.title}
                  </h3>
                  <p className="text-muted mt-2.5 text-sm text-pretty">
                    {a.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How an account works ---------------- */}
      <section
        className="surface-marble section"
        aria-labelledby="corporate-account"
      >
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">Opening an Account</p>
            <h2
              id="corporate-account"
              className="font-display text-h2 mt-5 font-light text-balance"
            >
              One conversation,{" "}
              <span className="text-metal">then it simply runs</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
            <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
              No minimum spend, no contract, and no software to roll out to
              anybody.
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

          <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
            <Link href="/quote" className="btn btn-primary">
              Open an Account
            </Link>
            <p className="text-xs text-white/45">
              Or email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold hover:text-gold-bright transition-colors"
              >
                {site.email}
              </a>{" "}
              and we will call you back.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- What it covers ---------------- */}
      <section
        className="surface-raised border-y border-white/10"
        aria-labelledby="corporate-uses"
      >
        <div className="container-x section">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow">In Practice</p>
              <h2
                id="corporate-uses"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                Everything the working week asks for
              </h2>
              <div className="rule-gold mt-7" />
              <p className="text-muted mt-7 text-base text-pretty">
                An account is not only for the airport. It covers the client
                you want collected properly, the day with four sites on it,
                the late finish nobody should be driving home from, and the
                partner flying in on a Sunday night — all on the same terms,
                the same standard and the same invoice.
              </p>
              <p className="mt-8 text-sm">
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

            <Reveal delay={90}>
              <p className="eyebrow text-white/45">Typically booked for</p>
              <ul className="mt-6">
                {useCases.map((u) => (
                  <li
                    key={u}
                    className="flex items-center gap-4 border-b border-white/10 py-4"
                  >
                    <span aria-hidden className="bg-gold h-px w-5 shrink-0" />
                    <span className="text-sm text-white/80">{u}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted mt-6 text-sm">
                Hosting a visiting client?{" "}
                <Link
                  href="/concierge"
                  className="text-gold hover:text-gold-bright transition-colors"
                >
                  Our concierge
                </Link>{" "}
                arranges the dinner and the hotel around the travel.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section" aria-labelledby="corporate-faq">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <p className="eyebrow">Questions</p>
              <h2
                id="corporate-faq"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                Accounts, <span className="text-metal">answered</span>
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
      <section className="relative" aria-labelledby="corporate-cta">
        <div className="meander opacity-30" />
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Begin</p>
              <h2
                id="corporate-cta"
                className="font-display text-h1 mt-6 font-light text-balance"
              >
                Put your travel{" "}
                <span className="text-metal">on one account.</span>
              </h2>
              <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                Tell us the routes you run and we will come back with rates,
                terms and a single point of contact. No minimum, no contract.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <Link href="/quote" className="btn btn-primary">
                Open an Account
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

            <Reveal delay={160} className="mt-14 border-t border-white/10 pt-8">
              <p className="eyebrow text-white/45">Also for business</p>
              <ul className="mt-5 flex flex-wrap justify-center gap-3">
                {[
                  { label: "Airport Transfers", href: "/airport-transfers" },
                  { label: "Executive Chauffeur", href: "/chauffeur-services" },
                  { label: "Event Transport", href: "/services/events" },
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
    </>
  );
}
