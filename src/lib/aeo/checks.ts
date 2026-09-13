/**
 * The AEO audit: one list of checks, used twice.
 *
 * CHECK_SPECS is the public scope of the report — the /tools/aeo-audit page
 * renders it so a visitor can see exactly what they get before handing over
 * a URL. runChecks() applies the same list to a page's source on the private
 * /tools/aeo-audit/run page, so a submitted URL becomes a report draft in
 * seconds instead of an evening.
 *
 * One source of truth: a check's label and reasoning are written once, in
 * the spec. runChecks only decides status, evidence and the fix.
 *
 * Nothing here renders fetched markup. DOMParser("text/html") builds an
 * inert tree that runs no scripts and loads no subresources, and the UI
 * prints only strings produced below. A submitted page is data, never
 * instructions, and never markup.
 *
 * Checks are limited to things that are demonstrably true. No engine
 * publishes an "AEO score", so nothing here pretends to reverse one. Where
 * something is a judgement call it is left unscored rather than dressed up.
 */

export type Status = "pass" | "warn" | "fail" | "info";
export type Category = "readable" | "answer" | "authority" | "retrieval";

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "readable", label: "Machine readable", blurb: "Can a crawler tell what this page is?" },
  { id: "answer", label: "Answer shaped", blurb: "Can a passage be lifted out and quoted?" },
  { id: "authority", label: "Attributable", blurb: "Is there a who, a when, and a source?" },
  { id: "retrieval", label: "Retrievable", blurb: "Is the page reachable and quotable at all?" },
];

export type Spec = {
  id: string;
  category: Category;
  label: string;
  /** Why an answer engine cares. Written for the reader, not for me. */
  why: string;
  /** 1 nice-to-have, 2 matters, 3 load-bearing. */
  weight: 1 | 2 | 3;
};

export const CHECK_SPECS: Spec[] = [
  { id: "title", category: "readable", weight: 3, label: "Title",
    why: "The string an engine cites you by. The most reused text on the page." },
  { id: "description", category: "readable", weight: 2, label: "Meta description",
    why: "Often reused verbatim as the summary under a cited result." },
  { id: "h1", category: "readable", weight: 2, label: "H1",
    why: "Anchors the document to one topic. Several H1s split that signal." },
  { id: "hierarchy", category: "readable", weight: 1, label: "Heading order",
    why: "Heading depth is how a chunker decides where a passage starts and ends." },
  { id: "lang", category: "readable", weight: 1, label: "Language attribute",
    why: "Decides which language index the page is eligible for." },
  { id: "jsonld", category: "readable", weight: 3, label: "Structured data",
    why: "The only part of a page whose meaning is stated rather than inferred." },
  { id: "canonical", category: "readable", weight: 2, label: "Canonical",
    why: "Tells an engine which URL to credit when a page has variants." },
  { id: "og", category: "readable", weight: 1, label: "Open Graph",
    why: "How the page looks when someone shares the answer they were given." },

  { id: "depth", category: "answer", weight: 2, label: "Content volume",
    why: "Under a few hundred words there is rarely a passage that stands alone as an answer." },
  { id: "questions", category: "answer", weight: 2, label: "Question headings",
    why: "Retrieval matches a user's question to your headings. Questions match questions." },
  { id: "lead", category: "answer", weight: 3, label: "Answer up front",
    why: "The passage most often quoted is the first substantive one. Throat-clearing gets quoted too." },
  { id: "structure", category: "answer", weight: 2, label: "Lists and tables",
    why: "Steps and comparisons get lifted far more readily as markup than as prose." },
  { id: "chunks", category: "answer", weight: 1, label: "Paragraph length",
    why: "A paragraph longer than a chunk window gets split mid-argument and loses its point." },

  { id: "date", category: "authority", weight: 2, label: "Dates",
    why: "Undated pages lose to dated ones on any question where currency matters." },
  { id: "author", category: "authority", weight: 2, label: "Author",
    why: "Attribution is what gets you named as the source instead of absorbed anonymously." },
  { id: "answertype", category: "authority", weight: 2, label: "Answer schema",
    why: "FAQPage, HowTo and Article map onto shapes engines already answer in." },
  { id: "citations", category: "authority", weight: 1, label: "Outbound citations",
    why: "Pages that cite sources are treated as more groundable than pages that assert." },

  { id: "metarobots", category: "retrieval", weight: 3, label: "Robots meta",
    why: "nosnippet bars the quoting an answer engine needs. noindex removes the page." },
  { id: "robotstxt", category: "retrieval", weight: 3, label: "AI crawler access",
    why: "A blocked crawler cannot retrieve the page, so it can never cite it. This one overrides the rest." },
  { id: "llmstxt", category: "retrieval", weight: 1, label: "llms.txt",
    why: "A convention, not a standard: a plain-text map of your best pages. Cheap, honoured by some, ignored by others." },
  { id: "ratio", category: "retrieval", weight: 3, label: "Text in served HTML",
    why: "Crawlers that skip JavaScript see only this. A client-rendered page can look empty." },
  { id: "alt", category: "retrieval", weight: 1, label: "Image alt text",
    why: "The only content an image contributes to a text index." },
  { id: "internal", category: "retrieval", weight: 1, label: "Internal links",
    why: "An orphan page is crawled late and re-crawled rarely." },
];

