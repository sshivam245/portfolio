import Link from "next/link";

/**
 * The blue band every inner page opens with, so a case study or the about
 * page reads as part of the same campaign as the homepage rather than as a
 * plain document that happens to share a header.
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
    <header className="tone-blue">
      <div className="shell pb-14 pt-10 sm:pb-20 sm:pt-12">
        {back ? (
          <Link href={back.href} className="label-tap text-sm font-bold text-ink-muted transition-colors hover:text-ink">
            ← {back.label}
          </Link>
        ) : null}
        {/* Its own block: .kicker is inline-block, so beside an inline back
            link it shared the line and the two collided. */}
        {kicker ? (
          <div className={back ? "mt-8" : ""}>
            <p className="kicker">{kicker}</p>
          </div>
        ) : null}
        <h1 className="t-display mt-6 max-w-[16ch]">{title}</h1>
        {lede ? (
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed sm:text-xl">{lede}</p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
