import concertsData from "@data/concerts.json";
import imagesData from "@data/images.json";
import mediaData from "@data/media.json";
import organizationData from "@data/organization.json";
import rosterData from "@data/roster.json";

import type {
  Concert,
  ImageKey,
  Media,
  Musician,
  Organization,
  Roster,
  RosterSection,
} from "./types";

export function getOrganization(): Organization {
  return organizationData as Organization;
}

export function getRoster(): Roster {
  return rosterData as Roster;
}

export function getConductor(): Musician {
  return rosterData.conductor as Musician;
}

export function getRosterSections(): RosterSection[] {
  return rosterData.sections;
}

export function getAllMusicians(): Musician[] {
  return rosterData.sections.flatMap((section) => section.musicians);
}

export function getMusicianBySlug(slug: string): Musician | undefined {
  if (rosterData.conductor.slug === slug) {
    return rosterData.conductor as Musician;
  }

  return getAllMusicians().find((musician) => musician.slug === slug);
}

export function getMusicianWithSection(
  slug: string,
): { musician: Musician; section: RosterSection } | undefined {
  if (rosterData.conductor.slug === slug) {
    return {
      musician: rosterData.conductor as Musician,
      section: {
        id: "conductor",
        name: "Conductor",
        musicians: [],
      },
    };
  }

  for (const section of rosterData.sections) {
    const musician = section.musicians.find((item) => item.slug === slug);
    if (musician) {
      return { musician, section };
    }
  }
}

export function getAllMusicianSlugs(): string[] {
  return [rosterData.conductor.slug];
}

export function getConcerts(): Concert[] {
  return (concertsData as { concerts: Concert[] }).concerts;
}

export function getUpcomingConcerts(now = new Date()): Concert[] {
  return getConcerts()
    .filter((concert) => new Date(concert.startAt) >= now)
    .sort(
      (a, b) =>
        new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
    );
}

export function getPastConcerts(now = new Date()): Concert[] {
  return getConcerts()
    .filter((concert) => new Date(concert.startAt) < now)
    .sort(
      (a, b) =>
        new Date(b.startAt).getTime() - new Date(a.startAt).getTime(),
    );
}

export function getConcertById(id: string): Concert | undefined {
  return getConcerts().find((concert) => concert.id === id);
}

export function getImage(key: ImageKey): string {
  return (imagesData as Record<string, string>)[key];
}

export function getImages(): Record<string, string> {
  return imagesData as Record<string, string>;
}

export function getMedia(): Media {
  return mediaData as Media;
}
