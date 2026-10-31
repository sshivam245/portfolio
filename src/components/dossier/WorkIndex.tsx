import Link from "next/link";
import Section, { type Tone } from "./Section";
import { caseStudies } from "@/content/caseStudies";

/**
 * The case studies, as big tappable panels on the blue block.
 *
 * This used to be drawn as a flow: a spine, numbered nodes, hairline arrows
 * into outcome boxes. That is the grammar of a systems diagram, and it was a
 * large part of why the site read as a developer's. These are panels you can
 * hit with a thumb, with the title at headline size and the result beside
 * it, and they lean when you point at them.
 *
 * `limit` shows the first few, for the homepage; /work shows all of them.
 */
export default function WorkIndex({
  limit,
  tag = "Touchpoint 1 · The work",
  title = "Things I built that actually shipped.",
  tone = "blue",
}: {
  limit?: number;
  tag?: string;
  title?: React.ReactNode;
  tone?: Tone;
}) {
  const shown = limit ? caseStudies.slice(0, limit) : caseStudies;
  const hasMore = limit != null && caseStudies.length > limit;

  return (
    <Section
      id="work"
      tag={tag}
      title={title}
      tone={tone}
      aside={
        hasMore ? (
          <Link href="/work" className="link">
            See all {caseStudies.length} →
          </Link>
        ) : null
      }
    >
      <ol className="grid gap-4">
        {shown.map((cs, i) => {
          const headline = cs.outcomes[0];
          return (
            <li key={cs.id} className="stagger-item" style={{ "--i": i } as React.CSSProperties}>
              <Link href={`/work/${cs.id}`} className="work-card group">
                <span className="work-n tnum" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="work-main min-w-0">
                  <p className="label">
                    {cs.tag}
                    <span className="mx-2">·</span>
                    {cs.org}, {cs.timeframe}
                    {/* A badge, not a link: the whole panel is already an <a>.
                        Highlighted, because a live artefact is something the
                        reader can go and check. */}
                    {cs.link ? <span className="hl ms-2 normal-case tracking-normal">Live ↗</span> : null}
                  </p>
                  <h3 className="t-heading mt-3">{cs.title}</h3>
                </div>

                <div className="work-out min-w-0">
                  <p className="label">Outcome</p>
                  <p
                    className={`${
                      headline.value.length <= 7 ? "t-metric-sm" : "t-metric-xs"
                    } mt-1 break-words`}
                  >
                    {cs.verified ? <span className="hl">{headline.value}</span> : headline.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{headline.label}</p>
                </div>

                <span className="work-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
