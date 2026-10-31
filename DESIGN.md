# Design direction — the funnel

Portfolio for Shivam Goel. Audience: founders and heads of growth hiring for
founding-GTM, growth-engineering and marketing-engineering roles.

The site treats the visitor as a lead and walks them down a funnel. The hero
says so out loud — "You just entered my funnel." — and a 3D funnel beside it
drops a YOU marker one stage per press, each stage carrying one real result.
The rest of the homepage is what a funnel does next: the numbers at a glance,
touchpoints (the work, the tools, the person, the reading), and the close.

It is a joke, and it is the argument: the reader is being run through an
acquisition engine, built by the person they are reading about.

This replaced two earlier systems. A cream "technical dossier", and then a
two-ink print world that still read as a developer's site: monospace labels,
a terminal prompt, bracketed citations, a blueprint grid, box-and-arrow
diagrams. **None of that grammar comes back.** This is a marketer's site.

---

## Rules that matter

1. **One big idea per screen.** Few elements, huge type, loud colour. If a
   section needs three competing layers to make its point, it is two
   sections or it is wrong.
2. **No monospace.** One family, Bricolage Grotesque, does display and body
   via its optical-size axis. Tailwind's `mono` key points at it too.
3. **Every figure is real**, and the one a stranger can check from outside
   is marked with the **highlighter** (`.hl`: yellow fill, navy text). Not a
   text colour, so it reads the same on cream, blue and night navy.
4. **The 3D is never the only place the information lives.** The stage card
   beside it carries every figure as text, and four real buttons reach every
   stage by keyboard.

---

## Colour

Edited in **`scripts/tokens.mjs` only.** `npm run tokens` writes it into
`globals.css` and the figure SVGs; prebuild fails on drift.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#fff6e0` | `#0b0b2c` | cream stock / night navy |
| `--ink` | `#0d0d6b` | `#fff6e0` | text |
| `--ink-a` | `#1f1fd1` | `#9e9eff` | structure: links, focus |
| `--ink-b` / `--zap` | `#e4ff3c` | `#e4ff3c` | the live stage, highlights |
| `--block` | `#1f1fd1` | `#1f1fd1` | the blue sections, both themes |

**Colour blocks re-scope tokens.** `.tone-blue` and `.tone-zap` redefine
`--paper`, `--ink`, `--ink-a`, `--rule` and the button colours inside the
block, so components inherit the right colours without props. Blocks
alternate so no two neighbours share a colour.

**Yellow is 1.1:1 on cream.** It is a fill, a highlight and a button colour
there, never text; `tokens:check` greps for `text-ink-b` outside `dark:`.

---

## Components

- **`.btn`** — fat pill that leans on hover. Colour from `--btn-bg/--btn-fg`
  per block: navy on cream, yellow on blue, blue on yellow.
- **`.stage-tag`** — "Touchpoint 1 · The work". Inverts with its block.
- **`.kicker`** — the tilted sticker above a headline.
- **`.work-card` / `.post-card` / `.tool-panel`** — rounded, fat-bordered,
  they lean when pointed at. One column on a phone.
- **`.hl`** — the highlighter. Verification only.

Panel padding is in **px**, not rem: rem padding doubled with 200% text and
pushed panels past a phone screen.

---

## The 3D funnel

`src/components/funnel/`: `scene.ts` is plain three.js with no React in it;
`Funnel3D.tsx` loads three.js by dynamic import after paint and hands the
scene a host; `FlatFunnel.tsx` is the SVG it crossfades over, and what stays
if WebGL is missing, the import fails, or nothing is ready in eight seconds.

- three.js is a lazy chunk (~184 kB gzip). No page references it on first
  load; the homepage's first load is ~100 kB.
- The loop runs only while the canvas is on screen and the tab is visible.
- Labels are HTML projected from 3D each frame, clamped inside the box.
- Reduced motion: no rotation, no particles moving, YOU jumps, render on
  demand.
- Touch scrolls the page; only a tap picks a band. Mouse can drag to spin.

---

## Still banned

- Monospace, terminal prompts, bracketed citations, blueprint grids,
  box-and-arrow decoration — the developer grammar.
- Gradient text, glassmorphism, shadows for hierarchy.
- Typing / rotating word animations.
- Em dashes in rendered copy.
- Invented numbers, testimonials or logos.

---

## What must survive any change

1. **Motion fails open.** Transform-only on content; hidden states added by JS
   after mount; failsafe timers before observers.
2. **`CountUp` does not count.** It renders the authored string.
3. **Accessibility.** 44px tap targets; `:focus-visible` twin for every
   `:hover`; a `prefers-reduced-motion` override for every animation; reflow
   at 375px and 200% text verified on every route.
4. **Static export.** No `next/image`; basePath threaded via `lib/basePath.ts`;
   no `useSearchParams`.
