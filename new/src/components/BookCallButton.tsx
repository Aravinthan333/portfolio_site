"use client";

import { Calendar } from "lucide-react";
import { SITE } from "@/data/site";

type Props = {
  label: string;
  className?: string;
  iconSize?: number;
};

export function BookCallButton({
  label,
  className = "btn-primary",
  iconSize = 16,
}: Props) {
  return (
    <a
      href={SITE.calendly}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Calendar size={iconSize} strokeWidth={2} />
      {label}
    </a>
  );
}
