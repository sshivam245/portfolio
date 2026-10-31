import type { BuildStep } from "@/content/caseStudies";

/**
 * "What I built", as numbered steps.
 *
 * It used to hang off a spine with square nodes, the same systems-diagram
 * grammar as the old work index. The numbers are bubbles now and there is
 * no spine: a sequence does not need a drawn line to read as one.
 *
 * Still real text, deliberately: copy rendered into an image would be
 * invisible to exactly the retrieval systems the AEO case study is about.
 */
export default function BuildFlow({ steps }: { steps: BuildStep[] }) {
  return (
    <ol className="grid gap-5">
      {steps.map((b, i) => (
        <li key={b.step} className="flex min-w-0 gap-4">
          <span aria-hidden className="work-n tnum !h-9 !w-9 shrink-0 !text-sm">
            {i + 1}
          </span>
          <div className="min-w-0 pt-1.5">
            <p className="text-base font-bold leading-snug">{b.step}</p>
            {b.detail ? (
              <p className="mt-1 max-w-prose text-base leading-relaxed text-ink-muted">{b.detail}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
