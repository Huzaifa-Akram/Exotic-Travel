import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The closing invitation, and where Call Us and WhatsApp Us — the two
 * homepage CTAs the hero deliberately holds back (§2) — finally appear
 * as buttons. A visitor who has scrolled this far has read the whole
 * argument; the section asks once, largest type on the page after the
 * hero, with every way of saying yes side by side.
 */

export function FinalCta() {
  return (
    <section className="relative" aria-labelledby="cta-heading">
      <div className="meander opacity-30" />

      <div className="container-x section">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal className="flex flex-col items-center">
            <p className="eyebrow">Begin</p>
            <h2
              id="cta-heading"
              className="font-display text-h1 mt-6 font-light text-balance"
            >
              Wherever next,{" "}
              <span className="text-metal">consider it arranged.</span>
            </h2>
            <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
              Send the journey today and travel with a fixed quote, a
              professional chauffeur and nothing to pay online.
            </p>
          </Reveal>

          <Reveal
            delay={100}
            className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Link href="/quote" className="btn btn-primary">
              Get a Quote
            </Link>
            <a href={site.phone.href} className="btn btn-ghost">
              Call Us
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              WhatsApp Us
            </a>
          </Reveal>

          <Reveal delay={160} className="mt-9">
            <p className="text-sm text-white/55">
              <a
                href={site.phone.href}
                className="hover:text-gold text-white/80 transition-colors"
              >
                {site.phone.display}
              </a>
              <span aria-hidden className="text-gold/60 mx-3">
                ·
              </span>
              Available 24 hours
              <span aria-hidden className="text-gold/60 mx-3">
                ·
              </span>
              {site.serviceArea}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
