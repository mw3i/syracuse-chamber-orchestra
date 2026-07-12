import type { Metadata } from "next";

import { ConductorProfile } from "@/components/ConductorProfile";
import { RosterGroup } from "@/components/MusicianCard";
import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import { getConductor, getRosterSections } from "@/lib/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Musicians",
  description: "Meet the musicians of the Syracuse Chamber Orchestra.",
  path: "/musicians",
});

export default function MusiciansPage() {
  const conductor = getConductor();
  const sections = getRosterSections();

  return (
    <>
      <HeroRow
        imageKey="hero-musicians"
        alt="Syracuse Chamber Orchestra musicians"
        align="start"
        minHeight="medium"
      >
        <p className="section-label">Musicians</p>
        <h1 className="prose-heading mt-4 max-w-3xl text-5xl leading-tight text-cream md:text-6xl">
          The ensemble
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cream/85">
          Professionals, para-professionals, and music teachers from the greater
          Syracuse community.
        </p>
      </HeroRow>

      <SolidSection variant="dark">
        <h2 className="prose-heading text-3xl text-gold md:text-4xl">Conductor</h2>
        <ConductorProfile conductor={conductor} compact variant="dark" />
      </SolidSection>

      <SolidSection>
        <h2 className="prose-heading text-3xl text-gold md:text-4xl">Musicians</h2>
        <div className="mt-10 space-y-12 md:space-y-14">
          {sections.map((section) => (
            <RosterGroup
              key={section.id}
              name={section.name}
              musicians={section.musicians}
              variant="light"
            />
          ))}
        </div>
      </SolidSection>
    </>
  );
}
