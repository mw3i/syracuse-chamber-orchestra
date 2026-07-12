import type { Metadata } from "next";
import Link from "next/link";

import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import {
  getOrganization,
  getUpcomingConcerts,
} from "@/lib/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description:
    "Syracuse Chamber Orchestra — free concerts and community music in Central New York.",
  path: "/",
});

export default function Home() {
  const org = getOrganization();
  const upcoming = getUpcomingConcerts()[0];

  return (
    <>
      <HeroRow imageKey="hero-home" alt="Syracuse Chamber Orchestra">
        <p className="section-label">Syracuse, New York</p>
        <h1 className="prose-heading mt-4 max-w-3xl text-4xl leading-tight text-cream sm:text-5xl md:text-7xl">
          {org.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">
          {org.tagline}
        </p>
      </HeroRow>

      <SolidSection>
        <p className="section-label">Our Mission</p>
        <h2 className="prose-heading mt-4 max-w-3xl text-4xl leading-tight md:text-5xl">
          Music for the community
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/80">
          {org.mission}
        </p>
      </SolidSection>

      <HeroRow
        imageKey="hero-events"
        alt="Upcoming concerts"
        minHeight="medium"
        align="start"
      >
        <p className="section-label">Upcoming</p>
        <h2 className="prose-heading mt-4 max-w-2xl text-4xl leading-tight text-cream md:text-5xl">
          {upcoming ? upcoming.title : "Concerts coming soon"}
        </h2>
        {upcoming && (
          <p className="mt-4 text-lg text-cream/80">
            {new Date(upcoming.startAt).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/events"
            className="rounded border border-gold bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-light"
          >
            View Events
          </Link>
          <Link
            href="/support"
            className="rounded border border-cream/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Support Us
          </Link>
        </div>
      </HeroRow>

      <SolidSection variant="dark">
        <p className="section-label">Explore</p>
        <h2 className="prose-heading mt-4 text-4xl text-cream md:text-5xl">
          Discover the orchestra
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/about", label: "About", text: "Our story and mission" },
            {
              href: "/musicians",
              label: "Musicians",
              text: "Meet the ensemble",
            },
            { href: "/media", label: "Media", text: "Photos and performances" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded border border-cream/15 p-6 transition-colors hover:border-gold hover:bg-cream/5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {item.label}
              </p>
              <p className="prose-heading mt-3 text-2xl text-cream group-hover:text-gold-light">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </SolidSection>
    </>
  );
}
