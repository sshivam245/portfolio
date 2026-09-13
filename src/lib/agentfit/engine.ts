/**
 * Agent fit: which GTM agent is worth building for a given team.
 *
 * A deterministic rules engine, not a model call. That is a deliberate
 * choice, not a limitation of static hosting. A model asked "which agent
 * should I build" returns the same ten ideas to everyone; the value here is
 * an opinion about ordering, and an opinion has to be written down to be
 * worth anything. It also means the answer is instant, free, identical for
 * the same inputs, and cannot invent an integration that does not exist.
 *
 * Every archetype carries a `breaks` and a `skipIf`. An agent recommendation
 * that never tells you not to build something is a brochure.
 */

export type Motion = "plg" | "sales" | "hybrid" | "community";
export type Acv = "low" | "mid" | "high" | "ent";
export type Team = "solo" | "small" | "mid" | "large";

export type Bottleneck =
  | "pipeline" | "research" | "content" | "routing"
  | "data" | "reporting" | "activation" | "retention";

export type Capability =
  | "crm" | "enrich" | "sequencer" | "cms" | "calls"
  | "product" | "warehouse" | "automation" | "support";

export const MOTIONS: { id: Motion; label: string; hint: string }[] = [
  { id: "plg", label: "Self-serve", hint: "They sign up before they talk to you" },
  { id: "sales", label: "Sales-led", hint: "Outbound and demos drive everything" },
  { id: "hybrid", label: "Hybrid", hint: "Self-serve bottom, sales motion on top" },
  { id: "community", label: "Community or content-led", hint: "Inbound from audience" },
];

export const ACVS: { id: Acv; label: string; hint: string }[] = [
  { id: "low", label: "Under $1k", hint: "Volume game" },
  { id: "mid", label: "$1k to $10k", hint: "Light touch sales" },
  { id: "high", label: "$10k to $50k", hint: "Real sales cycle" },
  { id: "ent", label: "$50k+", hint: "Few accounts, long cycle" },
];

export const TEAMS: { id: Team; label: string }[] = [
  { id: "solo", label: "Just me" },
  { id: "small", label: "2 to 5" },
  { id: "mid", label: "6 to 20" },
  { id: "large", label: "20+" },
];

export const BOTTLENECKS: { id: Bottleneck; label: string; hint: string }[] = [
  { id: "pipeline", label: "Not enough pipeline", hint: "Top of funnel is thin" },
  { id: "research", label: "Research eats the week", hint: "Manual account and prospect digging" },
  { id: "content", label: "Content cannot keep up", hint: "One asset, many channels, no time" },
  { id: "routing", label: "Inbound goes cold", hint: "Slow triage, routing, follow-up" },
  { id: "data", label: "CRM data is a mess", hint: "Dupes, gaps, decay, no trust in reports" },
  { id: "reporting", label: "Reporting is manual", hint: "Rebuilding the same deck every week" },
  { id: "activation", label: "Signups do not activate", hint: "They land, they never get value" },
  { id: "retention", label: "Churn is unexplained", hint: "You learn after they leave" },
];

export const TOOLS: { id: string; label: string; caps: Capability[] }[] = [
  { id: "hubspot", label: "HubSpot", caps: ["crm", "sequencer"] },
  { id: "salesforce", label: "Salesforce", caps: ["crm"] },
  { id: "attio", label: "Attio", caps: ["crm"] },
  { id: "pipedrive", label: "Pipedrive", caps: ["crm"] },
  { id: "clay", label: "Clay", caps: ["enrich", "automation"] },
  { id: "apollo", label: "Apollo", caps: ["enrich", "sequencer"] },
  { id: "instantly", label: "Instantly or Smartlead", caps: ["sequencer"] },
  { id: "outreach", label: "Outreach or Salesloft", caps: ["sequencer"] },
  { id: "webflow", label: "Webflow or Framer", caps: ["cms"] },
  { id: "wordpress", label: "WordPress", caps: ["cms"] },
  { id: "nextjs", label: "Next.js or custom site", caps: ["cms"] },
  { id: "gong", label: "Gong or Fathom", caps: ["calls"] },
  { id: "posthog", label: "PostHog or Amplitude", caps: ["product"] },
  { id: "segment", label: "Segment or RudderStack", caps: ["product"] },
  { id: "warehouse", label: "BigQuery, Snowflake or dbt", caps: ["warehouse"] },
  { id: "metabase", label: "Metabase or Looker", caps: ["warehouse"] },
  { id: "n8n", label: "n8n, Zapier or Make", caps: ["automation"] },
  { id: "intercom", label: "Intercom or Zendesk", caps: ["support"] },
];

