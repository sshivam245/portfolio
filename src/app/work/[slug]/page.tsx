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

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cs = caseStudies.find((c) => c.id === params.slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `/work/${cs.id}` },
    openGraph: {
      title: cs.title,
      description: cs.summary,
      type: "article",
      url: `/work/${cs.id}`,
      // Defining openGraph here REPLACES the layout's, images included —
      // so it has to be restated or shares render blank.
      images: [{ url: "/og.png", width: 1200, height: 630, alt: cs.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description: cs.summary,
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
            className="label label-tap group mt-6 inline-flex items-center gap-2 text-ink"
          >
            {cs.link.label} ↗
            <span
              aria-hidden
              className="h-px w-12 origin-left scale-x-50 bg-accent transition-transform duration-200 group-hover:scale-x-100"
            />
          </a>
        ) : null}
      </header>

      {/* Outcomes up top — the numbers are the reason to keep reading. */}
      <section className="rule-t">
        <div className="shell py-8">
          <h2 className="label mb-6">Outcome</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
            {cs.outcomes.map((o) => (
              <div key={o.label} className="min-w-0">
                <dd className="t-metric break-words text-accent">
                  {o.value}
                </dd>
                <dt className="mt-2 text-small text-ink-muted">{o.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rule-t">
        <div className="shell grid gap-10 py-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="label mb-3">Context</h2>
            <p className="max-w-prose text-body text-ink-muted">{cs.context}</p>

            <h2 className="label mb-4 mt-10">What I built</h2>
            <ul className="max-w-prose space-y-3">
              {cs.built.map((b) => (
                <li key={b} className="flex gap-3 text-body text-ink-muted">
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
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

          <aside className="lg:col-span-5">
            <h2 className="label mb-2">Stack</h2>
            <p className="font-mono text-small text-ink-muted">
              {cs.stack.join("  ·  ")}
            </p>
            {cs.figures?.map((f) => (
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
