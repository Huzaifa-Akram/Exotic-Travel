import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

/**
 * The booking model, made a virtue. §4 rules out instant pricing, which
 * a visitor arriving from Uber will read as friction unless the page
 * frames it first: a quotation prepared by hand is the premium version
 * of a fare, and nothing is paid online up front (§11). Three steps,
 * numbered like the quote form's fieldsets, so the language of "01/02/
 * 03" carries through to the form they land on next.
 */

const steps = [
  {
    n: "01",
    title: "Tell us the journey",
    text: "Two minutes with the enquiry form — or a message on WhatsApp, if that is easier. No account, no payment details.",
  },
  {
    n: "02",
    title: "Receive your quotation",
    text: "A fixed, bespoke price prepared by hand — usually within the hour, always within 24. We aim to beat comparable Uber and Bolt prices.",
  },
  {
    n: "03",
    title: "Travel",
    text: "Your chauffeur is confirmed, your flight watched, your door held. Pay by cash, bank transfer, or card at your destination.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      className="surface-raised border-y border-white/10"
      aria-labelledby="how-heading"
    >
      <div className="container-x section">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <span id="how-heading">
              No meter, <span className="text-metal">no surprises</span>
            </span>
          }
          lead="Every journey is quoted before it is confirmed, so the price you agree is the price you pay."
        />

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <li className="relative h-full md:px-2">
                <div className="flex items-center gap-5">
                  <span className="font-display text-metal text-h1 leading-none font-light">
                    {s.n}
                  </span>
                  {/* Ties the number to the next step across the row */}
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
            Start Your Enquiry
          </Link>
          <p className="text-xs text-white/45">{site.paymentNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
