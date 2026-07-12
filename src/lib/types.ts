export type ImageKey = string;

export interface Organization {
  name: string;
  shortName: string;
  tagline: string;
  mission: string;
  history: string;
  contact: {
    email: string;
    directorName: string;
    directorPhone: string;
    directorEmail: string;
  };
  mailingAddress: {
    organization: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  social: {
    facebook: string;
    legacyWebsite: string;
    youtube: string;
  };
  donationUrl: string | null;
  advertising: {
    headline: string;
    summary: string;
    body: string;
    instructions: string;
    donationNote: string;
    email: string;
  };
}

export interface Musician {
  slug: string;
  name: string;
  role?: string;
  image: ImageKey;
}

export interface RosterSection {
  id: string;
  name: string;
  musicians: Musician[];
}

export interface Roster {
  sections: RosterSection[];
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Concert {
  id: string;
  title: string;
  startAt: string;
  venue: Venue | null;
  programUrl: string | null;
  posterUrl: string | null;
  pressReleaseUrl: string | null;
  notes: string | null;
}

export interface ConcertsData {
  concerts: Concert[];
}

export type Images = Record<string, string>;

export interface MediaItem {
  title: string;
  image: ImageKey;
  youtubeUrl?: string;
}

export interface Media {
  youtubeChannelUrl: string;
  items: MediaItem[];
}
