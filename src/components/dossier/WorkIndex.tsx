import Link from "next/link";
import Section from "./Section";
import { caseStudies } from "@/content/caseStudies";

/**
 * Compact index of the case studies for the homepage.
 *
 * The full write-ups used to sit inline here, which put four Context /
 * What-I-built / Outcome blocks on the landing page and buried everything
 * under a wall of text. Each row now shows only what a hiring manager needs
 * to decide whether to click: what it was, where, and the headline number.
 */
export default function WorkIndex() {
  return (
    <Section
      id="work"
      index="01"
      title="Selected work"
      aside={`${caseStudies.length} case studies`}
    >
      <ol className="rule-t">
        {caseStudies.map((cs, i) => {
          const headline = cs.outcomes[0];
          return (
            <li key={cs.id} className="stagger-item" style={{ "--i": i } as React.CSSProperties}>
              <Link
                href={`/work/${cs.id}`}
                className="press group grid items-baseline gap-x-6 gap-y-3 rule-b py-7 sm:grid-cols-12"
              >
                <p className="label sm:col-span-12">
                  <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2 text-accent">·</span>
                  {cs.tag}
                  <span className="mx-2">·</span>
                  {cs.org}, {cs.timeframe}
                  {/*
                    A badge, not a link: the whole row is already an <a>, and
                    nesting one inside another is invalid. This just tells the
                    reader there is something live behind the click.
                  */}
                  {cs.link ? (
                    <>
                      <span className="mx-2">·</span>
                      <span className="text-accent">Live ↗</span>
                    </>
                  ) : null}
                </p>

                <div className="sm:col-span-7">
                  <h3 className="t-heading transition-colors duration-150 group-hover:text-accent">
                    {cs.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-small text-ink-muted">
                    {cs.summary}
                  </p>
                </div>

                <div className="flex min-w-0 items-baseline gap-4 sm:col-span-5 sm:justify-end">
                  <span className="t-metric-sm break-words text-accent">
                    {headline.value}
                  </span>
                  <span className="max-w-[18ch] text-small text-ink-muted">
                    {headline.label}
                  </span>
                </div>

                <span className="label flex items-center gap-2 sm:col-span-12">
                  Read the case study
                  <span
                    aria-hidden
                    className="h-px w-12 origin-left scale-x-50 bg-accent transition-transform duration-200 group-hover:scale-x-100"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
