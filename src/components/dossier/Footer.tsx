import { profile } from "@/content/profile";

/**
 * A colophon. What a last line can usefully carry is availability and
 * freshness; the date is the build date, so it is true by construction.
 */
const UPDATED = new Date().toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
});

export default function Footer() {
  return (
    <footer className="tone-blue">
      <div className="shell flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-8">
        <p className="text-base font-bold">
          Shivam Goel <span className="font-medium text-ink-muted">· open to founding-GTM roles · {profile.location}</span>
        </p>
        <p className="label">Updated {UPDATED}</p>
      </div>
    </footer>
  );
}
