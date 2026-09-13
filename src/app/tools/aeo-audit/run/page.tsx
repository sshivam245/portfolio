import type { Metadata } from "next";
import AeoRunner from "@/components/tools/AeoRunner";

/**
 * Unlisted, not private. It is excluded from the sitemap, the nav and
 * llms.txt, and carries noindex, but anyone with the URL can open it. There
 * is no auth on a static export, so nothing secret goes on this page.
 */
export const metadata: Metadata = {
  title: "Audit runner",
  robots: { index: false, follow: false },
};

export default function RunPage() {
  return (
    <article>
      <header className="shell py-12">
        <p className="label label-tap">
          <span className="text-accent">INTERNAL</span>
          <span className="mx-2">·</span>
          UNLISTED
        </p>
        <h1 className="t-title mt-4 max-w-[16ch]">Audit runner</h1>
        <p className="mt-6 max-w-prose text-body text-ink-muted">
          Paste a submitted page&apos;s source and get the same 23 checks applied,
          ordered, with a report draft ready to copy into a reply. Everything runs
          in this browser: nothing is uploaded, stored or logged.
        </p>
      </header>

      <section className="rule-t">
        <div className="shell py-12">
          <AeoRunner />
        </div>
      </section>
    </article>
  );
}
