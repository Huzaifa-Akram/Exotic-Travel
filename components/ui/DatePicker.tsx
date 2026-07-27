"use client";

import { useState } from "react";
import {
  CalendarIcon,
  Popover,
  useMounted,
  type PopoverVariant,
} from "@/components/ui/Popover";

/**
 * On-brand date picker. The native control paints its own calendar in
 * OS chrome — blue highlights, system fonts, no way to theme it — which
 * on a black-and-gold luxury site looks like a bug. This draws the
 * month itself.
 *
 * Values are plain `YYYY-MM-DD`, so the hidden input, the query string
 * and `<input type="date">` all speak the same language and the server
 * action does not care which one produced the value.
 */

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SHORT_MONTHS = MONTHS.map((m) => m.slice(0, 3));
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pad = (n: number) => String(n).padStart(2, "0");

/** Local-time ISO date. `toISOString()` would shift the day across UTC. */
const toKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function parse(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Formatted by hand rather than with Intl: this component renders on the
 * server too, and a locale difference between Node and the browser would
 * produce two different strings for the same value and break hydration.
 */
function format(value: string) {
  const d = parse(value);
  if (!d) return "";
  return `${SHORT_DAYS[d.getDay()]} ${d.getDate()} ${SHORT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** Monday-first grid, padded with nulls so the weekday columns line up. */
function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  return cells;
}

export function DatePicker({
  name,
  label,
  placeholder = "Select a date",
  defaultValue = "",
  variant = "field",
  invalid,
}: {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  variant?: PopoverVariant;
  invalid?: boolean;
}) {
  const mounted = useMounted();
  const [value, setValue] = useState(defaultValue);

  // Before hydration — and forever, if the bundle never arrives — this is
  // an ordinary date input that submits perfectly well.
  if (!mounted) {
    return variant === "bar" ? (
      <input
        type="date"
        name={name}
        defaultValue={defaultValue}
        aria-label={label}
        className="w-full rounded-sm border border-white/12 bg-white/5 px-4 py-2.5 text-base text-white"
      />
    ) : (
      <input
        type="date"
        name={name}
        defaultValue={defaultValue}
        aria-label={label}
        className="field"
      />
    );
  }

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <Popover
        label={label}
        display={format(value)}
        placeholder={placeholder}
        icon={<CalendarIcon />}
        variant={variant}
        invalid={invalid}
        panelClassName="w-[19.5rem] max-w-[calc(100vw-2.5rem)]"
      >
        {(close) => (
          <Calendar
            value={value}
            onSelect={(next) => {
              setValue(next);
              close();
            }}
          />
        )}
      </Popover>
    </>
  );
}

/* -------------------------------------------------------------- */

function Calendar({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) {
  // Only ever constructed after mount, so reading the clock here cannot
  // desynchronise the server and client renders.
  const today = new Date();
  const todayKey = toKey(today);
  const selected = parse(value);

  const [view, setView] = useState(() => {
    const base = selected ?? today;
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const cells = monthGrid(view.year, view.month);
  const step = (delta: number) => {
    const d = new Date(view.year, view.month + delta, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  // Past dates are unbookable, and the whole month before this one is
  // worth disabling in one comparison rather than 31.
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Arrow direction="prev" onClick={() => step(-1)} />
        <p className="font-display text-lg font-light text-white">
          {MONTHS[view.month]}{" "}
          <span className="text-gold/70">{view.year}</span>
        </p>
        <Arrow direction="next" onClick={() => step(1)} />
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAY_NAMES.map((d) => (
          <span
            key={d}
            className="text-center text-[10px] tracking-[0.1em] text-white/35 uppercase"
          >
            {d.slice(0, 1)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={`pad-${i}`} />;

          const key = toKey(date);
          const isPast = date.getTime() < startOfToday;
          const isSelected = key === value;
          const isToday = key === todayKey;

          return (
            <button
              key={key}
              type="button"
              disabled={isPast}
              aria-pressed={isSelected}
              onClick={() => onSelect(key)}
              className={`h-9 rounded-sm text-[13px] transition-colors duration-200 ${
                isSelected
                  ? "bg-gold text-ink font-medium"
                  : isPast
                    ? "cursor-not-allowed text-white/15"
                    : "text-white/80 hover:bg-gold/15 hover:text-gold"
              } ${isToday && !isSelected ? "ring-gold/40 ring-1 ring-inset" : ""}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Arrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous month" : "Next month"}
      className="text-muted hover:border-gold/50 hover:text-gold flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 transition-colors duration-300"
    >
      <svg
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="none"
        aria-hidden
        className={direction === "prev" ? "rotate-180" : ""}
      >
        <path
          d="m1 1 4.5 4.5L1 10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
