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
};

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
  built: string[];
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
      "A productised outbound agency on a pay-per-result model — offer, pricing, positioning and the site itself. The whole thing is the GTM artefact, not a description of one.",
    context:
      "Outbound agencies mostly sell retainers, which puts the risk on the buyer and rewards activity over meetings booked. I wanted to test whether the opposite offer — the client pays only when a qualified meeting lands — could be packaged tightly enough to sell without a sales team, and built the company to find out.",
    built: [
      "The offer itself: pay-per-result rather than a retainer, so the pricing model is the differentiator rather than the copy.",
      "Positioning and messaging built around six specific failure modes of in-house outbound — time to launch, SDR cost, reply rates, bad data, deliverability, unclear ROI — so the pitch names the buyer's problem before naming the service.",
      "A four-step delivery process, from strategy call to booked meetings in 14 days, defined tightly enough to be repeatable rather than bespoke per client.",
      "An interactive ROI calculator on the site, so a prospect can price the offer against their own numbers before ever talking to me.",
      "The service architecture behind it: list building and verification, domain and deliverability setup (SPF/DKIM/DMARC, warmup, rotation), multi-step sequences, and weekly reporting.",
      "The site itself — Next.js, Tailwind and Framer Motion, deployed from GitHub Actions.",
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
      { src: "mintnova-home.png", caption: "The offer, the process, and the ROI calculator." },
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
      "I built Cloudsheer's site from nothing and owned its search strategy. It now ranks first organically for “salesforce partner miami” and is named directly inside Google's AI Overview for the same query — the outcome AEO is actually for.",
    context:
      "Salesforce implementation is a crowded, expensive category to buy keywords in, and a growing share of buyers were asking an assistant instead of scrolling results. Ranking was no longer sufficient: if the AI Overview answers the question and names two firms, being the third blue link is being invisible. So the target was not a position — it was being the source the answer is assembled from.",
    built: [
      "The site itself, from zero — architecture, pages and copy, not just an optimisation pass on someone else's build.",
      "An entity layer in structured data: Organization, WebSite, ProfessionalService and BreadcrumbList, so the firm is machine-legible as a specific local business rather than a set of pages.",
      "FAQPage schema on the money pages. An answer engine assembling a response wants a question paired with a short, liftable answer, and this hands it exactly that.",
      "Headings written as the questions buyers actually ask — “what we deliver for Miami teams”, “how we wire your whole stack together” — so each section is a clean extract rather than a paragraph to summarise.",
      "Geo-specific pages targeting Miami and South Florida intent, with the bilingual English-Spanish angle stated plainly enough to be quoted, which is the line the AI Overview ended up using.",
      "Tracking that separates AI-browser referrals from conventional organic, so the effect is measurable rather than assumed.",
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
        src: "cloudsheer-ai-overview.png",
        caption:
          "Google AI Overview for “salesforce partner miami”, citing Cloudsheer alongside the #1 organic result.",
      },
      {
        src: "cloudsheer-search-console.png",
        caption:
          "Search Console, 29 May – 28 Aug 2026: 68.7k impressions, with the step-change at the end of August.",
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
      "A Clay workflow that turns one startup profile into a ranked investor pipeline with outreach already written — research, thesis fit, partner selection, enrichment and personalisation in a single automated run.",
    context:
      "Founders raise the way bad SDRs prospect: a long list, the same deck, and hope. The expensive part isn't sending the emails, it's the judgement before them — which firms actually invest at this stage in this space, which partner owns the thesis, and whether they've already backed a competitor. That research is what founders skip when they're busy, and skipping it is what makes the outreach ignorable. It is an outbound problem, so I built it like one.",
    // Step names below match the actual Clay canvas in the screenshot, so a
    // reader comparing the two finds them consistent.
    built: [
      "“Read our positioning” — one input. The startup's own profile drives everything downstream, so a founder isn't assembling a list by hand before the automation can help.",
      "“Research investor firms” — sources firms against that space and stage, filtering the universe to investors whose thesis actually matches rather than every fund in a directory. Prior investments are checked here: a partner who has already backed an adjacent company is a conflict, not a lead.",
      "“Find partners at firm” — funds don't write cheques, partners do. Runs per firm to resolve who owns the relevant thesis.",
      "“Build investor list” — a Python handler I wrote inside Clay rather than a drag-and-drop step. It normalises firm names against a stopword list (“partners”, “vc”, “fund”, “group”, “management”, “llc”) and walks nested people objects, because the enrichment sources disagree about how a firm is spelled and dedupe fails without it.",
      "“Find investor work email” — contact enrichment per partner, so the pipeline ends with a reachable person rather than a firm name.",
      "“Draft email and LinkedIn” — personalised drafts written from both sides of the match: the startup's specifics and the partner's own portfolio, so the opening line has a real reason to exist.",
    ],
    // Mechanism only for now; no outcome metrics supplied yet.
    outcomes: [
      { value: "1 input", label: "A startup profile drives the entire pipeline" },
      { value: "8 steps", label: "Positioning → firms → partners → list → email → drafts" },
      { value: "2×", label: "Built for myself, then replicated for a seed-stage client" },
    ],
    stack: ["Clay", "Claygent", "Python", "Enrichment waterfalls", "LinkedIn", "Email"],
    reflection:
      "Two things earn their place. The portfolio check, because sourcing and enrichment are commodities — every tool does them — and deciding whether a partner has already backed an adjacent company is the judgement a founder would apply if they had the hours. And the Python step, because the moment real data arrives the tidy no-code path breaks: three sources spell the same firm three ways, and no amount of prompt-writing fixes a dedupe. Automating the judgement is the point; being willing to drop into code is what makes it survive contact with the data.",
    figures: [
      {
        src: "investor-workflow-clay.jpg",
        caption:
          "The workflow in Clay, with the Python handler behind “Build investor list”.",
      },
      {
        src: "investor-workflow.svg",
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
      "Positioning and messaging: the segment, the alternative we were displacing, and the claim we could actually defend.",
      "The full GTM plan — channel selection, sequencing, and what counted as a signal worth chasing.",
      "The digital presence from scratch, so the brand had somewhere to land traffic on day one.",
      "An early partnership motion in the Middle East to test regional demand before committing spend.",
    ],
    outcomes: [
      { value: "0→1", label: "Brand launched from inception" },
      { value: "1", label: "New region opened (Middle East)" },
    ],
    stack: ["Positioning", "Messaging", "Channel strategy", "Partnerships"],
    reflection: "",
    figures: [
      { src: "descipher-positioning.png", caption: "Positioning and messaging architecture." },
    ],
  },
  {
    id: "nuvia-engine",
    title: "An acquisition engine at an AI startup",
    tag: "Demand gen",
    timeframe: "2024 — 2025",
    org: "Nuvia AI",
    summary:
      "Joined as the first GTM hire and built the acquisition function: funnel, campaigns, and the dashboards to tell whether any of it worked.",
    context:
      "Nuvia had a product and no repeatable way to get in front of buyers. As founding GTM I owned finding the segments worth serving, then building something that could run more than once.",
    built: [
      "Mapped the funnel and found 3 leverage points where qualified volume was leaking.",
      "Ran multi-channel campaigns against 5 priority segments across 3 regions.",
      "Built 8+ performance dashboards so campaign decisions were made on data rather than instinct.",
      "Competitive analysis across 5 competitors that fed directly into positioning and two major strategic calls.",
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
      { src: "nuvia-funnel.png", caption: "Funnel leverage points and campaign performance." },
    ],
  },
  {
    id: "job-pipeline",
    title: "A GTM pipeline I built for myself",
    tag: "Automation",
    timeframe: "2025",
    org: "Personal",
    summary:
      "A daily job that scans public ATS boards, scores every role against my resume with an LLM, drafts a tailored cover note for strong fits, and emails me a digest. Same shape as any outbound engine — the ICP just happens to be me.",
    context:
      "Job hunting is an outbound problem in reverse: a noisy top of funnel, a scoring step, a personalisation step, and a review queue. I'd rather build the machine once than do the work daily — and it's the most direct proof I can offer that I build GTM systems rather than describe them.",
    built: [
      "Fetchers against the public Greenhouse, Lever, Ashby and Workable board APIs, plus RemoteOK. No scraping, no LinkedIn.",
      "A normalise-and-dedupe layer with a local database, so a role is never surfaced twice.",
      "A cheap deterministic filter (remote, seniority, title) before any model call — the expensive step only sees candidates worth scoring.",
      "An LLM scoring pass against a rubric built from my actual resume, with a tunable fit threshold.",
      "A drafting pass that writes a tailored cover note for strong fits only, then emails a single digest.",
      "Scheduled on GitHub Actions. Draft mode by design — nothing is ever submitted without me reading it.",
    ],
    outcomes: [
      { value: "5", label: "Job sources unified into one queue" },
      { value: "Daily", label: "Runs unattended on GitHub Actions" },
      { value: "0", label: "Auto-submitted applications — review is mandatory" },
    ],
    stack: ["Python", "Claude API", "SQLite", "GitHub Actions", "SMTP"],
    reflection:
      "The deterministic filter before the model call was the decision that made it viable — scoring every role with an LLM would have cost more than it saved. Cheap filters first, expensive judgement last, is a rule I now apply to most pipelines.",
    figures: [
      {
        src: "job-pipeline-architecture.svg",
        caption: "fetchers → normalise/dedupe → filter → score → draft → digest",
        diagram: true,
      },
    ],
  },
];
