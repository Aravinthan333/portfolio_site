"use client";

import { forwardRef, useRef } from "react";
import { Calendar, ChevronDown, Clock } from "lucide-react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function ThemedSelect({ className = "", children, ...props }: SelectProps) {
  return (
    <div className="contact-select-wrap">
      <select className={`contact-select ${className}`} {...props}>
        {children}
      </select>
      <ChevronDown className="contact-select-chevron" size={18} aria-hidden />
    </div>
  );
}

type PickerProps = React.InputHTMLAttributes<HTMLInputElement> & {
  picker: "date" | "time";
};

export const ThemedPickerInput = forwardRef<HTMLInputElement, PickerProps>(
  function ThemedPickerInput({ picker, className = "", onClick, ...props }, ref) {
    const innerRef = useRef<HTMLInputElement | null>(null);

    const setRef = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const openPicker = () => {
      const el = innerRef.current;
      if (!el) return;
      el.focus();
      if (typeof el.showPicker === "function") {
        try {
          el.showPicker();
        } catch {
          el.click();
        }
      } else {
        el.click();
      }
    };

    const Icon = picker === "date" ? Calendar : Clock;

    return (
      <div
        className="contact-picker-wrap"
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        role="presentation"
      >
        <Icon className="contact-picker-leading" size={18} aria-hidden />
        <input
          ref={setRef}
          type={picker}
          className={`contact-picker-input ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            openPicker();
            onClick?.(e);
          }}
          {...props}
        />
      </div>
    );
  }
);
