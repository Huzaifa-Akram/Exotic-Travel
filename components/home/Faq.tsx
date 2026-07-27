import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The questions an undecided visitor is actually holding, answered in
 * the site's own words. Every answer restates a fact already on the
 * page or in the brief — nothing here invents policy the client has
 * not confirmed. Native <details>, so the section works before
 * hydration and costs no JavaScript.
 */

const faqs = [
  {
    q: "How is the price worked out?",
    a: "Every journey is quoted individually — by a person, not a meter. Send the enquiry and we reply with a fixed, bespoke price, usually within the hour and always within 24. We aim to beat comparable Uber and Bolt prices while providing a far higher standard of car and chauffeur.",
  },
  {
    q: "What happens if my flight is delayed?",
    a: "Nothing you need to manage. We monitor the flight itself, so delays and early arrivals simply move your pick-up time. Your chauffeur waits inside arrivals with a name board whenever meet & greet is included.",
  },
  {
    q: "When and how do I pay?",
    a: `${site.paymentNote} Nothing is charged when you submit an enquiry — you confirm the quote first.`,
  },
  {
    q: "Which car will actually arrive?",
    a: "You book a vehicle category rather than a specific model — an Executive Saloon such as a Mercedes S-Class or similar, or an Executive MPV such as a Mercedes V-Class or similar. We always provide a car that meets or exceeds the chosen category, subject to availability.",
  },
  {
    q: "Where do you operate?",
    a: `${site.serviceArea}. Airport transfers cover Heathrow, Gatwick, Luton, Stansted and London City around the clock, and long-distance journeys are quoted the same way as any other.`,
  },
  {
    q: "Can I book a return, or keep the car for a few hours?",
    a: "Yes — the enquiry form has a return journey option, and hourly hire keeps the car and chauffeur with you between engagements. Child seats and meet & greet can be added to any booking.",
  },
];

export function Faq() {
  return (
    <section className="surface-marble section" aria-labelledby="faq-heading">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Questions</p>
            <h2
              id="faq-heading"
              className="font-display text-h2 mt-5 font-light"
            >
              Before <span className="text-metal">you ask</span>
            </h2>
            <div className="rule-gold mt-7" />
            <p className="text-muted mt-7 text-base text-pretty">
              Anything unanswered here, ask a person instead — the phone and
              WhatsApp are watched around the clock.
            </p>
            <Link
              href="/faq"
              className="group text-gold mt-8 inline-flex items-center gap-2.5 text-[11px] tracking-[0.14em] uppercase"
            >
              All questions
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
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="border-t border-white/10">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-white/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="text-base font-medium text-white transition-colors duration-300 group-open:text-gold">
                      {f.q}
                    </span>
                    {/* Plus that becomes a minus — drawn, not typed, so
                        it can rotate on one axis instead of swapping
                        glyphs. */}
                    <span
                      aria-hidden
                      className="text-gold relative h-3.5 w-3.5 shrink-0"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-400 ease-luxe group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="text-muted -mt-1 max-w-2xl pb-7 text-sm text-pretty">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
