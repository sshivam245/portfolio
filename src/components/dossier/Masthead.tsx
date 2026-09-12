import { profile, headlineMetrics } from "@/content/profile";
import Orbit from "./Orbit";

/**
 * Left-aligned, no gradient, no rotating text, no status pill.
 * `.rise` staggers the four blocks in on load — CSS only, no hydration wait.
 */
export default function Masthead() {
  return (
    <section id="top" className="shell pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="rise lg:col-span-7">
          <p className="label">
            {profile.role}
            <span className="mx-2 text-accent">/</span>
            {profile.roleAlt}
            <span className="mx-2 text-accent">/</span>
            {profile.yearsExperience} yrs
            <span className="mx-2 text-accent">/</span>
            {profile.location}
          </p>

          {/*
            Serif display at low weight against the mono labels. This contrast
            is what stops the page reading as a generic Tailwind template.
          */}
          <h1 className="t-display mt-6 max-w-[16ch]">
            I build{" "}
            <span className="italic text-accent">acquisition engines</span>,
            and the automation underneath them.
          </h1>

          <p className="mt-6 max-w-prose text-body text-ink-muted">
            Currently Growth &amp; Strategy at Cloudsheer Consulting. Previously
            the first GTM hire at Nuvia AI. Looking for a founding-GTM or
            growth-engineering role.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#work" className="label label-tap press group inline-flex items-center gap-2 text-ink">
              See the work
              <span
                aria-hidden
                className="h-px w-10 origin-left scale-x-[0.6] bg-accent transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
            <a href="#contact" className="label label-tap press hover:text-accent transition-colors duration-150">
              Get in touch
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Orbit />
        </div>
      </div>

      {/* Evidence, as an aligned table — not as cards. */}
      <dl className="mt-14 grid grid-cols-2 gap-x-6 lg:grid-cols-4">
        {headlineMetrics.map((m) => (
          <div key={m.label} className="min-w-0 rule-b py-5 lg:py-6">
            <span
              aria-hidden
              className="draw mb-4 block h-px w-full bg-accent/40"
            />
            <dt className="label mb-2">{m.label}</dt>
            <dd>
              <span className="t-metric block break-words">
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
