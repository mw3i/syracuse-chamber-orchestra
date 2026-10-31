"use client";

import { partitionConcerts } from "@/lib/concerts";
import { formatConcertDate } from "@/lib/format";
import type { Concert } from "@/lib/types";
import { useNow } from "@/lib/useNow";

interface NextConcertProps {
  concerts: Concert[];
  buildTime: number;
}

export function NextConcert({ concerts, buildTime }: NextConcertProps) {
  const now = useNow(buildTime);
  const next = partitionConcerts(concerts, now).upcoming[0];

  return (
    <>
      <h2 className="prose-heading mt-4 max-w-2xl text-4xl leading-tight text-cream md:text-5xl">
        {next ? next.title : "Concerts coming soon"}
      </h2>
      {next && (
        <p className="mt-4 text-lg text-cream/80">
          {formatConcertDate(next.startAt)}
        </p>
      )}
    </>
  );
}
