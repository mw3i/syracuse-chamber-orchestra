import Link from "next/link";

import { getOrganization } from "@/lib/data";
import { navItems } from "@/lib/navigation";

import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

export function Header() {
  const org = getOrganization();

  return (
    <header className="relative sticky top-0 z-50 border-b border-gold/20 bg-navy/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="group min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <span className="font-display text-lg tracking-wide text-cream transition-colors group-hover:text-gold sm:text-2xl">
            {org.shortName}
          </span>
          <span className="mt-0.5 hidden text-xs uppercase tracking-[0.2em] text-cream/60 sm:block sm:text-sm">
            Syracuse Chamber Orchestra
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
