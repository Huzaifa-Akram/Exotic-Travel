import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------
   This page is the design contract. Every visual decision on the site
   is demonstrated here first. If something is needed on a page but
   doesn't exist here, it gets added here first — that is what keeps
   fifteen pages looking like one website.
   ------------------------------------------------------------------ */

function Section({
  n,
  title,
  note,
  children,
}: {
  n: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section-tight border-t border-white/10">
      <div className="container-x">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="eyebrow tabular-nums">{n}</span>
          <h2 className="font-display text-h3 font-light">{title}</h2>
        </div>
        {note && (
          <p className="text-muted mb-10 max-w-2xl text-sm">{note}</p>
        )}
        {children}
      </div>
    </section>
  );
}

const swatches = [
  { name: "ink", hex: "#0A0A0A", use: "Page base", cls: "bg-ink" },
  { name: "surface", hex: "#121212", use: "Raised sections", cls: "bg-surface" },
  { name: "elevated", hex: "#1A1A1A", use: "Cards", cls: "bg-elevated" },
  { name: "gold", hex: "#C9A961", use: "The accent", cls: "bg-gold" },
  {
    name: "gold-bright",
    hex: "#E6D08A",
    use: "Hover / highlight",
    cls: "bg-gold-bright",
  },
  {
    name: "gold-deep",
    hex: "#8C6F3F",
    use: "Gradient shadow",
    cls: "bg-gold-deep",
  },
  { name: "text", hex: "#FFFFFF", use: "Body copy", cls: "bg-text" },
  { name: "muted", hex: "62% white", use: "Secondary copy", cls: "bg-muted" },
  {
    name: "hairline",
    hex: "10% white",
    use: "Borders, rules",
    cls: "bg-hairline",
  },
];

const typeScale = [
  { cls: "text-display font-display font-light", label: "display", sample: "Arrive in Comfort" },
  { cls: "text-h1 font-display font-light", label: "h1", sample: "Airport Transfers" },
  { cls: "text-h2 font-display font-light", label: "h2", sample: "Executive Chauffeur" },
  { cls: "text-h3 font-display font-normal", label: "h3", sample: "Meet & Greet Service" },
  { cls: "text-lg", label: "lg", sample: "Lead paragraph copy sits at this size." },
  { cls: "text-base", label: "base", sample: "Body copy. The default for all running text." },
  { cls: "text-sm text-muted", label: "sm", sample: "Captions, disclaimers, form help text." },
];

