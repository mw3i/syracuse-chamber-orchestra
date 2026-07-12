import type { Metadata } from "next";

import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import { getOrganization } from "@/lib/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about the history and mission of the Syracuse Chamber Orchestra.",
  path: "/about",
});

export default function AboutPage() {
  const org = getOrganization();

  return (
    <>
      <HeroRow
        imageKey="hero-about"
        alt="About the Syracuse Chamber Orchestra"
        align="start"
        minHeight="small"
      >
        <p className="section-label">About</p>
        <h1 className="prose-heading mt-4 max-w-3xl text-5xl leading-tight text-cream md:text-6xl">
          Our story
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cream/85">{org.tagline}</p>
      </HeroRow>

      <SolidSection>
        <p className="section-label">Mission</p>
        <h2 className="prose-heading mt-4 max-w-3xl text-4xl md:text-5xl">
          Our mission
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/80">
          {org.mission}
        </p>
      </SolidSection>

      <SolidSection variant="dark">
        <p className="section-label">History</p>
        <h2 className="prose-heading mt-4 max-w-3xl text-4xl text-cream md:text-5xl">
          A community ensemble
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-cream/80">
          {org.history}
        </p>
      </SolidSection>

      <SolidSection>
        <p className="section-label">Leadership</p>
        <h2 className="prose-heading mt-4 text-4xl md:text-5xl">Get in touch</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-wider text-charcoal/50">
              Music Director
            </p>
            <p className="prose-heading mt-2 text-2xl">{org.contact.directorName}</p>
            <p className="mt-2 text-charcoal/75">
              <a
                href={`tel:${org.contact.directorPhone.replace(/\D/g, "")}`}
                className="hover:text-gold"
              >
                {org.contact.directorPhone}
              </a>
            </p>
            <p className="mt-1 text-charcoal/75">
              <a
                href={`mailto:${org.contact.directorEmail}`}
                className="hover:text-gold"
              >
                {org.contact.directorEmail}
              </a>
            </p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-charcoal/50">
              General Inquiries
            </p>
            <p className="mt-2 text-charcoal/75">
              <a href={`mailto:${org.contact.email}`} className="hover:text-gold">
                {org.contact.email}
              </a>
            </p>
            <address className="mt-6 not-italic text-charcoal/75">
              {org.mailingAddress.organization}
              <br />
              {org.mailingAddress.line1}
              <br />
              {org.mailingAddress.city}, {org.mailingAddress.state}{" "}
              {org.mailingAddress.zip}
            </address>
          </div>
        </div>
      </SolidSection>
    </>
  );
}
