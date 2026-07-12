import Link from "next/link";

import { SolidSection } from "@/components/SolidSection";

export default function NotFound() {
  return (
    <SolidSection>
      <p className="section-label">404</p>
      <h1 className="prose-heading mt-4 text-5xl md:text-6xl">Page not found</h1>
      <p className="mt-6 max-w-xl text-lg text-charcoal/75">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded border border-gold bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-light"
      >
        Back to home
      </Link>
    </SolidSection>
  );
}
