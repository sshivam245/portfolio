import { asset } from "@/lib/basePath";
import { orgLogos, toolLogos, type Logo } from "@/content/logos";
import LogoChip from "./LogoChip";

/**
 * Portrait at the centre, companies on an inner ring and tools on an outer
 * ring, both slowly revolving in opposite directions.
 *
 * Each ring rotates; each chip counter-rotates at the same duration so the
 * logos stay upright rather than tumbling. Hovering anywhere pauses both
 * rings so the marks can actually be read, and `prefers-reduced-motion`
 * stops them entirely (the layout is static and still correct).
 *
 * The soft radial glow behind the portrait is doing real work: the cutout
 * was matted from a light studio backdrop and fine curly hair keeps a faint
 * edge, which is invisible against a glow but obvious against flat black.
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

      <div className="orbit-portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/portrait-cutout.png")}
          alt="Shivam Goel"
          className="h-full w-full object-contain object-bottom"
        />
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
