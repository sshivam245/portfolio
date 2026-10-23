import { profile, headlineMetrics } from "@/content/profile";
import Marks from "./Marks";
import CountUp from "@/components/motion/CountUp";

/**
 * Left-aligned, no gradient, no rotating text, no status pill.
 * `.rise` staggers the four blocks in on load — CSS only, no hydration wait.
 */
export default function Masthead() {
  return (
    <section id="top" className="shell pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div className="rise">
          <p className="label">
            {profile.role}
            <span className="mx-2">/</span>
            {profile.roleAlt}
            <span className="mx-2">/</span>
            {profile.yearsExperience} yrs
            <span className="mx-2">/</span>
            {profile.location}
          </p>

          {/*
            Serif display at low weight against the mono labels. This contrast
            is what stops the page reading as a generic Tailwind template.
          */}
          {/* No ch cap: with the orbit gone the shell is the measure, the
              way it is on a case study. Capped at 22ch it ran to three lines
              and pushed the figures off a 714px viewport. */}
          <h1 className="t-display mt-6">
            I build{" "}
            <span className="italic text-accent">acquisition engines</span>, and
            the automation underneath them.
          </h1>

          <p className="mt-6 max-w-prose text-body text-ink-muted">
            Growth &amp; Strategy at Cloudsheer. First GTM hire at Nuvia AI.
            Looking for a founding-GTM role.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#work"
              className="label label-tap press group inline-flex items-center gap-2 text-ink"
            >
              See the work
              <span
                aria-hidden
                className="h-px w-10 origin-left scale-x-[0.6] bg-accent transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
            <a
              href="#contact"
              className="label label-tap press hover:text-accent transition-colors duration-150"
            >
              Get in touch
            </a>
          </div>
        </div>

      {/* Evidence, as an aligned table, not as cards. */}
        {/*
        Four shared rows via subgrid: hairline, label, metric, note. A label
        that wraps to two lines ("Google + AI Overview") otherwise pushes only
        its own metric down, and the numbers stop sitting on one line. Each
        cell spans the parent's rows so every track is as tall as its tallest
        occupant and all four cells agree.

        The <dd> is a nested subgrid rather than display:contents, which keeps
        the dt/dd pairing intact for assistive tech while still letting the
        metric and the note line up as separate rows.
      */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 lg:grid-cols-4">
          {headlineMetrics.map((m) => (
            <div
              key={m.label}
              className="row-span-4 grid min-w-0 grid-rows-subgrid rule-b py-5 lg:py-6"
            >
              <span
                aria-hidden
                className="draw mb-4 block h-px w-full bg-accent/40"
              />
              <dt className="label mb-2">{m.label}</dt>
              <dd className="row-span-2 grid grid-rows-subgrid">
                {/*
                Accent marks the one figure a stranger can check, not all four.
                Painted uniformly, "#1 in Google's AI Overview" sat at exactly
                the weight of a conversion lift PRODUCT.md lists as
                unconfirmed. Scarcity is what makes the accent mean anything.
              */}
                <span
                  className={`t-metric block break-words ${
                    m.verified ? "text-accent" : ""
                  }`}
                >
                  <CountUp value={`${m.value}${m.unit}`} />
                </span>
                <span className="mt-1 block text-small text-ink-muted">
                  {m.note}
                </span>
              </dd>
            </div>
          ))}
        </dl>

      <Marks />
    </section>
  );
}
