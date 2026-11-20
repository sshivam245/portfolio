#!/usr/bin/env node
/**
 * Pull every post from the Medium feed into src/content/medium.json, so a new
 * Medium story shows up on /writing at the next build with nothing typed by
 * hand. Runs before every build (prebuild).
 *
 * The JSON is committed. If Medium is down or the build has no network, the
 * last good copy is kept and the build carries on: a missing feed must never
 * take the site down.
 *
 * Posts also listed by hand in writing.ts win, so a hand-written blurb is
 * never overwritten by the feed's opening lines.
 */
import fs from "node:fs";

const FEED = "https://medium.com/feed/@shivam55.goel";
const OUT = new URL("../src/content/medium.json", import.meta.url);

const TAGS = {
  "ai-agent": "AI agents", "artificial-intelligence": "AI", "go-to-market-strategy": "GTM",
  "growth-marketing": "Growth", "growth-marketing-strategy": "Growth", "b2b-marketing": "B2B",
  "clay": "Clay", "automation": "Automation", "marketing": "Marketing", "seo": "SEO",
  "aeo": "AEO", "geo": "GEO", "outbound": "Outbound",
};
const pretty = (c) => TAGS[c] ?? c.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, " ");

/** The opening sentences, cut at a sentence end, about two lines long. */
function blurb(htmlBody) {
  const text = decode(htmlBody.replace(/<figcaption[\s\S]*?<\/figcaption>/g, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ").trim();
  // Split only where punctuation is followed by a space, so "3.2%" stays whole.
  const sentences = text.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const s of sentences) {
    if ((out + " " + s).length > 240 && out) break;
    out += (out ? " " : "") + s;
  }
  return out.trim();
}

try {
  const res = await fetch(FEED, { headers: { "User-Agent": "portfolio-build" } });
  if (!res.ok) throw new Error(`feed returned ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => {
    const pick = (re) => it.match(re)?.[1] ?? "";
    const href = pick(/<link>([^<]+)<\/link>/).split("?")[0];
    return {
      slug: href.split("/").pop(),
      title: decode(pick(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)),
      date: new Date(pick(/<pubDate>([^<]+)<\/pubDate>/)).toISOString().slice(0, 10),
      venue: "Medium",
      href,
      blurb: blurb(pick(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)),
      tags: [...new Set([...it.matchAll(/<category><!\[CDATA\[([^\]]+)\]\]>/g)].map((m) => pretty(m[1])))].slice(0, 3),
    };
  }).filter((p) => p.href && p.title);
  if (!items.length) throw new Error("feed had no posts");
  fs.writeFileSync(OUT, JSON.stringify(items, null, 2) + "\n");
  console.log(`medium: ${items.length} posts synced`);
} catch (e) {
  if (!fs.existsSync(OUT)) fs.writeFileSync(OUT, "[]\n");
  console.warn(`medium: kept the last copy (${e.message})`);
}
