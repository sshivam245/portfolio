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
 * A funnel. The site treats the visitor as a lead and walks them down it.
 * Paper stock, ultramarine colour blocks, and a warm signal yellow that
 * means "this stage is live". One theme only: the site is a campaign with a
 * fixed palette, not an app, and a dark mode was a second set of colours to
 * keep honest for no gain.
 *
 * The yellow is warm on purpose. The acid lime it replaced was the most
 * recognisable colour of the 2025 template landing page, and it made the
 * whole site read as generated.
 *
 * Token names are kept from earlier systems so the utilities used across
 * every page carry over:
 *
 *   --ink-a   ultramarine. Structure: links, focus, the blue blocks.
 *   --ink-b   signal yellow. The live stage, the highlighter, buttons on blue.
 *   --accent  ultramarine, used by the diagrams' highlight node.
 *   --block / --on-block   the blue colour-block sections and their text.
 *   --zap / --on-zap       the yellow block (the close) and its text.
 *
 * Inside a blue or yellow section the .tone-* classes in globals.css re-scope
 * --paper, --ink, --ink-a and friends.
 *
 * ── The one trap ───────────────────────────────────────────────────────────
 *
 * --ink-b is yellow: about 1.3:1 on paper. A fill, a highlight and a button
 * colour, never text on paper; `npm run tokens:check` enforces that by grep.
 */

/** Contrast against --paper, measured, not estimated. */
export const TOKENS = {
  light: {
    "--paper": "#fbf8f1", //            paper stock
    "--ink": "#15153a", //              deep ink                 16.1:1
    "--ink-muted": "#55556e", //                                  6.8:1
    "--rule": "#e2ddcf",
    "--ink-a": "#2424c8", //            ultramarine               9.2:1
    "--ink-b": "#ffd60a", //            signal yellow             1.3:1  see above
    "--accent": "#2424c8",
    "--grid": "rgba(36, 36, 200, 0.05)",
    "--block": "#2424c8", //            the blue sections
    "--on-block": "#fbf8f1", //         paper on ultramarine      9.2:1
    "--zap": "#ffd60a", //              the yellow close
    "--on-zap": "#15153a", //           ink on yellow            11.4:1
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
