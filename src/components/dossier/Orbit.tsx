import { orgLogos, toolLogos, type Logo } from "@/content/logos";
import LogoChip from "./LogoChip";

/**
 * A monogram at the centre, companies on an inner ring and tools on an outer
 * ring, both slowly revolving in opposite directions.
 *
 * Each ring rotates; each chip counter-rotates at the same duration so the
 * logos stay upright rather than tumbling. Hovering anywhere pauses both
 * rings so the marks can actually be read, and `prefers-reduced-motion`
 * stops them entirely (the layout is static and still correct).
 *
 * The soft radial glow originally hid the matted edge of a cut-out portrait.
 * The portrait is gone, but the glow stays — it gives the rings something to
 * sit on so the centre reads as a focal point rather than a hole.
 */
function Ring({
  logos,
  radiusVar,
  spinClass,
  counterClass,
}: {
  logos: Logo[];
  radiusVar: string;
  spinClass: string;
  counterClass: string;
}) {
  return (
    <div className={`orbit-ring ${spinClass}`} aria-hidden>
      {logos.map((logo, i) => (
        <span
          key={logo.file}
          className="orbit-slot"
          style={
            {
              "--i": i,
              "--n": logos.length,
              "--r": `var(${radiusVar})`,
            } as React.CSSProperties
          }
        >
          {/* Two nested spans on purpose: the static per-index rotation and
              the animated counter-spin both write `transform`, so they cannot
              share an element or the animation wins and the chips tumble. */}
          <span className="orbit-upright">
            <span className={counterClass}>
              <LogoChip logo={logo} />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Orbit() {
  return (
    <div className="orbit-wrap">
      {/* Guide circles — hairlines, same grammar as the section rules. */}
      <span aria-hidden className="orbit-guide orbit-guide-inner" />
      <span aria-hidden className="orbit-guide orbit-guide-outer" />

      {/* Warm glow behind the subject. */}
      <span aria-hidden className="orbit-glow" />

      {/* Centre. The portrait used to sit here; a monogram keeps the rings
          anchored so the middle doesn't read as an empty hole. */}
      <div className="orbit-centre">
        <span className="font-display text-[2.75rem] leading-none tracking-[-0.02em] sm:text-[3.5rem]">
          SG
        </span>
        <span className="label mt-2 block">Growth &amp; GTM</span>
      </div>

      <Ring
        logos={orgLogos}
        radiusVar="--orbit-r-inner"
        spinClass="orbit-spin"
        counterClass="orbit-counter"
      />
      <Ring
        logos={toolLogos}
        radiusVar="--orbit-r-outer"
        spinClass="orbit-spin-rev"
        counterClass="orbit-counter-rev"
      />

      {/* The rings are decorative duplicates of content stated elsewhere, so
          they are aria-hidden. This keeps the same facts available to a
          screen reader. */}
      <p className="sr-only">
        Previously at {orgLogos.map((l) => l.label).join(", ")}. Works with{" "}
        {toolLogos.map((l) => l.label).join(", ")}.
      </p>
    </div>
  );
}
