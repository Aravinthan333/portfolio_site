"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={item.question}
            className="card overflow-hidden"
          >
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span className="font-display text-lg font-medium tracking-tight text-[var(--fg)] sm:text-xl">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[var(--green-600)] transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="border-t border-[var(--border)] px-5 pb-5 pt-0 sm:px-6"
            >
              <p className="pt-4 text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
