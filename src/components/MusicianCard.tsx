import Image from "next/image";
import Link from "next/link";

import { getImage } from "@/lib/data";
import type { Musician } from "@/lib/types";

interface MusicianCardProps {
  musician: Musician;
  sectionName: string;
  variant?: "conductor" | "member";
}

export function MusicianCard({
  musician,
  sectionName,
  variant = "member",
}: MusicianCardProps) {
  if (variant === "conductor") {
    return (
      <Link
        href={`/musicians/${musician.slug}`}
        className="group block overflow-hidden rounded border border-charcoal/10 bg-white text-charcoal transition-colors hover:border-gold"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-muted">
          <Image
            src={getImage(musician.image)}
            alt={musician.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">
            {sectionName}
          </p>
          <h3 className="prose-heading mt-2 text-2xl group-hover:text-gold">
            {musician.name}
          </h3>
          {musician.role && (
            <p className="mt-1 text-sm text-charcoal/60">{musician.role}</p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <article className="rounded border border-charcoal/10 bg-white px-6 py-8 text-center text-charcoal">
      <h3 className="prose-heading text-xl md:text-2xl">{musician.name}</h3>
      {musician.role && (
        <p className="mt-2 text-sm text-charcoal/60">{musician.role}</p>
      )}
    </article>
  );
}
