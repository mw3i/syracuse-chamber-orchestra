import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ConductorProfile } from "@/components/ConductorProfile";
import { HeroRow } from "@/components/HeroRow";
import { SolidSection } from "@/components/SolidSection";
import { getConductor, getConductorSlug } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

interface MusicianPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: getConductorSlug() }];
}

export async function generateMetadata({
  params,
}: MusicianPageProps): Promise<Metadata> {
  const { slug } = await params;
  const conductor = getConductor();

  if (slug !== conductor.slug) {
    return { title: "Musician Not Found" };
  }

  return {
    title: conductor.name,
    description: `${conductor.name} — ${conductor.role}, Syracuse Chamber Orchestra.`,
    alternates: { canonical: absoluteUrl(`/musicians/${slug}`) },
    openGraph: {
      title: `${conductor.name} | Syracuse Chamber Orchestra`,
      description: `${conductor.name} — ${conductor.role}, Syracuse Chamber Orchestra.`,
      url: absoluteUrl(`/musicians/${slug}`),
    },
  };
}

export default async function MusicianPage({ params }: MusicianPageProps) {
  const { slug } = await params;
  const conductor = getConductor();

  if (slug !== conductor.slug) {
    notFound();
  }

  return (
    <>
      <HeroRow
        imageKey="hero-musicians"
        alt={`${conductor.name} portrait`}
        align="start"
        minHeight="medium"
      >
        <p className="section-label">Conductor</p>
        <h1 className="prose-heading mt-4 text-5xl leading-tight text-cream md:text-6xl">
          {conductor.name}
        </h1>
        {conductor.role && (
          <p className="mt-4 text-lg uppercase tracking-wider text-gold">
            {conductor.role}
          </p>
        )}
      </HeroRow>

      <SolidSection>
        <ConductorProfile conductor={conductor} />
        <Link
          href="/musicians"
          className="mt-10 inline-block text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:text-charcoal"
        >
          ← Back to all musicians
        </Link>
      </SolidSection>
    </>
  );
}
