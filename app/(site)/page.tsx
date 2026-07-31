import { Hero } from "@/components/site/Hero";
import { AirportStrip } from "@/components/home/AirportStrip";
import { Services } from "@/components/home/Services";
import { AirportTransfers } from "@/components/home/AirportTransfers";
import { Fleet } from "@/components/home/Fleet";
import { WhyChoose } from "@/components/home/WhyChoose";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Concierge } from "@/components/home/Concierge";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Homepage — build order step 3 of CLIENT_BRIEF.md §17, awaiting client
 * sign-off before the remaining pages are built.
 *
 * The order is an argument, not a list: name the airports we cover
 * (AirportStrip), show the breadth (Services), sell the flagship hard
 * (AirportTransfers, per §6), show the cars (Fleet), state the six
 * reasons in the client's own words (WhyChoose), defuse the
 * no-instant-price model (HowItWorks), differentiate (Concierge, §9),
 * prove it (Testimonials, Faq), then ask (FinalCta, which completes
 * §2's four CTAs with Call Us and WhatsApp Us).
 *
 * AirportStrip took the slot TrustStrip held. Four of TrustStrip's six
 * badges — flight monitoring, meet & greet, fixed prices, chauffeurs —
 * are now the client's own six in WhyChoose, and saying them twice on
 * one page read as padding rather than emphasis.
 *
 * Surfaces alternate ink → marble → ink so adjacent sections never
 * share a background; the two photographic full-bleeds (hero,
 * Concierge) sit at either end of the scroll.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AirportStrip />
      <Services />
      <AirportTransfers />
      <Fleet />
      <WhyChoose />
      <HowItWorks />
      <Concierge />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
