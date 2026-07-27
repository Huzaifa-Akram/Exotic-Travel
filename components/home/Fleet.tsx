import Image from "next/image";
import Link from "next/link";
import fleet from "@/public/image-6.jpg";
import { vehicleCategories, vehicleDisclaimer } from "@/lib/enquiry";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

/**
 * The fleet — where the hero's "View our Fleet" arrow lands, so the
 * section id has to stay `fleet`. Categories, not cars: §5 is strict
 * that a customer chooses a class of vehicle and the examples always
 * carry "or similar", and the disclaimer under the cards is the brief's
 * wording, not decoration. The two real categories come straight from
 * lib/enquiry so this section and the quote form can never disagree.
 */

const categories = vehicleCategories.filter((v) => v.value !== "recommend");

export function Fleet() {
  return (
    <section
      id="fleet"
      className="section scroll-mt-16 xl:scroll-mt-20"
      aria-labelledby="fleet-heading"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="The Fleet"
          title={
            <span id="fleet-heading">
              Choose the category —{" "}
              <span className="text-metal">we send the car</span>
            </span>
          }
          lead="Every vehicle is a late-model executive car, chauffeur-driven, immaculately kept and quietly equipped."
        />

        {/* The line-up, full width. */}
        <Reveal className="mt-14">
          <div className="grain relative aspect-16/9 overflow-hidden rounded-md border border-white/10 md:aspect-21/9">
            <Image
              src={fleet}
              alt="The Exotic Travel fleet — a Range Rover, Mercedes S-Class and Mercedes V-Class lined up at Heathrow Terminal 3"
              fill
              placeholder="blur"
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-ink/20"
            />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
          {categories.map((v, i) => (
            <Reveal key={v.value} delay={i * 90}>
              <article className="card card-interactive flex h-full flex-col p-8 md:p-10">
                <h3 className="font-display text-h3 font-light text-white">
                  {v.label}
                </h3>
                <p className="text-gold mt-3 text-xs tracking-[0.08em] uppercase">
                  {v.passengers} · {v.luggage}
                </p>
                <div className="rule my-6" />
                <p className="text-muted text-sm">{v.examples}</p>

                <Link
                  href="/quote"
                  className="group text-gold mt-auto flex items-center gap-2.5 pt-7 text-[11px] tracking-[0.14em] uppercase"
                >
                  Request this category
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-500 ease-luxe group-hover:translate-x-1"
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
              </article>
            </Reveal>
          ))}
        </div>

        {/* §5 wording — do not remove. */}
        <Reveal className="mt-6">
          <p className="text-center text-xs text-white/40">
            {vehicleDisclaimer} Not sure which? Tell us the party and the
            luggage — we will recommend.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
