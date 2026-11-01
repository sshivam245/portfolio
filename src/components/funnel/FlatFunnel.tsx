/**
 * The funnel drawn flat, for anything that cannot or should not run WebGL.
 *
 * It is also what renders first. The 3D scene crossfades in over it once
 * three.js has loaded, so the hero is never an empty box while a 150kB
 * library arrives, and if that never happens — no WebGL, a blocked script,
 * JS off — this simply stays.
 */
const BANDS = [
  "20,20 380,20 330,120 70,120",
  "70,128 330,128 285,228 115,228",
  "115,236 285,236 245,336 155,336",
  "155,344 245,344 225,430 175,430",
];
const LABEL_Y = [62, 170, 278, 382];
const YOU_Y = [95, 203, 311, 405];

export default function FlatFunnel({
  stage,
  names,
}: {
  stage: number;
  names: string[];
}) {
  return (
    <svg
      viewBox="0 0 400 450"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {BANDS.map((pts, i) => (
        <polygon
          key={pts}
          points={pts}
          className={`flat-band${i === stage ? " on" : i < stage ? " done" : ""}`}
        />
      ))}
      {names.map((n, i) => (
        <text
          key={n}
          x="200"
          y={LABEL_Y[i]}
          className={`flat-label${i === stage ? " on" : ""}`}
        >
          {/* The narrow last band only fits a short word. */}
          {i === 3 ? "Call" : n}
        </text>
      ))}
      <g
        className="flat-you"
        style={{ transform: `translate(200px, ${YOU_Y[stage]}px)` }}
      >
        <circle r="8" />
        <text x="16" y="4">You</text>
      </g>
    </svg>
  );
}
