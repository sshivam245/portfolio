import type { BuildStep } from "@/content/caseStudies";

/**
 * "What I built", drawn as a sequence rather than printed as bullets.
 *
 * These lists were always a sequence wearing prose: every item named a thing
 * and then spent a clause justifying it, six times, at about 160 characters
 * each. Split into a step and a detail line and hung off a spine, the same
 * content scans in a glance and reads as the build it describes.
 *
 * Still real text, deliberately. The temptation with "less text, more
 * graphics" is to render copy into an image, which would make the most
 * substantive writing on the site invisible to exactly the retrieval systems
 * the Cloudsheer case study is about.
 */
export default function BuildFlow({ steps }: { steps: BuildStep[] }) {
  return (
    <ol className="build-flow sm:pl-14">
      {steps.map((b, i) => (
        <li key={b.step} className="relative py-4">
          <span aria-hidden className="build-node tnum hidden sm:grid">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-body text-ink">
            {/* The number returns inline once the gutter is gone. */}
            <span className="tnum mr-3 text-ink-muted sm:hidden">
              {String(i + 1).padStart(2, "0")}
            </span>
            {b.step}
          </p>
          {b.detail ? (
            <p className="mt-1.5 max-w-prose font-mono text-small text-ink-muted">
              {b.detail}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
