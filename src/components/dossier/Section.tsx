import Reveal from "./Reveal";

/**
 * Every section is separated by a hairline rule and introduced by a mono
 * index — "01 — SELECTED WORK". Structure is the decoration.
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
              <span className="text-accent tnum">{index}</span>
              <span className="mx-2">—</span>
              {title}
            </h2>
            {aside ? <div className="label">{aside}</div> : null}
          </header>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
