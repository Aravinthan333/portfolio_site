import type { ReactNode } from "react";

type Props = {
  text: string;
};

/** First letter of each space-separated word in brand blue. */
export function BlueInitials({ text }: Props): ReactNode {
  const parts = text.split(/(\s+)/);

  return parts.map((part, index) => {
    if (!part || /^\s+$/.test(part)) {
      return <span key={index}>{part}</span>;
    }

    const chars = Array.from(part);
    const [first, ...rest] = chars;
    if (!first) return null;

    return (
      <span key={index}>
        <span className="text-[var(--blue-600)]">{first}</span>
        {rest.join("")}
      </span>
    );
  });
}
