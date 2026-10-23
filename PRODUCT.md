# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary and, for now, only audience: hiring managers, founders and GTM leads
recruiting for **GTM Engineer, Growth Engineer or Founding GTM** roles, remote.
The reader arrives from a LinkedIn profile link, a CV, or a direct application,
usually already holding a stack of similar candidates. They are scanning to
decide whether to open a conversation, not reading to learn.

The free AEO audit on `/tools/aeo-audit` does collect inbound requests, and real
strangers may submit a URL. They are a genuine secondary reader but **not a
goal**: the tool exists to demonstrate the skill, and leads are a side effect.
No future work should trade clarity for a hiring manager in order to convert a
prospect.

## Product Purpose

A portfolio whose single job is to make a hiring manager believe
**"this person builds systems"** rather than **"this person writes strategy
decks."** Success is an interview, not time on page.

## Positioning

The claim is *marketing engineer*: the work is building the acquisition
machinery, not describing it. The mechanism a neighbouring portfolio cannot
truthfully copy is that **the tools on this site actually run**. `/tools/agent-fit`
answers in the browser with no email and no model call; `/tools/aeo-audit`
routes a real URL to a human-written report. Most portfolios in this category
describe systems that ran somewhere else.

## Operating Context

- Scanned in well under a minute, often on a phone, frequently in a tab beside
  other candidates.
- Reached from LinkedIn, a CV PDF, or a direct link. Rarely found by search.
- The CV (`/resume/shivam-goel-resume.pdf`) is a parallel artifact and must not
  contradict the site.
- Evaluated by people who will click exactly one case study, if any.

## Capabilities and Constraints

- Next.js 14 (App Router) with `output: "export"`. **Static only: there is no
  server, no API route and nowhere to hide a key.** Any feature requiring a
  secret is out of scope unless the hosting model changes.
- Deployed to Vercel at `https://shivamgoel.vercel.app`. A GitHub Pages mirror
  still builds under `/portfolio`; its canonicals point at the Vercel origin so
  the two copies do not compete.
- `basePath` is environment-driven (`NEXT_PUBLIC_BASE_PATH`), read by both
  `next.config.mjs` and `src/lib/basePath.ts`. Both must stay in agreement.
- Vercel serves clean URLs; GitHub Pages does not. `vercel.json` redirects
  `*.html` so one authored href works on both.
- Content lives in `src/content/` (`caseStudies.ts`, `profile.ts`, `writing.ts`)
  and is the single source for the pages, `sitemap.xml`, `llms.txt` and JSON-LD.
  Those generated files can never disagree with the pages by construction.
- 7 case studies, 2 tools, an about page and a writing index.

## Brand Commitments

- Name: Shivam Goel. Wordmark is the name set large, not a logo.
- **No em dashes anywhere user-facing.** This is a standing, confirmed rule: the
  user treats them as an AI tell, and the positioning depends on not reading as
  generated output. Code comments are exempt.
- **Current site prose is AI-drafted placeholder.** Roughly 2,000 words were
  written by the assistant, not the user, who intends to rewrite them. Future
  work must not treat existing copy as a voice reference or as settled.
- The visual system is recorded separately in `DESIGN.md`, including an explicit
  banned list. That file is the authority on anything visual.

## Evidence on Hand

Real and verifiable:

- **Google AI Overview citation** for "salesforce partner miami", plus the #1
  organic result for the same query. Screenshots at
  `public/figures/cloudsheer-ai-overview.png` and
  `public/figures/cloudsheer-search-console.png`.
- Search Console figures for the cloudsheer.com property, 29 May to 28 Aug 2026:
  68.7k impressions, 11,062 in a single day at peak against a ~1.5k baseline.
  **Average CTR is deliberately not reported**, at the user's instruction.
- A real Clay board (`public/figures/gravitee-clay-board.png`,
  `investor-workflow-clay.jpg`) behind the ABM and investor-sourcing studies.
- A live spec-work landing page at `public/demos/gravitee-streamnative.html`,
  carrying a banner stating it is unaffiliated with Gravitee or StreamNative.
  **That attribution must never be removed.**
- Three shipped live links: cloudsheer.com, mintnovalabs.com, and the demo page.
- LinkedIn recognition: *Best of LinkedIn: AI in B2B Marketing, CW 51 to 02*.

Absences that future work must not fabricate:

- **Descipher OS and Nuvia AI state outcomes with no verifiable artefact behind
  them.** The user will supply real figures. Until then the stated numbers stand
  as given and **no new metric may be invented for either**.
- MintNovaLabs metrics are unconfirmed.
- Three blog posts in `src/content/writing.ts` are `draft: true` because the
  assistant wrote them and they would publish under the user's byline. Only the
  Medium post is genuinely the user's.

## Product Principles

1. **Evidence over adjectives.** A number with its mechanism attached beats any
   claim. State the absence rather than reach for a number.
2. **Show the machine running.** Where a thing can be demonstrated instead of
   described, demonstrate it. This is what the positioning rests on.
3. **Density is a feature.** This is a dossier for someone scanning. The reader
   should find the proof in seconds, not be walked through it.
4. **Honesty is load-bearing.** Spec work is labelled spec work, unverified
   numbers are not dressed up, and attribution banners stay. The audience is
   hiring for judgement, and the site is the work sample.
5. **Words stay machine-readable.** The AEO case study is the strongest asset, so
   copy is never baked into images. Retrievable text is a product constraint,
   not just an SEO preference.

## Accessibility & Inclusion

No external standard is contractually required, but the following were
established during the build and must be preserved:

- Tap targets meet WCAG 2.5.8 (44px hit areas via pseudo-elements on small
  labels, so the visual size stays compact).
- WCAG 1.4.10 reflow: no horizontal scroll at 375px or at 200% text zoom. The
  header wraps rather than overflowing.
- `prefers-reduced-motion` disables every animation, including the diagram draw,
  count-ups, orbit rotation and the scroll-progress bar.
- **Every hover state has a `:focus-visible` equivalent.** Keyboard users get the
  same affordances, never a subset.
- Motion is never load-bearing for content: if an animation does not run, the
  content is still visible. This rule exists because a reveal once blanked the
  page and a diagram once stayed invisible.
- Colour is never the only signal; status words sit beside status colours.
