"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClockIcon,
  Popover,
  useMounted,
  type PopoverVariant,
} from "@/components/ui/Popover";

/**
 * On-brand time picker, paired with DatePicker.
 *
 * Two scrolling columns rather than one 288-row list of every five
 * minutes: choosing an hour and then a minute is two short scrolls
 * instead of one very long one. Times are 24-hour throughout — this is
 * a flight-facing form, and "7:30" with no meridiem is exactly the
 * ambiguity that misses an aircraft.
 */

const pad = (n: number) => String(n).padStart(2, "0");
const HOURS = Array.from({ length: 24 }, (_, i) => pad(i));
const MINUTES = Array.from({ length: 12 }, (_, i) => pad(i * 5));

const isTime = (v: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v);

export function TimePicker({
  name,
  label,
  placeholder = "Select a time",
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
  const [value, setValue] = useState(isTime(defaultValue) ? defaultValue : "");

  // Native input until hydration, and permanently if the bundle fails —
  // same reasoning as DatePicker.
  if (!mounted) {
    return variant === "bar" ? (
      <input
        type="time"
        name={name}
        defaultValue={defaultValue}
        aria-label={label}
        className="w-full rounded-sm border border-white/12 bg-white/5 px-4 py-2.5 text-base text-white"
      />
    ) : (
      <input
        type="time"
        name={name}
        defaultValue={defaultValue}
        aria-label={label}
        className="field"
      />
    );
  }

  const [hour = "", minute = ""] = value.split(":");

  const commit = (h: string, m: string) => setValue(`${h}:${m}`);

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <Popover
        label={label}
        display={value}
        placeholder={placeholder}
        icon={<ClockIcon />}
        variant={variant}
        invalid={invalid}
        panelClassName="w-[15rem] max-w-[calc(100vw-2.5rem)]"
      >
        {(close) => (
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <p className="text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">
                Pick-up time
              </p>
              <p className="font-display text-lg leading-none text-white">
                {value || "--:--"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Column
                heading="Hour"
                options={HOURS}
                selected={hour}
                onSelect={(h) => commit(h, minute || "00")}
              />
              <Column
                heading="Minute"
                options={MINUTES}
                selected={minute}
                onSelect={(m) => commit(hour || "09", m)}
              />
            </div>

            <button
              type="button"
              onClick={close}
              disabled={!value}
              className="bg-gold text-ink hover:bg-gold-bright mt-3 w-full rounded-sm py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Done
            </button>
          </div>
        )}
      </Popover>
    </>
  );
}

function Column({
  heading,
  options,
  selected,
  onSelect,
}: {
  heading: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  // Open on the current choice rather than at midnight — otherwise
  // anyone booking an evening pick-up scrolls the whole day first.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>("[data-selected]");
    el?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div>
      <p className="mb-2 text-center text-[10px] tracking-[0.1em] text-white/35 uppercase">
        {heading}
      </p>
      <div
        ref={listRef}
        className="h-44 overflow-y-auto overscroll-contain rounded-sm border border-white/10"
      >
        {options.map((o) => {
          const active = o === selected;
          return (
            <button
              key={o}
              type="button"
              data-selected={active || undefined}
              aria-pressed={active}
              onClick={() => onSelect(o)}
              className={`block w-full py-2 text-center text-[13px] transition-colors duration-200 ${
                active
                  ? "bg-gold text-ink font-medium"
                  : "text-white/75 hover:bg-gold/15 hover:text-gold"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
