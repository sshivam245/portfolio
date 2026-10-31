import Reveal from "./Reveal";

export type Tone = "cream" | "blue" | "zap";

/**
 * A colour block with a funnel tag and a real headline.
 *
 * The old sections were introduced by a monospace index — "[02] SELECTED
 * WORK" — which is how documentation introduces a section. This is a
 * campaign page, so each block gets a stage tag ("Touchpoint 1 · The work")
 * and a headline that says something, and the page alternates cream and
 * ultramarine instead of separating identical white sections with hairlines.
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
  tone = "cream",
  children,
}: {
  id: string;
  tag: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
  tone?: Tone;
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "blue" ? "tone-blue" : tone === "zap" ? "tone-zap" : "tone-cream";

  return (
    <section id={id} className={toneClass}>
      <div className="shell py-16 sm:py-24">
        <Reveal>
          <header className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 sm:mb-14">
            <div className="min-w-0">
              <p className="stage-tag">{tag}</p>
              <h2 className="t-title mt-5 max-w-[18ch]">{title}</h2>
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
