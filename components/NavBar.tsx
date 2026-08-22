"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site-config";

const LINKS = [
  { href: "/store", label: "Store" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/#komunitas", label: "Komunitas" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
      <Link
        href="/"
        className="font-display text-lg font-semibold tracking-tight"
      >
        Sikma<span className="text-brass">Camp</span>
      </Link>

      <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest sm:flex">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-ink ${
                isActive ? "text-brass" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <a
        href={SITE.discordUrl}
        className="rounded-md border border-brass/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-brass transition-colors hover:bg-brass/10"
      >
        Discord
      </a>
    </header>
  );
}
