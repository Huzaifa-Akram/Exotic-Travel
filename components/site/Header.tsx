"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, site } from "@/lib/site";

/* -------------------------------------------------------------- */

function Emblem() {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt=""
        width={52}
        height={47}
        priority
        className="h-9 w-auto transition-transform duration-500 ease-luxe group-hover:scale-105 xl:h-11"
      />
      {/* Gold hairline divider */}
      <span className="h-8 w-px bg-linear-to-b from-transparent via-gold/50 to-transparent xl:h-9" />
      {/* Stacked wordmark — the two 6-letter words align into a neat block */}
      <span className="flex flex-col leading-[1.08]">
        <span className="font-display text-[14px] font-medium tracking-[0.3em] text-white xl:text-[15px]">
          EXOTIC
        </span>
        <span className="font-display text-metal text-[14px] font-medium tracking-[0.3em] xl:text-[15px]">
          TRAVEL
        </span>
      </span>
    </span>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative py-1 text-[11px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:text-white ${
        active
          ? "text-white after:w-4"
          : "text-muted after:w-0 hover:after:w-4"
      }`}
    >
      {label}
    </Link>
  );
}

// Outlined gold that fills on hover (matching the design-system secondary
// button), with a sliding arrow.
function QuoteButton() {
  return (
    <Link
      href="/quote"
      className="group inline-flex shrink-0 items-center gap-2 border border-gold px-5 py-2.5 text-[11px] whitespace-nowrap tracking-[0.14em] text-gold uppercase transition-colors duration-500 ease-luxe hover:bg-gold hover:text-ink"
    >
      Get a Quote
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
  );
}

/* -------------------------------------------------------------- */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation. The per-link onClick misses browser back/forward
  // — including the iOS swipe-back gesture, which is easy to trigger with
  // the panel open and would otherwise land on the next page with the
  // menu still up and the page scroll still locked.
  //
  // Adjusted during render rather than in an effect: React re-runs this
  // render before committing, so the panel never paints in the open
  // state on the new route. (react.dev — "adjusting state when a prop
  // changes"; an effect here would flash it and trips the
  // react-hooks/set-state-in-effect rule.)
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };

    // The panel is xl:hidden, so growing past the breakpoint makes it
    // disappear — without this the scroll lock would stay stuck on.
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onBreakpoint = () => desktop.matches && setMenuOpen(false);
    onBreakpoint();

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-50 transition-all duration-500 ease-luxe ${
          scrolled || menuOpen
            ? "bg-ink/90 backdrop-blur-md"
            : "bg-linear-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between xl:h-20">
          {/* Logo — left */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group shrink-0"
            aria-label="Exotic Travel — home"
          >
            <Emblem />
          </Link>

          {/* Nav + CTA — right (desktop) */}
          <div className="hidden items-center gap-8 xl:flex">
            <nav className="flex items-center gap-6">
              {primaryNav.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive(item.href)}
                />
              ))}
            </nav>
            <QuoteButton />
          </div>

          {/* Hamburger — right (mobile / tablet) */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="relative z-50 -mr-1 flex h-10 w-10 items-center justify-center text-white xl:hidden"
          >
            {/* Whole icon spins 180° while the bars morph into an X */}
            <span
              className={`relative block h-3.5 w-6 transition-transform duration-500 ease-luxe ${
                menuOpen ? "rotate-180" : ""
              }`}
            >
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-all duration-300 ease-luxe ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 block h-[1.5px] w-6 origin-center bg-current transition-all duration-300 ease-luxe ${
                  menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-all duration-300 ease-luxe ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Gold-tinted hairline, fades in on scroll */}
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent transition-opacity duration-500 ${
            scrolled || menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* ================= Mobile menu ================= */}

      {/* Backdrop — dims the page, closes on tap */}
      <div
        onClick={closeMenu}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ease-luxe xl:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/*
        Panel — parked flush off the right edge (translate-x-full ==
        exactly its own width), slides to right-0 when open.
        `invisible` when closed matters: without it the blurred drop
        shadow still bleeds a dark band back over the right edge, and
        the links stay tabbable. Visibility flips instantly on open and
        only at the end of the slide on close, so the animation is
        unaffected in both directions.
      */}
      <aside
        id="mobile-menu"
        inert={!menuOpen}
        aria-label="Menu"
        className={`surface-marble fixed inset-y-0 right-0 z-40 flex w-[86%] max-w-sm flex-col overflow-x-hidden overflow-y-auto overscroll-contain border-l border-white/10 shadow-2xl shadow-black/60 transition-[transform,visibility] duration-500 ease-luxe xl:hidden ${
          menuOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="h-16 shrink-0" />
        <div className="meander shrink-0 opacity-40" />

        <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
          {primaryNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? `${i * 35 + 90}ms` : "0ms" }}
              className={`group flex items-center justify-between border-b border-white/5 py-3.5 font-display text-2xl font-light transition-all duration-400 ease-luxe ${
                menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              } ${isActive(item.href) ? "text-metal" : "text-white"}`}
            >
              {item.label}
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                aria-hidden
                className="-translate-x-2 text-gold opacity-0 transition-all duration-300 ease-luxe group-hover:translate-x-0 group-hover:opacity-100"
              >
                <path
                  d="M0 5h13M10 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </nav>

        <div className="shrink-0 space-y-4 px-8 pb-10">
          <Link
            href="/quote"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary w-full"
          >
            Get a Quote
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a href={site.phone.href} className="btn btn-ghost w-full">
              Call Us
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-muted pt-2 text-center text-xs">
            {site.phone.display} · {site.email}
          </p>
        </div>
      </aside>
    </header>
  );
}
