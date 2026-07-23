import type { Metadata } from "next";

import { getOrganization } from "./data";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://syracusechamberorchestra.com";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const org = getOrganization();
  const url = absoluteUrl(path);

  return {
    title: path === "/" ? { absolute: org.name } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: path === "/" ? org.name : `${title} | ${org.name}`,
      description,
      url,
      siteName: org.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: path === "/" ? org.name : `${title} | ${org.name}`,
      description,
    },
  };
}

export const defaultDescription =
  "A community orchestra in Syracuse, New York providing free concerts to the public.";

export const showFacebookLinks = false;
