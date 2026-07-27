import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/home/Services";
import { AirportTransfers } from "@/components/home/AirportTransfers";
import { Fleet } from "@/components/home/Fleet";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Concierge } from "@/components/home/Concierge";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Homepage — build order step 3 of CLIENT_BRIEF.md §17, awaiting client
 * sign-off before the remaining pages are built.
 *
 * The order is an argument, not a list: show the breadth (Services),
 * sell the flagship hard (AirportTransfers, per §6),
 * show the cars (Fleet — the hero's "View our Fleet" lands here),
 * defuse the no-instant-price model (HowItWorks), differentiate
 * (Concierge, §9), prove it (Testimonials, Faq), then ask (FinalCta,
 * which completes §2's four CTAs with Call Us and WhatsApp Us).
 *
 * Surfaces alternate ink → marble → ink so adjacent sections never
 * share a background; the two photographic full-bleeds (hero,
 * Concierge) sit at either end of the scroll.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <AirportTransfers />
      <Fleet />
      <HowItWorks />
      <Concierge />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
