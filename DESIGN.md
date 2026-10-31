# Design direction — the funnel

Portfolio for Shivam Goel. Audience: founders and heads of growth hiring for
founding-GTM, growth-engineering and marketing-engineering roles.

The site treats the visitor as a lead and walks them down a funnel. The hero
says so out loud — "You just entered my funnel." — and a 3D funnel beside it
runs on its own: a YOU marker sinks one stage every few seconds while a
progress bar fills, each stage carrying one real result, and at the bottom
it converts and loops.
The rest of the homepage is what a funnel does next: the numbers at a glance,
touchpoints (the work, the tools, the person, the reading), and the close.

It is a joke, and it is the argument: the reader is being run through an
acquisition engine, built by the person they are reading about.

**Restraint is the rule.** The first funnel build read as AI-generated:
tilted sticker labels, a filled pill above every section, buttons and cards
that rotated on hover, a jokey headline on every block, acid lime on
ultramarine in an extra-bold display face. The concept stays; the
execution is quiet. One joke, in the hero. Everything below it says plainly
what it is.

This replaced two earlier systems. A cream "technical dossier", and then a
two-ink print world that still read as a developer's site: monospace labels,
a terminal prompt, bracketed citations, a blueprint grid, box-and-arrow
diagrams. **None of that grammar comes back.** This is a marketer's site.

---

## Rules that matter

1. **One big idea per screen.** Few elements, huge type, loud colour. If a
   section needs three competing layers to make its point, it is two
   sections or it is wrong.
2. **One family, Schibsted Grotesk**, display and body, weights 500-700. No
   monospace; Tailwind's `mono` key points at the same face. No `tnum` on
   display or metric styles: in this face it also widens the colon and full
   stop ("1 : 1", "funnel .").
3. **Nothing tilts, rotates or bounces.** Hover is a 1px lift, a darker
   fill, a border change, an arrow that slides 3px.
4. **One theme.** There is no dark mode and no toggle; `color-scheme: light`
   keeps native controls light when the OS is dark.
5. **Every figure is real**, and the one a stranger can check from outside
   is marked with the **highlighter** (`.hl`: yellow fill, navy text). Not a
   text colour, so it reads the same on cream, blue and night navy.
6. **The 3D is never the only place the information lives.** The stage card
   beside it carries every figure as text, and four real buttons reach every
   stage by keyboard.

---

## Colour

Edited in **`scripts/tokens.mjs` only.** `npm run tokens` writes it into
`globals.css` and the figure SVGs; prebuild fails on drift.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#fbf8f1` | paper stock |
| `--ink` | `#15153a` | text |
| `--ink-a` | `#2424c8` | structure: links, focus |
| `--ink-b` / `--zap` | `#ffd60a` | the live stage, highlights |
| `--block` | `#2424c8` | the blue sections |

The yellow is warm on purpose: the acid lime it replaced was the colour of
the 2025 template landing page.

**Colour blocks re-scope tokens.** `.tone-blue` and `.tone-zap` redefine
`--paper`, `--ink`, `--ink-a`, `--rule` and the button colours inside the
block, so components inherit the right colours without props. Blocks
alternate so no two neighbours share a colour.

**Yellow is ~1.3:1 on paper.** It is a fill, a highlight and a button colour
there, never text; `tokens:check` greps for `text-ink-b` outside `dark:`.

---

## Components

- **`.btn`** — 10px radius. Colour from `--btn-bg/--btn-fg` per block: ink on
  paper, yellow on blue, blue on yellow. Lifts 1px on hover.
- **`.stage-tag`** — the section marker: a short rule in `--ink-a`, then a
  small tracked label. It replaced a filled pill.
- **`.work-card` / `.post-card` / `.tool-panel`** — 1px border, 16-20px
  radius, border darkens on hover. One column on a phone.
- **`.fp`** — the funnel's progress bar: four segment buttons and a pause
  control.
- **`.hl`** — the highlighter. Verification only.

Panel padding is in **px**, not rem: rem padding doubled with 200% text and
pushed panels past a phone screen.

---

## The 3D funnel

**It runs itself.** `FunnelHero` drives the stages from a rAF clock that
writes the progress bar straight to the DOM, so React re-renders four times
a cycle rather than sixty times a second. Elapsed time is real time capped
at one second, so a throttled tab still advances at the right speed. The
run holds while off screen, while the tab is hidden, while the pointer is on
the stage card and while focus is in the controls; the pause button is the
WCAG 2.2.2 control. The stage card's live region is off while it runs and
polite when the reader is driving. With reduced motion it never starts.

`src/components/funnel/`: `scene.ts` is plain three.js with no React in it;
`Funnel3D.tsx` loads three.js by dynamic import after paint and hands the
scene a host; `FlatFunnel.tsx` is the SVG it crossfades over, and what stays
if WebGL is missing, the import fails, or nothing is ready in eight seconds.

- three.js is a lazy chunk (~184 kB gzip). No page references it on first
  load; the homepage's first load is ~100 kB.
- The loop runs only while the canvas is on screen and the tab is visible.
- Labels are HTML projected from 3D each frame, anchored off each band's
  top rim and clamped inside the box; hidden below 640px, where the rim
  fills the box and the progress bar names the stages.
- Reduced motion: no rotation, no particles moving, YOU jumps, render on
  demand.
- Touch scrolls the page; only a tap picks a band. Mouse can drag to spin.

---

## Still banned

- Monospace, terminal prompts, bracketed citations, blueprint grids,
  box-and-arrow decoration — the developer grammar.
- Stickers, pills above sections, tilt or bounce on hover, a joke per
  section.
- Gradient text, glassmorphism, shadows for hierarchy.
- A dark mode.
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
