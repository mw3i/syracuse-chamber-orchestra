import type { Concert } from "@/lib/types";
import {
  formatConcertDate,
  formatConcertTime,
  formatVenueLines,
  venueMapEmbedUrl,
} from "@/lib/format";

interface ConcertCardProps {
  concert: Concert;
  variant?: "upcoming" | "past";
}

function ProgramList({ program }: { program: NonNullable<Concert["program"]> }) {
  return (
    <div className="mt-8">
      <p className="section-label">Program</p>
      <div className="mt-4 divide-y divide-charcoal/10 border-t border-charcoal/10">
        {program.map((item, index) =>
          "intermission" in item ? (
            <p
              key={`intermission-${index}`}
              className="py-3 text-center text-xs font-semibold uppercase tracking-widest text-charcoal/40"
            >
              Intermission
            </p>
          ) : (
            <div
              key={`${item.composer}-${item.title}-${index}`}
              className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,180px)_1fr]"
            >
              <p className="text-xs uppercase tracking-wider text-charcoal/50">
                {item.composer}
              </p>
              <div>
                <p className="prose-heading text-lg text-charcoal">{item.title}</p>
                {item.movements && item.movements.length > 0 && (
                  <p className="mt-1 text-sm italic text-charcoal/55">
                    {item.movements.join(" · ")}
                  </p>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function ConcertHeader({ concert, isUpcoming }: { concert: Concert; isUpcoming: boolean }) {
  const venueLines = formatVenueLines(concert.venue);

  return (
    <div>
      <p className="section-label">{isUpcoming ? "Upcoming" : "Past Concert"}</p>
      <h3 className="prose-heading mt-3 text-4xl leading-tight text-charcoal md:text-5xl">
        {concert.title}
      </h3>
      <p className="prose-heading mt-3 text-xl text-charcoal/70 md:text-2xl">
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
    </div>
  );
}

function ConcertLinks({ concert }: { concert: Concert }) {
  if (!concert.programUrl && !concert.posterUrl && !concert.pressReleaseUrl) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-wider">
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
        <a href={concert.pressReleaseUrl} className="text-gold hover:text-charcoal">
          Press Release
        </a>
      )}
    </div>
  );
}

export function ConcertCard({ concert, variant = "past" }: ConcertCardProps) {
  const isUpcoming = variant === "upcoming";
  const cardClassName = `rounded border p-6 ${
    isUpcoming
      ? "border-gold/40 bg-cream text-charcoal"
      : "border-cream/15 bg-cream text-charcoal"
  }`;
  const hasProgram = Boolean(concert.program && concert.program.length > 0);

  if (isUpcoming && concert.venue) {
    return (
      <article className={cardClassName}>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px]">
          <ConcertHeader concert={concert} isUpcoming={isUpcoming} />
          <div className="min-h-[220px] overflow-hidden rounded border border-charcoal/15">
            <iframe
              title={`Map to ${concert.venue.name}`}
              src={venueMapEmbedUrl(concert.venue)}
              className="h-full min-h-[220px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        {hasProgram && <ProgramList program={concert.program!} />}
        <ConcertLinks concert={concert} />
      </article>
    );
  }

  return (
    <article className={`flex h-full flex-col ${cardClassName}`}>
      <ConcertHeader concert={concert} isUpcoming={isUpcoming} />
      {hasProgram && <ProgramList program={concert.program!} />}
      <div className="mt-auto">
        <ConcertLinks concert={concert} />
      </div>
    </article>
  );
}

function groupConcertsByYear(
  concerts: Concert[],
): { year: number; concerts: Concert[] }[] {
  const byYear = new Map<number, Concert[]>();

  for (const concert of concerts) {
    const year = new Date(concert.startAt).getFullYear();
    const group = byYear.get(year) ?? [];
    group.push(concert);
    byYear.set(year, group);
  }

  return Array.from(byYear.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, yearConcerts]) => ({ year, concerts: yearConcerts }));
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
    return (
      <p
        className={`text-lg ${
          variant === "past" ? "text-cream/70" : "text-charcoal/70"
        }`}
      >
        {emptyMessage}
      </p>
    );
  }

  if (variant === "upcoming") {
    return (
      <div className="grid gap-6">
        {concerts.map((concert) => (
          <ConcertCard key={concert.id} concert={concert} variant={variant} />
        ))}
      </div>
    );
  }

  const years = groupConcertsByYear(concerts);

  return (
    <div className="space-y-14">
      {years.map(({ year, concerts: yearConcerts }) => (
        <section key={year}>
          <h3 className="prose-heading border-b border-gold/30 pb-4 text-5xl text-gold md:text-6xl">
            {year}
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {yearConcerts.map((concert) => (
              <ConcertCard
                key={concert.id}
                concert={concert}
                variant="past"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
