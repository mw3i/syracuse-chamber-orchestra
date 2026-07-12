"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
  mobile?: boolean;
  onNavigate?: () => void;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({ href, label, mobile = false, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  const desktopClass = active
    ? "bg-cream/10 text-gold"
    : "text-cream/80 hover:bg-cream/5 hover:text-gold";
  const mobileClass = active
    ? "bg-cream/10 text-gold"
    : "text-cream/80 hover:bg-cream/5 hover:text-gold";

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded text-sm uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        mobile
          ? `block px-3 py-3 ${mobileClass}`
          : `px-3 py-2 ${desktopClass}`
      }`}
      onClick={onNavigate}
    >
      {label}
    </Link>
  );
}
