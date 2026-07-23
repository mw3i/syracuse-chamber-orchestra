import type { Metadata } from "next";
import Link from "next/link";

import { DonorboxEmbed } from "@/components/DonorboxEmbed";
import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import { getOrganization } from "@/lib/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Support",
  description: "Support the Syracuse Chamber Orchestra through donations.",
  path: "/support",
});

export default function SupportPage() {
  const org = getOrganization();

  return (
    <>
      <HeroRow
        imageKey="hero-support"
        alt="Support the Syracuse Chamber Orchestra"
        align="start"
        minHeight="compact"
      >
        <p className="section-label">Support</p>
        <h1 className="prose-heading mt-4 max-w-3xl text-5xl leading-tight text-cream md:text-6xl">
          Help us bring music to Syracuse
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cream/85">
          Your support keeps our concerts free and open to the community.
        </p>
      </HeroRow>

      <SolidSection>
        <div className="grid gap-10 md:grid-cols-2 md:items-start lg:gap-12">
          <div>
            <p className="section-label">Donate</p>
            <h2 className="prose-heading mt-4 text-4xl md:text-5xl">
              Make a contribution
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
              The Syracuse Chamber Orchestra is a non-profit organization
              dedicated to enriching the cultural life of Central New York.
              Tax-deductible contributions help keep our concerts free and open
              to the community.
            </p>

            <div className="mt-8 rounded border border-charcoal/5 bg-charcoal/[0.03] p-5">
              <p className="text-xs uppercase tracking-wider text-charcoal/45">
                Donate by mail
              </p>
              <p className="mt-3 text-sm text-charcoal/65">
                Checks payable to{" "}
                <strong className="font-medium text-charcoal/75">
                  Syracuse Chamber Orchestra
                </strong>
              </p>
              <address className="mt-3 not-italic text-sm text-charcoal/60">
                {org.mailingAddress.organization}
                <br />
                {org.mailingAddress.line1}
                <br />
                {org.mailingAddress.city}, {org.mailingAddress.state}{" "}
                {org.mailingAddress.zip}
              </address>
              <p className="mt-3 text-sm text-charcoal/60">
                Questions?{" "}
                <a
                  href={`mailto:${org.contact.email}`}
                  className="text-charcoal/70 underline decoration-charcoal/20 underline-offset-2 hover:text-gold hover:decoration-gold"
                >
                  {org.contact.email}
                </a>
              </p>
            </div>
          </div>

          {org.donationUrl && (
            <DonorboxEmbed donationUrl={org.donationUrl} />
          )}
        </div>
      </SolidSection>

      <SolidSection variant="dark">
        <p className="section-label">Other ways to help</p>
        <h2 className="prose-heading mt-4 text-4xl text-cream md:text-5xl">
          Spread the word
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-cream/80">
          Attend our free concerts, share our events with friends, or consider
          advertising with us to reach our audience.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/events"
            className="rounded border border-gold bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-light"
          >
            View Events
          </Link>
          <Link
            href="/advertise"
            className="rounded border border-cream/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
          >
            Advertise With Us
          </Link>
        </div>
      </SolidSection>
    </>
  );
}
