import { profile } from "@/content/profile";

/**
 * A colophon, not a second contact section.
 *
 * It used to read "Shivam Goel · Marketing Engineer, Growth & GTM · Built
 * with Next.js · 2026", which put the name on screen a third time (header,
 * wordmark, here) and spent the last line of the site on a framework credit.
 * "Built with Next.js" is what a template says: it tells a hiring manager
 * nothing, and it is the one string on the page that reads as a default
 * nobody removed.
 *
 * What a last line can usefully carry is availability and freshness. The date
 * is the build date, so it is true by construction rather than a claim
 * somebody has to remember to update.
 */
const UPDATED = new Date().toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
});

export default function Footer() {
  return (
    <footer className="rule-t">
      <div className="shell flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-8">
        <p className="label">
          <span className="text-accent">Open to founding-GTM roles</span>
          <span className="mx-2">·</span>
          {profile.location}
        </p>
        <p className="label">Updated {UPDATED}</p>
      </div>
    </footer>
  );
}
