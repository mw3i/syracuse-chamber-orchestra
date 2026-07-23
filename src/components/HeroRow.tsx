import type { CSSProperties, ReactNode } from "react";

import { getHeroImage } from "@/lib/data";
import type { ImageKey } from "@/lib/types";

import { Container } from "./Container";

interface HeroRowProps {
  imageKey: ImageKey;
  alt?: string;
  children: ReactNode;
  align?: "center" | "start";
  minHeight?: "compact" | "small" | "medium" | "large";
  overlay?: "default" | "medium" | "moderate" | "clear";
  textContrast?: "default" | "strong";
}

function getImageHeroStyle(
  imageSrc: string,
  overlay: HeroRowProps["overlay"],
): CSSProperties {
  const layers: string[] = [];

  if (overlay === "default") {
    layers.push(
      "radial-gradient(circle at center, transparent 0%, rgba(15, 26, 46, 0.35) 100%)",
      "linear-gradient(to bottom, rgba(15, 26, 46, 0.85), rgba(15, 26, 46, 0.7), rgba(15, 26, 46, 0.9))",
    );
  } else if (overlay === "medium") {
    layers.push(
      "radial-gradient(circle at center, transparent 0%, rgba(15, 26, 46, 0.28) 100%)",
      "linear-gradient(to bottom, rgba(15, 26, 46, 0.72), rgba(15, 26, 46, 0.58), rgba(15, 26, 46, 0.78))",
    );
  } else if (overlay === "moderate") {
    layers.push(
      "radial-gradient(circle at center, transparent 0%, rgba(15, 26, 46, 0.14) 100%)",
      "linear-gradient(to bottom, rgba(15, 26, 46, 0.35), rgba(15, 26, 46, 0.28), rgba(15, 26, 46, 0.4))",
    );
  }

  layers.push(`url(${imageSrc})`);

  return {
    backgroundImage: layers.join(", "),
    backgroundSize: Array(layers.length).fill("cover").join(", "),
    backgroundPosition: Array(layers.length).fill("center").join(", "),
    backgroundRepeat: Array(layers.length).fill("no-repeat").join(", "),
  };
}

export function HeroRow({
  imageKey,
  alt = "",
  children,
  align = "center",
  minHeight = "large",
  overlay = "default",
  textContrast = "default",
}: HeroRowProps) {
  const imageSrc = getHeroImage(imageKey);
  const isGradientHero = imageSrc === null;
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";
  const height =
    minHeight === "large"
      ? "min-h-[72vh] md:min-h-[85vh]"
      : minHeight === "medium"
        ? "min-h-[50vh] md:min-h-[55vh]"
        : minHeight === "small"
          ? "min-h-[40vh] md:min-h-[44vh]"
          : "min-h-[32vh] md:min-h-[38vh]";
  const padding =
    minHeight === "compact"
      ? "py-12 md:py-16"
      : minHeight === "small"
        ? "py-14 md:py-16"
        : "py-16 md:py-20";
  const contentClass =
    textContrast === "strong" ? "hero-text-strong" : undefined;

  return (
    <section className={`relative ${height} overflow-hidden ${contentClass ?? ""}`}>
      {isGradientHero ? (
        <>
          <div
            aria-hidden
            className="hero-background absolute inset-0 bg-[#d4dce6]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy/80" />
        </>
      ) : (
        <div
          aria-hidden={alt ? undefined : true}
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
          className="hero-background absolute inset-0"
          style={getImageHeroStyle(imageSrc, overlay)}
        />
      )}
      <Container
        className={`relative z-10 flex h-full ${height} flex-col justify-center ${padding} ${alignment}`}
      >
        {children}
      </Container>
    </section>
  );
}
