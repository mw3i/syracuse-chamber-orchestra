import Script from "next/script";

import { getDonorboxEmbedUrl } from "@/lib/donorbox";

interface DonorboxEmbedProps {
  donationUrl: string;
}

export function DonorboxEmbed({ donationUrl }: DonorboxEmbedProps) {
  const embedUrl = getDonorboxEmbedUrl(donationUrl);
  if (!embedUrl) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-[500px]">
      <Script src="https://donorbox.org/widget.js" strategy="lazyOnload" />
      <iframe
        src={embedUrl}
        name="donorbox"
        title="Donate to Syracuse Chamber Orchestra"
        allow="payment"
        scrolling="no"
        className="block w-full border-0"
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
