import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <MagneticButton href={href} variant={variant} className={className}>
      {children}
    </MagneticButton>
  );
}
