import Link from "next/link";
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
  { label: "Tools", href: "/tools" },
  { label: "Writing", href: "/writing", secondary: true },
  { label: "About", href: "/about", secondary: true },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-paper/95" style={{ borderColor: "var(--rule)" }}>
      {/* Wraps rather than overflowing: at 375px with 200% text the row
          needs far more than the viewport, which is a WCAG 1.4.10 failure.
          Height grows instead. */}
      <div className="shell flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
        {/* next/link, not <a>: Next only prepends basePath to Link hrefs. */}
        <Link href="/" className="label-tap text-lg font-bold tracking-tight text-ink">
          Shivam Goel
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 sm:gap-x-6">
          {nav
            .filter((item) => item.label !== "Contact")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`label-tap text-sm font-bold text-ink transition-colors hover:text-ink-a ${
                  item.secondary ? "hidden sm:inline" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          <a
            href={asset(profile.resumePath)}
            className="label-tap hidden text-sm font-bold text-ink transition-colors hover:text-ink-a sm:inline"
            download
          >
            CV
          </a>
          {/* The funnel always has a next step. */}
          <Link href="/#contact" className="btn !min-h-10 !px-4 !py-2 text-sm">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
