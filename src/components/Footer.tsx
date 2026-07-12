import Link from "next/link";

import { getOrganization } from "@/lib/data";
import { navItems } from "@/lib/navigation";

export function Footer() {
  const org = getOrganization();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-gold">{org.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            {org.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream/70 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Contact</p>
          <address className="mt-4 space-y-2 not-italic text-sm text-cream/70">
            <p>
              <a
                href={`mailto:${org.contact.email}`}
                className="transition-colors hover:text-gold"
              >
                {org.contact.email}
              </a>
            </p>
            <p>
              {org.mailingAddress.line1}
              <br />
              {org.mailingAddress.city}, {org.mailingAddress.state}{" "}
              {org.mailingAddress.zip}
            </p>
            {org.social.facebook && (
              <p>
                <a
                  href={org.social.facebook}
                  className="transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Syracuse Chamber Orchestra on Facebook (opens in new tab)"
                >
                  Facebook
                </a>
              </p>
            )}
          </address>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 py-4 text-center text-xs text-cream/50">
        © {year} {org.name}. All rights reserved.
      </div>
    </footer>
  );
}
