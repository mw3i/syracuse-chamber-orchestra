import type { Venue } from "./types";

const CONCERT_TIME_ZONE = "America/New_York";

export function formatConcertDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: CONCERT_TIME_ZONE,
  });
}

export function formatConcertTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: CONCERT_TIME_ZONE,
  });
}

export function formatVenueLines(venue: Venue | null): string[] {
  if (!venue) {
    return [];
  }

  return [
    venue.name,
    venue.address,
    `${venue.city}, ${venue.state} ${venue.zip}`,
  ];
}

export function venueMapEmbedUrl(venue: Venue): string {
  const query = `${venue.name}, ${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
