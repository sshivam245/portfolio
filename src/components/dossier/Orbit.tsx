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
}: {
  logos: Logo[];
  radiusVar: string;
  spinClass: string;
}) {
  return (
    <div className={`orbit-ring ${spinClass}`} aria-hidden>
      {logos.map((logo, i) => (
        <span
          key={logo.label}
          className="orbit-slot"
          style={
            {
              "--i": i,
              "--n": logos.length,
              "--r": `var(${radiusVar})`,
            } as React.CSSProperties
          }
        >
          {/* Both this slot's rotation and the chip's counter-rotation are
              computed from the same inherited --orbit-a, so they cancel
              exactly on every frame. See the note in globals.css. */}
          <span className="orbit-upright">
            <LogoChip logo={logo} />
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
      {/* Monogram only. The "Growth & GTM" label that used to sit under it
          repeated the masthead meta line a few hundred pixels above. */}
      <div className="orbit-centre">
        <span className="t-title">SG</span>
      </div>

      <Ring logos={orgLogos} radiusVar="--orbit-r-inner" spinClass="orbit-spin" />
      <Ring logos={toolLogos} radiusVar="--orbit-r-outer" spinClass="orbit-spin-rev" />

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
