import { headlineMetrics } from "@/content/profile";
import Marks from "./Marks";

/**
 * The whole funnel at a glance, for the reader who will not press a button.
 *
 * The hero shows one result per stage, which rewards curiosity and punishes
 * scanning: someone who never clicks sees only the first figure. This band
 * puts all four in a row straight underneath, in the stats-bar-and-logo-wall
 * shape every campaign page uses, because that shape is how a hiring manager
 * expects to find numbers.
 */
export default function StatsBand() {
  return (
    <section aria-label="Results at a glance" className="tone-cream">
      <div className="shell py-12 sm:py-16">
        <p className="label">The funnel&apos;s numbers, all at once</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {headlineMetrics.map((m) => (
            <div key={m.label} className="min-w-0">
              <dt className="sr-only">{m.label}</dt>
              <dd className="t-metric break-words">
                {m.verified ? (
                  <span className="hl">
                    {m.value}
                    {m.unit}
                  </span>
                ) : (
                  <>
                    {m.value}
                    {m.unit}
                  </>
                )}
              </dd>
              {/* Shown, not sr-only: the dt above is for assistive tech, this
                  is the same label for everyone else, plus its context. */}
              <dd className="mt-3 text-base font-bold" aria-hidden="true">
                {m.label}
              </dd>
              <dd className="mt-1 text-sm text-ink-muted">{m.note}</dd>
            </div>
          ))}
        </dl>
        <Marks />
      </div>
    </section>
  );
}
