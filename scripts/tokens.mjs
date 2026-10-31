/**
 * The palette. One source, four consumers.
 *
 * Before this file the palette existed in three places — the :root block in
 * globals.css, a hand-copied block in og.mjs, and a <style> block inside
 * each of the seven figure SVGs — and two of them had already drifted. The
 * SVGs were still carrying the palette from two design systems ago; it was
 * invisible only because the .diagram rules in globals.css override them by
 * specificity on the inlined path, and nobody had looked at the <img> path.
 *
 * So nothing downstream holds a colour literal any more. `npm run tokens`
 * writes these values into globals.css and into every figure SVG, og.mjs
 * imports them directly, and `npm run tokens:check` fails the build if any
 * consumer has drifted.
 *
 * ── The world ──────────────────────────────────────────────────────────────
 *
 * A funnel. The site treats the visitor as a lead and walks them down it, so
 * the palette is the palette of a campaign rather than of documentation:
 * one saturated ultramarine field, cream stock, and an acid yellow that
 * means "this stage is live". Sections are colour blocks, not hairlines.
 *
 * Token names are kept from the previous system so the utilities used across
 * every page carry over; what they mean changed:
 *
 *   --ink-a   ultramarine. Structure: links, focus, indices, the blue blocks.
 *   --ink-b   acid yellow. The live stage, highlights, the primary button.
 *   --accent  ultramarine-on-stock, used by the diagrams' highlight node.
 *             Verification is marked with the .hl highlighter, not a colour.
 *   --block / --on-block   the blue colour-block sections and their text.
 *   --zap / --on-zap       the yellow block (the close) and its text.
 *
 * Inside a blue or yellow section the .tone-* classes in globals.css re-scope
 * --paper, --ink, --ink-a and friends, so every component inherits the right
 * colours without knowing which block it sits in.
 *
 * ── The one trap ───────────────────────────────────────────────────────────
 *
 * --ink-b is acid yellow: 1.1:1 on cream stock. It is a fill, a highlight
 * and a button colour on light. It is never text in light mode, and
 * `npm run tokens:check` enforces that by grep.
 */

/** Contrast against that theme's --paper, measured, not estimated. */
export const TOKENS = {
  light: {
    "--paper": "#fff6e0", //            cream stock
    "--ink": "#0d0d6b", //              navy                     15.0:1
    "--ink-muted": "#4b4b85", //                                  7.3:1
    "--rule": "#dcd2b6",
    "--ink-a": "#1f1fd1", //            ultramarine               8.9:1
    "--ink-b": "#e4ff3c", //            acid yellow               1.1:1  see above
    "--accent": "#1f1fd1",
    "--grid": "rgba(31, 31, 209, 0.06)",
    "--block": "#1f1fd1", //            the blue sections
    "--on-block": "#fff6e0", //         cream on ultramarine      8.9:1
    "--zap": "#e4ff3c", //              the yellow close
    "--on-zap": "#0d0d6b", //           navy on yellow           14.1:1
  },
  dark: {
    "--paper": "#0b0b2c", //            night navy stock
    "--ink": "#fff6e0", //                                       17.5:1
    "--ink-muted": "#b9b6dc", //                                 10.1:1
    "--rule": "#26265a",
    "--ink-a": "#9e9eff", //            ultramarine lifted        8.1:1
    "--ink-b": "#e4ff3c", //            readable as text here    16.4:1
    "--accent": "#9e9eff",
    "--grid": "rgba(158, 158, 255, 0.06)",
    "--block": "#1f1fd1", //            blocks stay brand blue in both themes
    "--on-block": "#fff6e0",
    "--zap": "#e4ff3c",
    "--on-zap": "#0d0d6b",
  },
};

export const SVG_CLASSES = (t) => ({
  ".ink": `fill: ${t["--ink"]};`,
  ".muted": `fill: ${t["--ink-muted"]};`,
  ".accf": `fill: ${t["--accent"]};`,
  ".acc": `stroke: ${t["--accent"]};`,
  ".box": `fill: none; stroke: ${t["--ink-muted"]}; stroke-width: 1;`,
  ".rule": `stroke: ${t["--ink-muted"]};`,
});
