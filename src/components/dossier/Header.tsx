"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { profile } from "@/content/profile";
import { asset } from "@/lib/basePath";

/**
 * `secondary` items are dropped below 640px — six items plus the theme toggle
 * overflow a 375px viewport, and Work/Contact are the two that matter.
 */
const nav = [
  { label: "Work", href: "#work" },
  { label: "Writing", href: "#writing" },
  { label: "Track", href: "#track", secondary: true },
  { label: "About", href: "#about", secondary: true },
  { label: "Contact", href: "#contact" },
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
        <a href="#top" className="label text-ink hover:text-accent transition-colors">
          Shivam Goel
        </a>

        <nav className="flex items-center gap-3 sm:gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`label hover:text-accent transition-colors ${
                item.secondary ? "hidden sm:inline" : ""
              }`}
            >
              {item.label}
            </a>
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
