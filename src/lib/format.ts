import type { Venue } from "./types";

export function formatConcertDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatConcertTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
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
