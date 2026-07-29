import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/image-1.png";
import { site } from "@/lib/site";
import { HeroParallax } from "@/components/site/HeroParallax";
import { HeroSearch } from "@/components/site/HeroSearch";
import { PhoneIcon, WhatsAppIcon } from "@/components/home/icons";

// No overflow-hidden on the <section>: the date and time popovers open
// out of the glass bar, and clipping there would slice them off. The
// oversized parallax layer is clipped by its own wrapper instead.
//
// Two layouts, one tree. From md up the photograph is a full-bleed
// backdrop with the copy and the enquiry bar floating on it.
//
// Below md it keeps its own 3:2 aspect ratio rather than covering the
// viewport — a landscape frame cropped into a tall phone has to throw
// away two thirds of the picture to fill it, and the car is the asset
// the page is selling. The copy still sits *on* it: the block is pulled
// back up over the frame by exactly the frame's height, so the headline
// reads over the photograph and the buttons land in the fade at its
// foot. Only the enquiry bar stacks underneath.
export function Hero() {
  return (
    <section className="relative isolate flex flex-col md:min-h-svh">
      {/* ---------------- Photograph ----------------
          mt-16 clears the fixed header so the frame is shown whole and
          unobstructed; from md up it goes back to covering the section. */}
      <div className="relative mt-16 aspect-7298/4634 w-full overflow-hidden md:absolute md:inset-0 md:mt-0 md:-z-10 md:aspect-auto">
        <HeroParallax>
          <Image
            src={heroImage}
            alt="A chauffeur opening the rear door of a black Mercedes-Benz S-Class at a luxury hotel entrance"
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            quality={85}
            /* Below md the box matches the file's own aspect ratio, so
               `cover` crops nothing and the position is moot. It earns
               its keep on portrait tablets, where centring the crop
               loses the chauffeur. */
            className="settle object-cover object-[66%_center] md:object-center"
          />
        </HeroParallax>

        {/* The mobile counterpart of the desktop scrims below, but it
            has to live inside this box rather than behind the section:
            below md the photograph is an in-flow block, so a -z-10 layer
            on the section would sit behind the picture instead of on it.
            Heaviest at the top where the headline lands, lightest across
            the car, and solid ink by the bottom edge — which also melts
            the foot of the frame into the enquiry bar, so the whole
            thing reads as one hero rather than a banner with text
            under it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/75 via-ink/30 to-ink md:hidden"
        />
      </div>

      {/* ---------------- Legibility scrims ----------------
          Two targeted layers, not a blanket tint. A flat scrim buys
          contrast by throwing away the photograph, which is the most
          expensive asset on the page — so the top and bottom edges are
          darkened where the header and the glass bar need to sit, and
          the middle of the frame is left alone. Only needed while type
          sits on the picture, which below md it no longer does. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-linear-to-b from-ink/60 via-transparent to-ink/90 md:block"
      />
      {/* A soft pool of ink behind the headline only. Keeps the type
          clear of the hotel's warm lighting without hazing the car. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-[radial-gradient(58%_42%_at_50%_40%,rgba(10,10,10,0.6)_0%,transparent_72%)] md:block"
      />

      {/* ---------------- Headline ----------------
          Anchored to the top rather than centred: the copy sits just
          under the header, the car keeps the middle of the frame, and
          the glass bar holds the bottom. flex-1 here is what pins that
          bar down — the block absorbs all the slack, so trimming the
          copy opens up the photograph instead of pulling the form up.

          Below md there is no slack to absorb, so the negative margin
          does the work instead: 63.5vw is the frame's height (100vw at
          its 7298/4634 ratio), which lifts this block's top flush with
          the photograph's and lets pt-9 place the eyebrow on the
          building. `relative` is load-bearing — the frame above is
          positioned, so a static block here would paint underneath it.

          The matching min-height is what keeps the enquiry bar clear: the
          pull-up also shortens the flow by the frame's height, so on the
          wider phones — where the frame is taller than this copy — the bar
          would otherwise ride up under the photograph. */}
      <div className="container-x relative mt-[-63.5vw] flex min-h-[63.5vw] flex-1 flex-col items-center pt-9 pb-10 text-center md:mt-0 md:min-h-0 md:pt-28 xl:pt-32">
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

        {/* The client asked for the three ways of saying yes side by
            side, in this order and wording: quote, WhatsApp (wearing its
            own mark), call. One solid gold, two outlined — the enquiry
            bar below stays the fold's main event, and these are the
            faster doors past it. */}
        <div className="rise mt-9 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 [--rise-delay:230ms]">
          <Link
            href="/quote"
            className="bg-gold text-ink hover:bg-gold-bright rounded-sm px-5 py-3 text-[11px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-500 ease-luxe sm:px-7"
          >
            Get Instant Quote
          </Link>

          <a
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-gold text-gold hover:bg-gold hover:text-ink flex items-center gap-2.5 rounded-sm border px-5 py-3 text-[11px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-500 ease-luxe sm:px-6"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            WhatsApp Us
          </a>

          <a
            href={site.phone.href}
            className="flex items-center gap-2.5 rounded-sm border border-white/25 px-5 py-3 text-[11px] tracking-[0.14em] whitespace-nowrap text-white uppercase transition-colors duration-500 ease-luxe hover:border-gold hover:text-gold sm:px-6"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            Call Now
          </a>
        </div>
      </div>

      {/* ---------------- Enquiry bar ----------------
          The enquiry itself, not a button pointing at one. This is the
          hero's single call to action: "Book Now" and "Get a Quote" both
          resolved to /quote (§4 is enquiry-first, so they are the same
          submission), and buttons stacked above a form asking the same
          question reads as indecision. Call / WhatsApp move to the final
          CTA section.

          From md up it floats on the photograph as the foot of the hero.
          Below md it follows the copy directly, with no rule or heading
          between them: photograph, then words, then the enquiry, read as
          one hero rather than three stacked blocks. */}
      <div className="container-x pb-12 md:pb-14">
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
