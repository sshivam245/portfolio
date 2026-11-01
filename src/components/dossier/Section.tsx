import Reveal from "./Reveal";

export type Tone = "stone" | "ink" | "signal";

/**
 * A colour block with a plain headline and an optional small marker.
 *
 * Sections used to open on a filled pill and a jokey headline each
 * ("Touchpoint 2 · Try before you buy"). Repeated down a page, that is the
 * signature of a generated landing page. The joke lives in the hero now;
 * everything below it says plainly what it is.
 *
 * Only three tones: stone (most of the page), ink (the work and the
 * footer) and signal (the close). Eight colour changes down one page read
 * as a slide deck, so most sections are stone, separated by a rule.
 *
 * The tone class re-scopes the colour tokens, so nothing inside needs to
 * know which block it is in.
 */
export default function Section({
  id,
  tag,
  title,
  lede,
  aside,
  tone = "stone",
  children,
}: {
  id: string;
  tag?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
  tone?: Tone;
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "ink" ? "tone-ink" : tone === "signal" ? "tone-signal" : "tone-stone";

  return (
    <section id={id} className={toneClass}>
      <div className="shell py-16 sm:py-24">
        <Reveal>
          <header className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 sm:mb-14">
            <div className="min-w-0">
              {tag ? <p className="stage-tag">{tag}</p> : null}
              <h2 className={`t-title max-w-[20ch] ${tag ? "mt-4" : ""}`}>{title}</h2>
              {lede ? (
                <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
                  {lede}
                </p>
              ) : null}
            </div>
            {aside ? <div className="text-base font-bold">{aside}</div> : null}
          </header>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
