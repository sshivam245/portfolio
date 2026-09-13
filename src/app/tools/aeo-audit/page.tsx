import type { Metadata } from "next";
import Link from "next/link";
import AeoAuditForm from "@/components/tools/AeoAuditForm";
import { CATEGORIES, CHECK_SPECS } from "@/lib/aeo/checks";

export const metadata: Metadata = {
  title: "Free AEO audit",
  description:
    "Send a URL and get a written report within a day: what answer engines can currently do with your pages, the three fixes worth making first, and what to leave alone.",
  alternates: { canonical: "/tools/aeo-audit" },
  openGraph: {
    title: "Free AEO audit",
    description:
      "Send a URL, get a written report within a day on what answer engines can do with your pages.",
    type: "website",
    url: "/tools/aeo-audit",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Free AEO audit" }],
  },
};

export default function AeoAuditPage() {
  return (
    <article>
      <header className="shell py-12 sm:py-16">
        <Link href="/tools" className="label label-tap hover:text-accent transition-colors">
          ← Tools
        </Link>

        <p className="label label-tap mt-8">
          <span className="text-accent">FREE</span>
          <span className="mx-2">·</span>
          WRITTEN BY A PERSON
          <span className="mx-2">·</span>
          BACK WITHIN A DAY
        </p>

        <h1 className="t-title mt-4 max-w-[16ch]">
          What can an answer engine actually do with your site?
        </h1>

        <p className="mt-6 max-w-prose text-body text-ink-muted">
          Search is being answered, not just listed. A page can rank perfectly well
          and still never be quoted, because the thing that gets quoted is a passage,
          and most pages do not contain one. Send me a URL and I&apos;ll tell you where
          yours stands.
        </p>
      </header>

      <section className="rule-t">
        <div className="shell grid gap-10 py-12 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <AeoAuditForm />
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <h2 className="label mb-4">What comes back</h2>
            <ul className="space-y-4">
              {[
                ["A read on the current state", "Where each page sits against the checks below, with the evidence, not a score out of a hundred."],
                ["Three fixes, ordered", "Ranked by what moves citations, not by what is easiest to write up."],
                ["What to leave alone", "Most audits are padded with everything the tool could detect. The short list is the useful part."],
              ].map(([h, p]) => (
                <li key={h}>
                  <p className="text-body text-ink">{h}</p>
                  <p className="mt-1 text-small text-ink-muted">{p}</p>
                </li>
              ))}
            </ul>

            <h2 className="label mb-3 mt-10">What it is not</h2>
            <p className="text-small text-ink-muted">
              Not a sales call, and not a PDF with your logo on it. If your site is
              already in decent shape I will say that in two lines rather than
              inventing work. If the honest answer is that your problem is not AEO
              at all, you will get that instead.
            </p>
          </aside>
        </div>
      </section>

      <section className="rule-t">
        <div className="shell py-12">
          <h2 className="t-subhead">What gets checked</h2>
          <p className="mt-3 max-w-prose text-body text-ink-muted">
            {CHECK_SPECS.length} checks in four groups. None of them reverse-engineer a
            ranking, because no engine publishes one. Each is something that
            demonstrably changes whether a passage can be retrieved, attributed
            and quoted.
          </p>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {CATEGORIES.map((c) => (
              <div key={c.id}>
                <h3 className="label text-accent">{c.label}</h3>
                <p className="mt-2 text-small text-ink-muted">{c.blurb}</p>
                <dl className="mt-5 space-y-4">
                  {CHECK_SPECS.filter((s) => s.category === c.id).map((s) => (
                    <div key={s.id}>
                      <dt className="text-body text-ink">{s.label}</dt>
                      <dd className="mt-1 text-small text-ink-muted">{s.why}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rule-t">
        <div className="shell py-10">
          <Link href="/work/aeo-geo" className="group block">
            <h2 className="label mb-2">Why take my word for it</h2>
            <p className="t-heading transition-colors duration-150 group-hover:text-accent">
              The case study where this got a page cited by Google&apos;s AI Overview
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
