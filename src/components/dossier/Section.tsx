import Reveal from "./Reveal";

/**
 * Every section is separated by a hairline rule and introduced by a mono
 * index. Structure is the decoration.
 *
 * The index is bracketed — "[02] SELECTED WORK" — because the hero's
 * citations are, and a number in square brackets on the blue plate is now
 * this site's one notation for "a thing you can go to". Making the section
 * indices read the same way is what carries the hero's grammar down the
 * page instead of leaving it as a trick played once at the top.
 */
export default function Section({
  id,
  index,
  title,
  aside,
  children,
}: {
  id: string;
  index: string;
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rule-t">
      <div className="shell py-14 sm:py-20">
        <Reveal>
          <header className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="label">
              {/* aria-hidden: the brackets are notation, and a screen reader
                  announcing "left bracket zero two right bracket" before
                  every section heading is noise, not structure. */}
              <span className="text-ink-a tnum" aria-hidden>
                [{index}]
              </span>
              <span className="ms-2">{title}</span>
            </h2>
            {aside ? <div className="label">{aside}</div> : null}
          </header>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
