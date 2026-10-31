import type { Concert } from "./types";

export function partitionConcerts(
  concerts: Concert[],
  now: number,
): { upcoming: Concert[]; past: Concert[] } {
  const time = (concert: Concert) => new Date(concert.startAt).getTime();

  return {
    upcoming: concerts
      .filter((concert) => time(concert) >= now)
      .sort((a, b) => time(a) - time(b)),
    past: concerts
      .filter((concert) => time(concert) < now)
      .sort((a, b) => time(b) - time(a)),
  };
}
