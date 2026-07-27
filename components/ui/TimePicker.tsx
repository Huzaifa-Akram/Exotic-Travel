"use client";

import { useState } from "react";
import {
  ClockIcon,
  Popover,
  useMounted,
  type PopoverVariant,
} from "@/components/ui/Popover";

/**
 * On-brand time picker, paired with DatePicker.
 *
 * A clock face rather than two scrolling lists: a dial is read at a
 * glance and tapped, where a list has to be hunted through.
 *
 * One ring, though. Times are 24-hour throughout — this is a
 * flight-facing form, and "7:30" with no meridiem is exactly the
 * ambiguity that misses an aircraft — and the first version of this dial
 * carried the whole day at once, 00–11 on an outer ring and 12–23 on an
 * inner one. That is the Android convention and it is genuinely hard to
 * read: two sizes of number, twenty-four tap targets, and a moment's
 * hesitation over whether 14 is the inside ring or the outside.
 *
 * So the day is split across an AM/PM switch instead and the face keeps
 * twelve evenly-spaced numbers, the shape everyone can already read. The
 * numbers on it stay the 24-hour ones — 00–11, then 12–23 — so the face
 * and the readout above it never disagree, which is the thing a
 * 12-hour dial driving a 24-hour value always gets wrong.
 *
 * Minutes stay on five-minute steps; a chauffeur is not booked for 09:37.
 */

const pad = (n: number) => String(n).padStart(2, "0");

const HOURS_AM = Array.from({ length: 12 }, (_, i) => i);
const HOURS_PM = Array.from({ length: 12 }, (_, i) => i + 12);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

const isTime = (v: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v);

/** Hour with no minute yet: the top of the hour is the safe assumption. */
const DEFAULT_MINUTE = "00";
/** Minute picked before an hour — a plausible pick-up rather than midnight. */
const DEFAULT_HOUR = "09";

type Period = "am" | "pm";

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
        className="field-bar"
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
        /* The calendar's width. Two panels open off the same bar, and
           them being different sizes is the sort of thing nobody names
           but everybody feels. It also leaves the face a clear margin
           inside the panel's padding. */
        panelClassName="w-[19.5rem] max-w-[calc(100vw-2.5rem)]"
      >
        {(close) => <Clock value={value} onChange={setValue} onDone={close} />}
      </Popover>
    </>
  );
}

/* -------------------------------------------------------------- */

/**
 * Mounted fresh each time the panel opens (the portal unmounts with it),
 * so the dial always starts on the hour — which is what the visitor is
 * choosing first whether they have a time set or not.
 */
