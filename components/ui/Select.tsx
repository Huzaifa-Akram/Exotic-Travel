"use client";

import { useEffect, useId, useRef, useState } from "react";

/*
 * On-brand select. Native <select> popups are drawn by the OS and can't
 * be themed, so this is a custom listbox that matches the site's dark/gold
 * styling. Keyboard accessible, and writes to a hidden input so it works
 * inside a normal <form> — reused by the enquiry form.
 */

export type SelectOption = { value: string; label: string };

export function Select({
  options,
  placeholder = "Select…",
  name,
  id,
  defaultValue = "",
}: {
  options: SelectOption[];
  placeholder?: string;
  name?: string;
  id?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const autoId = useId();
  const listId = `${autoId}-list`;

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the active option in view while navigating by keyboard
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function choose(i: number) {
    const newVal = options[i].value;
    setValue(newVal);
    setActive(i);
    setOpen(false);
    if (onChange) onChange(newVal);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive((a) => Math.min(a + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActive((a) => Math.max(a - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else setOpen(true);
        break;
      case "Escape":
        setOpen(false);
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(options.length - 1);
        }
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      {name && <input type="hidden" name={name} value={value} />}

      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className="field flex w-full items-center justify-between gap-3 text-left"
      >
        <span className={selected ? "text-text" : "text-white/30"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="var(--color-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="bg-elevated absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-sm border border-white/10 py-1 shadow-2xl shadow-black/50"
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            const isActive = i === active;
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-gold/10 text-gold" : "text-text"
                }`}
              >
                {o.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