const CAP_LABEL: Record<Capability, string> = {
  crm: "a CRM",
  enrich: "an enrichment source",
  sequencer: "a sending tool",
  cms: "a CMS you can publish to programmatically",
  calls: "call recording",
  product: "product analytics",
  warehouse: "a warehouse or BI tool",
  automation: "an automation runner",
  support: "a support inbox",
};

export type Answers = {
  motion: Motion;
  acv: Acv;
  team: Team;
  bottlenecks: Bottleneck[];
  tools: string[];
};

type Archetype = {
  id: string;
  name: string;
  thesis: string;
  /** The event that starts a run. An agent without a trigger is a script. */
  trigger: string;
  loop: string[];
  replaces: string;
  breaks: string;
  needs: Capability[];
  likes: Capability[];
  /** Bottleneck affinity. Absent means no lift. */
  fit: Partial<Record<Bottleneck, number>>;
  motion?: Partial<Record<Motion, number>>;
  acv?: Partial<Record<Acv, number>>;
  team?: Partial<Record<Team, number>>;
  /** Returns a reason to not build this yet, if one applies. */
  skipIf?: (a: Answers) => string | null;
};

const ARCHETYPES: Archetype[] = [
  {
    id: "research",
    name: "Account research agent",
    thesis: "Turns a name in the CRM into a brief someone can act on, before a human opens a tab.",
    trigger: "A new account or lead reaches a stage where a human is about to look at it.",
    loop: [
      "Pull the firmographics, tech stack, funding and hiring signals",
      "Read the last quarter of their public activity: posts, releases, job posts",
      "Write a brief with the one reason this account is worth a call now",
      "Attach it to the record and flag the three that are strongest",
    ],
    replaces: "The 10 to 20 minutes per account that nobody actually spends, so calls start cold.",
    breaks: "It writes a confident brief from thin sources. Cap it: if fewer than three signals are found, it should say so rather than pad.",
    needs: ["crm"],
    likes: ["enrich", "automation"],
    fit: { research: 3, pipeline: 1.5 },
    acv: { high: 1.5, ent: 2, mid: 0.5, low: -1 },
    motion: { sales: 1.5, hybrid: 1 },
  },
  {
    id: "signal",
    name: "Signal to outbound agent",
    thesis: "Watches for the moment an account becomes reachable, then drafts the message that references it.",
    trigger: "A watched signal fires: a relevant job post, a funding round, a tech change, a leadership hire.",
    loop: [
      "Poll the signal sources on a schedule and dedupe against what already fired",
      "Score the account against your ICP and drop anything below the bar",
      "Draft a message whose first line is the signal, not a compliment",
      "Queue it as a draft for a human to approve, never send unreviewed",
    ],
    replaces: "Sequences that open with nothing, sent to people with no reason to reply.",
    breaks: "Signal volume collapses in a slow quarter and the agent starts reaching for weak signals to stay busy. Give it a floor and let it send nothing.",
    needs: ["sequencer"],
    likes: ["enrich", "crm", "automation"],
    fit: { pipeline: 3, research: 1.5 },
    motion: { sales: 2, hybrid: 1.5, community: -0.5 },
    acv: { high: 1.5, ent: 1.5, low: -1.5 },
    skipIf: (a) =>
      a.acv === "low" && a.team === "solo"
        ? "At sub-$1k ACV solo, personalised outbound loses to self-serve distribution. Fix the funnel before you automate the outreach."
        : null,
  },
  {
    id: "triage",
    name: "Inbound triage and routing agent",
    thesis: "Nothing you build recovers a demo request answered nine hours late.",
    trigger: "A form fill, demo request or high-intent support message arrives.",
    loop: [
      "Classify intent and enrich the submitter against your ICP",
      "Route to the right owner, or self-serve if they are below the sales bar",
      "Send a genuinely useful first reply within minutes, not an autoresponder",
      "Open the record with context already attached",
    ],
    replaces: "The queue where good inbound sits overnight next to spam.",
    breaks: "Confident misclassification. Route uncertain cases to a human queue rather than guessing, and log every call so you can audit the bar.",
    needs: ["crm"],
    likes: ["enrich", "automation", "support"],
    fit: { routing: 3, pipeline: 1 },
    motion: { community: 2, plg: 1.5, hybrid: 1.5 },
    team: { mid: 1, large: 1 },
  },
  {
    id: "aeo",
    name: "Answer engine visibility agent",
    thesis: "Rewrites pages into the shape an engine can quote, then watches whether it starts quoting them.",
    trigger: "A page is published or updated, or a tracked question changes its answer.",
    loop: [
      "Audit each page for answer shape: lead answer, question headings, schema",
      "Generate the missing structured data and the rewritten opening",
      "Track a set of real questions across the engines that matter to you",
      "Alert when a competitor takes a citation you held",
    ],
    replaces: "Publishing into answer engines and finding out months later whether it worked.",
    breaks: "Citation tracking is noisy: answers vary by session and region. Track direction over weeks, never celebrate a single check.",
    needs: ["cms"],
    likes: ["automation"],
    fit: { content: 2.5, pipeline: 1.5 },
    motion: { community: 2, plg: 1, hybrid: 1 },
  },
  {
    id: "repurpose",
    name: "Content repurposing agent",
    thesis: "One real asset becomes six channel-native pieces, with a human gate before anything publishes.",
    trigger: "A long-form asset is marked ready: a post, a webinar, a customer call, a launch.",
    loop: [
      "Extract the three claims that carry the argument",
      "Draft each channel in that channel's format, not a resized copy",
      "Hold everything in a review queue with the source passage attached",
      "Schedule only what a human approved",
    ],
    replaces: "The backlog of good material that was published once and never reused.",
    breaks: "Volume without a point of view reads as filler and trains your audience to skip you. The gate is the product, not the drafting.",
    needs: [],
    likes: ["cms", "automation"],
    fit: { content: 3 },
    motion: { community: 2, plg: 1 },
    team: { solo: 1, small: 1 },
  },
  {
    id: "hygiene",
    name: "CRM hygiene agent",
    thesis: "Unglamorous, and usually the highest-leverage thing on this list.",
    trigger: "Nightly, plus on every record write.",
    loop: [
      "Dedupe on domain and normalise names, titles and segments",
      "Fill the fields your routing and reporting actually depend on",
      "Flag records that have decayed: job changes, dead domains, stale owners",
      "Write a weekly note on what broke and what it cost",
    ],
    replaces: "Reports nobody trusts, and routing rules quietly failing on empty fields.",
    breaks: "An agent with write access to your CRM can corrupt it fast. Dry-run first, log every write, keep a rollback.",
    needs: ["crm"],
    likes: ["enrich", "automation"],
    fit: { data: 3, reporting: 1.5, routing: 1 },
    team: { mid: 1, large: 1.5 },
  },
  {
    id: "reporting",
    name: "Pipeline narrative agent",
    thesis: "Writes the story behind the numbers, which is the part that takes the time.",
    trigger: "Weekly, before the pipeline review.",
    loop: [
      "Pull the movement: created, advanced, slipped, lost",
      "Compare against the prior period and flag what actually changed",
      "Write the narrative: what moved, the likely why, what to decide",
      "Attach the queries so anyone can check the claim",
    ],
    replaces: "The half-day spent rebuilding the same deck to say what everyone already suspected.",
    breaks: "It will assert causes it cannot know. Make it separate observed change from hypothesis, in its own words, every time.",
    needs: ["crm"],
    likes: ["warehouse", "automation"],
    fit: { reporting: 3, data: 1 },
    team: { mid: 1, large: 2 },
    acv: { high: 1, ent: 1 },
  },
  {
    id: "activation",
    name: "Activation agent",
    thesis: "Watches what a new account did and did not do, and intervenes while it still matters.",
    trigger: "A product milestone is hit, or a expected one is missed past its window.",
    loop: [
      "Track the two or three events that actually predict retention",
      "Detect stalls against the window that matters for your product",
      "Send the specific unblock, not a generic nudge",
      "Escalate to a human when the account is worth a human",
    ],
    replaces: "Onboarding drips that fire on a calendar rather than on behaviour.",
    breaks: "Requires event data you trust. If your tracking is half-instrumented the agent nudges people who already succeeded.",
    needs: ["product"],
    likes: ["crm", "automation", "support"],
    fit: { activation: 3, retention: 2 },
    motion: { plg: 2.5, hybrid: 1.5, sales: -0.5 },
  },
  {
    id: "calls",
    name: "Call insight agent",
    thesis: "Your calls already contain the positioning answer. Nobody has time to listen to 40 of them.",
    trigger: "A call transcript lands.",
    loop: [
      "Tag objections, competitors named, and the words buyers use for the problem",
      "Cluster across the quarter rather than reporting call by call",
      "Surface the objection that is growing, with the quotes behind it",
      "Feed it into messaging and the battlecards",
    ],
    replaces: "Positioning decided from the three calls a founder happened to sit in on.",
    breaks: "Small samples produce confident nonsense. Under about 30 calls a quarter, read them yourself.",
    needs: ["calls"],
    likes: ["crm"],
    fit: { retention: 2, content: 1.5, pipeline: 1 },
    motion: { sales: 2, hybrid: 1 },
    acv: { high: 1.5, ent: 2, low: -1.5 },
  },
  {
    id: "abm",
    name: "1:1 landing page agent",
    thesis: "Generates a real page per target account, built from their own context, not a merge field.",
    trigger: "An account enters the target tier.",
    loop: [
      "Assemble what is public about their stack, their hiring and their stated problem",
      "Generate a page that argues your case for that specific account",
      "Publish behind a private URL and attach it to the outreach",
      "Track who opened it, how long, and what they clicked",
    ],
    replaces: "ABM that is a first name in a subject line.",
    breaks: "Expensive per account and obvious when it is thin. Only worth it above a deal size that justifies the page.",
    needs: ["cms"],
    likes: ["enrich", "crm"],
    fit: { pipeline: 2, research: 2 },
    acv: { ent: 2.5, high: 1.5, mid: -1, low: -2.5 },
    motion: { sales: 2, hybrid: 1 },
    skipIf: (a) =>
      a.acv === "low" || a.acv === "mid"
        ? "Below roughly $10k ACV the page costs more than the deal returns. Revisit when you have a named account tier."
        : null,
  },
];