function Clock({
  value,
  onChange,
  onDone,
}: {
  value: string;
  onChange: (value: string) => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState<"hour" | "minute">("hour");
  const [hour = "", minute = ""] = value.split(":");

  // The switch follows the value when the panel opens, and the value
  // follows the switch from then on, so the face never shows a half of
  // the day the readout disagrees with.
  const [period, setPeriod] = useState<Period>(
    hour !== "" && Number(hour) >= 12 ? "pm" : "am",
  );

  const pickHour = (h: number) => {
    onChange(`${pad(h)}:${minute || DEFAULT_MINUTE}`);
    // Straight on to the minute, as every clock picker does — two taps
    // for a time, no third to change mode.
    setStep("minute");
  };

  const pickMinute = (m: number) =>
    onChange(`${hour || DEFAULT_HOUR}:${pad(m)}`);

  const choosePeriod = (next: Period) => {
    setPeriod(next);
    // With an hour already down this is a correction — 15:20 to 03:20 —
    // not just a change of view.
    if (hour === "") return;
    const shifted = (Number(hour) % 12) + (next === "pm" ? 12 : 0);
    onChange(`${pad(shifted)}:${minute || DEFAULT_MINUTE}`);
  };

  const onHour = step === "hour";
  const hasSelection = onHour ? hour !== "" : minute !== "";
  const angle = onHour
    ? (Number(hour) % 12) * 30
    : (Number(minute) / 5) * 30;

  return (
    <div>
      {/* The readout doubles as the mode switch: tap the half you want
          to change, exactly like the system pickers this echoes. The
          AM/PM pair sits beside it rather than under the face, where it
          would read as a third thing to decide. */}
      <div className="mb-1 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <StepButton
            active={onHour}
            onClick={() => setStep("hour")}
            label="Change the hour"
          >
            {hour || "--"}
          </StepButton>
          <span className="font-display -mt-1 text-3xl leading-none font-light text-white/25">
            :
          </span>
          <StepButton
            active={!onHour}
            onClick={() => setStep("minute")}
            label="Change the minutes"
          >
            {minute || "--"}
          </StepButton>
        </div>

        <div className="flex flex-col divide-y divide-white/12 overflow-hidden rounded-sm border border-white/12">
          <PeriodButton
            active={period === "am"}
            onClick={() => choosePeriod("am")}
          >
            AM
          </PeriodButton>
          <PeriodButton
            active={period === "pm"}
            onClick={() => choosePeriod("pm")}
          >
            PM
          </PeriodButton>
        </div>
      </div>

      <p className="mb-4 text-center text-[10px] tracking-[0.18em] text-white/35 uppercase">
        {onHour ? "Select hour" : "Select minute"}
      </p>

      {/* The face. A touch of light off the top edge so it reads as a
          dial resting on the panel rather than a drawn circle. */}
      <div className="relative mx-auto aspect-square w-60 max-w-full rounded-full border border-white/10 bg-white/3 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.05),transparent_62%)]">
        {/* Hand. Rotated rather than redrawn so it sweeps to the next
            choice instead of jumping — the one piece of motion in the
            control, and the thing that makes it read as a clock. */}
        {hasSelection && (
          <div
            aria-hidden
            className="bg-gold/45 pointer-events-none absolute top-1/2 left-1/2 w-px origin-bottom transition-transform duration-300 ease-luxe"
            style={{
              height: `${RING - HAND_INSET}%`,
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
            }}
          />
        )}
        <span
          aria-hidden
          className="bg-gold absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />

        {onHour
          ? (period === "am" ? HOURS_AM : HOURS_PM).map((h) => (
              <DialButton
                key={h}
                index={h % 12}
                active={hour === pad(h)}
                label={`${pad(h)}:00`}
                onClick={() => pickHour(h)}
              >
                {pad(h)}
              </DialButton>
            ))
          : MINUTES.map((m) => (
              <DialButton
                key={m}
                index={m / 5}
                active={minute === pad(m)}
                label={`${m} minutes past`}
                onClick={() => pickMinute(m)}
              >
                {pad(m)}
              </DialButton>
            ))}
      </div>

      <button
        type="button"
        onClick={onDone}
        disabled={!value}
        className="bg-gold text-ink hover:bg-gold-bright mt-5 w-full rounded-sm py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Done
      </button>
    </div>
  );
}

/* -------------------------------------------------------------- */
/* Dial geometry. Percentages, not pixels, so the face still lines up
   when `max-w-full` shrinks it on a narrow phone.                  */

/** One ring now, so it can sit further out and breathe. */
const RING = 39;
/** Gap between the tip of the hand and the centre of the number. */
const HAND_INSET = 9;

function DialButton({
  index,
  active,
  label,
  onClick,
  children,
}: {
  index: number;
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  // 30° a step, zero at the top, clockwise.
  const a = (index * Math.PI) / 6;
  const x = RING * Math.sin(a);
  const y = -RING * Math.cos(a);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      style={{ left: offset(x), top: offset(y) }}
      className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[13px] tabular-nums transition-colors duration-200 ${
        active
          ? "bg-gold text-ink font-medium"
          : "hover:bg-gold/15 hover:text-gold text-white/70"
      }`}
    >
      {children}
    </button>
  );
}

/** `calc(50% - 12.5%)` rather than `calc(50% + -12.5%)`. */
const offset = (v: number) =>
  `calc(50% ${v < 0 ? "-" : "+"} ${Math.abs(v).toFixed(3)}%)`;

function StepButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`font-display rounded-sm px-1 text-4xl leading-none font-light tabular-nums transition-colors duration-300 ${
        active ? "text-gold" : "text-white/40 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function PeriodButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${
        active ? "bg-gold text-ink" : "hover:text-white text-white/45"
      }`}
    >
      {children}
    </button>
  );
}
