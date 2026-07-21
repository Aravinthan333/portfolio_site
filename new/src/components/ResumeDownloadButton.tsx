"use client";

import { Download } from "lucide-react";
import { SITE } from "@/data/site";

type Props = {
  label: string;
  className?: string;
  iconSize?: number;
  /** Show only the download icon (label for screen readers). */
  iconOnly?: boolean;
};

export function ResumeDownloadButton({
  label,
  className = "btn-secondary",
  iconSize = 16,
  iconOnly = false,
}: Props) {
  return (
    <a
      href={SITE.resume}
      download={SITE.resumeDownloadName}
      className={className}
      aria-label={label}
      title={label}
    >
      <Download size={iconSize} strokeWidth={2} />
      {iconOnly ? <span className="sr-only">{label}</span> : label}
    </a>
  );
}
