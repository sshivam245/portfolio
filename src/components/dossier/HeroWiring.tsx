/**
 * The claim, wired into the proof.
 *
 * The hero was a stack of blocks: headline, standfirst, button, a row of
 * figures, a row of logos. Correct, aligned, and the same arrangement every
 * portfolio uses. Nothing about it said what this person does.
 *
 * So the hero is a diagram now. A bus leaves the headline and drops an arrow
 * into each outcome, in the connector-and-arrowhead grammar the case study
 * diagrams already use, which makes the first thing on the page an instance
 * of the thing the page is claiming. "I build acquisition engines" and then
 * four arrows into what came out of them.
 *
 * Built from the same grid as the figures rather than an SVG with hard-coded
 * percentages, so the drops stay centred under their columns at every width
 * without a viewBox to keep in sync.
 *
 * Decoration in the strict sense: it carries no information the figures below
 * do not, so it is aria-hidden, and it is hidden below lg where the figures
 * are two columns and a four-way fan would be a lie about the layout.
 */
export default function HeroWiring() {
  return (
    <div
      aria-hidden
      className="hero-wire mt-10 hidden grid-cols-4 gap-x-6 lg:grid"
    >
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="hero-wire-cell">
          <span className="hero-wire-drop" />
          <span className="hero-wire-head" />
        </div>
      ))}
    </div>
  );
}