export type Result = {
  id: string;
  name: string;
  thesis: string;
  trigger: string;
  loop: string[];
  replaces: string;
  breaks: string;
  score: number;
  /** Affinity to the bottlenecks they actually named. Zero means do not show. */
  relevance: number;
  /** Their tools, named, that this would sit on. */
  wiring: string[];
  /** Capabilities they lack that this needs. */
  missing: string[];
  skip: string | null;
};

export function recommend(a: Answers): { picks: Result[]; caution: string | null } {
  const caps = new Set<Capability>();
  for (const id of a.tools) {
    TOOLS.find((t) => t.id === id)?.caps.forEach((c) => caps.add(c));
  }

  const scored = ARCHETYPES.map((x) => {
    /*
     * The stated bottleneck is a gate, not a weight. Without this an
     * archetype with no affinity to anything they named could still surface
     * on motion and team bonuses alone: answering only "signups do not
     * activate" returned a content repurposing agent, which is advice about
     * a problem they did not report having.
     */
    const relevance = a.bottlenecks.reduce((t, b) => t + (x.fit[b] ?? 0), 0);
    let score = relevance;
    score += x.motion?.[a.motion] ?? 0;
    score += x.acv?.[a.acv] ?? 0;
    score += x.team?.[a.team] ?? 0;

    // Owning the tools is evidence you will actually finish the build.
    const missing = x.needs.filter((c) => !caps.has(c));
    score += x.likes.filter((c) => caps.has(c)).length * 0.4;
    score -= missing.length * 1.2;

    const wiring = a.tools
      .map((id) => TOOLS.find((t) => t.id === id))
      .filter((t): t is (typeof TOOLS)[number] =>
        !!t && t.caps.some((c) => x.needs.includes(c) || x.likes.includes(c)))
      .map((t) => t.label);

    return {
      id: x.id, name: x.name, thesis: x.thesis, trigger: x.trigger,
      loop: x.loop, replaces: x.replaces, breaks: x.breaks,
      score, relevance, wiring,
      missing: missing.map((c) => CAP_LABEL[c]),
      skip: x.skipIf?.(a) ?? null,
    };
  });

  scored.sort((p, q) => q.score - p.score);
  const picks = scored.filter((x) => x.relevance > 0 && x.score > 0).slice(0, 3);

  /*
   * The honest answer is sometimes "not yet". A team with no volume does not
   * have an automation problem, and saying so is worth more than a third
   * recommendation nobody should build.
   */
  let caution: string | null = null;
  if (a.team === "solo" && (a.acv === "low" || a.acv === "mid")) {
    caution =
      "Solo at this deal size, the constraint is usually distribution, not throughput. Build the one agent that removes your largest repeated task, and do the rest by hand until volume actually hurts.";
  } else if (a.bottlenecks.length >= 5) {
    caution =
      "Five bottlenecks at once usually means one upstream cause, most often untrustworthy data. Fix that first or every agent you build inherits it.";
  } else if (picks.length === 0) {
    caution =
      "Nothing here scores well against those answers, which is a real result. Either the bottleneck is a people or positioning problem, or the volume is not there yet.";
  }

  return { picks, caution };
}
