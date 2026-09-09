import Section from "./Section";
import Figure from "./Figure";
import { caseStudies } from "@/content/caseStudies";

/**
 * Two columns on desktop: narrative left (capped at 68ch), evidence rail right.
 * Adding a case study is an append to content/caseStudies.ts.
 */
export default function Work() {
  return (
    <Section
      id="work"
      index="01"
      title="Selected work"
      aside={`${caseStudies.length} case studies`}
    >
      <div className="divide-y" style={{ borderColor: "var(--rule)" }}>
        {caseStudies.map((cs, i) => (
          <article key={cs.id} className="grid gap-8 py-10 first:pt-0 lg:grid-cols-12 lg:gap-10">
            {/* Narrative */}
            <div className="lg:col-span-7">
              <p className="label mb-3">
                <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-accent">·</span>
                {cs.tag}
                <span className="mx-2">·</span>
                {cs.org}, {cs.timeframe}
              </p>

              <h3 className="font-display text-[2rem] font-normal leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem]">
                {cs.title}
              </h3>

              <p className="mt-4 max-w-prose text-body">{cs.summary}</p>

              <h4 className="label mt-8 mb-2">Context</h4>
              <p className="max-w-prose text-body text-ink-muted">{cs.context}</p>

              <h4 className="label mt-8 mb-3">What I built</h4>
              <ul className="max-w-prose space-y-2.5">
                {cs.built.map((b) => (
                  <li key={b} className="flex gap-3 text-body text-ink-muted">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {cs.reflection ? (
                <>
                  <h4 className="label mt-8 mb-2">What I&apos;d do differently</h4>
                  <p className="max-w-prose text-body text-ink-muted">
                    {cs.reflection}
                  </p>
                </>
              ) : null}
            </div>

            {/* Evidence rail */}
            <aside className="lg:col-span-5">
              <h4 className="label mb-3">Outcome</h4>
              <dl className="rule-t">
                {cs.outcomes.map((o) => (
                  <div
                    key={o.label}
                    className="rule-b flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="text-small text-ink-muted">{o.label}</dt>
                    <dd className="tnum shrink-0 font-mono text-h3 font-medium">
                      {o.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <h4 className="label mb-2 mt-6">Stack</h4>
              <p className="font-mono text-small text-ink-muted">
                {cs.stack.join("  ·  ")}
              </p>

              {cs.figures?.map((f) => (
                <Figure key={f.src} figure={f} />
              ))}
            </aside>
          </article>
        ))}
      </div>
    </Section>
  );
}
