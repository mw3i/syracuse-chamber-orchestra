import Image from "next/image";
import Link from "next/link";

import { getImage } from "@/lib/data";
import type { Musician } from "@/lib/types";

interface ConductorProfileProps {
  conductor: Musician;
  compact?: boolean;
  variant?: "light" | "dark";
}

export function ConductorProfile({
  conductor,
  compact = false,
  variant = "light",
}: ConductorProfileProps) {
  const isDark = variant === "dark";
  const paragraphs =
    conductor.bioParagraphs ??
    (conductor.bio ? [conductor.bio] : []);
  const summary =
    conductor.bioSummary ?? paragraphs[0] ?? "";
  const bodyParagraphs = compact ? [] : paragraphs;

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] md:items-start lg:grid-cols-[220px_1fr] lg:gap-12">
      <div className="mx-auto w-full max-w-[220px] md:mx-0">
        <Link
          href={`/musicians/${conductor.slug}`}
          className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream-muted">
            <Image
              src={getImage(conductor.image)}
              alt={conductor.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="220px"
              priority
            />
          </div>
        </Link>
      </div>

      <div className={`max-w-3xl ${isDark ? "text-cream" : "text-charcoal"}`}>
        <Link
          href={`/musicians/${conductor.slug}`}
          className="group inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <h3
            className={`prose-heading text-3xl transition-colors group-hover:text-gold md:text-4xl ${
              isDark ? "text-cream" : "text-charcoal"
            }`}
          >
            {conductor.name}
          </h3>
        </Link>
        {conductor.role && (
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">
            {conductor.role}
          </p>
        )}

        {compact ? (
          <p
            className={`mt-6 text-sm leading-relaxed md:text-[0.9375rem] ${
              isDark ? "text-cream/80" : "text-charcoal/75"
            }`}
          >
            {summary}
          </p>
        ) : (
          <div
            className={`mt-6 space-y-4 text-sm leading-relaxed md:text-base ${
              isDark ? "text-cream/80" : "text-charcoal/75"
            }`}
          >
            {bodyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
