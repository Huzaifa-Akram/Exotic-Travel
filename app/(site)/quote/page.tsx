import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { MarkerWave } from "@/components/ui/MarkerWave";

export const metadata: Metadata = {
  title: "Request a Quotation",
  description:
    "Tell us about your journey and receive a bespoke quotation for chauffeur-driven airport transfers, corporate travel and events. No instant pricing, no upfront online payment.",
};

/**
 * The enquiry page — where "Book Now" and "Get a Quote" both land, since
 * §4 makes them the same submission.
 *
 * The form, and nothing competing with it. An earlier pass ran a sticky
 * rail of photograph and promises alongside; that is gone at the
 * client's request, and in its place a single gold marker stroke runs
 * the height of the panel. It carries no information, which is the
 * point — the page now asks one thing and decorates the asking.
 *
 * The stroke is desktop-only. It lives in the margin the wide layout
 * has going spare, and a phone has no margin to spend.
 */

/** Query strings are `string | string[] | undefined`; take the first. */
const one = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? "";

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Sent by the hero search bar as ?from=&to=&date=&time=. Any of them
  // may be absent — the bar requires nothing, and the arrow doubles as
  // "just take me to the form" — so each falls back to an empty string
  // and the field simply renders blank. Reading them opts this route
  // into dynamic rendering, which is correct: the page differs for
  // every visitor who arrives from the hero.
  const params = await searchParams;

  return (
    <section className="surface-marble section pt-32 md:pt-40">
      <div className="container-x">
        {/* A flex row rather than a grid: the stroke is a fixed slice of
            the margin and the panel takes whatever is left, so the pair
            stays centred and the panel simply narrows on a smaller
            desktop instead of the two fighting over columns. Stretch is
            the default alignment, which is what gives the stroke the
            panel's full height without either being told what it is. */}
        <div className="mx-auto flex max-w-5xl gap-8 xl:gap-12">
          <MarkerWave className="hidden w-14 shrink-0 lg:block" />

          {/* min-w-0 so a long value inside can never push the panel
              wider than its share of the row. */}
          <div className="min-w-0 flex-1">
            {/* Panelled rather than laid on the marble: five fieldsets
                need an edge to belong to, or the page reads as a list of
                unrelated questions. */}
            <div className="border-hairline bg-ink/50 rounded-md border p-6 sm:p-8 xl:p-10">
              <p className="eyebrow">Enquiry</p>
              <h1 className="font-display text-h1 mt-5 font-light">
                Request a <span className="text-metal">quotation</span>
              </h1>
              <div className="rule-gold mt-7" />
              <p className="text-muted mt-7 text-lg text-pretty">
                Tell us about the journey and we will reply with a bespoke
                quotation. Every quote is prepared by hand, so the price you
                receive is for your journey — not a meter estimate.
              </p>

              <QuoteForm
                prefill={{
                  from: one(params.from),
                  to: one(params.to),
                  date: one(params.date),
                  time: one(params.time),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
