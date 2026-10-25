/**
 * Builds one Open Graph image per page into public/og/.
 *
 * Every page used to share a single og.png, so every link posted to LinkedIn
 * rendered identically no matter which case study it pointed at. That is the
 * most-seen graphic on the whole project and it carried no information.
 *
 * Runs before `next build` (see the prebuild script), writes plain PNGs into
 * public/, and needs no network: the two faces are vendored in
 * scripts/og-fonts rather than fetched from Google at build time, so a build
 * on a plane produces the same bytes as a build on Vercel.
 *
 * Satori renders a JSX-ish tree to SVG, resvg rasterises it. Both are
 * build-time only and never ship to the browser.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");

// The content files are TypeScript, so this is run through tsx rather than
// duplicating titles and figures in a second place that can drift from them.
const { caseStudies } = await import("../src/content/caseStudies.ts");
const { profile, headlineMetrics } = await import("../src/content/profile.ts");

const display = fs.readFileSync(path.join(here, "og-fonts/Anton-Regular.ttf"));
const mono = fs.readFileSync(path.join(here, "og-fonts/IBMPlexMono-Medium.ttf"));

// The dark plates. OG previews sit on both light and dark chrome, and the
// dark card is the one that reads as this site rather than as a default.
//
// Same rule as the site: ACCENT is the overlap colour and marks the figure,
// which is the one thing on the card a reader can go and check.
// Imported, never copied: this block used to be a hand-kept second copy of
// the palette, and the figure SVGs were a third that had already drifted.
const { TOKENS } = await import("./tokens.mjs");
const PAPER = TOKENS.dark["--paper"];
const INK = TOKENS.dark["--ink"];
const MUTED = TOKENS.dark["--ink-muted"];
const ACCENT = TOKENS.dark["--accent"];
const RULE = TOKENS.dark["--rule"];
const INK_A = TOKENS.dark["--ink-a"];
const INK_B = TOKENS.dark["--ink-b"];
void INK_B;

const W = 1200;
const H = 630;

/** The hairline grid, as elements: satori supports no background-image. */
function grid() {
  const cell = 72;
  const lines = [];
  for (let x = cell; x < W; x += cell)
    lines.push({
      type: "div",
      props: { style: { position: "absolute", left: x, top: 0, width: 1, height: H, background: INK_A, opacity: 0.22 } },
    });
  for (let y = cell; y < H; y += cell)
    lines.push({
      type: "div",
      props: { style: { position: "absolute", left: 0, top: y, width: W, height: 1, background: INK_A, opacity: 0.22 } },
    });
  return lines;
}

/**
 * The four figures as a source row, which is what the homepage hero now is.
 *
 * The home card used to fall through to profile.statement here, and that
 * statement is the headline — so the most-shared graphic on the project
 * printed the same sentence twice, once at 92px and once at 20px, with 300px
 * of empty card between them. Carrying the evidence instead is the whole
 * argument of the page the card links to.
 */
function sources() {
  return {
    type: "div",
    props: {
      style: { display: "flex", gap: 44 },
      children: headlineMetrics.map((m) => ({
        type: "div",
        props: {
          style: { display: "flex", flexDirection: "column", maxWidth: 230 },
          children: [
            {
              type: "div",
              props: {
                style: {
                  fontFamily: "Anton",
                  fontSize: 58,
                  lineHeight: 1,
                  // Same rule as the site: the overlap marks the one figure
                  // a reader can confirm without taking our word for it.
                  color: m.verified ? ACCENT : INK,
                },
                children: `${m.value}${m.unit}`,
              },
            },
            {
              type: "div",
              props: {
                style: { fontSize: 17, color: MUTED, marginTop: 10, letterSpacing: 1 },
                children: m.label.toUpperCase(),
              },
            },
          ],
        },
      })),
    },
  };
}

