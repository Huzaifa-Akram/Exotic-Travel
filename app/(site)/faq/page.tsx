import type { Metadata } from "next";
import Link from "next/link";
import { allFaqs, faqGroups } from "@/content/faq";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PhoneIcon, WhatsAppIcon } from "@/components/home/icons";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "How quotes, airport transfers, vehicles, payment and corporate accounts work — answered in full. Licensed and insured chauffeur service, available 24/7.",
  alternates: { canonical: "/faq" },
};

/**
 * Every question in one place — where the homepage's "All questions"
 * link lands. Grouped rather than listed: twenty-odd questions in a
 * single column is a wall, and the visitor arriving from the payment
 * paragraph is not looking for the flight-delay answer.
 *
 * Carries FAQPage structured data built from the same content, so the
 * markup and the schema can never disagree.
 */
export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Frequently Asked Questions",
        item: `${site.url}/faq`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* ---------------- Masthead ---------------- */}
      <section className="surface-marble section-tight pt-32 md:pt-40">
        <div className="container-x">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Questions</p>
              <h1 className="font-display text-h1 mt-5 font-light text-balance">
                Everything, <span className="text-metal">answered</span>
              </h1>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
                How quotes are prepared, what happens when a flight is late,
                which car actually arrives, and when you pay. If your question
                is not here, a person will answer it at any hour.
              </p>
            </Reveal>

            {/* Jump links. Six anchors are quicker to scan than twenty
                questions, and they cost nothing on a static page. */}
            <Reveal delay={100} className="mt-10">
              <ul className="flex flex-wrap justify-center gap-3">
                {faqGroups.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#${g.id}`}
                      className="hover:border-gold/60 hover:text-gold ease-luxe block rounded-sm border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.12em] text-white/75 uppercase transition-colors duration-400"
                    >
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- The groups ---------------- */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-3xl space-y-16 md:space-y-20">
            {faqGroups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-24 xl:scroll-mt-28">
                <Reveal>
                  <h2 className="font-display text-h2 font-light">
                    {g.title}
                  </h2>
                  <div className="rule-gold mt-6" />
                </Reveal>
                <Reveal delay={80} className="mt-8">
                  <FaqAccordion items={g.entries} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Still asking ---------------- */}
      <section
        className="surface-raised border-t border-white/10"
        aria-labelledby="faq-cta"
      >
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Still Asking</p>
              <h2
                id="faq-cta"
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                Ask a person <span className="text-metal">instead</span>
              </h2>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                The phone and WhatsApp are watched around the clock, and
                neither of them is a menu.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
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
              <Link href="/quote" className="btn btn-ghost">
                Get Instant Quote
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
