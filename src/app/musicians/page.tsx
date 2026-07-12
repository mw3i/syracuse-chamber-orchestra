import type { Metadata } from "next";

import { ConductorProfile } from "@/components/ConductorProfile";
import { HeroRow } from "@/components/HeroRow";
import { MusicianCard } from "@/components/MusicianCard";
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

      <SolidSection>
        <p className="section-label">Conductor</p>
        <h2 className="prose-heading mt-4 text-4xl md:text-5xl">Music Director</h2>
        <ConductorProfile conductor={conductor} />
      </SolidSection>

      {sections.map((section, index) => (
        <SolidSection key={section.id} variant={index % 2 === 0 ? "dark" : "light"}>
          <p className="section-label">{section.name}</p>
          <h2 className="prose-heading mt-4 text-4xl md:text-5xl">{section.name}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.musicians.map((musician) => (
              <MusicianCard key={musician.slug} musician={musician} />
            ))}
          </div>
        </SolidSection>
      ))}
    </>
  );
}
