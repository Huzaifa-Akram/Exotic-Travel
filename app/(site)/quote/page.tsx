import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quotation",
  description:
    "Tell us about your journey and receive a bespoke quotation for chauffeur-driven airport transfers, corporate travel and events. No instant pricing, no upfront online payment.",
};

/** Query strings are `string | string[] | undefined`; take the first. */
const one = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? "";

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Sent by the hero search bar as ?from=&to=&when=. Reading them opts
  // this route into dynamic rendering, which is correct — the page is
  // different for every visitor who arrives from the hero.
  const params = await searchParams;

  return (
    <section className="surface-marble section pt-32 md:pt-40">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">Enquiry</p>
          <h1 className="font-display text-h1 mt-6 font-light">
            Request a <span className="text-metal">quotation</span>
          </h1>
          <div className="rule-gold mt-8" />
          <p className="text-muted mt-8 text-lg">
            Tell us about the journey and we will reply with a bespoke
            quotation — usually within the hour. Every quote is prepared by
            hand, so the price you receive is for your journey, not a meter
            estimate.
          </p>
        </div>

        <QuoteForm
          prefill={{
            from: one(params.from),
            to: one(params.to),
            date: one(params.date),
            time: one(params.time),
          }}
        />
      </div>
    </section>
  );
}
