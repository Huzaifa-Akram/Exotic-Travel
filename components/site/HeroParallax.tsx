"use client";

import { useEffect, useRef } from "react";

/**
 * Gentle parallax for the hero photograph — §14 of the brief asks for
 * "smooth animations rather than lots of colours ... gentle parallax".
 *
 * Client-only because it reads scroll position; the <Image> itself is
 * passed in as children so it still renders on the server, keeps its
 * priority preload, and never waits on this bundle to paint.
 *
 * The wrapper is deliberately taller than the hero and offset upward
 * (see the -top/h pair below) so the photograph can drift down without
 * ever exposing an edge — the travel must stay under that offset.
 *
 * Desktop only. Below md the hero shows the photograph whole at its own
 * aspect ratio, which leaves no headroom to drift into: the wrapper is
 * flush with its box, so any transform here would slide the picture out
 * of frame or force a crop back in.
 */

/** Fraction of scroll distance the photograph lags behind the page. */
const FACTOR = 0.12;

/** Matches the `md:` breakpoint the hero layout switches on. */
const DESKTOP = "(min-width: 48rem)";

export function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour the same preference the stylesheet's reduced-motion block
    // does — a media query can't reach an inline transform.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const draw = () => {
      frame = 0;
      // Past one viewport the hero is off-screen, so the clamp both caps
      // the travel (keeping it inside the wrapper's headroom) and stops
      // us writing transforms nobody can see.
      const y = Math.min(window.scrollY, window.innerHeight) * FACTOR;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(draw);
    };

    const desktop = window.matchMedia(DESKTOP);

    // Re-run on every breakpoint crossing, not just on mount: a phone
    // turned landscape passes 48rem, and the transform left behind by
    // the other layout would be wrong for the one now on screen.
    // Re-adding the same listener with the same options is a no-op, so
    // this is safe to call repeatedly.
    const sync = () => {
      if (desktop.matches) {
        window.addEventListener("scroll", onScroll, { passive: true });
        // Restoring a mid-page scroll position (back navigation,
        // refresh) must not leave the photograph parked at zero.
        draw();
        return;
      }
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      el.style.transform = "";
    };

    sync();
    desktop.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 will-change-transform md:top-[-14%] md:bottom-auto md:h-[128%]"
    >
      {children}
    </div>
  );
}
