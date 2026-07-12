import type { MetadataRoute } from "next";

import { getAllMusicianSlugs } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const staticPaths = [
  "/",
  "/about",
  "/musicians",
  "/events",
  "/support",
  "/media",
  "/advertise",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const musicianPaths = getAllMusicianSlugs().map(
    (slug) => `/musicians/${slug}`,
  );

  return [...staticPaths, ...musicianPaths].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
