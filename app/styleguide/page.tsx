import type { Metadata } from "next";
import Image from "next/image";
import { Select } from "@/components/ui/Select";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------
   Design system — the single reference for every colour, typeface,
   control and surface used across the site. Built first so the pages
   that follow stay visually consistent.
   ------------------------------------------------------------------ */

function Section({
  n,
  title,
  intro,
  children,
}: {
  n: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section-tight border-t border-white/10">
      <div className="container-x">
        <div className="mb-3 flex items-baseline gap-4">
          <span className="eyebrow tabular-nums">{n}</span>
          <h2 className="font-display text-h3 font-light">{title}</h2>
        </div>
        {intro && <p className="text-muted mb-10 max-w-xl text-sm">{intro}</p>}
        {!intro && <div className="mb-10" />}
        {children}
      </div>
    </section>
  );
}

const swatches = [
  { name: "Charcoal", hex: "#0A0A0A", use: "Background", cls: "bg-ink" },
  { name: "Onyx", hex: "#121212", use: "Sections", cls: "bg-surface" },
  { name: "Slate", hex: "#1A1A1A", use: "Cards", cls: "bg-elevated" },
  { name: "Gold", hex: "#C9A961", use: "Accent", cls: "bg-gold" },
  { name: "Champagne", hex: "#E6D08A", use: "Hover", cls: "bg-gold-bright" },
  { name: "Antique", hex: "#8C6F3F", use: "Shadow", cls: "bg-gold-deep" },
  { name: "White", hex: "#FFFFFF", use: "Text", cls: "bg-text" },
  { name: "Muted", hex: "62%", use: "Secondary text", cls: "bg-muted" },
  { name: "Hairline", hex: "10%", use: "Borders", cls: "bg-hairline" },
];

const typeScale = [
  { cls: "text-display font-display font-light", label: "Display", sample: "Arrive in Comfort" },
  { cls: "text-h1 font-display font-light", label: "Heading 1", sample: "Airport Transfers" },
  { cls: "text-h2 font-display font-light", label: "Heading 2", sample: "Executive Chauffeur" },
  { cls: "text-h3 font-display font-normal", label: "Heading 3", sample: "Meet & Greet Service" },
  { cls: "text-lg", label: "Lead", sample: "A refined introduction sits at this size." },
  { cls: "text-base", label: "Body", sample: "The default size for standard copy." },
  { cls: "text-sm text-muted", label: "Small", sample: "Captions and helper text." },
];

