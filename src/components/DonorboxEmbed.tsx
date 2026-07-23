import Script from "next/script";

import { getDonorboxCampaignId } from "@/lib/donorbox";

interface DonorboxEmbedProps {
  donationUrl: string;
}

export function DonorboxEmbed({ donationUrl }: DonorboxEmbedProps) {
  const campaignId = getDonorboxCampaignId(donationUrl);
  if (!campaignId) {
    return null;
  }

  return (
    <div className="w-full">
      <Script
        src="https://donorbox.org/widgets.js"
        type="module"
        strategy="lazyOnload"
      />
      <div
        dangerouslySetInnerHTML={{
          __html: `<dbox-widget campaign="${campaignId}" type="donation_form" enable-auto-scroll="true"></dbox-widget>`,
        }}
      />
      <p className="mt-2 text-sm text-charcoal/60">
        Form not loading?{" "}
        <a
          href={donationUrl}
          target="_blank"
          rel="noreferrer"
          className="text-gold hover:text-charcoal"
        >
          Open Donorbox in a new tab
        </a>
        .
      </p>
    </div>
  );
}
