"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-triggered entrance — the below-the-fold sibling of the hero's
 * `.rise`. Renders its children inside a `.reveal` wrapper and adds
 * `.is-visible` the first time the wrapper crosses into the viewport;
 * globals.css owns what that looks like (one fade-and-rise, one curve).
 *
 * A wrapper rather than a hook so the children stay server-rendered —
 * every section keeps its markup in the HTML payload, and only this
 * shell hydrates. `className` lands on the wrapper itself, so a Reveal
 * can *be* a grid item rather than an extra box around one.
 *
 * `delay` staggers siblings via the same `--rise-delay` custom property
 * `.rise` uses. Stagger within a row, not across a page — a visitor
 * mid-scroll should never be waiting on choreography.
 */
export function Reveal({
  delay = 0,
  className = "",
  children,
}: {
  /** Milliseconds to hold after entering view. Keep under ~300. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fires once, slightly before the element's top clears the fold, so
    // the rise is already underway as the eye arrives — never a blank
    // slot that pops in after the scroll stops.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-visible");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={
        delay
          ? ({ "--rise-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