export default function StyleguidePage() {
  return (
    <main className="pb-24">
      {/* ---------- Masthead ---------- */}
      <header className="surface-marble section">
        <div className="container-x">
          <div className="mb-10 w-20">
            <Image
              src="/logo.svg"
              alt="Exotic Travel"
              width={644}
              height={583}
              priority
            />
          </div>
          <p className="eyebrow">Exotic Travel</p>
          <h1 className="font-display text-display mt-4 font-light">
            Design <span className="text-metal">System</span>
          </h1>
          <div className="rule-gold mt-8" />
          <p className="text-muted mt-8 max-w-md">
            The building blocks for the site — black, gold, white. Minimal and
            consistent throughout.
          </p>
        </div>
      </header>

      {/* ---------- 01 Colour ---------- */}
      <Section n="01" title="Colour" intro="Deep blacks with a single gold accent, used sparingly.">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-3">
          {swatches.map((s) => (
            <div key={s.name} className="bg-ink p-5">
              <div
                className={`${s.cls} mb-4 h-16 w-full rounded-sm border border-white/10`}
              />
              <p className="text-sm">{s.name}</p>
              <p className="text-muted mt-1 font-mono text-xs">{s.hex}</p>
              <p className="text-muted mt-1 text-xs">{s.use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 02 Typography ---------- */}
      <Section n="02" title="Typography" intro="Serif headlines, clean sans-serif for everything else.">
        <div className="space-y-8">
          {typeScale.map((t) => (
            <div
              key={t.label}
              className="grid gap-2 border-b border-white/5 pb-6 md:grid-cols-[8rem_1fr] md:gap-8"
            >
              <p className="text-muted pt-2 text-xs">{t.label}</p>
              <p className={t.cls}>{t.sample}</p>
            </div>
          ))}
          <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-8">
            <p className="text-muted text-xs">Eyebrow</p>
            <p className="eyebrow">Live Flight Monitoring</p>
          </div>
        </div>
      </Section>

      {/* ---------- 03 Buttons ---------- */}
      <Section n="03" title="Buttons" intro="Three levels of emphasis. Solid gold marks the primary action.">
        <div className="flex flex-wrap items-center gap-4">
          <button className="btn btn-primary">Get a Quote</button>
          <button className="btn btn-secondary">Book Now</button>
          <button className="btn btn-ghost">Call Us</button>
        </div>
      </Section>

      {/* ---------- 04 Form ---------- */}
      <Section n="04" title="Form" intro="The site's key interaction — clear labels, generous spacing, gold focus.">
        <div className="card max-w-2xl p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="sg-pickup">
                Pick-up
              </label>
              <input
                id="sg-pickup"
                className="field"
                placeholder="Heathrow Terminal 5"
              />
            </div>
            <div>
              <label className="label" htmlFor="sg-vehicle">
                Vehicle Category
              </label>
              <Select
                id="sg-vehicle"
                placeholder="Select a category"
                options={[
                  { value: "saloon", label: "Executive Saloon — up to 4" },
                  { value: "mpv", label: "Executive MPV — up to 7" },
                ]}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="sg-notes">
                Special Requests
              </label>
              <textarea
                id="sg-notes"
                className="field"
                placeholder="Child seat, additional luggage, name board wording…"
              />
            </div>
          </div>
          <button className="btn btn-primary mt-8 w-full">
            Request Quotation
          </button>
          <p className="text-muted mt-4 text-center text-sm">
            No upfront online payment required.
          </p>
        </div>
      </Section>

      {/* ---------- 05 Cards ---------- */}
      <Section n="05" title="Cards" intro="One card style for vehicles, services and testimonials.">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              t: "Executive Saloon",
              p: "Up to 4 passengers · 3 suitcases",
              v: "Mercedes S-Class, BMW 7 Series, Audi A8 or similar",
            },
            {
              t: "Executive MPV",
              p: "Up to 7 passengers · 6 suitcases",
              v: "Mercedes V-Class, Ford Tourneo, VW Multivan or similar",
            },
          ].map((c) => (
            <article key={c.t} className="card card-interactive p-8">
              <h3 className="font-display text-h3 font-normal">{c.t}</h3>
              <p className="eyebrow mt-3">{c.p}</p>
              <div className="rule my-6" />
              <p className="text-muted text-sm">{c.v}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------- 06 Detailing ---------- */}
      <Section n="06" title="Detailing" intro="Fine rules and a Greek-key motif drawn from the emblem.">
        <div className="space-y-10">
          <div>
            <p className="label mb-4">Greek-key divider</p>
            <div className="meander" />
          </div>
          <div>
            <p className="label mb-4">Section divider</p>
            <div className="rule" />
          </div>
          <div>
            <p className="label mb-4">Accent rule</p>
            <div className="rule-gold" />
          </div>
          <div>
            <p className="label mb-4">Gold lettering</p>
            <p className="font-display text-h1 text-metal font-light">
              Exotic Travel
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- 07 Surfaces ---------- */}
      <Section n="07" title="Surfaces" intro="Sections alternate between solid black and a marbled texture.">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-ink flex h-40 items-center justify-center rounded-md border border-white/10">
            <span className="text-muted text-sm">Solid black</span>
          </div>
          <div className="surface-raised flex h-40 items-center justify-center rounded-md border border-white/10">
            <span className="text-muted text-sm">Raised panel</span>
          </div>
          <div className="surface-marble flex h-40 items-center justify-center rounded-md border border-white/10">
            <span className="text-muted text-sm">Marble texture</span>
          </div>
        </div>
      </Section>

      {/* ---------- 08 Logo ---------- */}
      <Section n="08" title="Logo" intro="Gold on black, shown at header, feature and small sizes.">
        <div className="grid items-center gap-6 md:grid-cols-3">
          <div className="card surface-marble flex items-center justify-center p-12">
            <div className="w-40">
              <Image src="/logo.svg" alt="Exotic Travel emblem" width={644} height={583} />
            </div>
          </div>
          <div className="card flex items-center justify-center p-12">
            <div className="w-24">
              <Image src="/logo.svg" alt="Exotic Travel emblem" width={644} height={583} />
            </div>
          </div>
          <div className="card flex items-center justify-center p-12">
            <div className="w-12">
              <Image src="/logo.svg" alt="Exotic Travel emblem" width={644} height={583} />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- 09 Imagery ---------- */}
      <Section n="09" title="Imagery" intro="Executive fleet at London landmarks and airports.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <figure
              key={i}
              className="relative aspect-[3/2] overflow-hidden rounded-md border border-white/10"
            >
              <Image
                src={`/image-${i}.jpg`}
                alt={`Exotic Travel executive fleet ${i}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            </figure>
          ))}
        </div>
      </Section>

      {/* ---------- 10 Motion ---------- */}
      <Section n="10" title="Motion" intro="Understated — content fades in, controls respond softly.">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card card-interactive p-8">
            <p className="font-display text-h3 font-normal">Hover me</p>
            <p className="text-muted mt-3 text-sm">Lifts and highlights on hover.</p>
          </div>
          <div className="card p-8">
            <p className="font-display text-h3 font-normal">Scroll reveals</p>
            <p className="text-muted mt-3 text-sm">Eases into view on scroll.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
