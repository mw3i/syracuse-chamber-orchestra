import type { Musician } from "@/lib/types";

interface MusicianCardProps {
  musician: Musician;
  variant?: "light" | "dark";
}

export function MusicianCard({ musician, variant = "dark" }: MusicianCardProps) {
  const isDark = variant === "dark";

  return (
    <article className={`py-2 ${isDark ? "text-cream" : "text-charcoal"}`}>
      <h3
        className={`font-display text-xl leading-snug md:text-2xl ${
          isDark ? "text-cream" : "text-charcoal"
        }`}
      >
        {musician.name}
      </h3>
      {musician.role && (
        <p className="mt-1 text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
          {musician.role}
        </p>
      )}
    </article>
  );
}

interface RosterGroupProps {
  name: string;
  musicians: Musician[];
  variant?: "light" | "dark";
}

export function RosterGroup({ name, musicians, variant = "dark" }: RosterGroupProps) {
  const isDark = variant === "dark";

  return (
    <>
      <h3 className="prose-heading text-4xl text-gold md:text-5xl">
        {name}
      </h3>
      <div className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {musicians.map((musician) => (
          <MusicianCard key={musician.slug} musician={musician} variant={variant} />
        ))}
      </div>
    </>
  );
}
