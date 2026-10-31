"use client";

import { ConcertList } from "@/components/ConcertCard";
import { SolidSection } from "@/components/SolidSection";
import { partitionConcerts } from "@/lib/concerts";
import type { Concert } from "@/lib/types";
import { useNow } from "@/lib/useNow";

interface ConcertSectionsProps {
  concerts: Concert[];
  buildTime: number;
}

export function ConcertSections({ concerts, buildTime }: ConcertSectionsProps) {
  const now = useNow(buildTime);
  const { upcoming, past } = partitionConcerts(concerts, now);

  return (
    <>
      <SolidSection>
        <h2 className="prose-heading text-6xl text-gold md:text-7xl">
          Upcoming
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
