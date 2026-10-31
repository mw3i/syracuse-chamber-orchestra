import type { Metadata } from "next";

import { ConcertSections } from "@/components/ConcertSections";
import { HeroRow } from "@/components/HeroRow";
import { buildTime } from "@/lib/buildTime";
import { getConcerts } from "@/lib/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Events",
  description:
    "Upcoming concerts and past performances by the Syracuse Chamber Orchestra.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <HeroRow
        imageKey="hero-events"
        alt="Syracuse Chamber Orchestra concerts"
        align="start"
        minHeight="compact"
        overlay="medium"
      >
        <p className="section-label">Events</p>
        <h1 className="prose-heading mt-4 max-w-3xl text-5xl leading-tight text-cream md:text-6xl">
          Concerts
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cream/85">
          Free and open to the public. Join us for live orchestral music in
          Central New York.
        </p>
      </HeroRow>

      <ConcertSections concerts={getConcerts()} buildTime={buildTime} />
    </>
  );
}
