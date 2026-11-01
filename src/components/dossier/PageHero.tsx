import Link from "next/link";

/**
 * How every inner page opens: a large headline on stone, ruled off from the
 * page below. It was a full colour band; with one on every page and more
 * underneath, the site read as a slide deck.
 */
export default function PageHero({
  back,
  kicker,
  title,
  lede,
  children,
}: {
  back?: { href: string; label: string };
  kicker?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="tone-stone border-b">
      <div className="shell pb-14 pt-10 sm:pb-20 sm:pt-12">
        {back ? (
          <Link href={back.href} className="label-tap text-sm font-bold text-ink-muted transition-colors hover:text-ink">
            ← {back.label}
          </Link>
        ) : null}
        {kicker ? (
          <p className={`stage-tag ${back ? "mt-10" : ""}`}>{kicker}</p>
        ) : null}
        <h1 className="t-display mt-5 max-w-[18ch]">{title}</h1>
        {lede ? (
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-muted sm:text-xl">{lede}</p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
