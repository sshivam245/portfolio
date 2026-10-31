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

const heavy = fs.readFileSync(path.join(here, "og-fonts/BricolageGrotesque-800.ttf"));
const regular = fs.readFileSync(path.join(here, "og-fonts/BricolageGrotesque-500.ttf"));

// The funnel's blue block. OG previews sit on both light and dark chrome, and
// a saturated ultramarine card reads as this site on either. The yellow is the
// same "this stage is live" yellow, and marks the one figure a reader can go
// and check. Imported, never copied.
const { TOKENS } = await import("./tokens.mjs");
const PAPER = TOKENS.light["--block"];
const INK = TOKENS.light["--on-block"];
const MUTED = "rgba(255, 246, 224, 0.78)";
const ZAP = TOKENS.light["--zap"];
const ON_ZAP = TOKENS.light["--on-zap"];

/** A small funnel for the card's corner, as an inline SVG image. */
const FUNNEL_SVG =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 450">
      <polygon points="20,20 380,20 330,120 70,120" fill="${ZAP}"/>
      <g fill="rgba(255,246,224,0.16)" stroke="rgba(255,246,224,0.6)" stroke-width="3">
        <polygon points="70,128 330,128 285,228 115,228"/>
        <polygon points="115,236 285,236 245,336 155,336"/>
        <polygon points="155,344 245,344 225,430 175,430"/>
      </g>
    </svg>`,
  ).toString("base64");

const W = 1200;
const H = 630;

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
                  display: "flex",
                  alignSelf: "flex-start",
                  fontFamily: "Bricolage",
                  fontWeight: 800,
                  fontSize: 58,
                  lineHeight: 1,
                  // Same rule as the site: the overlap marks the one figure
                  // a reader can confirm without taking our word for it.
                  color: m.verified ? ON_ZAP : INK,
                  background: m.verified ? ZAP : "transparent",
                  padding: m.verified ? "2px 10px" : 0,
                  borderRadius: 8,
                },
                children: `${m.value}${m.unit}`,
              },
            },
            {
              type: "div",
              props: {
                style: { fontSize: 19, color: MUTED, marginTop: 10, fontWeight: 500 },
                children: m.label,
              },
            },
          ],
        },
      })),
    },
  };
}

function card({ kicker, title, metric, metricLabel, metricVerified, showSources }) {
  return {
    type: "div",
    props: {
      style: {
        width: W, height: H, boxSizing: "border-box", display: "flex",
        flexDirection: "column", justifyContent: "space-between",
        background: PAPER, color: INK,
        padding: "64px 72px", position: "relative", fontFamily: "Bricolage",
      },
      children: [
        {
          type: "img",
          props: {
            src: FUNNEL_SVG,
            width: 200,
            height: 225,
            style: { position: "absolute", top: 56, right: 64 },
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
                  style: {
                    display: "flex", alignSelf: "flex-start", fontSize: 22, fontWeight: 800,
                    background: ZAP, color: ON_ZAP, padding: "6px 18px", borderRadius: 999,
                  },
                  children: kicker,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    /*
                     * Three steps, so a mid-length title never takes the
                     * largest size and strands one word on its own line.
                     * maxWidth leaves room for the corner funnel.
                     */
                    fontFamily: "Bricolage", fontWeight: 800, letterSpacing: -2,
                    fontSize: title.length > 52 ? 66 : title.length > 26 ? 76 : 88,
                    lineHeight: 1.0, marginTop: 30, maxWidth: 820, color: INK,
                    textWrap: "balance",
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
                        { type: "div", props: { style: { display: "flex", alignSelf: "flex-start", fontWeight: 800, fontSize: 72, color: metricVerified ? ON_ZAP : INK, background: metricVerified ? ZAP : "transparent", padding: metricVerified ? "2px 14px" : 0, borderRadius: 10, lineHeight: 1 }, children: metric } },
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
                  style: { fontSize: 22, fontWeight: 800, color: INK },
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
      { name: "Bricolage", data: heavy, weight: 800, style: "normal" },
      { name: "Bricolage", data: regular, weight: 500, style: "normal" },
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
    metricVerified: Boolean(cs.verified),
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
