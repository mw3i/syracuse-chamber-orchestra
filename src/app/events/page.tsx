import type { Metadata } from "next";

import { ConcertList } from "@/components/ConcertCard";
import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import { getPastConcerts, getUpcomingConcerts } from "@/lib/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Events",
  description:
    "Upcoming concerts and past performances by the Syracuse Chamber Orchestra.",
  path: "/events",
});

export default function EventsPage() {
  const upcoming = getUpcomingConcerts();
  const past = getPastConcerts();

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

      <SolidSection>
        <p className="section-label">Upcoming</p>
        <h2 className="prose-heading mt-4 text-4xl md:text-5xl">
          Next performances
        </h2>
        <div className="mt-10">
          <ConcertList
            concerts={upcoming}
            variant="upcoming"
            emptyMessage="No upcoming concerts scheduled. Check back soon."
          />
        </div>
      </SolidSection>

      <SolidSection variant="dark">
        <p className="section-label">Archive</p>
        <h2 className="prose-heading mt-4 text-4xl text-cream md:text-5xl">
          Past concerts
        </h2>
        <div className="mt-10">
          <ConcertList
            concerts={past}
            variant="past"
            emptyMessage="No past concerts listed yet."
          />
        </div>
      </SolidSection>
    </>
  );
}
