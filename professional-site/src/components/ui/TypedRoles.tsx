"use client";

import { useEffect, useState } from "react";

type Props = {
  roles: string[];
  className?: string;
};

export function TypedRoles({ roles, className = "" }: Props) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex] ?? "";
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
          }
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className={`text-accent ${className}`}>
      {text}
      <span className="typed-cursor" aria-hidden>
        |
      </span>
    </span>
  );
}
