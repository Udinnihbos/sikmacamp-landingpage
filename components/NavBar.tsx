"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/client";
import SignOutButton from "@/components/SignOutButton";

const LINKS = [
  { href: "/server", label: "Server" },
  { href: "/server/shop", label: "Server Shop" },
  { href: "/store", label: "Store" },
  { href: "/#komunitas", label: "Komunitas" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Tutup menu otomatis tiap kali pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="relative mx-auto max-w-6xl px-6 py-6 sm:px-10">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Sikma<span className="text-brass">Camp</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-widest sm:flex">
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

          {loggedIn ? (
            <span className="flex items-center gap-4">
              <Link
                href="/admin"
                className={`transition-colors hover:text-ink ${
                  pathname.startsWith("/admin") ? "text-brass" : "text-muted"
                }`}
              >
                Admin
              </Link>
              <SignOutButton className="text-muted transition-colors hover:text-ink" />
            </span>
          ) : (
            <Link
              href="/sign-in"
              className="text-muted transition-colors hover:text-ink"
            >
              Masuk
            </Link>
          )}
        </nav>

        <a
          href={SITE.discordUrl}
          className="hidden rounded-md border border-brass/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-brass transition-colors hover:bg-brass/10 sm:block"
        >
          Discord
        </a>

        {/* Tombol hamburger, cuma muncul di mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink sm:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-4 bg-ink transition-transform duration-200 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[1.5px] w-4 -translate-y-1/2 bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-[1.5px] w-4 bg-ink transition-transform duration-200 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Dropdown mobile */}
      {open && (
        <nav className="mt-4 flex flex-col gap-1 rounded-lg border border-line bg-surface p-3 font-mono text-sm uppercase tracking-widest sm:hidden">
          {LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2.5 transition-colors ${
                  isActive ? "text-brass" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {loggedIn ? (
            <>
              <Link
                href="/admin"
                className="rounded-md px-3 py-2.5 text-muted transition-colors hover:text-ink"
              >
                Admin
              </Link>
              <SignOutButton className="rounded-md px-3 py-2.5 text-left text-muted transition-colors hover:text-ink" />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-md px-3 py-2.5 text-muted transition-colors hover:text-ink"
            >
              Masuk
            </Link>
          )}

          <a
            href={SITE.discordUrl}
            className="mt-1 rounded-md bg-brass px-3 py-2.5 text-center text-base transition-colors hover:bg-brasshi"
          >
            Discord
          </a>
        </nav>
      )}
    </header>
  );
}
