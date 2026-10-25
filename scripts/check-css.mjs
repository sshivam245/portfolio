/**
 * Asserts every colour utility used in src/ survived into the compiled CSS.
 *
 * This exists because the alpha() helper in tailwind.config.ts has silently
 * dropped utilities twice, and silently is the whole problem: a missing
 * colour utility is not a build error, it is a rule that compiles to nothing.
 * The sticky header shipped with `bg-paper/95` resolving to no background at
 * all, so page content scrolled through the nav, and nobody noticed because
 * nothing failed. Three more were dead at the same time.
 *
 * Runs after `next build` (see the postbuild script). A utility counts as
 * present if the CSS carries its class name, with or without a variant
 * prefix — `focus:bg-paper` compiles to `.focus\:bg-paper:focus`, so a
 * naive search for `.bg-paper` reports a false failure.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cssDir = path.join(root, "out/_next/static/css");

if (!fs.existsSync(cssDir)) {
  console.error("check-css: no out/_next/static/css — run next build first");
  process.exit(1);
}
const css = fs
  .readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => fs.readFileSync(path.join(cssDir, f), "utf8"))
  .join("\n");

// Longest first: with `ink` ahead of `ink-muted` the alternation matches
// `text-ink` inside `text-ink-muted` and the longer utility is never checked.
const TOKEN = "(?:ink-muted|ink-a|ink-b|paper|ink|accent|rule)";
const PROP = "(?:text|bg|border|fill|stroke|ring|decoration|divide|outline|caret|accent)";
// An opacity modifier is either /NN or /[0.NN].
// The trailing (?!-) stops `text-ink` matching the head of a longer token
// that this list does not cover.
const UTIL = new RegExp(
  // The tail is (?![\w-]), not \b: an arbitrary-value modifier ends in `]`,
  // and \b cannot match between `]` and the quote that follows it, so a
  // trailing \b silently skipped every text-ink/[0.09]-shaped utility.
  `\\b(${PROP}-${TOKEN}(?!-)(?:\\/(?:\\[[\\d.]+\\]|\\d{1,3}))?)(?![\\w-])`,
  "g",
);

const used = new Map(); // utility -> first file:line that uses it
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(e.name)) {
      fs.readFileSync(p, "utf8")
        .split("\n")
        .forEach((line, i) => {
          // Skip comment lines: globals.css and several components discuss
          // utility names in prose, and a mentioned name is not a used one.
          if (/^\s*(\*|\/\/|\/\*)/.test(line)) return;
          for (const m of line.matchAll(UTIL))
            if (!used.has(m[1]))
              used.set(m[1], `${path.relative(root, p)}:${i + 1}`);
        });
    }
  }
};
walk(path.join(root, "src"));

/*
 * Two escapes, in order, because one is not enough and collapsing them is
 * how this check quietly passed everything.
 *
 *   1. CSS escape — Tailwind writes `text-ink/[0.09]` as the selector
 *      `.text-ink\/\[0\.09\]`, backslash before each of / [ ] .
 *   2. Regex escape — that literal then has to be matched, and an
 *      unescaped `[` in the pattern opens a character class instead of
 *      matching a bracket. The first version emitted `\\[0\\.09\\]`,
 *      which parsed as "a backslash, then one of 0 \ . 9", matched
 *      nothing, and reported a live utility as dead.
 *
 * A variant prefix keeps the class name intact but moves the dot, so
 * `focus:bg-paper` is `.focus\:bg-paper:focus` — hence the (?:\.|\\:)
 * opener rather than a bare dot.
 */
const cssEscape = (u) => u.replace(/[/[\].]/g, (c) => "\\" + c);
const reEscape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const selector = (u) =>
  new RegExp(`(?:\\.|\\\\:)${reEscape(cssEscape(u))}(?=[\\s,{:>]|\\\\:)`);

const missing = [...used].filter(([u]) => !selector(u).test(css));

/*
 * Presence is only half the check, which the first version of this script
 * got wrong. alpha() has failed two different ways:
 *
 *   bare var(--x) with no <alpha-value> slot   Tailwind DROPS the rule, so
 *                                              the selector goes missing
 *   Number("var(--tw-text-opacity)") -> NaN    the rule is emitted with
 *                                              `NaN%`, which computes to
 *                                              transparent
 *
 * The second kind passes a selector-presence test cleanly, so a value
 * sweep runs too. Nothing legitimate in this stylesheet contains NaN, an
 * undefined, or an empty var().
 */
const bad = [
  ...css.matchAll(/([.#\[][^{}]{0,120}?)\{([^{}]*(?:NaN|undefined|var\(\s*\))[^{}]*)\}/g),
].map((m) => `${m[1].trim()} { ${m[2].trim()} }`);

console.log(
  `check-css: ${used.size} colour utilities, ${(css.length / 1024) | 0}kB of CSS`,
);
let failed = false;
if (missing.length) {
  console.error(
    "check-css: these compiled to NOTHING — see alpha() in tailwind.config.ts\n" +
      missing.map(([u, where]) => `  ${u}   (${where})`).join("\n"),
  );
  failed = true;
}
if (bad.length) {
  console.error(
    `check-css: ${bad.length} rule(s) compiled to an unusable value — see alpha()\n` +
      [...new Set(bad)].slice(0, 12).map((b) => `  ${b}`).join("\n"),
  );
  failed = true;
}
if (failed) process.exit(1);
console.log(`check-css: all present, ${(css.match(/\{/g) ?? []).length} rules clean`);
