"use client";

import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * Shared shell for the date and time pickers: a trigger, and a panel
 * that opens as a centred modal rather than an anchored dropdown.
 *
 * An anchored popover was the first approach here, but the hero's
 * `isolate` stacking context trapped its z-index inside Hero's own
 * layer — the footer below (itself `position: relative`, painted
 * later in DOM order) has no such ceiling, so the calendar rendered
 * behind it whenever it dropped near the bottom of the section.
 * Portaling to <body> and centring the panel sidesteps every ancestor's
 * z-index, overflow and stacking-context quirks at once, and reads as
 * the more deliberate, premium interaction anyway.
 */

export type PopoverVariant =
  /** Compact boxed control for the hero's glass bar. */
  | "bar"
  /** Full-size control on a normal form, styled like .field. */
  | "field";

/**
 * True only after the first client render. The pickers use it to swap a
 * plain native input for the custom control, so the server-rendered
 * markup is a working `<input type="date">` — with JavaScript broken or
 * still loading the enquiry can be completed anyway. §17 of the brief
 * counts a lost enquiry as lost revenue.
 */
const subscribeToNothing = () => () => {};

export function useMounted() {
  // useSyncExternalStore rather than the usual setState-in-an-effect: it
  // returns a different snapshot on the server (false) and on the client
  // (true), which is precisely the swap we want, without the cascading
  // render that pattern causes.
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

export function Popover({
  label,
  display,
  placeholder,
  icon,
  variant,
  panelClassName = "",
  invalid,
  children,
}: {
  label: string;
  display: string;
  placeholder: string;
  icon: React.ReactNode;
  variant: PopoverVariant;
  panelClassName?: string;
  invalid?: boolean;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Locked so the page behind a centred modal can't scroll out from
    // under it — the same treatment as the mobile nav drawer.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Simple, not a full focus trap (Tab can still escape to the page
  // behind the backdrop) — proportionate for a two-column calendar or a
  // pair of scroll lists, not a multi-step dialog.
  const openedOnce = useRef(false);
  useEffect(() => {
    if (open) {
      openedOnce.current = true;
      panelRef.current?.focus();
      return;
    }
    if (openedOnce.current) triggerRef.current?.focus();
  }, [open]);

  // Deliberately free of refs: this is handed to the panel body and the
  // lint rules (rightly) forbid reading a ref on the render path.
  const close = useCallback(() => setOpen(false), []);

  const trigger =
    variant === "bar" ? (
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        className={`field-bar ${invalid ? "border-danger" : ""}`}
      >
        <span
          className={`truncate ${display ? "text-white" : "text-white/35"}`}
        >
          {display || placeholder}
        </span>
        <span className="text-gold/70 shrink-0">{icon}</span>
      </button>
    ) : (
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        className={`field flex w-full cursor-pointer items-center justify-between gap-3 text-left ${
          invalid ? "border-danger" : ""
        }`}
      >
        <span className={display ? "text-text" : "text-white/30"}>
          {display || placeholder}
        </span>
        <span className="text-gold shrink-0">{icon}</span>
      </button>
    );

  // The trigger itself never needs the browser's `document` — only the
  // portal target does, and this component is only ever mounted once
  // its caller's own `useMounted()` check has already passed, so
  // `document` is always available by the time `open` can become true.
  return (
    <>
      {trigger}

      {open &&
        createPortal(
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div
              aria-hidden
              onClick={close}
              className="glass-backdrop absolute inset-0"
            />

            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={label}
              tabIndex={-1}
              className={`glass-solid relative overflow-hidden rounded-md focus:outline-none ${panelClassName}`}
            >
              {/* A title bar rather than a close button floating over the
                  panel. Absolutely positioned, it landed on top of
                  whatever the body put in its top-right corner — the
                  calendar's next-month arrow, most obviously. Giving it a
                  row of its own means no picker has to leave a hole for
                  it, and the panel gains a heading it was missing. */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5 pr-2.5 pl-5">
                <p className="text-[10px] font-medium tracking-[0.2em] text-white/45 uppercase">
                  {label}
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="text-muted hover:border-gold/50 hover:text-gold flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-transparent transition-colors duration-300"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 1l12 12M13 1 1 13"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-5">{children(close)}</div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

/* -------------------------------------------------------------- */
/* Icons, matched to the 1.25px hairline weight used elsewhere.    */

export function CalendarIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.75v5.6l3.5 2" />
    </svg>
  );
}
