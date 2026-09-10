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
            <li key={cs.id}>
              <Link
                href={`/work/${cs.id}`}
                className="group grid items-baseline gap-x-6 gap-y-3 rule-b py-7 sm:grid-cols-12"
              >
                <p className="label sm:col-span-12">
                  <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2 text-accent">·</span>
                  {cs.tag}
                  <span className="mx-2">·</span>
                  {cs.org}, {cs.timeframe}
                </p>

                <div className="sm:col-span-7">
                  <h3 className="font-display text-[1.75rem] font-normal leading-[1.1] tracking-[-0.015em] transition-colors duration-150 group-hover:text-accent sm:text-[2.125rem]">
                    {cs.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-small text-ink-muted">
                    {cs.summary}
                  </p>
                </div>

                <div className="flex items-baseline gap-4 sm:col-span-5 sm:justify-end">
                  <span className="tnum font-mono text-[2rem] font-medium leading-none text-accent">
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
                    className="h-px w-6 bg-accent transition-all duration-200 group-hover:w-12"
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
