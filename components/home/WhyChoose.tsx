import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  CarIcon,
  GemIcon,
  HeadsetIcon,
  PlaneIcon,
  SteeringWheelIcon,
  WaterIcon,
} from "@/components/home/icons";

/**
 * "Why Choose Exotic Executive?" — the six reasons in the client's own
 * words, given a room of their own between the fleet and the booking
 * steps: the cars have just made the visual case, this makes the
 * spoken one, and How It Works then closes.
 *
 * NOTE(brand): the heading says "Exotic Executive" because the client
 * asked for exactly that, but the header, footer and logo all say
 * "Exotic Travel" (§16 keeps the brand name despite the domain).
 * Confirm with the client which name is final before launch.
 */

const reasons = [
  {
    icon: SteeringWheelIcon,
    title: "Professional Chauffeurs",
    text: "Trained, suited and discreet — the service is ultimately the person driving.",
  },
  {
    icon: PlaneIcon,
    title: "Flight Tracking Included",
    text: "Every airport pick-up is monitored from take-off to touchdown, at no extra cost.",
  },
  {
    icon: WaterIcon,
    title: "Complimentary Bottled Water",
    text: "Chilled and waiting in every car, on every journey — the small things, done.",
  },
  {
    icon: CarIcon,
    title: "Executive Mercedes Fleet",
    text: "Late-model Mercedes S-Class, E-Class and V-Class or similar, immaculately kept.",
  },
  {
    icon: HeadsetIcon,
    title: "24/7 Customer Support",
    text: "A person on the phone or WhatsApp at any hour — never a ticket queue.",
  },
  {
    icon: GemIcon,
    title: "Luxury Without the Luxury Price",
    text: "We aim to beat comparable Uber and Bolt prices, mile for mile.",
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
              Why choose <span className="text-metal">Exotic Executive?</span>
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
