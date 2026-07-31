import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, servicePages } from "@/content/services";
import { vehicleCategories, vehicleDisclaimer } from "@/lib/enquiry";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PhoneIcon, WhatsAppIcon } from "@/components/home/icons";

/**
 * The occasion page template — §17's second content template, driven by
 * content/services.ts. Structurally distinct from the airport template
 * on purpose: a photographic masthead rather than a split one, and a
 * checklist where that page carries a facts row. Same tokens, same
 * motion, same section rhythm — a visitor should recognise the site
 * without feeling they are rereading a page they have already seen.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ service: s.slug }));
}

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const s = getService(service);
  if (!s) return {};
  return {
    title: s.fullName,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const s = getService(service);
  if (!s) notFound();

  const others = servicePages.filter((o) => o.slug !== s.slug);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: s.fullName,
        item: `${site.url}/services/${s.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* ---------------- Photographic masthead ----------------
          The photograph carries the page rather than sitting beside it,
          so it keeps its descriptive alt text — this is the hero image,
          not a texture. Scrimmed twice: a flat pour of ink for overall
          legibility, then a vertical gradient that goes solid at the
          foot so the frame melts into the section below it. */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="grain absolute inset-0 -z-10">
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            quality={85}
            className="object-cover object-[50%_38%]"
          />
          <div className="bg-ink/72 absolute inset-0" />
          <div className="from-ink/85 to-ink absolute inset-0 bg-linear-to-b via-transparent" />
        </div>

        <div className="container-x section pt-36 md:pt-44">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">{s.eyebrow}</p>
              <h1 className="font-display text-h1 mt-5 font-light text-balance">
                {s.titleLead}{" "}
                <span className="text-metal">{s.titleAccent}</span>
              </h1>
              <div className="rule-gold mx-auto mt-7" />
              <p className="text-muted mt-7 max-w-2xl text-lg text-pretty">
                {s.intro}
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <Link href="/quote" className="btn btn-primary">
                Get a Quote
              </Link>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                WhatsApp Us
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- What the service actually gives you ---------------- */}
      <section className="section" aria-labelledby={`${s.slug}-features`}>
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">The Service</p>
            <h2
              id={`${s.slug}-features`}
              className="font-display text-h2 mt-5 max-w-3xl font-light text-balance"
            >
              What you can{" "}
              <span className="text-metal">count on</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
            {s.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 90}>
                <article className="card card-interactive flex h-full gap-5 p-8">
                  <span className="border-gold/30 text-gold flex h-12 w-12 shrink-0 items-center justify-center rounded-full border">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-white">
                      {f.title}
                    </h3>
                    <p className="text-muted mt-2.5 text-sm text-pretty">
                      {f.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Detail + what is included ---------------- */}
      <section
        className="surface-marble section"
        aria-labelledby={`${s.slug}-detail`}
      >
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow">In Practice</p>
              <h2
                id={`${s.slug}-detail`}
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                {s.detailTitle}
              </h2>
              <div className="rule-gold mt-7" />
              <p className="text-muted mt-7 text-base text-pretty">
                {s.detailBody}
              </p>
              <p className="mt-8 text-sm">
                <a
                  href={site.phone.href}
                  className="text-gold hover:text-gold-bright transition-colors"
                >
                  {site.phone.display}
                </a>{" "}
                <span className="text-muted">
                  — a person answers, at any hour.
                </span>
              </p>
            </Reveal>

            <Reveal delay={90}>
              <p className="eyebrow text-white/45">Included as standard</p>
              <ul className="mt-6">
                {s.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 border-b border-white/10 py-4"
                  >
                    <span aria-hidden className="bg-gold h-px w-5 shrink-0" />
                    <span className="text-sm text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-white/40">{site.paymentNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Vehicles ---------------- */}
      <section className="section" aria-labelledby={`${s.slug}-vehicles`}>
        <div className="container-x">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow">The Fleet</p>
            <h2
              id={`${s.slug}-vehicles`}
              className="font-display text-h2 mt-5 font-light text-balance"
            >
              Choose the category —{" "}
              <span className="text-metal">we send the car</span>
            </h2>
            <div className="rule-gold mx-auto mt-7" />
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-8">
            {vehicleCategories
              .filter((v) => v.value !== "recommend")
              .map((v, i) => (
                <Reveal key={v.value} delay={i * 90}>
                  <article className="card card-interactive flex h-full flex-col p-8">
                    <h3 className="font-display text-h3 font-light text-white">
                      {v.label}
                    </h3>
                    <p className="text-gold mt-3 text-xs tracking-[0.08em] uppercase">
                      {v.passengers} · {v.luggage}
                    </p>
                    <div className="rule my-6" />
                    <p className="text-muted text-sm">{v.examples}</p>
                  </article>
                </Reveal>
              ))}
          </div>

          <Reveal className="mt-6">
            <p className="text-center text-xs text-white/40">
              {vehicleDisclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section
        className="surface-raised border-y border-white/10"
        aria-labelledby={`${s.slug}-faq`}
      >
        <div className="container-x section">
          <div className="mx-auto max-w-3xl">
            <Reveal className="flex flex-col items-center text-center">
              <p className="eyebrow">Questions</p>
              <h2
                id={`${s.slug}-faq`}
                className="font-display text-h2 mt-5 font-light text-balance"
              >
                {s.name}, <span className="text-metal">answered</span>
              </h2>
              <div className="rule-gold mx-auto mt-7" />
            </Reveal>

            <Reveal delay={80} className="mt-12">
              <FaqAccordion items={s.faqs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Closing ---------------- */}
      <section className="relative" aria-labelledby={`${s.slug}-cta`}>
        <div className="meander opacity-30" />
        <div className="container-x section">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal className="flex flex-col items-center">
              <p className="eyebrow">Begin</p>
              <h2
                id={`${s.slug}-cta`}
                className="font-display text-h1 mt-6 font-light text-balance"
              >
                Tell us the day —{" "}
                <span className="text-metal">consider it arranged.</span>
              </h2>
              <p className="text-muted mt-7 max-w-xl text-lg text-pretty">
                A fixed, bespoke quotation prepared by hand — usually within
                the hour, and always within 24.
              </p>
            </Reveal>

            <Reveal
              delay={100}
              className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <Link href="/quote" className="btn btn-primary">
                Get a Quote
              </Link>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                WhatsApp Us
              </a>
              <a href={site.phone.href} className="btn btn-ghost">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                Call Now
              </a>
            </Reveal>

            {/* The other occasions, plus the airport pages next door */}
            <Reveal delay={160} className="mt-14 border-t border-white/10 pt-8">
              <p className="eyebrow text-white/45">Also arranged</p>
              <ul className="mt-5 flex flex-wrap justify-center gap-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/services/${o.slug}`}
                      className="hover:border-gold/60 hover:text-gold ease-luxe block rounded-sm border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.12em] text-white/75 uppercase transition-colors duration-400"
                    >
                      {o.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/airport-transfers"
                    className="hover:border-gold/60 hover:text-gold ease-luxe block rounded-sm border border-white/15 px-5 py-2.5 text-[12px] tracking-[0.12em] text-white/75 uppercase transition-colors duration-400"
                  >
                    Airport Transfers
                  </Link>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
