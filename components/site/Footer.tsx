import Image from "next/image";
import Link from "next/link";
import {
  airports,
  companyLinks,
  services,
  site,
} from "@/lib/site";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-muted hover:text-gold text-sm transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-raised relative mt-px border-t border-white/10">
      <div className="meander opacity-30" />

      <div className="container-x section-tight">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Exotic Travel — home"
            >
              <Image
                src="/logo.svg"
                alt=""
                width={44}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-display text-lg font-medium tracking-[0.3em] text-white">
                EXOTIC <span className="text-metal">TRAVEL</span>
              </span>
            </Link>

            <p className="text-muted mt-6 max-w-sm text-sm">
              Chauffeur-driven airport transfers and executive travel with
              meet &amp; greet, live flight monitoring and professional
              chauffeurs. {site.serviceArea}.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={site.phone.href}
                className="text-muted hover:text-gold flex items-center gap-3 transition-colors"
              >
                <span className="text-gold">Call</span> {site.phone.display}
              </a>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-gold flex items-center gap-3 transition-colors"
              >
                <span className="text-gold">WhatsApp</span> {site.phone.display}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-muted hover:text-gold flex items-center gap-3 transition-colors"
              >
                <span className="text-gold">Email</span> {site.email}
              </a>
            </div>
          </div>

          <LinkColumn title="Services" links={services} />
          <LinkColumn title="Airport Transfers" links={airports} />
          <LinkColumn title="Company" links={companyLinks} />
        </div>

        {/* Payment / trust note */}
        <div className="mt-14 rounded-md border border-white/10 bg-black/30 px-6 py-5">
          <p className="text-muted text-center text-sm">
            <span className="text-gold">Simple payment.</span>{" "}
            {site.paymentNote}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs md:flex-row">
          <p className="text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-muted">{site.licence}</p>
        </div>
      </div>
    </footer>
  );
}
