import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

/**
 * TODO(client): placeholder testimonials — §18 of the brief is still
 * waiting on real reviews and the Google Business Profile link for the
 * reviews section (§10). Swap the three quotes below for genuine ones
 * before launch; the layout needs nothing else changed. Names are
 * initials-only on purpose so the placeholders never read as real,
 * verifiable people.
 */

const testimonials = [
  {
    quote:
      "Our flight landed forty minutes early — and so, somehow, had our chauffeur. Name board in hand, cases taken, car already cool. The easiest end to a long trip.",
    name: "J. W.",
    context: "Heathrow airport transfer",
  },
  {
    quote:
      "We booked the wedding cars expecting transport and got something closer to stage management. Immaculate cars, unhurried timing, and not a single thing to think about.",
    name: "S. & D. O.",
    context: "Wedding transport",
  },
  {
    quote:
      "Our visiting partners now ask for the same service by name. Punctual to the minute, discreet in the car, and one simple invoice at the end of the month.",
    name: "M. H.",
    context: "Corporate account",
  },
];

export function Testimonials() {
  return (
    <section className="section" aria-labelledby="testimonials-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Word of Mouth"
          title={
            <span id="testimonials-heading">
              Quietly <span className="text-metal">recommended</span>
            </span>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="card flex h-full flex-col p-8 md:p-9">
                <p
                  className="text-gold text-xs tracking-[0.35em]"
                  role="img"
                  aria-label="Rated five stars"
                >
                  ★★★★★
                </p>
                <blockquote className="mt-6">
                  <p className="font-display text-lg font-light text-white/90">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-auto pt-7">
                  <div className="rule-gold w-8" />
                  <p className="mt-4 text-sm font-medium text-white">
                    {t.name}
                  </p>
                  <p className="text-muted mt-1 text-xs tracking-[0.08em] uppercase">
                    {t.context}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
