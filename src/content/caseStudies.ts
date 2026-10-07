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
  reflection?: string;
  figures?: Figure[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "mintnovalabs",
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
    id: "aeo-geo",
    title: "Cited by Google's AI Overview",
    tag: "SEO / AEO / GEO",
    timeframe: "2025",
    org: "Cloudsheer Consulting",
    link: {
      href: "https://www.cloudsheer.com/salesforce-consultant-miami",
      label: "cloudsheer.com/salesforce-consultant-miami",
    },
    summary:
      "I built Cloudsheer's site from nothing and owned its search strategy. It now ranks first organically for “salesforce partner miami” and is named directly inside Google's AI Overview for the same query, which is the outcome AEO is actually for.",
    context:
      "Salesforce implementation is expensive to buy keywords in, and buyers increasingly ask an assistant instead of scrolling. If the AI Overview names two firms, the third blue link is invisible. The target was never a position. It was being the source the answer is built from.",
    built: [
      { step: "The site, from zero", detail: "Architecture, pages and copy. Not an optimisation pass on someone else's build." },
      { step: "An entity layer in structured data", detail: "Organization · WebSite · ProfessionalService · BreadcrumbList" },
      { step: "FAQPage schema on the money pages", detail: "An engine assembling an answer wants a question paired with a liftable answer" },
      { step: "Headings as the questions buyers ask", detail: "Each section is a clean extract, not a paragraph to summarise" },
      { step: "Geo pages for Miami and South Florida", detail: "The bilingual angle stated plainly enough to quote. That is the line the AI Overview used." },
      { step: "Referral tracking", detail: "Separates AI-browser traffic from conventional organic, so the effect is measured" },
    ],
    // Search Console figures are for the cloudsheer.com property,
    // 29 May – 28 Aug 2026. Average CTR is deliberately not reported here.
    outcomes: [
      { value: "AI Overview", label: "Named in Google's generative answer for “salesforce partner miami”" },
      { value: "#1", label: "Organic result for the same commercial query" },
      { value: "68.7k", label: "Search impressions in three months" },
      { value: "11,062", label: "Impressions in a single day at peak, from a ~1.5k baseline" },
    ],
    stack: ["Schema.org", "FAQPage", "Local SEO", "Content architecture", "GA4"],
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
        src: "cloudsheer-ai-overview.png",
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
    id: "gravitee-abm",
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
