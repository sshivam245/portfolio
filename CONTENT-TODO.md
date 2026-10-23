# Content you owe

Generated, not written by hand: every block below is text I drafted that sits
on the live site under your name, plus the two outcome figures marked pending
in PRODUCT.md. Nothing here is a suggestion to change the meaning. It is a
list of places where the words are mine and should be yours.

How to use it: write under YOURS for any block you want to replace, leave the
rest alone, and tell me. I will apply them to the content files and deploy.
Blocks you never fill stay exactly as they are.

---

## 1. Outcome figures (PRODUCT.md marks these pending)

These two case studies state outcomes with no artefact behind them. I will not
invent a number for either. Give me a real figure, or say cut and I will remove
the row.

### descipher-os  (`src/content/caseStudies.ts`)

- [0] currently **`0→1`** — Brand launched from inception
      YOURS: 

- [1] currently **`1`** — New region opened (Middle East)
      YOURS: 

### nuvia-engine  (`src/content/caseStudies.ts`)

- [0] currently **`100+`** — Qualified leads in 6 months
      YOURS: 

- [1] currently **`+25%`** — Conversion lift
      YOURS: 

- [2] currently **`+30%`** — Engagement lift
      YOURS: 

- [3] currently **`+30%`** — Reporting efficiency from dashboards
      YOURS: 

---

## 2. Prose I wrote

### aeo-geo — 234 words

**summary** (40w)

> I built Cloudsheer's site from nothing and owned its search strategy. It now ranks first organically for “salesforce partner miami” and is named directly inside Google's AI Overview for the same query, which is the outcome AEO is actually for.

YOURS: 

**context** (46w)

> Salesforce implementation is expensive to buy keywords in, and buyers increasingly ask an assistant instead of scrolling. If the AI Overview names two firms, the third blue link is invisible. The target was never a position. It was being the source the answer is built from.

YOURS: 

**reflection** (47w)

> The thing that moved the needle was not writing more, it was writing shorter. Every claim that got picked up was a sentence that survives being lifted out of its paragraph and still makes sense on its own. Long, hedged prose ranks fine and never gets quoted.

YOURS: 

**built** (6 steps, 101w)

1. **The site, from zero** — Architecture, pages and copy. Not an optimisation pass on someone else's build.
2. **An entity layer in structured data** — Organization · WebSite · ProfessionalService · BreadcrumbList
3. **FAQPage schema on the money pages** — An engine assembling an answer wants a question paired with a liftable answer
4. **Headings as the questions buyers ask** — Each section is a clean extract, not a paragraph to summarise
5. **Geo pages for Miami and South Florida** — The bilingual angle stated plainly enough to quote. That is the line the AI Overview used.
6. **Referral tracking** — Separates AI-browser traffic from conventional organic, so the effect is measured

YOURS: 

### mintnovalabs — 158 words

**summary** (27w)

> A productised outbound agency on a pay-per-result model: offer, pricing, positioning and the site itself. The whole thing is the GTM artefact, not a description of one.

YOURS: 

**context** (34w)

> Outbound agencies sell retainers, which puts the risk on the buyer and rewards activity over meetings booked. I built the company to test the opposite: the client pays only when a qualified meeting lands.

YOURS: 

**built** (6 steps, 97w)

1. **Pay-per-result pricing** — The pricing model is the differentiator, not the copy
2. **Positioning on six failure modes** — Launch time · SDR cost · reply rates · bad data · deliverability · unclear ROI
3. **A four-step delivery process** — Strategy call to booked meetings in 14 days. Repeatable, not bespoke per client.
4. **An ROI calculator on the site** — A prospect prices the offer against their own numbers before talking to me
5. **The service architecture** — List building · SPF, DKIM, DMARC · warmup and rotation · sequences · weekly reporting
6. **The site itself** — Next.js, Tailwind, Framer Motion, deployed from GitHub Actions

YOURS: 

### gravitee-abm — 278 words

**summary** (34w)

> Nobody asked for this. I built a working 1:1 ABM engine for Gravitee, an API management company, and generated a bespoke landing page for one of their target accounts. The pitch was the artefact.

YOURS: 

**context** (63w)

> API management is sold to technical buyers allergic to generic outbound. A cold email naming the wrong runtime is worse than no email, so the research has to be real and per-account, which is the part that does not scale by hiring SDRs. I built the engine I would have built if Gravitee had hired me, and ran it on a real target.

YOURS: 

**reflection** (79w)

> Spec work is the most honest sales pitch available: it removes the argument about whether you could do the thing. The risk is building something impressive that solves a problem the target does not have, which is why the first four research columns are about qualifying the account rather than flattering it. If I ran this again I would generate a landing page only for tier-one accounts. Generating one per row is a nice demo and a bad budget.

YOURS: 

**built** (6 steps, 102w)

1. **Two linked Clay tables** — Companies on an API-platform and cloud-infrastructure ICP, and the technical executives inside them
2. **34 enrichment columns** — Including a technology-stack lookup: the whole pitch depends on what they actually run
3. **Research that produces judgement** — API Infrastructure Pain Point · Why This Account · Gravitee Relevance · Account Tier
4. **A people layer** — Resolves the right technical executives per account and joins them back to the research
5. **Grounded drafting** — Opener and cold email built on that account's stack rather than a merge field
6. **A personalised HTML landing page** — One per account. StreamNative's names AWS, GCP, Azure, Alibaba, Istio, Envoy and Cloudflare.

YOURS: 

### investor-sourcing — 291 words

**summary** (30w)

