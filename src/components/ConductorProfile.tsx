import Image from "next/image";

import { getImage } from "@/lib/data";
import type { Musician } from "@/lib/types";

interface ConductorProfileProps {
  conductor: Musician;
}

export function ConductorProfile({ conductor }: ConductorProfileProps) {
  const paragraphs =
    conductor.bioParagraphs ??
    (conductor.bio ? [conductor.bio] : []);

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded bg-cream-muted">
          <Image
            src={getImage(conductor.image)}
            alt={conductor.name}
            fill
            className="object-cover"
            sizes="280px"
            priority
          />
        </div>
        <h3 className="prose-heading mt-5 text-3xl text-charcoal">
          {conductor.name}
        </h3>
        {conductor.role && (
          <p className="mt-2 text-sm uppercase tracking-wider text-gold">
            {conductor.role}
          </p>
        )}
      </div>

      <div className="rounded border border-charcoal/10 bg-white p-8 md:p-10">
        <p className="section-label">About</p>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-charcoal/80 md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
