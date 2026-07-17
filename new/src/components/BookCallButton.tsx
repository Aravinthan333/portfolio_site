"use client";

import { Calendar } from "lucide-react";
import { getGoogleCalendar } from "@/lib/site";

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
  const googleCalendarUrl = getGoogleCalendar();

  return (
    <a
      href={googleCalendarUrl}
      target={googleCalendarUrl.startsWith("http") ? "_blank" : undefined}
      rel={googleCalendarUrl.startsWith("http") ? "noopener noreferrer" : undefined}
      className={className}
    >
      <Calendar size={iconSize} strokeWidth={2} />
      {label}
    </a>
  );
}
