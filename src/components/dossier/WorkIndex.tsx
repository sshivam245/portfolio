import Link from "next/link";
import Section from "./Section";
import { caseStudies } from "@/content/caseStudies";
import CountUp from "@/components/motion/CountUp";
import { indexLine } from "@/lib/text";

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
                className="work-row press group grid gap-x-8 gap-y-4 rule-b py-8 sm:grid-cols-12"
              >
                {/*
                  The index number, pulled out of the meta line into its own
                  gutter. Buried inline in 11px mono it was invisible and the
                  rows had no anchor, so seven of them read as one undivided
                  stack. At display size, muted, it gives each row a mark to
                  scan down and makes the section read as an index.

                  Hidden below sm: the gutter costs a whole line of its own
                  once the grid collapses, which is a poor trade on a phone.
                */}
                <span
                  aria-hidden
                  className="work-row-n tnum hidden text-ink-muted sm:col-span-1 sm:block sm:text-[2rem] sm:leading-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="label sm:col-span-10 sm:col-start-2">
                  <span className="tnum sm:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-accent sm:hidden">·</span>
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

                <div className="sm:col-span-6 sm:col-start-2">
                  <h3 className="t-heading transition-colors duration-150 group-hover:text-accent">
                    {cs.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-small text-ink-muted">
                    {indexLine(cs.summary)}
                  </p>
                </div>

                {/*
                  The outcome sits in its own column, left-aligned so the
                  seven rows form a vertical spine. It used to be baseline-
                  flexed beside its caption and right-aligned, which meant a
                  long value like "AI Overview" ate the width and pushed the
                  caption into a three-line ribbon.

                  Size is chosen by length, because these values are not all
                  numbers. "68.7k" and "#1" carry the big mono treatment;
                  "AI Overview" would shout at that size and wrap, so
                  anything longer drops a step. The label above it is what
                  tells you the column is evidence rather than a stray line.
                */}
                <div className="min-w-0 sm:col-span-4 sm:col-start-9">
                  <p className="label mb-2">Outcome</p>
                  <p
                    className={`${
                      headline.value.length <= 7 ? "t-metric-sm" : "t-subhead"
                    } break-words text-accent`}
                  >
                    {/* Non-numeric values ("AI Overview", "Live") fall through
                        CountUp untouched; only the numbers animate. */}
                    <CountUp value={headline.value} />
                  </p>
                  <p className="mt-2 text-small text-ink-muted">
                    {headline.label}
                  </p>
                </div>

              </Link>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
