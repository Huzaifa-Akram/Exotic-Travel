import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/image-1.png";
import { site } from "@/lib/site";
import { HeroParallax } from "@/components/site/HeroParallax";
import { HeroSearch } from "@/components/site/HeroSearch";

// No overflow-hidden on the <section>: the date and time popovers open
// out of the glass bar, and clipping there would slice them off. The
// oversized parallax layer is clipped by its own wrapper instead.
export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col">
      {/* ---------------- Photograph ---------------- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <HeroParallax>
          <Image
            src={heroImage}
            alt="A chauffeur opening the rear door of a black Mercedes-Benz S-Class at a luxury hotel entrance"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            quality={85}
            /* Portrait crops lose the chauffeur if centred, so the focal
               point sits right of centre until there is width to spare. */
            className="settle object-cover object-[66%_center] md:object-center"
          />
        </HeroParallax>
      </div>

      {/* ---------------- Legibility scrims ----------------
          Two targeted layers, not a blanket tint. A flat scrim buys
          contrast by throwing away the photograph, which is the most
          expensive asset on the page — so the top and bottom edges are
          darkened where the header and the glass bar need to sit, and
          the middle of the frame is left alone. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-ink/60 via-transparent to-ink/90"
      />
      {/* A soft pool of ink behind the headline only. Keeps the type
          clear of the hotel's warm lighting without hazing the car. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_42%_at_50%_40%,rgba(10,10,10,0.6)_0%,transparent_72%)]"
      />

      {/* ---------------- Headline ----------------
          Anchored to the top rather than centred: the copy sits just
          under the header, the car keeps the middle of the frame, and
          the glass bar holds the bottom. flex-1 here is what pins that
          bar down — the block absorbs all the slack, so trimming the
          copy opens up the photograph instead of pulling the form up. */}
      <div className="container-x flex flex-1 flex-col items-center pt-28 pb-10 text-center xl:pt-32">
        <p className="eyebrow rise flex items-center gap-4">
          <span className="h-px w-8 bg-gold sm:w-12" />
          Executive Chauffeur — {site.serviceArea}
          <span className="h-px w-8 bg-gold sm:w-12" />
        </p>

        {/* Carries "executive travel" for search while saying the thing
            the brief actually sells: §4's bespoke, hand-arranged
            booking, not a meter. text-h1 rather than text-display — a
            step down the scale keeps it on one line at desktop widths
            and stops it competing with the photograph. */}
        <h1 className="font-display text-h1 rise mt-6 max-w-5xl text-balance font-light [--rise-delay:90ms]">
          Executive travel,{" "}
          <span className="text-metal">precisely arranged.</span>
        </h1>

        {/* Three beats, not three sentences of prose. Each is a selling
            point the brief singles out — meet & greet (§6), live flight
            monitoring (§6), a quotation by hand rather than a meter (§4)
            — cut to the length someone actually reads. */}
        <p className="text-muted rise mt-6 text-base text-pretty md:mt-7 md:text-lg [--rise-delay:180ms]">
          Met inside arrivals. Tracked in the air. Quoted by hand.
        </p>

        {/* The client named four homepage CTAs (§2). "Book Now" and "Get
            a Quote" are one action under an enquiry-first model, so the
            glass bar below is "Book Now" and this is the lower-commitment
            route into the same form. Call and WhatsApp move to the final
            CTA section rather than crowding the fold. */}
        <div className="rise mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-6 [--rise-delay:230ms]">
          <Link
            href="/quote"
            className="border-gold text-gold hover:bg-gold hover:text-ink border px-7 py-3 text-[11px] tracking-[0.14em] uppercase transition-colors duration-500 ease-luxe"
          >
            Get a Quote
          </Link>

          <span aria-hidden className="hidden h-8 w-px bg-white/20 sm:block" />

          <Link
            href="#fleet"
            className="group text-muted hover:text-white flex items-center gap-2.5 text-[11px] tracking-[0.14em] uppercase transition-colors duration-300"
          >
            View our Fleet
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              aria-hidden
              className="text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1"
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
        </div>
      </div>

      {/* ---------------- Enquiry bar ----------------
          The enquiry itself, not a button pointing at one. This is the
          hero's single call to action: "Book Now" and "Get a Quote" both
          resolved to /quote (§4 is enquiry-first, so they are the same
          submission), and buttons stacked above a form asking the same
          question reads as indecision. Call / WhatsApp move to the final
          CTA section. */}
      <div className="container-x pb-10 md:pb-14">
        <div className="rise mx-auto max-w-6xl [--rise-delay:270ms]">
          <HeroSearch />
        </div>
      </div>

      {/* Gold hairline closing the hero, matching the header's rule */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent"
      />
    </section>
  );
}