function card({ kicker, title, metric, metricLabel, showSources }) {
  return {
    type: "div",
    props: {
      style: {
        width: W, height: H, boxSizing: "border-box", display: "flex",
        flexDirection: "column", justifyContent: "space-between",
        background: PAPER, color: INK,
        padding: "64px 72px", position: "relative", fontFamily: "IBM Plex Mono",
      },
      children: [
        {
          type: "div",
          props: {
            style: { position: "absolute", top: 0, left: 0, width: W, height: H, display: "flex" },
            children: grid(),
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", position: "relative" },
            children: [
              {
                type: "div",
                props: {
                  style: { fontSize: 20, letterSpacing: 2.4, textTransform: "uppercase", color: MUTED },
                  children: kicker,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    /*
                     * Anton is condensed, so it fits more per line than the
                     * serif did and the breakpoints move with it. Three
                     * steps, not two: at a single threshold a 29-character
                     * title took the 92px branch, wrapped "AI / Overview"
                     * across two lines and left one word alone on the second.
                     *
                     * maxWidth is the full content measure (1200 less the
                     * 72px gutters). It was 1000, which threw away 56px and
                     * caused exactly that break.
                     *
                     * lineHeight 1.02, not 0.96: the site's hero is set once
                     * and checked, but these titles come from content and
                     * wrap where they land. At 0.96 the descender of "by"
                     * sat on the cap-height of the line beneath it.
                     */
                    fontFamily: "Anton",
                    fontSize: title.length > 52 ? 72 : title.length > 26 ? 80 : 92,
                    lineHeight: 1.02, marginTop: 28, maxWidth: 1056, color: INK,
                  },
                  children: title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative" },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: metric
                    ? [
                        { type: "div", props: { style: { fontFamily: "Anton", fontSize: 72, color: ACCENT, lineHeight: 1 }, children: metric } },
                        { type: "div", props: { style: { fontSize: 20, color: MUTED, marginTop: 12, maxWidth: 620 }, children: metricLabel } },
                      ]
                    : showSources
                      ? [sources()]
                      : [{ type: "div", props: { style: { fontSize: 20, color: MUTED }, children: profile.statement.slice(0, 92) } }],
                },
              },
              {
                type: "div",
                props: {
                  style: { fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: MUTED },
                  children: "shivamgoel.vercel.app",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function render(spec, file) {
  const svg = await satori(card(spec), {
    width: W, height: H,
    fonts: [
      { name: "Anton", data: display, weight: 400, style: "normal" },
      { name: "IBM Plex Mono", data: mono, weight: 500, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
  fs.writeFileSync(file, png);
  return png.length;
}

const outDir = path.join(root, "public/og");
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  {
    file: "home.png",
    kicker: `${profile.role} · ${profile.location}`,
    title: "I build acquisition engines, and the automation underneath them.",
    metric: null,
    showSources: true,
  },
  ...caseStudies.map((cs) => ({
    file: `work-${cs.id}.png`,
    kicker: `${cs.tag} · ${cs.org}, ${cs.timeframe}`,
    title: cs.title,
    metric: cs.outcomes[0]?.value,
    metricLabel: cs.outcomes[0]?.label,
  })),
  {
    file: "tools-agent-fit.png",
    kicker: "Free tool · Runs in your browser",
    title: "Which GTM agent is worth building?",
    metric: "5",
    metricLabel: "questions, no email, no server",
  },
  {
    file: "tools-aeo-audit.png",
    kicker: "Free · Back within a day",
    title: "What can an answer engine actually do with your site?",
    metric: "23",
    metricLabel: "checks, written by a person",
  },
];

let total = 0;
for (const p of pages) {
  const bytes = await render(p, path.join(outDir, p.file));
  total += bytes;
  console.log(`  ${p.file.padEnd(28)} ${(bytes / 1024).toFixed(0)}kb`);
}
console.log(`\n  ${pages.length} images, ${(total / 1024).toFixed(0)}kb total`);
