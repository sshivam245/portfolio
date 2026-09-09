import { profile, headlineMetrics } from "@/content/profile";

/**
 * Left-aligned, no gradient, no rotating text, no status pill.
 * The statement carries the claim; the metrics table carries the proof.
 */
export default function Masthead() {
  return (
    <section id="top" className="shell pb-14 pt-16 sm:pb-20 sm:pt-24">
      <p className="label mb-6">
        {profile.role}
        <span className="mx-2 text-accent">/</span>
        {profile.yearsExperience} yrs
        <span className="mx-2 text-accent">/</span>
        {profile.location}
      </p>

      <h1 className="max-w-[20ch] text-h1 font-semibold sm:text-display">
        {profile.statement}
      </h1>

      <p className="mt-6 max-w-prose text-body text-ink-muted">
        Currently Growth &amp; Strategy at Cloudsheer Consulting. Previously the
        first GTM hire at Nuvia AI. Looking for a founding-GTM or
        growth-engineering role.
      </p>

      {/* Evidence, as an aligned table — not as cards. */}
      <dl className="rule-t mt-12 grid grid-cols-2 gap-x-6 lg:grid-cols-4">
        {headlineMetrics.map((m) => (
          <div key={m.label} className="rule-b py-5 lg:border-b-0 lg:py-6">
            <dt className="label mb-2">{m.label}</dt>
            <dd>
              <span className="tnum font-mono text-metric font-medium">
                {m.value}
                {m.unit}
              </span>
              <span className="mt-1 block text-small text-ink-muted">
                {m.note}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
