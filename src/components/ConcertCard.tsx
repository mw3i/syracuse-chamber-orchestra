import type { Concert } from "@/lib/types";
import {
  formatConcertDate,
  formatConcertTime,
  formatVenueLines,
} from "@/lib/format";

interface ConcertCardProps {
  concert: Concert;
  variant?: "upcoming" | "past";
}

export function ConcertCard({ concert, variant = "past" }: ConcertCardProps) {
  const venueLines = formatVenueLines(concert.venue);
  const isUpcoming = variant === "upcoming";

  return (
    <article
      className={`rounded border p-6 ${
        isUpcoming
          ? "border-gold/40 bg-cream"
          : "border-charcoal/10 bg-white"
      }`}
    >
      <p className="section-label">{isUpcoming ? "Upcoming" : "Past Concert"}</p>
      <h3 className="prose-heading mt-3 text-3xl leading-tight">{concert.title}</h3>
      <p className="mt-3 text-sm uppercase tracking-wider text-charcoal/60">
        {formatConcertDate(concert.startAt)} · {formatConcertTime(concert.startAt)}
      </p>

      {venueLines.length > 0 && (
        <address className="mt-4 space-y-0.5 not-italic text-sm text-charcoal/75">
          {venueLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
      )}

      {concert.notes && (
        <p className="mt-4 text-sm text-charcoal/70">{concert.notes}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-wider">
        {concert.programUrl && (
          <a href={concert.programUrl} className="text-gold hover:text-charcoal">
            Program
          </a>
        )}
        {concert.posterUrl && (
          <a href={concert.posterUrl} className="text-gold hover:text-charcoal">
            Poster
          </a>
        )}
        {concert.pressReleaseUrl && (
          <a
            href={concert.pressReleaseUrl}
            className="text-gold hover:text-charcoal"
          >
            Press Release
          </a>
        )}
      </div>
    </article>
  );
}

interface ConcertListProps {
  concerts: Concert[];
  variant?: "upcoming" | "past";
  emptyMessage: string;
}

export function ConcertList({
  concerts,
  variant = "past",
  emptyMessage,
}: ConcertListProps) {
  if (concerts.length === 0) {
    return <p className="text-lg text-charcoal/70">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-6">
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} variant={variant} />
      ))}
    </div>
  );
}