export default function StyleguidePage() {
  return (
    <main className="pb-24">
      {/* ---------- Masthead ---------- */}
      <header className="surface-marble section">
        <div className="container-x">
          <p className="eyebrow">Exotic Travel</p>
          <h1 className="font-display text-display mt-4 font-light">
            Design <span className="text-metal">System</span>
          </h1>
          <div className="rule-gold mt-8" />
          <p className="text-muted mt-8 max-w-xl text-lg">
            The single source of truth for the site&apos;s visual language.
            Black, gold, white — minimal, spacious, restrained motion.
          </p>
        </div>
      </header>

      {/* ---------- 01 Colour ---------- */}
      <Section
        n="01"
        title="Colour"
        note="Nine tokens, one accent. There is deliberately no secondary accent colour — gold does all the emphasis work. This constraint is the main reason pages can't drift apart visually."
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-3">
          {swatches.map((s) => (
            <div key={s.name} className="bg-ink p-5">
              <div
                className={`${s.cls} mb-4 h-16 w-full rounded-sm border border-white/10`}
              />
              <p className="font-mono text-sm">{s.name}</p>
              <p className="text-muted mt-1 font-mono text-xs">{s.hex}</p>
              <p className="text-muted mt-2 text-xs">{s.use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 02 Typography ---------- */}
      <Section
        n="02"
        title="Typography"
        note="Cormorant Garamond (light) for display, Inter for everything functional. Eight steps total — if a size isn't here, it can't be used, which is what stops headings drifting between pages."
      >
        <div className="space-y-10">
          {typeScale.map((t) => (
            <div
              key={t.label}
              className="grid gap-3 border-b border-white/5 pb-8 md:grid-cols-[7rem_1fr] md:gap-8"
            >
              <p className="text-muted pt-2 font-mono text-xs">{t.label}</p>
              <p className={t.cls}>{t.sample}</p>
            </div>
          ))}
          <div className="grid gap-3 md:grid-cols-[7rem_1fr] md:gap-8">
            <p className="text-muted pt-1 font-mono text-xs">eyebrow</p>
            <p className="eyebrow">Live Flight Monitoring</p>
          </div>
        </div>
      </Section>

      {/* ---------- 03 Buttons ---------- */}
      <Section
        n="03"
        title="Buttons"
        note="Three variants. Primary is reserved for the single most important action on a page — usually 'Get a Quote'. Hover states are on the live page."
      >
        <div className="flex flex-wrap items-center gap-4">
          <button className="btn btn-primary">Get a Quote</button>
          <button className="btn btn-secondary">Book Now</button>
          <button className="btn btn-ghost">Call Us</button>
        </div>
        <p className="text-muted mt-6 text-sm">
          Client&apos;s four CTAs: Book Now · Get a Quote · Call Us · WhatsApp
          Us
        </p>
      </Section>

      {/* ---------- 04 Form fields ---------- */}
      <Section
        n="04"
        title="Form Fields"
        note="The enquiry form is the commercial heart of the site, so inputs are core system components rather than an afterthought. Focus state uses gold — click into a field to see it."
      >
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
              <select id="sg-vehicle" className="field" defaultValue="">
                <option value="" disabled>
                  Select a category
                </option>
                <option>Executive Saloon — up to 4</option>
                <option>Executive MPV — up to 7</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="sg-notes">
                Special Requests
              </label>
              <textarea
                id="sg-notes"
                className="field"
                placeholder="Child seat, extra luggage, name board wording…"
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
      <Section
        n="05"
        title="Cards"
        note="One card component covers vehicle categories, service tiles, and testimonials. Hover to see the interactive variant lift."
      >
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

      {/* ---------- 06 Motifs ---------- */}
      <Section
        n="06"
        title="Motifs & Rules"
        note="The Greek key is taken from the client's own logo roundel. Reusing it as a divider ties the site to the brand mark instead of inventing unrelated decoration."
      >
        <div className="space-y-10">
          <div>
            <p className="text-muted mb-4 font-mono text-xs">.meander</p>
            <div className="meander" />
          </div>
          <div>
            <p className="text-muted mb-4 font-mono text-xs">.rule</p>
            <div className="rule" />
          </div>
          <div>
            <p className="text-muted mb-4 font-mono text-xs">.rule-gold</p>
            <div className="rule-gold" />
          </div>
          <div>
            <p className="text-muted mb-4 font-mono text-xs">.text-metal</p>
            <p className="font-display text-h1 text-metal font-light">
              Exotic Travel
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- 07 Surfaces ---------- */}
      <Section
        n="07"
        title="Surfaces"
        note="The client asked for 'subtle black marble or textured background on some sections'. Built from CSS gradients plus an SVG grain filter — no image request, never pixelates, and it stops large black areas from colour-banding on cheap screens."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-ink flex h-40 items-center justify-center rounded-md border border-white/10">
            <span className="text-muted font-mono text-xs">.bg-ink</span>
          </div>
          <div className="surface-raised flex h-40 items-center justify-center rounded-md border border-white/10">
            <span className="text-muted font-mono text-xs">.surface-raised</span>
          </div>
          <div className="surface-marble flex h-40 items-center justify-center rounded-md border border-white/10">
            <span className="text-muted font-mono text-xs">.surface-marble</span>
          </div>
        </div>
      </Section>

      {/* ---------- 08 Logo ---------- */}
      <Section
        n="08"
        title="Logo — Known Issues"
        note="The supplied file is a 424KB raster PNG inside an SVG wrapper, and the full lockup was designed for a white background. Cropped wrappers below are the interim fix."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-8">
            <p className="text-muted mb-6 font-mono text-xs">
              full file (as supplied)
            </p>
            <Image
              src="/logo.svg"
              alt="Exotic Travel logo as supplied"
              width={644}
              height={583}
              className="w-full"
            />
            <p className="mt-6 text-sm text-red-400">
              ✕ Grey service text at the bottom is invisible on black.
            </p>
          </div>
          <div className="card p-8">
            <p className="text-muted mb-6 font-mono text-xs">.logo-crop</p>
            <div className="logo-crop">
              <Image
                src="/logo.svg"
                alt="Exotic Travel"
                width={644}
                height={583}
              />
            </div>
            <p className="mt-6 text-sm text-gold">
              ✓ Usable for the footer and large marks.
            </p>
          </div>
          <div className="card p-8">
            <p className="text-muted mb-6 font-mono text-xs">.logo-mark</p>
            <div className="logo-mark mx-auto w-28">
              <Image
                src="/logo.svg"
                alt="Exotic Travel monogram"
                width={644}
                height={583}
              />
            </div>
            <p className="mt-6 text-sm text-gold">
              ✓ Roundel only — header and favicon.
            </p>
          </div>
        </div>

        <div className="card mt-8 border-l-2 border-l-gold p-6">
          <p className="eyebrow">Ask the client for</p>
          <ul className="text-muted mt-4 space-y-2 text-sm">
            <li>
              — True vector source (AI, EPS or real SVG), not a PNG in a
              wrapper
            </li>
            <li>— A horizontal lockup for the site header</li>
            <li>— A version with the grey service text removed or in white</li>
          </ul>
        </div>
      </Section>

      {/* ---------- 09 Imagery ---------- */}
      <Section
        n="09"
        title="Imagery"
        note="Six client-supplied images. Photography carries the premium feel — this is precisely why 3D models aren't needed. A dark gradient scrim goes over any image carrying text."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <figure
              key={i}
              className="relative aspect-[3/2] overflow-hidden rounded-md border border-white/10"
            >
              <Image
                src={`/image-${i}.jpg`}
                alt={`Exotic Travel fleet ${i}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-4 font-mono text-xs text-white/70">
                image-{i}.jpg
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ---------- 10 Motion ---------- */}
      <Section
        n="10"
        title="Motion"
        note="One easing curve and two durations across the whole site. 'Smooth animations rather than lots of colours' — so motion is fade and rise only, never bounce or slide-in from the side."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card p-6">
            <p className="font-mono text-sm">--ease-luxe</p>
            <p className="text-muted mt-2 font-mono text-xs">
              cubic-bezier(0.22, 1, 0.36, 1)
            </p>
            <p className="text-muted mt-4 text-sm">
              Fast out, long settle. Reads as expensive rather than snappy.
            </p>
          </div>
          <div className="card p-6">
            <p className="font-mono text-sm">400ms / 700ms</p>
            <p className="text-muted mt-2 font-mono text-xs">quick / slow</p>
            <p className="text-muted mt-4 text-sm">
              Quick for interaction feedback, slow for scroll reveals. All
              motion is disabled under prefers-reduced-motion.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
