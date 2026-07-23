import type { Metadata } from "next";
import Link from "next/link";

import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import { getOrganization } from "@/lib/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Advertise",
  description:
    "Advertise with the Syracuse Chamber Orchestra and reach our concert audience.",
  path: "/advertise",
});

export default function AdvertisePage() {
  const org = getOrganization();
  const { advertising, mailingAddress } = org;

  return (
    <>
      <HeroRow
        imageKey="hero-advertise"
        alt="Advertise with the Syracuse Chamber Orchestra"
        align="start"
        minHeight="compact"
      >
        <p className="section-label">Advertise</p>
        <h1 className="prose-heading mt-4 max-w-3xl text-5xl leading-tight text-cream md:text-6xl">
          {advertising.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cream/85">
          {advertising.summary}
        </p>
      </HeroRow>

      <SolidSection>
        <p className="section-label">Partnership</p>
        <h2 className="prose-heading mt-4 text-4xl md:text-5xl">
          Reach our audience
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/80">
          {advertising.body}
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-charcoal/80">
          {advertising.instructions.includes(advertising.email) ? (
            <>
              {advertising.instructions.split(advertising.email)[0]}
              <a
                href={`mailto:${advertising.email}`}
                className="text-gold underline decoration-gold/40 underline-offset-2 hover:text-charcoal hover:decoration-charcoal"
              >
                {advertising.email}
              </a>
              {advertising.instructions.split(advertising.email)[1]}
            </>
          ) : (
            advertising.instructions
          )}
        </p>
      </SolidSection>

      <SolidSection variant="dark">
        <p className="section-label">How to order</p>
        <h2 className="prose-heading mt-4 text-4xl text-cream md:text-5xl">
          Place your ad
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-wider text-cream/50">Email</p>
            <a
              href={`mailto:${advertising.email}`}
              className="mt-2 inline-block text-lg text-gold hover:text-gold-light"
            >
              {advertising.email}
            </a>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-cream/50">Mail</p>
            <address className="mt-2 not-italic text-cream/80">
              {mailingAddress.organization}
              <br />
              {mailingAddress.line1}
              <br />
              {mailingAddress.city}, {mailingAddress.state} {mailingAddress.zip}
            </address>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-cream/70">{advertising.donationNote}</p>
        <Link
          href="/support"
          className="mt-8 inline-block rounded border border-gold bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-light"
        >
          Make a Donation
        </Link>
      </SolidSection>
    </>
  );
}
