import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Figure from "@/components/dossier/Figure";
import { caseStudies } from "@/content/caseStudies";

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
    title: `${cs.title} — Shivam Goel`,
    description: cs.summary,
    openGraph: { title: cs.title, description: cs.summary, type: "article" },
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
      <header className="shell py-12 sm:py-16">
        <Link href="/#work" className="label hover:text-accent transition-colors">
          ← Selected work
        </Link>

        <p className="label mt-8">
          <span className="tnum">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-accent">·</span>
          {cs.tag}
          <span className="mx-2">·</span>
          {cs.org}, {cs.timeframe}
        </p>

        <h1 className="mt-4 max-w-[18ch] font-display text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] sm:text-[4rem]">
          {cs.title}
        </h1>

        <p className="mt-6 max-w-prose text-body">{cs.summary}</p>
      </header>

      {/* Outcomes up top — the numbers are the reason to keep reading. */}
      <section className="rule-t">
        <div className="shell py-8">
          <h2 className="label mb-6">Outcome</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
            {cs.outcomes.map((o) => (
              <div key={o.label}>
                <dd className="tnum font-mono text-[2rem] font-medium leading-none text-accent sm:text-[2.5rem]">
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
            <p className="label mb-2">Next case study</p>
            <h2 className="font-display text-[1.75rem] font-normal leading-tight tracking-[-0.015em] transition-colors duration-150 group-hover:text-accent sm:text-[2.25rem]">
              {next.title}
            </h2>
          </Link>
        </div>
      </section>
    </article>
  );
}
