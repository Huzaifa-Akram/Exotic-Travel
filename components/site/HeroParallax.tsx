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
 */

/** Fraction of scroll distance the photograph lags behind the page. */
const FACTOR = 0.12;

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

    // Restoring a mid-page scroll position (back navigation, refresh)
    // must not leave the photograph parked at zero.
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-x-0 -top-[14%] h-[128%] will-change-transform"
    >
      {children}
    </div>
  );
}