export const SPEC = Object.fromEntries(CHECK_SPECS.map((s) => [s.id, s])) as
  Record<string, Spec>;

export type Finding = Spec & { status: Status; found: string; fix?: string };

/* ---------------------------------------------------------------- helpers */

const clean = (s: string | null | undefined) => (s ?? "").replace(/\s+/g, " ").trim();
const trunc = (s: string, n = 90) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

function collectTypes(node: unknown, out: Set<string>, depth = 0) {
  if (depth > 6 || node === null || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n) => collectTypes(n, out, depth + 1));
  const obj = node as Record<string, unknown>;
  const t = obj["@type"];
  if (typeof t === "string") out.add(t);
  if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && out.add(x));
  Object.values(obj).forEach((v) => collectTypes(v, out, depth + 1));
}

function hasKey(node: unknown, key: string, depth = 0): boolean {
  if (depth > 6 || node === null || typeof node !== "object") return false;
  if (Array.isArray(node)) return node.some((n) => hasKey(n, key, depth + 1));
  const obj = node as Record<string, unknown>;
  if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return true;
  return Object.values(obj).some((v) => hasKey(v, key, depth + 1));
}

const QUESTION_START = /^(how|what|why|when|where|which|who|can|do|does|did|is|are|was|should|will)\b/i;

/** The crawlers worth naming. Blocking these is a choice, not an accident. */
export const AI_AGENTS = [
  "GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot",
  "Google-Extended", "CCBot", "Applebot-Extended", "meta-externalagent",
];

