import type { Musician } from "@/lib/types";

interface MusicianCardProps {
  musician: Musician;
}

export function MusicianCard({ musician }: MusicianCardProps) {
  return (
    <article className="rounded border border-charcoal/10 bg-white px-6 py-8 text-center text-charcoal">
      <h3 className="prose-heading text-xl md:text-2xl">{musician.name}</h3>
      {musician.role && (
        <p className="mt-2 text-sm text-charcoal/60">{musician.role}</p>
      )}
    </article>
  );
}