> A Clay workflow that turns one startup profile into a ranked investor pipeline with outreach already written: research, thesis fit, partner selection, enrichment and personalisation in a single automated run.

YOURS: 

**context** (52w)

> Founders raise the way bad SDRs prospect: a long list, the same deck, and hope. The expensive part is not the sending, it is the judgement before it. Which firms invest at this stage, which partner owns the thesis, whether they already backed a competitor. Skipping that is what makes outreach ignorable.

YOURS: 

**reflection** (93w)

> Two things earn their place. The portfolio check, because sourcing and enrichment are commodities, every tool does them, and deciding whether a partner has already backed an adjacent company is the judgement a founder would apply if they had the hours. And the Python step, because the moment real data arrives the tidy no-code path breaks: three sources spell the same firm three ways, and no amount of prompt-writing fixes a dedupe. Automating the judgement is the point; being willing to drop into code is what makes it survive contact with the data.

YOURS: 

**built** (6 steps, 116w)

1. **Read our positioning** — One input. The startup's own profile drives everything downstream.
2. **Research investor firms** — Filtered to a matching thesis. A partner who already backed an adjacent company is a conflict, not a lead.
3. **Find partners at firm** — Funds do not write cheques, partners do. Runs per firm to resolve who owns the thesis.
4. **Build investor list** — A Python handler I wrote inside Clay: normalises firm names and walks nested people objects, because the sources disagree and dedupe fails without it.
5. **Find investor work email** — The pipeline ends with a reachable person rather than a firm name
6. **Draft email and LinkedIn** — Written from both sides of the match: the startup's specifics and the partner's own portfolio

YOURS: 

### descipher-os — 113 words

**summary** (23w)

> A new vertical brand with no name, no positioning and no audience. I defined the GTM from inception and took it to market.

YOURS: 

**context** (38w)

> Cloudsheer wanted a separate vertical brand rather than another service line under the existing name. That meant starting from nothing: who it was for, what it claimed, why anyone would believe it, and where it would show up.

YOURS: 

**built** (4 steps, 52w)

1. **Positioning and messaging** — The segment, the alternative we displaced, and the claim we could defend
2. **The full GTM plan** — Channel selection, sequencing, and what counted as a signal worth chasing
3. **Digital presence from scratch** — Somewhere to land traffic on day one
4. **A Middle East partnership motion** — Tested regional demand before committing spend

YOURS: 

### nuvia-engine — 97 words

**summary** (23w)

> Joined as the first GTM hire and built the acquisition function: funnel, campaigns, and the dashboards to tell whether any of it worked.

YOURS: 

**context** (33w)

> Nuvia had a product and no repeatable way to get in front of buyers. As founding GTM I owned finding the segments worth serving, then building something that could run more than once.

YOURS: 

**built** (4 steps, 41w)

1. **Mapped the funnel** — Found three leverage points where qualified volume was leaking
2. **Multi-channel campaigns** — Five priority segments across three regions
3. **Eight performance dashboards** — Campaign decisions made on data rather than instinct
4. **Competitive analysis** — Five competitors, feeding positioning and two strategic calls

YOURS: 

### job-pipeline — 215 words

**summary** (43w)

> A daily job that scans public ATS boards, scores every role against my resume with an LLM, drafts a tailored cover note for strong fits, and emails me a digest. Same shape as any outbound engine, except the ICP happens to be me.

YOURS: 

**context** (35w)

> Job hunting is an outbound problem in reverse: a noisy top of funnel, a scoring step, a personalisation step, and a review queue. I would rather build the machine once than do the work daily.

YOURS: 

**reflection** (43w)

> The deterministic filter before the model call was the decision that made it viable, because scoring every role with an LLM would have cost more than it saved. Cheap filters first, expensive judgement last, is a rule I now apply to most pipelines.

YOURS: 

**built** (6 steps, 94w)

1. **Board API fetchers** — Greenhouse · Lever · Ashby · Workable · RemoteOK. No scraping, no LinkedIn.
2. **Normalise and dedupe** — A local database, so a role is never surfaced twice
3. **A deterministic prefilter** — Remote, seniority, title. Runs before any model call, so the expensive step only sees candidates worth scoring.
4. **LLM scoring** — Against a rubric built from my actual resume, with a tunable fit threshold
5. **Drafting for strong fits only** — A tailored cover note, then a single digest email
6. **Scheduled on GitHub Actions** — Draft mode by design. Nothing is ever submitted without me reading it.

YOURS: 

### about page — 109 words

**about[0]** (53w)

> I work at the seam between growth and engineering. Most of what I do ends up as a system someone else can run: a lead pipeline that scores and routes on its own, a dashboard that answers the question before it gets asked, a launch checklist that survives the person who wrote it.

YOURS: 

**about[1]** (56w)

> I started in IT and cybersecurity, spent a summer as a UX designer, and ended up in GTM. That path is why I reach for SQL and automation before I reach for a deck. Right now I'm looking for a founding-GTM or growth-engineering role at a company early enough that building the machine is the job.

YOURS: 

---

## 3. Unpublished drafts (3)

I wrote these. They are `draft: true` so they do not publish under your byline.
Rewrite, bin, or leave them unpublished.

- `aeo-is-not-seo` — AEO is not SEO with extra steps (25w blurb)
- `cheap-filters-expensive-judgement` — Cheap filters first, expensive judgement last (27w blurb)
- `founding-gtm-first-90-days` — What I actually did in the first 90 days as a founding GTM hire (26w blurb)

---

Total prose attributable to me: ~1495 words across 7 case studies and the about page.
