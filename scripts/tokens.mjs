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
 * Two spot inks on uncoated stock, printed slightly out of register. The
 * third colour is not chosen: --accent is what --ink-a and --ink-b do where
 * they overlap, which is why it means one specific thing on this site and
 * must not be spent on anything else. See DESIGN.md.
 *
 * ── The one trap ───────────────────────────────────────────────────────────
 *
 * --ink-b is 2.8:1 on light stock. That is a real fluorescent ink and it is
 * genuinely unreadable at text sizes on cream, exactly as it would be in
 * print. It is a plate, a fill and a rule colour. It is never small text in
 * light mode, and `npm run tokens:check` enforces that by grep.
 */

/** Contrast against that theme's --paper, measured, not estimated. */
export const TOKENS = {
  light: {
    "--paper": "#efe9dd", //            uncoated stock, warm
    "--ink": "#16161a", //              soot                     14.6:1
    "--ink-muted": "#5a5460", //        soot, let down            6.1:1
    "--rule": "#cdc4b2", //             a pressed hairline
    "--ink-a": "#1b30f0", //            plate A, blue             6.4:1
    "--ink-b": "#ff3d8f", //            plate B, fluoro pink      2.8:1  see above
    "--accent": "#6b1f9e", //           A over B: the overlap     7.6:1
    "--grid": "rgba(27, 48, 240, 0.05)", // dot screen, plate A
  },
  dark: {
    "--paper": "#15131a", //            dark stock, violet cast
    "--ink": "#f0ecf5", //                                       16.9:1
    "--ink-muted": "#9a93a8", //                                  6.3:1
    "--rule": "#2e2838",
    "--ink-a": "#6b78ff", //            fluoro inks lift on dark  5.1:1
    "--ink-b": "#ff5fa2", //            safe for text here        6.6:1
    "--accent": "#b47de8", //                                     6.3:1
    "--grid": "rgba(255, 95, 162, 0.045)",
  },
};

/**
 * The figure SVGs' class names, mapped to the tokens they draw from. These
 * are the same six classes globals.css overrides for the inlined path; the
 * generated block is what the <img> path and a standalone open both use.
 */
export const SVG_CLASSES = (t) => ({
  ".ink": `fill: ${t["--ink"]};`,
  ".muted": `fill: ${t["--ink-muted"]};`,
  ".accf": `fill: ${t["--accent"]};`,
  ".acc": `stroke: ${t["--accent"]};`,
  ".box": `fill: none; stroke: ${t["--rule"]}; stroke-width: 1;`,
  ".rule": `stroke: ${t["--rule"]};`,
});
