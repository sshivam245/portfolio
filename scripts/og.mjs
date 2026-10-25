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
const { profile } = await import("../src/content/profile.ts");

const serif = fs.readFileSync(path.join(here, "og-fonts/InstrumentSerif-Regular.ttf"));
const mono = fs.readFileSync(path.join(here, "og-fonts/IBMPlexMono-Medium.ttf"));

// The dark plates. OG previews sit on both light and dark chrome, and the
// dark card is the one that reads as this site rather than as a default.
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
void INK_A; void INK_B;

const W = 1200;
const H = 630;

/** The hairline grid, as elements: satori supports no background-image. */
function grid() {
  const cell = 72;
  const lines = [];
  for (let x = cell; x < W; x += cell)
    lines.push({
      type: "div",
      props: { style: { position: "absolute", left: x, top: 0, width: 1, height: H, background: RULE, opacity: 0.55 } },
    });
  for (let y = cell; y < H; y += cell)
    lines.push({
      type: "div",
      props: { style: { position: "absolute", left: 0, top: y, width: W, height: 1, background: RULE, opacity: 0.55 } },
    });
  return lines;
}

function card({ kicker, title, metric, metricLabel }) {
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
                    fontFamily: "Instrument Serif", fontSize: title.length > 44 ? 68 : 84,
                    lineHeight: 1.04, marginTop: 28, maxWidth: 960, color: INK,
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
                        { type: "div", props: { style: { fontSize: 56, color: ACCENT, lineHeight: 1 }, children: metric } },
                        { type: "div", props: { style: { fontSize: 20, color: MUTED, marginTop: 12, maxWidth: 620 }, children: metricLabel } },
                      ]
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
      { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
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
