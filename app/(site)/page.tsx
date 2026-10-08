import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
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
 * Homepage — build order step 3 of CLIENT_BRIEF.md §17.
 *
 * The order is an argument, not a list, and it leads with the airport —
 * the client's stated speciality (§16). Name the airports we cover
 * (AirportStrip), sell the flagship hard (AirportTransfers, per §6),
 * show the cars (Fleet), state the six reasons in the client's own
 * words (WhyChoose), defuse the no-instant-price model (HowItWorks),
 * and only then show the breadth beyond the airport (Services).
 * Differentiate (Concierge, §9), prove it (Testimonials, Faq), then ask
 * (FinalCta, which completes §2's four CTAs with Call Us and WhatsApp Us).
 *
 * Surfaces alternate ink → marble → ink so adjacent sections never
 * share a background; the two photographic full-bleeds (hero,
 * Concierge) sit at either end of the scroll.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AirportStrip />
      <AirportTransfers />
      <Fleet />
      <WhyChoose />
      <HowItWorks />
      <Services />
      <Concierge />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
