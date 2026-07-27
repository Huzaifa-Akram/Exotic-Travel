"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * Shared shell for the date and time pickers: a form-cell trigger and a
 * panel that hangs off it. Kept separate from the pickers themselves so
 * both open, close, escape and position identically — a calendar that
 * behaves differently from the clock beside it feels broken even when
 * nothing is wrong.
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
  const [above, setAbove] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /**
   * Hand the trigger its focus back when the panel closes — but only if
   * closing would otherwise strand focus on <body>. Clicking straight
   * from an open calendar into the next field should leave the focus
   * where the visitor put it, not drag it backwards.
   */
  const openedOnce = useRef(false);
  useEffect(() => {
    if (open) {
      openedOnce.current = true;
      return;
    }
    if (!openedOnce.current) return;

    const active = document.activeElement;
    if (active === document.body || rootRef.current?.contains(active)) {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Deliberately free of refs: this is handed to the panel body and the
  // lint rules (rightly) forbid reading a ref on the render path.
  const close = useCallback(() => setOpen(false), []);

  const toggle = () => {
    // Decide the direction before opening. The hero bar sits near the
    // bottom of the viewport by design, so a panel that always dropped
    // downward would open off the bottom of the screen.
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      const room = window.innerHeight - rect.bottom;
      setAbove(room < 380 && rect.top > room);
    }
    setOpen((o) => !o);
  };

  const trigger =
    variant === "bar" ? (
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-sm border bg-white/5 px-4 py-2.5 text-left transition-colors duration-300 ${
          open
            ? "border-gold/60 bg-white/8"
            : invalid
              ? "border-danger"
              : "border-white/12 hover:border-white/25"
        }`}
      >
        <span
          className={`truncate text-base ${display ? "text-white" : "text-white/35"}`}
        >
          {display || placeholder}
        </span>
        <span className="text-gold/70 shrink-0">{icon}</span>
      </button>
    ) : (
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
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

  return (
    <div ref={rootRef} className="relative">
      {trigger}

      {open && (
        <div
          role="dialog"
          aria-label={label}
          className={`glass-solid absolute left-0 z-50 rounded-md p-4 ${
            above ? "bottom-full mb-2" : "top-full mt-2"
          } ${panelClassName}`}
        >
          {children(close)}
        </div>
      )}
    </div>
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
