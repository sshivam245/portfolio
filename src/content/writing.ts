/**
 * Writing.
 *
 * ⚠️  THE POST BODIES BELOW ARE DRAFTS I DID NOT WRITE.
 *
 * They were generated from Shivam's real projects as a starting point, so the
 * section isn't empty. They are published under his name, so he must read and
 * rewrite them in his own words before this ships. Anything he hasn't reviewed
 * should be marked `draft: true`.
 *
 * A post is either:
 *   - external — set `href`, and the card links out to Medium/LinkedIn/etc.
 *   - local    — set `body`, and it gets its own page at /writing/<slug>.
 *
 * Add a post by appending here. Nothing else needs touching.
 */

export type Post = {
  slug: string;
  title: string;
  /** ISO date — used for sorting and the printed date. */
  date: string;
  /** Where it lives: "LinkedIn", "Medium", or "Here" for local posts. */
  venue: string;
  /** One or two sentences. Shown in the list. */
  blurb: string;
  tags: string[];
  /** External posts: the URL. Omit for local posts. */
  href?: string;
  /** Local posts: paragraphs. Omit for external posts. */
  body?: string[];
  /** Hide from the list without deleting it. */
  draft?: boolean;
};

export const posts: Post[] = [
  {
    slug: "aeo-is-not-seo",
    title: "AEO is not SEO with extra steps",
    date: "2026-08-14",
    venue: "Here",
    blurb:
      "Optimising to be cited by a generative engine is a different job from optimising to rank. What actually changed, and what I did about it.",
    tags: ["AEO", "GEO", "Search"],
    body: [
      "Most of the AEO advice circulating in 2026 is SEO advice with the nouns swapped. It tells you to write good content, add schema, and build authority — which was true before generative search and is true after, and therefore explains nothing about what changed.",
      "Here is what actually changed. A ranking engine returns a list and lets the user choose. A generative engine reads a handful of sources, synthesises an answer, and cites some of them. You are no longer competing for a position. You are competing to be the source that is easiest to lift a defensible sentence from.",
      "That reframing has consequences. Long, hedged, narrative prose is hostile to extraction — there is no clean sentence to quote. Content that states a claim plainly, attributes it, and puts the qualifying detail adjacent rather than tangled through the sentence, is easy to quote. When I restructured our pages around that principle, referrals from AI browsers rose about 15% over the following quarter.",
      "The second consequence is measurement. If you cannot separate AI-browser referrals from conventional organic in your analytics, you cannot tell whether any of this worked, and you will end up arguing from vibes. Splitting that traffic out was the least glamorous part of the project and the part that made the rest of it arguable.",
      "I would treat all of this as provisional. The surface is changing faster than anyone's playbook, mine included. The durable part is the habit: work out what the retrieval mechanism actually rewards, then write for that, rather than inheriting the previous era's checklist.",
    ],
  },
  {
    slug: "cheap-filters-expensive-judgement",
    title: "Cheap filters first, expensive judgement last",
    date: "2026-06-02",
    venue: "Here",
    blurb:
      "A rule I took from building a job-application pipeline that applies to most LLM systems: never let the model see a row a regex could have rejected.",
    tags: ["Automation", "LLM", "Pipelines"],
    body: [
      "I built a pipeline that scans public ATS boards every morning, scores each role against my resume, drafts a cover note for the strong fits, and emails me a digest. The first version scored every job it found with a model call. It worked, and it was obviously never going to be affordable.",
      "The fix was boring and total. Before anything reaches the model, a deterministic filter drops roles that fail on remote status, seniority, or title. These are checks a few lines of Python can make with certainty. They removed the large majority of rows, and the model only ever saw candidates where judgement was genuinely required.",
      "The general form: sort your checks by cost, run them cheapest-first, and let each stage shrink the input to the next. It sounds like something everyone knows. In practice a lot of LLM systems are built the other way round, because handing everything to the model is the path of least resistance while you are still proving the thing works.",
      "The same shape applies to outbound. Firmographic filters before enrichment, enrichment before research, research before a human writes anything. The ICP just happens to be a company instead of me.",
    ],
  },
  {
    slug: "founding-gtm-first-90-days",
    title: "What I actually did in the first 90 days as a founding GTM hire",
    date: "2026-03-19",
    venue: "Here",
    blurb:
      "Not a framework. A record of where the time went when I joined an AI startup with a product and no repeatable way to reach buyers.",
    tags: ["GTM", "0→1", "Founding"],
    draft: true,
    body: [
      "Draft — replace this with the real account.",
    ],
  },
];

/** Published posts, newest first. */
export const publishedPosts = posts
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

/** Local posts only — these get their own generated page. */
export const localPosts = publishedPosts.filter((p) => p.body?.length);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
