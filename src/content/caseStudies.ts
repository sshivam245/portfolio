/**
 * Case studies. Adding a fifth is a matter of appending an object here —
 * no component changes required.
 *
 * `figures` reference files in /public/figures. If the file doesn't exist yet
 * the <Figure> component renders a labelled placeholder frame instead of a
 * broken image, so you can ship now and drop screenshots in later.
 *
 * `reflection` is intentionally empty on some entries. Fill it in your own
 * words — "what I'd do differently" is the part that reads as engineering
 * judgement rather than résumé copy. The section is hidden while empty.
 */

export type Figure = {
  /** filename inside /public/figures, e.g. "descipher-positioning.png" */
  src: string;
  caption: string;
  /** true when this is a drawn diagram rather than a real screenshot */
  diagram?: boolean;
  /**
   * The one artefact that IS the proof, shown at scale in its own band
   * rather than at sidebar width. At most one per case study: the point is
   * that it is the thing to look at, and a page with three of them has none.
   */
  hero?: boolean;
  /**
   * Intrinsic pixel size. Set these: without width/height the <img> has no
   * height until it loads, which both shifts the layout (CLS) and stops
   * loading="lazy" ever firing, since a zero-height box never enters the
   * viewport.
   */
  w?: number;
  h?: number;
};

/**
 * One step of the build, split so the page can draw it as a sequence instead
 * of printing it as a paragraph. `step` is the thing; `detail` is the terse
 * line under it. Both stay real text in the DOM: baking them into an image
 * would make the most substantive content on the site unretrievable, which
 * is a strange thing to do on a site whose case study is about being quoted.
 */
export type BuildStep = { step: string; detail?: string };

