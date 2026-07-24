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

function buildAdOrderMailto(email: string, subject: string): string {
  const body = [
    "NAME:",
    "",
    "BUSINESS NAME:",
    "",
    "ADDRESS:",
    "",
    "PHONE:",
    "",
    "EMAIL:",
    "",
    "AD SIZE:",
    "",
    "PAYMENT METHOD:",
    "",
    "",
    "Please attach your camera-ready ad to this email before sending.",
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function AdvertisePage() {
  const org = getOrganization();
  const { advertising, mailingAddress } = org;
  const mailtoHref = buildAdOrderMailto(
    advertising.email,
    advertising.emailSubject,
  );

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
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-label">{advertising.season} season</p>
            <h2 className="prose-heading mt-4 text-4xl md:text-5xl">
              Reach our audience
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
              {advertising.invite}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
              {advertising.body}
            </p>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-charcoal/45">
                Ad sizes
              </p>
              <ul className="mt-4 space-y-2">
                {advertising.adSizes.map((size) => (
                  <li
                    key={size.label}
                    className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 pb-2 text-charcoal/80"
                  >
                    <span>{size.label}</span>
                    <span className="font-medium text-charcoal">
                      ${size.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-sm text-charcoal/60">
              {advertising.donationNote}{" "}
              <Link
                href="/support"
                className="text-charcoal/70 underline decoration-charcoal/20 underline-offset-2 hover:text-gold hover:decoration-gold"
              >
                Visit our support page
              </Link>
              .
            </p>
          </div>

          <div className="rounded border border-charcoal/5 bg-charcoal/[0.03] p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-charcoal/45">
              How to order
            </p>
            <h3 className="prose-heading mt-3 text-3xl text-charcoal">
              Email your ad order
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
              {advertising.cameraReadyNote}
            </p>
            <a
              href={mailtoHref}
              className="mt-6 inline-block rounded border border-gold bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-light"
            >
              Email your ad order
            </a>

            <div className="mt-6 rounded border border-charcoal/10 bg-white/60 p-4">
              <p className="text-xs uppercase tracking-wider text-charcoal/45">
                Include in your email
              </p>
              <ul className="mt-4 space-y-3 text-sm text-charcoal/75">
                <li>
                  <strong className="font-medium text-charcoal">Name</strong>
                </li>
                <li>
                  <strong className="font-medium text-charcoal">
                    Business Name
                  </strong>
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Address</strong>
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Phone</strong>
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Email</strong>
                </li>
                <li>
                  <strong className="font-medium text-charcoal">Ad Size</strong>{" "}
                  <span className="text-charcoal/65">
                    (
                    {advertising.adSizes
                      .map((size) => size.label.replace(/ page$/i, ""))
                      .join(", ")}
                    )
                  </span>
                </li>
                <li>
                  <strong className="font-medium text-charcoal">
                    Payment Method
                  </strong>{" "}
                  <span className="text-charcoal/65">
                    (Check by Mail, Online Payment)
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-charcoal/10 pt-8">
              <p className="text-xs uppercase tracking-wider text-charcoal/45">
                Payment
              </p>
              <a
                href={advertising.adPaymentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded border border-gold/20 bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-navy/90"
              >
                Pay for your ad online
              </a>
              <p className="mt-6 text-sm text-charcoal/70">
                Or mail a check directly to:
              </p>
              <address className="mt-3 not-italic text-sm text-charcoal/60">
                {mailingAddress.organization}
                <br />
                {mailingAddress.line1}
                <br />
                {mailingAddress.city}, {mailingAddress.state}{" "}
                {mailingAddress.zip}
              </address>
              <p className="mt-3 text-sm text-charcoal/60">
                Checks payable to Syracuse Chamber Orchestra
              </p>
            </div>
          </div>
        </div>
      </SolidSection>
    </>
  );
}
