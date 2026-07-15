"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type ThemedSelectOption = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  name: string;
  label: string;
  placeholder: string;
  options: ThemedSelectOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
};

export function ThemedSelect({
  id,
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  required = false,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const autoId = useId();
  const triggerId = id ?? `themed-select-${autoId}`;
  const listboxId = `${triggerId}-listbox`;

  const selected = options.find((o) => o.value === value);
  const display = selected?.label ?? placeholder;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setHighlight(-1);
      return;
    }
    const index = Math.max(
      0,
      options.findIndex((o) => o.value === value)
    );
    setHighlight(index);
  }, [open, options, value]);

  useEffect(() => {
    if (!open || highlight < 0 || !listRef.current) return;
    const item = listRef.current.children[highlight] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, (h < 0 ? 0 : h) - 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(options.length - 1, (h < 0 ? -1 : h) + 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlight(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlight(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (highlight >= 0) choose(options[highlight].value);
    }
  };

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      <input type="hidden" name={name} value={value} />
      <button
        id={triggerId}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        aria-required={required || undefined}
        aria-invalid={required && !value ? true : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={`themed-select-trigger ${open ? "is-open" : ""} ${
          value ? "has-value" : ""
        }`}
      >
        <span className="min-w-0 flex-1 truncate text-left">{display}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`shrink-0 text-[var(--blue-600)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          ref={listRef}
          role="listbox"
          aria-labelledby={triggerId}
          className="themed-select-menu"
        >
          {options.map((option, index) => {
            const active = option.value === value;
            const focused = index === highlight;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`themed-select-option ${active ? "is-selected" : ""} ${
                    focused ? "is-focused" : ""
                  }`}
                  onMouseEnter={() => setHighlight(index)}
                  onClick={() => choose(option.value)}
                >
                  <span className="min-w-0 flex-1 truncate text-left">{option.label}</span>
                  {active && (
                    <Check size={15} strokeWidth={2.25} className="shrink-0 text-[var(--blue-600)]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
