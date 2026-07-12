import type { Metadata } from "next";
import Image from "next/image";

import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import { getImage, getMedia, getOrganization } from "@/lib/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Media",
  description:
    "Photos and video performances from the Syracuse Chamber Orchestra.",
  path: "/media",
});

export default function MediaPage() {
  const media = getMedia();
  const org = getOrganization();

  return (
    <>
      <HeroRow
        imageKey="hero-media"
        alt="Syracuse Chamber Orchestra media gallery"
        align="start"
        minHeight="medium"
      >
        <p className="section-label">Media</p>
        <h1 className="prose-heading mt-4 max-w-3xl text-5xl leading-tight text-cream md:text-6xl">
          Photos & performances
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cream/85">
          Watch highlights from our concerts on YouTube.
        </p>
      </HeroRow>

      <SolidSection>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Gallery</p>
            <h2 className="prose-heading mt-4 text-4xl md:text-5xl">
              Concert highlights
            </h2>
          </div>
          <a
            href={media.youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded border border-gold bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-light"
          >
            View YouTube Channel
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {media.items.map((item) => (
            <a
              key={item.title}
              href={item.youtubeUrl ?? media.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded border border-charcoal/10 bg-white transition-colors hover:border-gold"
            >
              <div className="relative aspect-video overflow-hidden bg-cream-muted">
                <Image
                  src={getImage(item.image)}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy">
                    Watch on YouTube
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="prose-heading text-xl text-charcoal group-hover:text-gold">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </SolidSection>

      <SolidSection variant="dark">
        <p className="section-label">Follow along</p>
        <h2 className="prose-heading mt-4 text-4xl text-cream md:text-5xl">
          Stay connected
        </h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={media.youtubeChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            YouTube
          </a>
          {org.social.facebook && (
            <a
              href={org.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-cream/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Facebook
            </a>
          )}
        </div>
      </SolidSection>
    </>
  );
}
