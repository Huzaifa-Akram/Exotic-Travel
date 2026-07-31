import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import {
  ClockIcon,
  HeadsetIcon,
  InvoiceIcon,
  PhoneIcon,
  RouteIcon,
  ShieldIcon,
  WhatsAppIcon,
} from "@/components/home/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Speak to a person at any hour — by phone, WhatsApp or email. Chauffeur-driven airport transfers and executive travel across London and nationwide, 24/7.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact — §10 asks for phone, WhatsApp, email and service area, and
 * that is precisely what this page carries.
 *
 * IMPORTANT: no address, and no map. §16 records the client's explicit
 * instruction that the registered address is not to be published, which
 * is also why `lib/site.ts` has no `address` field to read. Do not add
 * one here without the client asking for it in writing.
 *
 * No contact form either, deliberately. /quote is the enquiry form, and
 * a second, vaguer form would split submissions across two paths while
 * the email pipeline is still being wired — with a general form the more
 * likely one to be missed. Journeys go to /quote; everything else goes
 * to a human on one of the three channels below.
 */

const channels = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: site.phone.display,
    note: "The quickest way to reach us. Send the details, or just ask.",
    href: site.whatsapp.href,
    external: true,
    primary: true,
  },
  {
    icon: PhoneIcon,
    label: "Telephone",
    value: site.phone.display,
    note: "Answered by a person, at any hour of the day or night.",
    href: site.phone.href,
    external: false,
    primary: false,
  },
  {
    icon: InvoiceIcon,
    label: "Email",
    value: site.email,
    note: "Best for itineraries, documents and corporate accounts.",
    href: `mailto:${site.email}`,
    external: false,
    primary: false,
  },
] as const;

const facts = [
  {
    icon: ClockIcon,
    title: "Hours",
    text: "24 hours a day, every day of the year — including the small hours either side of a flight.",
  },
  {
    icon: RouteIcon,
    title: "Service area",
    text: `${site.serviceArea}. All five London airports, plus regional airports, cruise ports and cross-country journeys.`,
  },
  {
    icon: HeadsetIcon,
    title: "Response times",
    text: "Quotations usually within the hour and always within 24. Calls and WhatsApp messages are answered as they arrive.",
  },
  {
    icon: ShieldIcon,
    title: "Credentials",
    text: `${site.licence}. Licensing and insurance details are available on request.`,
  },
] as const;

const helpfulDetails = [
  "Where you would like to be collected, and where you are going",
  "The date and time of the pick-up",
  "A flight number, if you are landing or departing",
  "How many passengers, and how many suitcases",
  "Anything particular — child seats, extra stops, waiting time",
];

export default function ContactPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${site.url}/contact`,
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
      <section className="surface-marble section-tight pt-32 md:pt-40">
        <div className="container-x">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Contact</p>
              <h1 className="font-display text-h1 mt-5 font-light text-balance">
                Speak to <span className="text-metal">a person</span>
              </h1>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
                No menus, no ticket queue and no chatbot. One number for calls
                and WhatsApp, answered around the clock — and an inbox for
                anything that needs an attachment.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- The three channels ---------------- */}
      <section className="section-tight" aria-labelledby="contact-channels">
        <div className="container-x">
          <h2 id="contact-channels" className="sr-only">
            Ways to reach us
          </h2>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 90}>
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`card card-interactive group flex h-full flex-col p-8 ${
                    c.primary ? "border-gold/40" : ""
                  }`}
                >
                  <span className="border-gold/30 text-gold flex h-12 w-12 items-center justify-center rounded-full border">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <p className="eyebrow mt-6">{c.label}</p>
                  {/* break-all rather than truncation: an email that is
                      cut off is useless, and this one has to be readable
                      on a 320px phone. */}
                  <p className="font-display group-hover:text-gold mt-3 text-h3 leading-tight font-light break-all text-white transition-colors duration-300">
                    {c.value}
                  </p>
                  <div className="rule my-6" />
                  <p className="text-muted mt-auto text-sm text-pretty">
                    {c.note}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Journeys belong in the form, not in a message thread. */}
          <Reveal delay={140} className="mt-10">
            <div className="border-hairline bg-ink/40 rounded-md border p-8 text-center md:p-10">
              <p className="eyebrow">Booking a journey?</p>
              <p className="text-muted mx-auto mt-5 max-w-2xl text-base text-pretty">
                The enquiry form asks the handful of questions we need in order
                to quote properly — the flight, the luggage, the vehicle — so
                the price comes back right the first time.
              </p>
              <Link href="/quote" className="btn btn-primary mt-8">
                Get a Quote
              </Link>
              <p className="mt-5 text-xs text-white/45">{site.paymentNote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Practical detail ---------------- */}
      <section
        className="surface-raised border-y border-white/10"
        aria-labelledby="contact-detail"
      >
        <div className="container-x section">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">Good to Know</p>
                <h2
                  id="contact-detail"
                  className="font-display text-h2 mt-5 font-light text-balance"
                >
                  Hours, areas{" "}
                  <span className="text-metal">and credentials</span>
                </h2>
                <div className="rule-gold mt-7" />
              </Reveal>

              <ul className="mt-10 space-y-8">
                {facts.map((f, i) => (
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

            <Reveal delay={90}>
              <p className="eyebrow text-white/45">Helpful to include</p>
              <p className="text-muted mt-5 text-sm text-pretty">
                None of it is required — send what you have and we will ask
                about the rest. It simply saves a message or two.
              </p>
              <ul className="mt-7">
                {helpfulDetails.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-4 border-b border-white/10 py-4"
                  >
                    <span
                      aria-hidden
                      className="bg-gold mt-2.5 h-px w-5 shrink-0"
                    />
                    <span className="text-sm text-white/80">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Closing ---------------- */}
      <section className="relative" aria-labelledby="contact-cta">
        <div className="meander opacity-30" />
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Begin</p>
              <h2
                id="contact-cta"
                className="font-display text-h1 mt-6 font-light text-balance"
              >
                However you prefer{" "}
                <span className="text-metal">to reach us.</span>
              </h2>
              <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                {site.phone.display} — one number for calls and WhatsApp,
                answered at any hour.
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
                WhatsApp Us
              </a>
              <a href={site.phone.href} className="btn btn-ghost">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                Call Now
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-ghost">
                Email Us
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
