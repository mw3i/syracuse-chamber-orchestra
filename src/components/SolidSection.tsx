import type { ReactNode } from "react";

import { Container } from "./Container";

interface SolidSectionProps {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

export function SolidSection({
  children,
  variant = "light",
  className = "",
}: SolidSectionProps) {
  const palette =
    variant === "light"
      ? "bg-cream text-charcoal"
      : "bg-charcoal text-cream";

  return (
    <section className={`${palette} ${className}`}>
      <Container className="py-16 md:py-28">{children}</Container>
    </section>
  );
}
