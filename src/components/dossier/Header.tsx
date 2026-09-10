"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { profile } from "@/content/profile";
import { asset } from "@/lib/basePath";

/**
 * Root-relative hrefs, not bare hashes — these have to work from /work/<slug>
 * and /about too, where "#work" would resolve against the current page.
 *
 * `secondary` items are dropped below 640px; the full set plus the theme
 * toggle overflows a 375px viewport, and Work/Contact are what matter.
 */
const nav = [
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about", secondary: true },
  { label: "Contact", href: "/#contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Render a stable placeholder until mounted so SSR and client agree.
  if (!mounted) return <span className="label w-8" aria-hidden />;

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="label hover:text-accent transition-colors"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}

export default function Header() {
  return (
    <header className="rule-b sticky top-0 z-40 bg-paper/95 backdrop-blur-[2px]">
      <div className="shell flex h-14 items-center justify-between gap-4">
        {/* next/link, not <a> — Next only prepends basePath (/portfolio) to
            Link hrefs, so a plain anchor to "/" 404s on GitHub Pages. */}
        <Link href="/" className="label text-ink hover:text-accent transition-colors">
          Shivam Goel
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`label hover:text-accent transition-colors ${
                item.secondary ? "hidden sm:inline" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={asset(profile.resumePath)}
            className="label hover:text-accent transition-colors"
            download
          >
            CV
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
