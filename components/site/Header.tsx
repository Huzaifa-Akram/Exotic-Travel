"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, site, type NavItem } from "@/lib/site";

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

function Chevron({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <svg
      width="9"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
      className={`transition-transform duration-400 ease-luxe ${
        open ? "rotate-180" : ""
      } ${className}`}
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shared by plain nav items and the label half of a dropdown parent. */
const linkClasses = (active: boolean) =>
  `relative py-1 text-[11px] tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:text-white ${
    active ? "text-white after:w-4" : "text-muted after:w-0 hover:after:w-4"
  }`;

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

/**
 * A desktop nav item, with or without a dropdown.
 *
 * Navigating and disclosing are two separate controls on purpose. The
 * label is a link that always goes to the page; the chevron beside it is
 * a button that opens the panel. Hover opens it as well, but only for a
 * mouse — `pointerType` is checked because a tap also fires
 * pointerenter, which would otherwise open the menu and follow the link
 * at the same time. Touch users tap the chevron; keyboard users tab to it.
 */
function DesktopItem({
  item,
  active,
  isActive,
  open,
  setOpen,
}: {
  item: NavItem;
  active: boolean;
  isActive: (href: string) => boolean;
  open: boolean;
  setOpen: (href: string | null) => void;
}) {
  if (!item.menu) {
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={linkClasses(active)}
      >
        {item.label}
      </Link>
    );
  }

  const { overview, links } = item.menu;

  return (
    <div
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOpen(item.href);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setOpen(null);
      }}
      // Closes when focus leaves the item entirely — tabbing out of the
      // last link in the panel, rather than between two of them.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(null);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(null);
      }}
    >
      <span className="flex items-center gap-1.5">
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={linkClasses(active)}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${item.label} — more pages`}
          onClick={() => setOpen(open ? null : item.href)}
          className={`-m-1 p-1 transition-colors duration-300 ${
            open ? "text-gold" : "text-muted hover:text-gold"
          }`}
        >
          <Chevron open={open} />
        </button>
      </span>

      {/* The pt-4 belongs to this wrapper rather than the panel, so the
          gap between trigger and panel is still inside the hover area —
          otherwise the menu closes as the pointer crosses it. */}
      <div
        className={`absolute top-full left-1/2 z-50 -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-400 ease-luxe ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="glass-solid w-72 rounded-md p-2">
          {/* Featured link to the parent page. On a touch device this is
              the only way in, since the tap opened the menu instead. */}
          <Link
            href={item.href}
            onClick={() => setOpen(null)}
            className="hover:bg-gold/10 block rounded-sm px-4 py-3 transition-colors duration-300"
          >
            <span className="eyebrow block">{overview.label}</span>
            <span className="mt-1.5 block text-xs text-white/50">
              {overview.note}
            </span>
          </Link>

          <div className="rule my-1.5" />

          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(null)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-sm px-4 py-2.5 text-[12px] tracking-[0.1em] uppercase transition-colors duration-300 hover:bg-white/5 hover:text-gold ${
                    isActive(l.href) ? "text-gold" : "text-white/75"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /** href of the item whose dropdown is open — desktop panel or drawer
      section. The two are never on screen together, so one value does. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };

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
    setOpenMenu(null);
  }

  // A dropdown opened by tapping the chevron has no pointerleave to close
  // it, so a tap anywhere outside the header does the job.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openMenu]);

  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeMenu();
      toggleRef.current?.focus();
    };

    // The panel is xl:hidden, so growing past the breakpoint makes it
    // disappear — without this the scroll lock would stay stuck on.
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onBreakpoint = () => desktop.matches && closeMenu();
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

  /** A parent counts as active when one of its children is the page. */
  const itemActive = (item: NavItem) =>
    isActive(item.href) || !!item.menu?.links.some((l) => isActive(l.href));

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
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
            {/* gap-5 until 2xl. "Executive Chauffeur" is a longer label
                than the one it replaced and each dropdown parent now
                carries a chevron, and this row has never had much room
                to spare at exactly 1280px. */}
            <nav className="flex items-center gap-5 2xl:gap-6">
              {primaryNav.map((item) => (
                <DesktopItem
                  key={item.href}
                  item={item}
                  active={itemActive(item)}
                  isActive={isActive}
                  open={openMenu === item.href}
                  setOpen={setOpenMenu}
                />
              ))}
            </nav>
            <QuoteButton />
          </div>

          {/* Hamburger — right (mobile / tablet) */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => {
              setMenuOpen((o) => !o);
              setOpenMenu(null);
            }}
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

        {/* Top-aligned rather than centred: a section expanding under a
            centred stack shifts every other row, and a centred flex
            column that overflows clips its own top in most browsers. */}
        <nav className="flex flex-1 flex-col gap-1 px-8 py-7">
          {primaryNav.map((item, i) => {
            const expanded = openMenu === item.href;
            return (
              <div
                key={item.href}
                style={{ transitionDelay: menuOpen ? `${i * 35 + 90}ms` : "0ms" }}
                className={`transition-all duration-400 ease-luxe ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/5">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`group flex flex-1 items-center gap-3 py-3.5 font-display text-2xl font-light ${
                      itemActive(item) ? "text-metal" : "text-white"
                    }`}
                  >
                    {item.label}
                    {!item.menu && (
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
                    )}
                  </Link>

                  {/* Separate from the link, so the parent page stays one
                      tap away and expanding never navigates. -mr-3 keeps
                      the 44px touch target without pushing the rule in. */}
                  {item.menu && (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-label={`${item.label} — more pages`}
                      onClick={() => setOpenMenu(expanded ? null : item.href)}
                      className="text-gold -mr-3 flex h-11 w-11 items-center justify-center"
                    >
                      <Chevron open={expanded} className="h-2.5 w-3.5" />
                    </button>
                  )}
                </div>

                {item.menu && (
                  <ul
                    className={`overflow-hidden transition-all duration-400 ease-luxe ${
                      expanded ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.menu.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={closeMenu}
                          aria-current={isActive(l.href) ? "page" : undefined}
                          className={`block border-b border-white/5 py-3 pl-5 text-[13px] tracking-[0.1em] uppercase transition-colors duration-300 ${
                            isActive(l.href)
                              ? "text-gold"
                              : "text-white/65 hover:text-gold"
                          }`}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 space-y-4 px-8 pb-10">
          <Link href="/quote" onClick={closeMenu} className="btn btn-primary w-full">
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
