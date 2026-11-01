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
 * A design studio's stone-and-ink sheet with one signal orange. The funnel is
 * still the idea (the site treats the visitor as a lead and walks them down
 * it), but it is drawn in fine linework, the way a studio would draw it on a
 * presentation board, not as a toy. One theme only.
 *
 * It replaced ultramarine and lemon yellow, which read as a children's
 * product: primary blue with primary yellow is the palette of toys.
 *
 * Token names are kept from earlier systems so the utilities used across
 * every page carry over:
 *
 *   --ink-a   burnt orange, dark enough for text on stone (5.2:1). Links,
 *             index numbers, the small accents.
 *   --ink-b   signal orange. Fills only: YOU, the live stage, the underline
 *             marker, the button hover. 3.1:1 on stone, so never text there.
 *   --accent  burnt orange, used by the diagrams' highlight node.
 *   --block / --on-block   the ink sections (work, footer) and their text.
 *   --zap / --on-zap       the signal-orange close and its text.
 *
 * Inside an ink or signal section the .tone-* classes in globals.css
 * re-scope --paper, --ink, --ink-a and friends.
 *
 * ── The one trap ───────────────────────────────────────────────────────────
 *
 * --ink-b is 3.1:1 on stone. A fill, a marker and a hover colour, never text
 * on paper; `npm run tokens:check` enforces that by grep.
 */

/** Contrast against --paper, measured, not estimated. */
export const TOKENS = {
  light: {
    "--paper": "#ebe8e1", //            stone
    "--ink": "#121212", //              ink                      15.3:1
    "--ink-muted": "#57544d", //                                  6.2:1
    "--rule": "#d4d0c6",
    "--ink-a": "#a83a10", //            burnt orange              5.2:1
    "--ink-b": "#e5532d", //            signal orange             3.1:1  see above
    "--accent": "#a83a10",
    "--grid": "rgba(18, 18, 18, 0.05)",
    "--block": "#121212", //            the ink sections
    "--on-block": "#ebe8e1", //         stone on ink             15.3:1
    "--zap": "#e5532d", //              the signal close
    "--on-zap": "#121212", //           ink on signal             5.0:1
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
