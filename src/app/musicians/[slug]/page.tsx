import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import {
  getAllMusicianSlugs,
  getImage,
  getMusicianWithSection,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

interface MusicianPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllMusicianSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: MusicianPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getMusicianWithSection(slug);

  if (!result) {
    return { title: "Musician Not Found" };
  }

  return {
    title: result.musician.name,
    description: `${result.musician.name} — ${result.section.name}, Syracuse Chamber Orchestra.`,
    alternates: { canonical: absoluteUrl(`/musicians/${slug}`) },
    openGraph: {
      title: `${result.musician.name} | Syracuse Chamber Orchestra`,
      description: `${result.musician.name} — ${result.section.name}, Syracuse Chamber Orchestra.`,
      url: absoluteUrl(`/musicians/${slug}`),
    },
  };
}

export default async function MusicianPage({ params }: MusicianPageProps) {
  const { slug } = await params;
  const result = getMusicianWithSection(slug);

  if (!result) {
    notFound();
  }

  const { musician, section } = result;

  return (
    <>
      <HeroRow
        imageKey="hero-musicians"
        alt={`${musician.name} portrait`}
        align="start"
        minHeight="medium"
      >
        <p className="section-label">{section.name}</p>
        <h1 className="prose-heading mt-4 text-5xl leading-tight text-cream md:text-6xl">
          {musician.name}
        </h1>
        {musician.role && (
          <p className="mt-4 text-lg uppercase tracking-wider text-gold">
            {musician.role}
          </p>
        )}
      </HeroRow>

      <SolidSection>
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded bg-cream-muted">
            <Image
              src={getImage(musician.image)}
              alt={musician.name}
              fill
              className="object-cover"
              sizes="280px"
              priority
            />
          </div>
          <div>
            <p className="section-label">Profile</p>
            <h2 className="prose-heading mt-4 text-4xl">{musician.name}</h2>
            <p className="mt-4 text-lg text-charcoal/75">
              {musician.name} performs with the Syracuse Chamber Orchestra in the{" "}
              {section.name} section
              {musician.role ? ` as ${musician.role}` : ""}.
            </p>
            <Link
              href="/musicians"
              className="mt-8 inline-block text-sm font-semibold uppercase tracking-wider text-gold hover:text-charcoal"
            >
              ← Back to all musicians
            </Link>
          </div>
        </div>
      </SolidSection>
    </>
  );
}
