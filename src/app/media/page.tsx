import type { Metadata } from "next";
import Image from "next/image";

import { SolidSection } from "@/components/SolidSection";
import { getMedia, getOrganization } from "@/lib/data";
import { createPageMetadata } from "@/lib/site";
import {
  getYoutubeThumbnail,
  getYoutubeVideoId,
  getYoutubeWatchUrl,
} from "@/lib/youtube";

export const metadata: Metadata = createPageMetadata({
  title: "Media",
  description:
    "Photos and video performances from the Syracuse Chamber Orchestra.",
  path: "/media",
});

export default function MediaPage() {
  const media = getMedia();
  const org = getOrganization();
  const videos = media.videos
    .filter((video) => getYoutubeVideoId(video.youtubeUrl))
    .sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        return b.publishedAt.localeCompare(a.publishedAt);
      }
      return 0;
    });

  return (
    <>
      <SolidSection>
        <p className="section-label">Media</p>
        <h1 className="prose-heading mt-4 max-w-3xl text-4xl md:text-5xl">
          Photos & performances
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-charcoal/80">
          Watch highlights from our concerts on YouTube.
        </p>
        <a
          href={media.youtubeChannelUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded border border-gold bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-light"
        >
          View YouTube Channel
        </a>

        {videos.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              const watchUrl = getYoutubeWatchUrl(video.youtubeUrl);

              return (
                <a
                  key={watchUrl}
                  href={watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded border border-charcoal/10 bg-white transition-colors hover:border-gold"
                >
                  <div className="relative aspect-video overflow-hidden bg-cream-muted">
                    <Image
                      src={getYoutubeThumbnail(video.youtubeUrl)}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-navy/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy">
                        Watch on YouTube
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="prose-heading text-xl text-charcoal group-hover:text-gold">
                      {video.title}
                    </h3>
                  </div>
                </a>
              );
            })}
          </div>
        )}
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
