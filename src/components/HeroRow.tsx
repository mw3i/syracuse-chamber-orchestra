import type { ReactNode } from "react";

import { getImage } from "@/lib/data";
import type { ImageKey } from "@/lib/types";

import { Container } from "./Container";

interface HeroRowProps {
  imageKey: ImageKey;
  alt?: string;
  children: ReactNode;
  align?: "center" | "start";
  minHeight?: "medium" | "large";
}

export function HeroRow({
  imageKey,
  alt = "",
  children,
  align = "center",
  minHeight = "large",
}: HeroRowProps) {
  const imageSrc = getImage(imageKey);
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";
  const height =
    minHeight === "large"
      ? "min-h-[72vh] md:min-h-[85vh]"
      : "min-h-[50vh] md:min-h-[55vh]";

  return (
    <section className={`relative ${height} overflow-hidden`}>
      <div
        aria-hidden={alt ? undefined : true}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className="hero-background absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/80" />
      <Container
        className={`relative z-10 flex h-full ${height} flex-col justify-center py-16 md:py-20 ${alignment}`}
      >
        {children}
      </Container>
    </section>
  );
}
