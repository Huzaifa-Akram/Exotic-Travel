import Link from "next/link";
import { featuredFaqs } from "@/content/faq";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

/**
 * The six questions an undecided visitor is actually holding. They come
 * from content/faq.ts rather than living here, so the homepage and /faq
 * can never answer the same question two different ways — edit the
 * answer once and both pages change.
 */

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
            <FaqAccordion items={featuredFaqs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