export type CaseStudy = {
  id: string;
  title: string;
  /**
   * The <title> tag, when the on-page headline is not what anyone searches.
   * The H1 keeps its voice; this carries the query. Keep it to 46
   * characters so it fits 60 with the " · Shivam Goel" suffix.
   */
  seoTitle?: string;
  tag: string;
  timeframe: string;
  org: string;
  /** Optional live link, e.g. the shipped product. */
  link?: { href: string; label: string };
  summary: string;
  context: string;
  built: BuildStep[];
  outcomes: { value: string; label: string }[];
  stack: string[];
  /**
   * True when a stranger can verify the headline outcome without taking the
   * site's word for it. Only aeo-geo qualifies: the AI Overview citation and
   * the #1 ranking are checkable from outside. The rest are self-reported,
   * honestly labelled, and not the same kind of claim. The index ranks on
   * this instead of painting all seven outcomes with the same accent.
   */
  verified?: boolean;
  reflection?: string;
  figures?: Figure[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "aeo-geo",
    seoTitle: "AEO & SEO case study: 25× organic clicks",
    verified: true,
    title: "25× organic clicks in four months",
    tag: "SEO / AEO / GEO",
    timeframe: "2025–26",
    org: "Cloudsheer Consulting",
    link: {
      href: "https://www.cloudsheer.com/salesforce-consultant-miami",
      label: "cloudsheer.com/salesforce-consultant-miami",
    },
    summary:
      "I built Cloudsheer's site from nothing and ran its search program. Organic clicks grew 25× in four months, from 35 a month to 873, search impressions grew 85×, and Google's AI Overview names the site for “salesforce partner miami”.",
    context:
      "Salesforce implementation is expensive to buy keywords in, and buyers increasingly ask an assistant instead of scrolling. If the AI Overview names two firms, the third blue link is invisible. The target was never a position. It was being the source the answer is built from, and then turning the traffic into booked calls.",
    built: [
      { step: "The site, from zero", detail: "295 routes prerendered to static HTML, 610 JSON-LD blocks, a markdown copy of every page for AI agents" },
      { step: "An audit loop on API data", detail: "Seven full audits, each a ranked action list, every fix re-measured against its own baseline" },
      { step: "SERP teardowns for stuck pages", detail: "Read the actual page-one competitors, rebuilt to beat them. Miami reached position 2.2 on its money query" },
      { step: "Unique answers instead of templates", detail: "10 integration guides shared boilerplate FAQs and stayed unindexed. Rewritten per tool, 10 of 10 flipped" },
      { step: "Indexing as an operation", detail: "URL Inspection sweeps of the full sitemap, diffed against a baseline. 270 of 294 pages indexed" },
      { step: "Content that owns a news cycle", detail: "The Claudeforce cluster went live within days of the announcement and took 67% of site clicks at its peak" },
      { step: "Page speed", detail: "106 routes code-split, main bundle down 87%, mobile LCP from 9.4s to 4.3s" },
    ],
    // Search Console API, sc-domain:cloudsheer.com. Monthly figures are
    // calendar months of 2026. 230k+ is the sum of May to 17 Nov (232,008).
    outcomes: [
      { value: "AI Overview", label: "Named in Google's generative answer for “salesforce partner miami”" },
      { value: "25×", label: "Organic clicks a month, 35 in May 2026 to 873 in September" },
      { value: "85×", label: "Search impressions a month, 857 in May 2026 to 73k in August" },
      { value: "230k+", label: "Search impressions, May to 17 November 2026" },
    ],
    stack: ["Schema.org", "FAQPage", "Search Console API", "URL Inspection API", "Vite SSR", "Lighthouse", "GA4"],
    reflection:
      "The thing that moved the needle was not writing more, it was writing shorter. Every claim that got picked up was a sentence that survives being lifted out of its paragraph and still makes sense on its own. Long, hedged prose ranks fine and never gets quoted.",
    figures: [
      {
        src: "aeo-mechanism.svg",
        w: 648,
        h: 302,
        diagram: true,
        caption: "The FAQPage step is the one that matters: an answer engine wants a question paired with a liftable answer.",
      },
      {
        src: "cloudsheer-clicks.svg",
        w: 648,
        h: 280,
        diagram: true,
        caption: "Organic clicks by month on cloudsheer.com, from Search Console. The AI Overview citation landed on 27 August; September is the peak.",
      },
      {
        src: "cloudsheer-ai-overview.png",
        hero: true,
        w: 1400,
        h: 1340,
        caption:
          "Google AI Overview for “salesforce partner miami”, citing Cloudsheer alongside the #1 organic result.",
      },
      {
        src: "cloudsheer-search-console.png",
        w: 1324,
        h: 560,
        caption:
          "Search Console, 29 May – 28 Aug 2026: 68.7k impressions, with the step-change at the end of August.",
      },
    ],
  },
  {
    id: "cloudsheer-conversion",
    seoTitle: "Lead capture pipeline: Sheets to Salesforce",
    title: "A lead pipeline that cannot drop a lead",
    tag: "Conversion / RevOps",
    timeframe: "2026",
    org: "Cloudsheer Consulting",
    summary:
      "Once search was bringing people in, I built the system that turns a visit into a booked call: capture on 96 pages, every lead written to three places, and a Claude-powered assistant held to eleven rules. Shipped in four phases without losing a single top-20 commercial ranking.",
    context:
      "Traffic that does not convert is a vanity number. The site had one contact form and a mail provider nobody had tested. The job was to put a sensible next step in front of every visitor, make sure no submission could vanish, and measure which asset produced which lead.",
    built: [
      { step: "Capture everywhere", detail: "9 form types across 96 pages: lead magnets with 4 branded PDFs, calculator estimates, quote and prototype requests, a quiz" },
      { step: "Every lead written three times", detail: "Google Sheet as the source of truth, Salesforce Web-to-Lead with a per-asset lead source, and an inbox alert" },
      { step: "A silent failure, found and fixed", detail: "A 9-submission live test matrix showed the mail provider dropping relayed email while reporting success. Alerts moved browser-side, same day" },
      { step: "Booking at the moment of intent", detail: "Every form's success state offers the 30-minute call, instead of a thank-you page" },
      { step: "A proof layer", detail: "Clutch 5.0 badges, a named review strip on money pages, a case-study hub that invites checking every claim" },
      { step: "An AI concierge with guardrails", detail: "Claude-powered, 11 rules: scope lock, injection resistance, no fabrication. Each verified against real transcripts" },
      { step: "Measurement", detail: "GA4 generate_lead events tagged by asset and page, Clarity recordings loaded after interaction to protect speed" },
    ],
    // Mechanism figures only. Lead volumes are not published here.
    outcomes: [
      { value: "96", label: "Pages with lead capture, across 9 form types" },
      { value: "3", label: "Places every lead is written: Sheets, Salesforce, inbox" },
      { value: "11", label: "Guardrails on the AI concierge, each tested live" },
      { value: "0", label: "Top-20 commercial rankings lost during the rollout" },
    ],
    stack: ["Salesforce Web-to-Lead", "Google Sheets", "Claude API", "GA4", "Microsoft Clarity", "Puppeteer"],
  },
  {
    id: "mintnovalabs",
    seoTitle: "MintNovaLabs: a pay-per-result outbound agency",
    title: "MintNovaLabs, built from nothing",
    tag: "0 → 1 venture",
    timeframe: "2026",
    org: "Founder",
    link: { href: "https://www.mintnovalabs.com/", label: "mintnovalabs.com" },
    summary:
      "A productised outbound agency on a pay-per-result model: offer, pricing, positioning and the site itself. The whole thing is the GTM artefact, not a description of one.",
    context:
      "Outbound agencies sell retainers, which puts the risk on the buyer and rewards activity over meetings booked. I built the company to test the opposite: the client pays only when a qualified meeting lands.",
    built: [
      { step: "Pay-per-result pricing", detail: "The pricing model is the differentiator, not the copy" },
      { step: "Positioning on six failure modes", detail: "Launch time · SDR cost · reply rates · bad data · deliverability · unclear ROI" },
      { step: "A four-step delivery process", detail: "Strategy call to booked meetings in 14 days. Repeatable, not bespoke per client." },
      { step: "An ROI calculator on the site", detail: "A prospect prices the offer against their own numbers before talking to me" },
      { step: "The service architecture", detail: "List building · SPF, DKIM, DMARC · warmup and rotation · sequences · weekly reporting" },
      { step: "The site itself", detail: "Next.js, Tailwind, Framer Motion, deployed from GitHub Actions" },
    ],
    // TODO: confirm which of these are real, achieved results before publishing.
    // The figures on the live site (500+ meetings, 4.8% reply rate, 3.2x ROI,
    // 14 days) sit alongside a demo activity feed, so I have not presented them
    // as outcomes here. Replace with numbers you can stand behind.
    outcomes: [
      { value: "Live", label: "Shipped and taking clients at mintnovalabs.com" },
      { value: "0→1", label: "Offer, pricing, positioning and site, all from scratch" },
      { value: "14 days", label: "Defined time from kickoff to first meetings" },
    ],
    stack: ["Next.js", "Tailwind", "Framer Motion", "GitHub Actions", "Deliverability", "Positioning"],
    reflection: "",
    figures: [
      {
        src: "mintnova-process.svg",
        w: 648,
        h: 208,
        diagram: true,
        caption: "Tight enough to repeat per client rather than rebuild, which is what makes pay-per-result survivable.",
      },
    ],
  },
  {
    id: "gravitee-abm",
    seoTitle: "Spec work: 1:1 ABM for Gravitee, built in Clay",
    title: "I pitched Gravitee by building their outbound",
    // The org line renders as `{tag} · {org}, {timeframe}`, so "spec work"
    // belongs in one of them, not both.
    tag: "ABM",
    timeframe: "2026",
    org: "Spec work, unsolicited",
    link: {
      href: "/demos/gravitee-streamnative.html",
      label: "See a generated account page",
    },
    summary:
      "Nobody asked for this. I built a working 1:1 ABM engine for Gravitee, an API management company, and generated a bespoke landing page for one of their target accounts. The pitch was the artefact.",
    context:
      "API management is sold to technical buyers allergic to generic outbound. A cold email naming the wrong runtime is worse than no email, so the research has to be real and per-account, which is the part that does not scale by hiring SDRs. I built the engine I would have built if Gravitee had hired me, and ran it on a real target.",
    built: [
      { step: "Two linked Clay tables", detail: "Companies on an API-platform and cloud-infrastructure ICP, and the technical executives inside them" },
      { step: "34 enrichment columns", detail: "Including a technology-stack lookup: the whole pitch depends on what they actually run" },
      { step: "Research that produces judgement", detail: "API Infrastructure Pain Point · Why This Account · Gravitee Relevance · Account Tier" },
      { step: "A people layer", detail: "Resolves the right technical executives per account and joins them back to the research" },
      { step: "Grounded drafting", detail: "Opener and cold email built on that account's stack rather than a merge field" },
      { step: "A personalised HTML landing page", detail: "One per account. StreamNative's names AWS, GCP, Azure, Alibaba, Istio, Envoy and Cloudflare." },
    ],
    // Spec work, so there are no campaign metrics. The outcomes describe what
    // the engine produces; the two figures and the live page are the proof.
    outcomes: [
      { value: "1:1", label: "A bespoke landing page generated per target account" },
      { value: "34", label: "Research and enrichment columns on the company table" },
      { value: "11", label: "Steps from raw company to drafted email and landing page" },
    ],
    stack: ["Clay", "Claygent", "Technographics", "HTML", "Account tiering"],
    reflection:
      "Spec work is the most honest sales pitch available: it removes the argument about whether you could do the thing. The risk is building something impressive that solves a problem the target does not have, which is why the first four research columns are about qualifying the account rather than flattering it. If I ran this again I would generate a landing page only for tier-one accounts. Generating one per row is a nice demo and a bad budget.",
    figures: [
      {
        src: "gravitee-pipeline.svg",
        w: 648,
        h: 302,
        diagram: true,
        caption: "Account tier decides how much effort each row earns; without it, every account gets a landing page.",
      },
      {
        src: "gravitee-clay-board.png",
        w: 1500,
        h: 1154,
        caption:
          "The Clay board: company and people tables, with the research, tiering and generation columns.",
      },
    ],
  },
  {
    id: "investor-sourcing",
    seoTitle: "Clay workflow for investor sourcing",
    title: "Fundraising as an outbound problem",
    tag: "Clay workflow",
    timeframe: "2026",
    // The org line renders as `{org}, {timeframe}`, so avoid a comma here or
    // it reads "Personal, then a seed-stage client, 2026".
    org: "Personal → seed-stage client",
    summary:
      "A Clay workflow that turns one startup profile into a ranked investor pipeline with outreach already written: research, thesis fit, partner selection, enrichment and personalisation in a single automated run.",
    context:
      "Founders raise the way bad SDRs prospect: a long list, the same deck, and hope. The expensive part is not the sending, it is the judgement before it. Which firms invest at this stage, which partner owns the thesis, whether they already backed a competitor. Skipping that is what makes outreach ignorable.",
    // Step names below match the actual Clay canvas in the screenshot, so a
    // reader comparing the two finds them consistent.
    built: [
      { step: "Read our positioning", detail: "One input. The startup's own profile drives everything downstream." },
      { step: "Research investor firms", detail: "Filtered to a matching thesis. A partner who already backed an adjacent company is a conflict, not a lead." },
      { step: "Find partners at firm", detail: "Funds do not write cheques, partners do. Runs per firm to resolve who owns the thesis." },
      { step: "Build investor list", detail: "A Python handler I wrote inside Clay: normalises firm names and walks nested people objects, because the sources disagree and dedupe fails without it." },
      { step: "Find investor work email", detail: "The pipeline ends with a reachable person rather than a firm name" },
      { step: "Draft email and LinkedIn", detail: "Written from both sides of the match: the startup's specifics and the partner's own portfolio" },
    ],
    // Mechanism only for now; no outcome metrics supplied yet.
    outcomes: [
      { value: "1 input", label: "A startup profile drives the entire pipeline" },
      { value: "8 steps", label: "Positioning → firms → partners → list → email → drafts" },
      { value: "2×", label: "Built for myself, then replicated for a seed-stage client" },
    ],
    stack: ["Clay", "Claygent", "Python", "Enrichment waterfalls", "LinkedIn", "Email"],
    reflection:
      "Two things earn their place. The portfolio check, because sourcing and enrichment are commodities, every tool does them, and deciding whether a partner has already backed an adjacent company is the judgement a founder would apply if they had the hours. And the Python step, because the moment real data arrives the tidy no-code path breaks: three sources spell the same firm three ways, and no amount of prompt-writing fixes a dedupe. Automating the judgement is the point; being willing to drop into code is what makes it survive contact with the data.",
    figures: [
      {
        src: "investor-workflow-clay.jpg",
        w: 1600,
        h: 867,
        caption:
          "The workflow in Clay, with the Python handler behind “Build investor list”.",
      },
      {
        src: "investor-workflow.svg",
        w: 640,
        h: 330,
        caption: "startup profile → firms → partner → portfolio fit → enrichment → drafted outreach",
        diagram: true,
      },
    ],
  },
  {
    id: "descipher-os",
    seoTitle: "Descipher OS: a 0 to 1 brand and GTM launch",
    title: "Launching Descipher OS from zero",
    tag: "0 → 1",
    timeframe: "2025",
    org: "Cloudsheer Consulting",
    summary:
      "A new vertical brand with no name, no positioning and no audience. I defined the GTM from inception and took it to market.",
    context:
      "Cloudsheer wanted a separate vertical brand rather than another service line under the existing name. That meant starting from nothing: who it was for, what it claimed, why anyone would believe it, and where it would show up.",
    built: [
      { step: "Positioning and messaging", detail: "The segment, the alternative we displaced, and the claim we could defend" },
      { step: "The full GTM plan", detail: "Channel selection, sequencing, and what counted as a signal worth chasing" },
      { step: "Digital presence from scratch", detail: "Somewhere to land traffic on day one" },
      { step: "A Middle East partnership motion", detail: "Tested regional demand before committing spend" },
    ],
    outcomes: [
      { value: "0→1", label: "Brand launched from inception" },
      { value: "1", label: "New region opened (Middle East)" },
    ],
    stack: ["Positioning", "Messaging", "Channel strategy", "Partnerships"],
    reflection: "",
    figures: [
      {
        src: "descipher-launch.svg",
        w: 648,
        h: 302,
        diagram: true,
        caption: "Positioning came before anything was built, because it decides what the rest of the sequence is for.",
      },
    ],
  },
  {
    id: "nuvia-engine",
    seoTitle: "AI startup demand gen: 100+ qualified leads",
    title: "An acquisition engine at an AI startup",
    tag: "Demand gen",
    timeframe: "2024 – 2025",
    org: "Nuvia AI",
    summary:
      "Joined as the first GTM hire and built the acquisition function: funnel, campaigns, and the dashboards to tell whether any of it worked.",
    context:
      "Nuvia had a product and no repeatable way to get in front of buyers. As founding GTM I owned finding the segments worth serving, then building something that could run more than once.",
    built: [
      { step: "Mapped the funnel", detail: "Found three leverage points where qualified volume was leaking" },
      { step: "Multi-channel campaigns", detail: "Five priority segments across three regions" },
      { step: "Eight performance dashboards", detail: "Campaign decisions made on data rather than instinct" },
      { step: "Competitive analysis", detail: "Five competitors, feeding positioning and two strategic calls" },
    ],
    outcomes: [
      { value: "100+", label: "Qualified leads in 6 months" },
      { value: "+25%", label: "Conversion lift" },
      { value: "+30%", label: "Engagement lift" },
      { value: "+30%", label: "Reporting efficiency from dashboards" },
    ],
    stack: ["HubSpot", "Apollo", "Clay", "Tableau", "SQL"],
    reflection: "",
    figures: [
      {
        src: "nuvia-funnel.svg",
        w: 648,
        h: 208,
        diagram: true,
        caption: "Finding where qualified volume leaked came before spending more on traffic.",
      },
    ],
  },
  {
    id: "job-pipeline",
    seoTitle: "AI job search pipeline with Claude and Python",
    title: "A GTM pipeline I built for myself",
    tag: "Automation",
    timeframe: "2025",
    org: "Personal",
    summary:
      "A daily job that scans public ATS boards, scores every role against my resume with an LLM, drafts a tailored cover note for strong fits, and emails me a digest. Same shape as any outbound engine, except the ICP happens to be me.",
    context:
      "Job hunting is an outbound problem in reverse: a noisy top of funnel, a scoring step, a personalisation step, and a review queue. I would rather build the machine once than do the work daily.",
    built: [
      { step: "Board API fetchers", detail: "Greenhouse · Lever · Ashby · Workable · RemoteOK. No scraping, no LinkedIn." },
      { step: "Normalise and dedupe", detail: "A local database, so a role is never surfaced twice" },
      { step: "A deterministic prefilter", detail: "Remote, seniority, title. Runs before any model call, so the expensive step only sees candidates worth scoring." },
      { step: "LLM scoring", detail: "Against a rubric built from my actual resume, with a tunable fit threshold" },
      { step: "Drafting for strong fits only", detail: "A tailored cover note, then a single digest email" },
      { step: "Scheduled on GitHub Actions", detail: "Draft mode by design. Nothing is ever submitted without me reading it." },
    ],
    outcomes: [
      { value: "5", label: "Job sources unified into one queue" },
      { value: "Daily", label: "Runs unattended on GitHub Actions" },
      { value: "0", label: "Auto-submitted applications, review is mandatory" },
    ],
    stack: ["Python", "Claude API", "SQLite", "GitHub Actions", "SMTP"],
    reflection:
      "The deterministic filter before the model call was the decision that made it viable, because scoring every role with an LLM would have cost more than it saved. Cheap filters first, expensive judgement last, is a rule I now apply to most pipelines.",
    figures: [
      {
        src: "job-pipeline-architecture.svg",
        w: 640,
        h: 300,
        caption: "fetchers → normalise/dedupe → filter → score → draft → digest",
        diagram: true,
      },
    ],
  },
];
