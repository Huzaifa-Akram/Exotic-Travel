import { Reveal } from "@/components/ui/Reveal";
import {
  ClockIcon,
  NameBoardIcon,
  PlaneIcon,
  ShieldIcon,
  SteeringWheelIcon,
  TagIcon,
} from "@/components/home/icons";

/**
 * CURRENTLY UNUSED. AirportStrip took this slot below the hero when the
 * client's "Why Choose Exotic Travel" section landed carrying four of
 * the six badges below. Kept rather than deleted because it is a
 * finished component and the decision is one import away from being
 * reversed — put it back in app/(site)/page.tsx if the client wants the
 * badges nearer the fold again.
 *
 * The client's six assurances, first thing under the hero — the trust
 * sale the homepage has to make "within the first few seconds". Three
 * treatments were tried inside the hero itself (bare ticks, a glass
 * grid, a ruled band) and every one crowded the photograph; this is the
 * version that earned its keep: its own raised surface, the site's own
 * line icons rather than generic checkmarks, and column spacing doing
 * the work borders were doing before.
 */

const assurances = [
  { icon: ClockIcon, label: "Available 24/7" },
  { icon: TagIcon, label: "Fixed quotations" },
  { icon: PlaneIcon, label: "Flight monitoring" },
  { icon: NameBoardIcon, label: "Meet & Greet" },
  { icon: SteeringWheelIcon, label: "Professional chauffeurs" },
  { icon: ShieldIcon, label: "London & Nationwide" },
] as const;

export function TrustStrip() {
  return (
    <section
      aria-label="Why book with us"
      className="surface-raised border-b border-white/10"
    >
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-y-9 py-10 md:grid-cols-3 md:py-12 xl:grid-cols-6">
          {assurances.map((a, i) => (
            <li key={a.label}>
              <Reveal
                delay={i * 60}
                className="flex h-full flex-col items-center gap-3.5 px-3 text-center"
              >
                <a.icon className="text-gold h-6 w-6" />
                <span className="text-[11px] leading-relaxed tracking-[0.16em] text-white/75 uppercase">
                  {a.label}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
