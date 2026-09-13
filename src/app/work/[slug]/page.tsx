import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Figure from "@/components/dossier/Figure";
import { caseStudies } from "@/content/caseStudies";
import { asset } from "@/lib/basePath";
import { CaseStudySchema } from "@/components/dossier/StructuredData";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.id }));
}

/**
 * Meta descriptions get truncated around 160 characters. Several summaries
 * run past 240 and were being cut mid-clause, so the snippet ended on a
 * fragment. Cut at the last word boundary instead, and only for the tag:
 * the full summary still renders on the page.
 */
function metaDescription(summary: string) {
  if (summary.length <= 160) return summary;
  const cut = summary.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cs = caseStudies.find((c) => c.id === params.slug);
  if (!cs) return {};
  const description = metaDescription(cs.summary);
  return {
    title: cs.title,
    description,
    alternates: { canonical: `/work/${cs.id}` },
    openGraph: {
      title: cs.title,
      description,
      type: "article",
      url: `/work/${cs.id}`,
      // Defining openGraph here REPLACES the layout's, images included —
      // so it has to be restated or shares render blank.
      images: [{ url: "/og.png", width: 1200, height: 630, alt: cs.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description,
      images: ["/og.png"],
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const index = caseStudies.findIndex((c) => c.id === params.slug);
  if (index === -1) notFound();
  const cs = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const diagrams = cs.figures?.filter((f) => f.diagram) ?? [];
  const shots = cs.figures?.filter((f) => !f.diagram) ?? [];

  return (
    <article>
      <CaseStudySchema slug={cs.id} />
      <header className="shell py-12 sm:py-16">
        <Link href="/#work" className="label label-tap hover:text-accent transition-colors">
          ← Selected work
        </Link>

        <p className="label label-tap mt-8">
          <span className="tnum">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-accent">·</span>
          {cs.tag}
          <span className="mx-2">·</span>
          {cs.org}, {cs.timeframe}
        </p>

        <h1 className="t-title mt-4 max-w-[18ch]">
          {cs.title}
        </h1>

        <p className="mt-6 max-w-prose text-body">{cs.summary}</p>

        {cs.link ? (
          <a
            /* A root-relative href points at a file in /public and needs the
               basePath; a plain <a> does not get it the way next/link does. */
            href={
              cs.link.href.startsWith("/") ? asset(cs.link.href) : cs.link.href
            }
            target="_blank"
            rel="noreferrer noopener"
            /*
             * Body size and the .link underline, not .label. As a label it
             * rendered identically to "Outcome", "Context" and "Stack", so
             * the one genuinely clickable thing on the page read as a section
             * heading and nobody found it.
             */
            className="link label-tap press mt-6 inline-flex items-center gap-2 text-body"
          >
            {cs.link.label}
            <span aria-hidden>↗</span>
          </a>
        ) : null}
      </header>

      {/*
        Outcomes and stack share one band. Stack was a 5-column aside holding
        two lines of text, which left roughly 40% of the page empty down the
        whole length of the article. It is a list of tools, not a column.
      */}
      <section className="rule-t">
        <div className="shell py-8">
          <h2 className="label mb-6">Outcome</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
            {cs.outcomes.map((o) => (
              <div key={o.label} className="min-w-0">
                <dd className="t-metric break-words text-accent">{o.value}</dd>
                <dt className="mt-2 text-small text-ink-muted">{o.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/*
        Diagrams run inline under the context, where the flow explains the
        argument being made right above it. Screenshots go in the right
        column: they are evidence to glance at, not a step to follow, and
        they give the column something to hold.
      */}
      <section className="rule-t">
        <div className="shell grid gap-10 py-12 lg:grid-cols-12 lg:gap-12">
          {/*
            min-w-0: a grid item defaults to min-width:auto, so the diagram's
            648px min-width was forcing the whole grid wider than the phone
            and pushing the page into horizontal scroll. With this the column
            can shrink and the diagram scrolls inside its own wrapper instead.
          */}
          <div className="min-w-0 lg:col-span-7">
            <h2 className="label mb-3">Context</h2>
            <p className="max-w-prose text-body text-ink-muted">{cs.context}</p>

            {diagrams.map((f) => (
              <Figure key={f.src} figure={f} />
            ))}

            <h2 className="label mb-4 mt-10">What I built</h2>
            <ul className="max-w-prose space-y-3">
              {cs.built.map((b) => (
                <li key={b} className="flex gap-3 text-body text-ink-muted">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {cs.reflection ? (
              <>
                <h2 className="label mb-3 mt-10">What I&apos;d do differently</h2>
                <p className="max-w-prose text-body text-ink-muted">
                  {cs.reflection}
                </p>
              </>
            ) : null}
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <h2 className="label mb-2">Stack</h2>
            <p className="font-mono text-small text-ink-muted">
              {cs.stack.join("  \u00b7  ")}
            </p>
            {shots.map((f) => (
              <Figure key={f.src} figure={f} />
            ))}
          </aside>
        </div>
      </section>

      {/* Next case study, so the page doesn't dead-end. */}
      <section className="rule-t">
        <div className="shell py-10">
          <Link href={`/work/${next.id}`} className="group block">
            <h2 className="label mb-2">Next case study</h2>
            <p className="t-heading transition-colors duration-150 group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