/** Which of AI_AGENTS this robots.txt disallows from "/". */
export function blockedAgents(robots: string): string[] {
  const lines = robots.split(/\r?\n/).map((l) => l.replace(/#.*$/, "").trim());
  const blocked = new Set<string>();
  let group: string[] = [];
  let sawRule = false;

  for (const line of lines) {
    const ua = /^user-agent:\s*(.+)$/i.exec(line);
    if (ua) {
      if (sawRule) { group = []; sawRule = false; }
      group.push(ua[1].trim());
      continue;
    }
    const dis = /^disallow:\s*(.*)$/i.exec(line);
    if (dis && group.length) {
      sawRule = true;
      if (dis[1].trim() === "/") {
        for (const agent of group) {
          if (agent === "*") AI_AGENTS.forEach((a) => blocked.add(a));
          else {
            const hit = AI_AGENTS.find((a) => a.toLowerCase() === agent.toLowerCase());
            if (hit) blocked.add(hit);
          }
        }
      }
      continue;
    }
    if (/^allow:/i.test(line)) sawRule = true;
  }
  return AI_AGENTS.filter((a) => blocked.has(a));
}

/* ------------------------------------------------------------------ engine */

export type Extras = {
  /** robots.txt body, "" if none, null if not supplied. */
  robots: string | null;
  /** true present, false absent, null not supplied. */
  llms: boolean | null;
};

export function runChecks(html: string, pageUrl: string, extras: Extras): Finding[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const out: Finding[] = [];
  const mk = (id: string, status: Status, found: string, fix?: string) =>
    out.push({ ...SPEC[id], status, found, fix });

  let origin = "";
  try { origin = new URL(pageUrl).origin; } catch { /* pasted source, no URL */ }

  /* readable */
  const title = clean(doc.querySelector("title")?.textContent);
  mk("title",
    !title ? "fail" : title.length < 15 || title.length > 65 ? "warn" : "pass",
    title ? `${title.length} chars · ${trunc(title, 70)}` : "missing",
    !title ? "Add a <title>. Lead with the specific claim, not the brand."
      : title.length > 65 ? "Trim to roughly 60 characters so it is not cut mid-phrase in a citation."
      : title.length < 15 ? "Too short to disambiguate. Say what the page answers." : undefined);

  const desc = clean(doc.querySelector('meta[name="description"]')?.getAttribute("content"));
  mk("description",
    !desc ? "fail" : desc.length < 60 || desc.length > 170 ? "warn" : "pass",
    desc ? `${desc.length} chars · ${trunc(desc)}` : "missing",
    !desc ? "Add one. Answer the page's question in a single sentence."
      : desc.length > 170 ? "Over 170 chars gets truncated. Front-load the answer."
      : desc.length < 60 ? "Thin. Use the room to state the actual answer." : undefined);

  const h1s = Array.from(doc.querySelectorAll("h1"));
  mk("h1", h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn",
    h1s.length === 0 ? "none" : `${h1s.length} · ${trunc(clean(h1s[0].textContent), 70)}`,
    h1s.length === 0 ? "Add exactly one H1 naming the subject."
      : h1s.length > 1 ? "Demote the extras to H2. One H1 per page." : undefined);

  const heads = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6"));
  const levels = heads.map((h) => Number(h.tagName[1]));
  const skips = levels.filter((lv, i) => i > 0 && lv - levels[i - 1] > 1).length;
  mk("hierarchy", heads.length === 0 ? "fail" : skips === 0 ? "pass" : "warn",
    heads.length === 0 ? "no headings"
      : `${heads.length} headings, ${skips} skipped level${skips === 1 ? "" : "s"}`,
    heads.length === 0 ? "Add headings. A wall of <p> has no extractable sections."
      : skips > 0 ? "Do not jump H2 to H4. A chunker reads the gap as a new top-level section." : undefined);

  const lang = clean(doc.documentElement.getAttribute("lang"));
  mk("lang", lang ? "pass" : "warn", lang || "missing",
    lang ? undefined : 'Add lang="en" to <html>.');

  const ldNodes = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
  const types = new Set<string>();
  const parsed: unknown[] = [];
  let broken = 0;
  for (const n of ldNodes) {
    try {
      const v = JSON.parse(n.textContent || "");
      parsed.push(v);
      collectTypes(v, types);
    } catch { broken += 1; }
  }
  const typeList = Array.from(types);
  mk("jsonld", ldNodes.length === 0 ? "fail" : broken > 0 ? "warn" : "pass",
    ldNodes.length === 0 ? "no JSON-LD"
      : `${ldNodes.length} block${ldNodes.length === 1 ? "" : "s"}${broken ? `, ${broken} invalid` : ""} · ${typeList.join(", ") || "no @type"}`,
    ldNodes.length === 0 ? "Add JSON-LD. Article or FAQPage for content, Organization or Person for identity."
      : broken > 0 ? "A block failed to parse, so it is ignored entirely. Validate the JSON." : undefined);

  const canon = doc.querySelector('link[rel="canonical"]')?.getAttribute("href");
  mk("canonical", canon ? "pass" : "warn", canon ? trunc(clean(canon)) : "missing",
    canon ? undefined : "Add a self-referencing canonical link.");

  const og = ["og:title", "og:description", "og:image"]
    .filter((p) => doc.querySelector(`meta[property="${p}"]`));
  mk("og", og.length === 3 ? "pass" : og.length ? "warn" : "fail",
    og.length ? og.join(", ") : "none",
    og.length === 3 ? undefined : "Add og:title, og:description and og:image.");

  /* answer shape */
  const body = doc.body?.cloneNode(true) as HTMLElement | null;
  body?.querySelectorAll("script,style,noscript,svg").forEach((n) => n.remove());
  const text = clean(body?.textContent);
  const words = text ? text.split(/\s+/).length : 0;

  mk("depth", words < 150 ? "fail" : words < 350 ? "warn" : "pass",
    `${words.toLocaleString()} words`,
    words < 350 ? "Thin for retrieval. One fully answered question beats five gestured at." : undefined);

  const qHeads = heads.filter((h) => {
    const t = clean(h.textContent);
    return t.endsWith("?") || QUESTION_START.test(t);
  });
  mk("questions", qHeads.length >= 2 ? "pass" : qHeads.length === 1 ? "warn" : "fail",
    qHeads.length ? `${qHeads.length} · e.g. ${trunc(clean(qHeads[0].textContent), 60)}` : "none",
    qHeads.length >= 2 ? undefined
      : 'Rewrite headings as the question they answer. "Pricing" becomes "What does it cost?"');

  const paras = Array.from(body?.querySelectorAll("p") ?? [])
    .map((p) => clean(p.textContent)).filter((t) => t.length > 40);
  const lead = paras[0] ?? "";
  mk("lead", !lead ? "fail" : lead.length <= 300 ? "pass" : "warn",
    lead ? `first paragraph ${lead.length} chars` : "no paragraph found",
    !lead ? "There is no readable opening paragraph to extract."
      : lead.length > 300 ? "Open with a two-sentence direct answer, then expand underneath it." : undefined);

  const lists = body?.querySelectorAll("ul,ol").length ?? 0;
  const tables = body?.querySelectorAll("table").length ?? 0;
  mk("structure", lists + tables >= 2 ? "pass" : lists + tables === 1 ? "warn" : "fail",
    `${lists} list${lists === 1 ? "" : "s"}, ${tables} table${tables === 1 ? "" : "s"}`,
    lists + tables >= 2 ? undefined
      : "Convert step sequences to <ol> and comparisons to <table>. Prose describing a list is not a list.");

  const longParas = paras.filter((p) => p.length > 700).length;
  mk("chunks", longParas === 0 ? "pass" : longParas > 2 ? "fail" : "warn",
    `${paras.length} paragraphs, ${longParas} over 700 chars`,
    longParas ? "Break the long ones. One idea per paragraph." : undefined);

  /* authority */
  const hasDate = parsed.some((p) => hasKey(p, "dateModified") || hasKey(p, "datePublished"));
  const timeEl = doc.querySelector("time[datetime]");
  mk("date", hasDate ? "pass" : timeEl ? "warn" : "fail",
    hasDate ? "in structured data"
      : timeEl ? `<time> only · ${clean(timeEl.getAttribute("datetime"))}` : "none",
    hasDate ? undefined : "Add datePublished and dateModified to the JSON-LD.");

  mk("author", parsed.some((p) => hasKey(p, "author")) ? "pass" : "fail",
    parsed.some((p) => hasKey(p, "author")) ? "declared in structured data" : "none",
    parsed.some((p) => hasKey(p, "author")) ? undefined
      : "Add an author (Person or Organization) to the page schema.");

  const answerTypes = ["FAQPage", "HowTo", "QAPage", "Article", "BlogPosting", "NewsArticle"];
  const matched = answerTypes.filter((t) => types.has(t));
  mk("answertype", matched.length ? "pass" : "warn",
    matched.length ? matched.join(", ") : "none of FAQPage, HowTo, Article",
    matched.length ? undefined
      : "If the page answers questions, mark it up as FAQPage. If it is a procedure, HowTo.");

  const ext = Array.from(body?.querySelectorAll("a[href^='http']") ?? []).filter((a) => {
    try { return origin ? new URL(a.getAttribute("href") || "").origin !== origin : true; }
    catch { return false; }
  }).length;
  mk("citations", ext >= 2 ? "pass" : ext === 1 ? "warn" : "fail",
    `${ext} external link${ext === 1 ? "" : "s"}`,
    ext >= 2 ? undefined : "Link the evidence behind your claims. Assertions without sources are cheap.");

  /* retrieval */
  const robotsMeta = clean(doc.querySelector('meta[name="robots"]')?.getAttribute("content")).toLowerCase();
  const noindex = robotsMeta.includes("noindex");
  const nosnippet = robotsMeta.includes("nosnippet") || /max-snippet:\s*0/.test(robotsMeta);
  mk("metarobots", noindex ? "fail" : nosnippet ? "warn" : "pass",
    robotsMeta || "none (indexable)",
    noindex ? "This page is excluded from indexes. Nothing else here matters until that changes."
      : nosnippet ? "nosnippet blocks the excerpt. Use max-snippet:-1 to stay quotable." : undefined);

  if (extras.robots === null) {
    out.push({ ...SPEC.robotstxt, status: "info", found: "not supplied" });
  } else if (extras.robots === "") {
    out.push({ ...SPEC.robotstxt, status: "warn", found: "not found",
      fix: "Add one, even if it only allows everything and points at the sitemap." });
  } else {
    const blocked = blockedAgents(extras.robots);
    mk("robotstxt", blocked.length ? "fail" : "pass",
      blocked.length ? `blocked: ${blocked.join(", ")}` : "no AI crawler is blocked",
      blocked.length
        ? `robots.txt disallows ${blocked.join(", ")}. If you want citations from them, that rule has to go. If the block is deliberate, ignore this line.`
        : undefined);
  }

  if (extras.llms === null) out.push({ ...SPEC.llmstxt, status: "info", found: "not supplied" });
  else mk("llmstxt", extras.llms ? "pass" : "warn", extras.llms ? "present" : "not found",
    extras.llms ? undefined : "Add /llms.txt listing canonical pages with one-line descriptions.");

  const ratio = html.length ? text.length / html.length : 0;
  mk("ratio", words < 120 && ratio < 0.05 ? "fail" : ratio < 0.08 ? "warn" : "pass",
    `${(ratio * 100).toFixed(1)}% of source is body text`,
    ratio < 0.08 ? "Very little text in the served HTML. If it is client-rendered, prerender it." : undefined);

  const imgs = Array.from(body?.querySelectorAll("img") ?? []);
  const withAlt = imgs.filter((i) => clean(i.getAttribute("alt"))).length;
  if (imgs.length === 0) out.push({ ...SPEC.alt, status: "info", found: "no images" });
  else mk("alt",
    withAlt === imgs.length ? "pass" : withAlt / imgs.length > 0.6 ? "warn" : "fail",
    `${withAlt}/${imgs.length} described`,
    withAlt < imgs.length ? "Describe what the image shows, not what it is called." : undefined);

  const internal = Array.from(body?.querySelectorAll("a[href]") ?? []).filter((a) => {
    const h = a.getAttribute("href") || "";
    if (h.startsWith("#") || h.startsWith("mailto:")) return false;
    if (h.startsWith("/")) return true;
    try { return origin ? new URL(h).origin === origin : false; } catch { return false; }
  }).length;
  mk("internal", internal >= 3 ? "pass" : internal >= 1 ? "warn" : "fail",
    `${internal} link${internal === 1 ? "" : "s"}`,
    internal >= 3 ? undefined : "Link this page from related pages, and out to them from here.");

  return out;
}

/* ----------------------------------------------------------------- scoring */

const VALUE: Record<Status, number> = { pass: 1, warn: 0.5, fail: 0, info: 0 };

export function scoreOf(findings: Finding[]) {
  const scored = findings.filter((x) => x.status !== "info");
  const total = scored.reduce((s, x) => s + x.weight, 0);
  const got = scored.reduce((s, x) => s + x.weight * VALUE[x.status], 0);
  return total ? got / total : 0;
}

export function byCategory(findings: Finding[]) {
  return CATEGORIES.map((c) => {
    const items = findings.filter((x) => x.category === c.id);
    return { ...c, items, score: scoreOf(items) };
  });
}

/** A word, not a letter grade. A grade implies a scale an engine publishes. */
export function verdict(score: number) {
  if (score >= 0.85) return { word: "Quotable", note: "An engine can find, parse and attribute this page." };
  if (score >= 0.68) return { word: "Workable", note: "Retrievable, but losing citations on details." };
  if (score >= 0.45) return { word: "Thin", note: "Parseable, but little here is worth lifting." };
  return { word: "Invisible", note: "An engine has almost nothing to work with." };
}
