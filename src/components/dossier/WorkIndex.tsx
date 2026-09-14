import Link from "next/link";
import Section from "./Section";
import { caseStudies } from "@/content/caseStudies";
import CountUp from "@/components/motion/CountUp";
import { indexLine } from "@/lib/text";

/**
 * The case studies, drawn as a flow rather than listed as rows.
 *
 * Every entry is a node on a spine with an arrow into the box holding what
 * came out of it, in the same hairline-and-arrowhead language as the
 * diagrams inside the case studies. A list of title-left, metric-right rows
 * is the shape every portfolio already uses; this one is built out of the
 * thing the work is actually about.
 *
 * The full write-ups live at /work/<slug>. Each entry shows only what is
 * needed to decide whether to open one: what it was, where, and the result.
 */
export default function WorkIndex() {
  return (
    <Section
      id="work"
      index="01"
      title="Selected work"
      aside={`${caseStudies.length} case studies`}
    >
      {/* The padding is what the spine and the nodes live in. */}
      <ol className="flow-index sm:pl-[4.5rem]">
        {caseStudies.map((cs, i) => {
          const headline = cs.outcomes[0];
          const n = String(i + 1).padStart(2, "0");

          return (
            <li key={cs.id} className="stagger-item" style={{ "--i": i } as React.CSSProperties}>
              <Link
                href={`/work/${cs.id}`}
                className="flow-row press group relative grid gap-x-10 gap-y-5 py-9 sm:grid-cols-12"
              >
                {/* The node sits in the gutter, on the spine, outside the grid. */}
                <span
                  aria-hidden
                  className="flow-node tnum hidden text-[1.0625rem] sm:grid"
                >
                  {n}
                </span>

                <div className="min-w-0 sm:col-span-7">
                  <p className="label">
                    {/* The node carries the number from sm up. */}
                    <span className="tnum sm:hidden">{n}</span>
                    <span className="mx-2 text-accent sm:hidden">·</span>
                    {cs.tag}
                    <span className="mx-2">·</span>
                    {cs.org}, {cs.timeframe}
                    {/*
                      A badge, not a link: the whole row is already an <a>,
                      and nesting one inside another is invalid. It just says
                      there is something live behind the click.
                    */}
                    {cs.link ? (
                      <>
                        <span className="mx-2">·</span>
                        <span className="text-accent">Live ↗</span>
                      </>
                    ) : null}
                  </p>

                  <h3 className="t-heading mt-4 transition-colors duration-150 group-hover:text-accent">
                    {cs.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-small text-ink-muted">
                    {indexLine(cs.summary)}
                  </p>
                </div>

                {/*
                  The output box. Its value size varies with length but never
                  its typeface: this used .t-subhead for long values, which is
                  the serif display face, so "AI Overview" rendered in serif
                  beside "Live" and "1:1" in mono.
                */}
                <div className="flow-out min-w-0 self-start sm:col-span-4 sm:col-start-9">
                  <p className="label mb-2">Outcome</p>
                  <p
                    className={`${
                      headline.value.length <= 7 ? "t-metric-sm" : "t-metric-xs"
                    } break-words text-accent`}
                  >
                    {/* Words pass through untouched; only numbers count up. */}
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
