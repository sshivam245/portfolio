# Design direction — technical dossier

Portfolio for Shivam Goel. Audience: hiring managers and founders at startups
recruiting for GTM Engineer / Growth Engineer / Founding GTM roles.

The job of this site is to make someone believe **"this person builds systems,"**
not **"this person writes strategy decks."** Every decision below serves that.

---

## The banned list

These are the tells that make a site read as AI-generated. Do not reintroduce them.

- Centered hero with a giant name and a gradient headline
- "Available for opportunities" pills, pulsing green status dots
- Typing / rotating word animations
- `glass-card`, `backdrop-blur`, translucent floating panels
- Indigo → purple → cyan gradients (or any gradient on text)
- Three feature cards in a row, each with one icon at the top
- `rounded-2xl` on everything; drop shadows used for hierarchy
- Inter as the typeface
- Scroll indicators, floating background particles, animated blobs
- Vague verbs with no object: "Let's Build Something", "Crafting Experiences"

If a section feels like it needs a card, it usually needs a **rule** instead.

---

## Principles

1. **Evidence over adjectives.** A number with its mechanism beats any claim.
   `+15% generative-search traffic` is worth more than "growth expert".
2. **Structure is the decoration.** Hierarchy comes from type scale, rules, and
   whitespace — never from shadows, borders-as-boxes, or color fills.
3. **Density is a feature.** This is a dossier. A hiring manager should be able
   to scan the whole thing in 40 seconds and find proof in 10 more.
4. **Motion is for orientation, not delight.** Opacity and 4–8px translate only.
   No parallax, no scroll-jacking, no staggered reveals longer than 200ms.

---

## Type

Three families, all free on Google Fonts, deliberately not Inter/Geist.

| Role | Family | Notes |
|---|---|---|
| Display — h1, case-study & post titles, wordmark | **Instrument Serif 400** | The voice of the page. Low weight, tight tracking, italic for emphasis |
| Body, sub-headings | **IBM Plex Sans** | Technical heritage, recedes behind the display face |
| Labels, metrics, meta | **IBM Plex Mono** | All caps, `0.12em` tracking, for anything machine-ish |

The serif is doing the same job Syne does on kevinshelly.com and Instrument
Serif does on abhijeet-patil.com: a dossier built only from a neutral sans
reads as competent and anonymous. The contrast between a serif display and
mono labels is what gives it a voice.

**Oversized type is the only ornament.** The `Shivam Goel` wordmark at `15vw`
in `text-ink/[0.09]` closes the page. At that scale type stops being text and
becomes graphic — the cheapest way to look designed without adding decoration.

**Scale** (rem, 1rem = 16px):

```
display   3.5    600   -0.03em   headline only
h1        2.25   600   -0.02em
h2        1.5    600   -0.015em  section titles
h3        1.125  600   -0.01em   case study / role titles
body      1.0    400    0        max-width 68ch
small     0.875  400    0        captions, secondary
label     0.75   500    0.08em   MONO, UPPERCASE
metric    2.75   600   -0.02em   MONO, tabular-nums
```

Numbers always use `font-variant-numeric: tabular-nums` so columns align.

---

## Color

Warm paper, not blue-grey. One accent, used sparingly — if everything is
accented, nothing is.

```
              light         dark
--paper       #FBFBF9       #0C0C0E
--ink         #16161A       #E8E8E3
--ink-muted   #6B6B72       #8A8A93
--rule        #E2E1DC       #26262B     hairline borders
--accent      #B4451F       #E8703A     burnt orange
--accent-dim  #F5EDE9       #2A1A13     accent wash, used ~twice per page
```

Accent is allowed on: active nav item, link underlines, the single most
important metric per section, and section index numbers. Nowhere else.

**No gradients anywhere.** Not on text, not on backgrounds, not on borders.

---

## Layout

- 12-column grid, `1200px` max, `24px` gutters (`16px` under 640px).
- **Left-aligned, always.** Centered text is banned outside the footer.
- Sections separated by `1px solid var(--rule)`, not by whitespace alone.
- Section headers use a mono index: `01 — SELECTED WORK`.
- Metrics live in real definition lists / tables with aligned columns, never in cards.
- Case studies: two-column on desktop — narrative left (68ch), evidence rail right.

---

## Motion

Three pieces, in order of how much they matter:

1. **Masthead entrance** (`.rise`) — CSS keyframes, staggered 40/110/180/250ms,
   460ms ease. Runs on load, needs no JS.
2. **Section reveal** (`Reveal.tsx`) — 320ms fade + 14px rise as a section
   scrolls in.
3. **Hover states** — accent hairlines that extend, titles that take the accent
   colour, the portrait desaturating on hover. 150–200ms.

**The reveal must never be able to blank the page.** Two earlier versions of it
failed this: one hid every section in CSS and waited for hydration (blank for
~3s, forever if JS failed); one used `animation-timeline`, which is Chromium
only. The current version renders content visible and arms *only* sections
already below the fold — measured after `document.fonts.ready`, because before
the webfonts settle everything measures as above-the-fold — with a 4s failsafe
that reveals regardless. If you rewrite it, keep that property.

Respect `prefers-reduced-motion: reduce` — it disables all three.

---

## Figures

Real artifacts (dashboard screenshots, workflow captures) go in
`public/figures/`. See `docs/figures.md` for the naming convention and the
checklist to run before publishing a screenshot.

The `<Figure>` component degrades gracefully: if an image is missing it renders
a labelled placeholder frame rather than a broken image. Never fabricate a
screenshot of a real tool — if there's no asset, use a drawn SVG diagram and
label it as a diagram.

---

## Content rules

- Every claim carries a number, a timeframe, or a mechanism. Preferably all three.
- Write in first person, past tense, plain language. No "leveraged", "spearheaded",
  "passionate about", "results-driven".
- Case studies follow: **Context → What I built → Outcome → What I'd do differently.**
  That last section is what separates a real engineer from a résumé.
