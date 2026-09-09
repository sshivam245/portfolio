import { profile, headlineMetrics } from "@/content/profile";
import Portrait from "./Portrait";

/**
 * Left-aligned, no gradient, no rotating text, no status pill.
 * `.rise` staggers the four blocks in on load — CSS only, no hydration wait.
 */
export default function Masthead() {
  return (
    <section id="top" className="shell pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="rise lg:col-span-8">
          <p className="label">
            {profile.role}
            <span className="mx-2 text-accent">/</span>
            {profile.yearsExperience} yrs
            <span className="mx-2 text-accent">/</span>
            {profile.location}
          </p>

          {/*
            Serif display at low weight against the mono labels. This contrast
            is what stops the page reading as a generic Tailwind template.
          */}
          <h1 className="mt-6 max-w-[18ch] font-display text-[2.75rem] font-normal leading-[1.02] tracking-[-0.02em] sm:text-[4.25rem]">
            I build{" "}
            <span className="italic">acquisition engines</span> — and the
            automation underneath them.
          </h1>

          <p className="mt-6 max-w-prose text-body text-ink-muted">
            Currently Growth &amp; Strategy at Cloudsheer Consulting. Previously
            the first GTM hire at Nuvia AI. Looking for a founding-GTM or
            growth-engineering role.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#work" className="label group inline-flex items-center gap-2 text-ink">
              See the work
              <span
                aria-hidden
                className="h-px w-6 bg-accent transition-all duration-200 group-hover:w-10"
              />
            </a>
            <a href="#contact" className="label hover:text-accent transition-colors">
              Get in touch
            </a>
          </div>
        </div>

        <div className="lg:col-span-4">
          <Portrait />
        </div>
      </div>

      {/* Evidence, as an aligned table — not as cards. */}
      <dl className="mt-14 grid grid-cols-2 gap-x-6 lg:grid-cols-4">
        {headlineMetrics.map((m) => (
          <div key={m.label} className="rule-b py-5 lg:py-6">
            <span
              aria-hidden
              className="draw mb-4 block h-px w-full bg-accent/40"
            />
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
