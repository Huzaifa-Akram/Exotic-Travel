import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  CarIcon,
  NameBoardIcon,
  PlaneIcon,
  SteeringWheelIcon,
  TagIcon,
  WaterIcon,
} from "@/components/home/icons";

/**
 * "Why Choose Exotic Travel" — the six reasons in the client's own
 * words and in the client's own order, given a room of their own
 * between the fleet and the booking steps: the cars have just made the
 * visual case, this makes the spoken one, and How It Works then closes.
 *
 * These six replaced an earlier set that led on 24/7 support and price.
 * Both are still argued elsewhere — support on the contact page, price
 * in How It Works and the FAQ — so nothing was lost by swapping them
 * for meet & greet and fixed pricing.
 */

const reasons = [
  {
    icon: PlaneIcon,
    title: "Flight Monitoring",
    text: "We track the aircraft, not the booking. A delay or an early landing simply moves your pick-up, at no extra cost.",
  },
  {
    icon: NameBoardIcon,
    title: "Meet & Greet",
    text: "Your chauffeur waits inside arrivals with a name board and helps with the luggage — never a phone call from the kerb.",
  },
  {
    icon: SteeringWheelIcon,
    title: "Professional Chauffeurs",
    text: "Suited, licensed and discreet, assigned to your booking in advance and expected to be in position early.",
  },
  {
    icon: CarIcon,
    title: "Luxury Vehicles",
    text: "Late-model Mercedes S-Class, E-Class and V-Class or similar, valeted before every single journey.",
  },
  {
    icon: WaterIcon,
    title: "Complimentary Bottled Water",
    text: "Chilled and waiting in every car, on every journey — the small things, done without being asked.",
  },
  {
    icon: TagIcon,
    title: "Fixed Pricing",
    text: "Quoted by hand and agreed before you travel. No meter, no surge pricing, and no surprises at the end.",
  },
] as const;

export function WhyChoose() {
  return (
    <section className="surface-marble section" aria-labelledby="why-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Difference"
          title={
            <span id="why-heading">
              Why choose <span className="text-metal">Exotic Travel?</span>
            </span>
          }
          lead="The service is in the details — the ones you notice, and the dozens you never have to."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 90}>
              <article className="card card-interactive h-full p-8">
                <span className="border-gold/30 text-gold flex h-12 w-12 items-center justify-center rounded-full border">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-base font-medium text-white">
                  {r.title}
                </h3>
                <p className="text-muted mt-2.5 text-sm text-pretty">
                  {r.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
