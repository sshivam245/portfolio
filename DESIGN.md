# Design direction — the studio sheet

Portfolio for Shivam Goel. Audience: founders and heads of growth hiring for
founding-GTM, growth-engineering and marketing-engineering roles.

Stone stock, ink type, one signal orange: a design studio's presentation
board. The hero says it straight ("Growth, engineered.") and beside it a 3D
funnel, drawn in fine linework, runs on its own. Leads are small ink dots
spiralling down; the visitor is the one orange dot. Every few seconds it sinks
a stage while a progress bar fills, each stage carrying one real result, and
at the bottom it converts and loops.

The funnel is still the argument: the reader is being run through an
acquisition engine, built by the person they are reading about. It is no
longer said out loud.

**Grown-up, not cute.** The build before this one used primary ultramarine
and lemon yellow, a glossy lit funnel with bouncing white balls and a "YOU"
bubble, and the headline "You just entered my funnel." It read as a toy.
Before that, a two-ink print world read as a developer's site. Neither
grammar comes back.

---

## Rules that matter

1. **Three tones down a page, at most.** Stone for almost everything, one
   ink block for the work, the orange close. Stone sections that follow one
   another are ruled apart (`.tone-stone + .tone-stone`), not recoloured.
   Eight colour changes read as a slide deck.
2. **One family, Schibsted Grotesk**, weights 500-600, set tight (display
   -0.045em). No monospace; Tailwind's `mono` key points at the same face. No
   `tnum` on display, metric or `CountUp` figures: in this face it also
   widens the full stop, comma and colon ("68 . 7k", "1 : 1").
3. **Orange is a signal, not a paint.** YOU, the live stage, the progress
   fill, the section dot, the link underline, the button hover, the close.
4. **Nothing tilts, rotates or bounces.** Hover firms a border or fills a pill
   with orange.
5. **One theme.** No dark mode, no toggle; `color-scheme: light`.
6. **Every figure is real**, and the one a stranger can check from outside is
   underlined in orange (`.hl`). It was a filled highlighter box; repeated, it
   read as a trick.
7. **The 3D is never the only place the information lives.** The stage card
   carries every figure as text, and four real buttons reach every stage.

---

## Colour

Edited in **`scripts/tokens.mjs` only.** `npm run tokens` writes it into
`globals.css` and the figure SVGs; `og.mjs` imports it; prebuild fails on
drift.

| Token | Value | Role | On stone |
|---|---|---|---|
| `--paper` | `#ebe8e1` | stone | |
| `--ink` | `#121212` | text | 15.3:1 |
| `--ink-muted` | `#57544d` | secondary text | 6.2:1 |
| `--ink-a` / `--accent` | `#a83a10` | burnt orange: orange text, index numbers | 5.2:1 |
| `--ink-b` / `--zap` | `#e5532d` | signal orange: fills only | 3.1:1 |
| `--block` | `#121212` | the ink sections | |

**Signal orange is 3.1:1 on stone.** Never text there; `tokens:check` greps
for `text-ink-b`. Use `--ink-a` for orange text. On ink, signal orange is
5.0:1 and `.tone-ink` maps `--ink-a` to it.

**Colour blocks re-scope tokens.** `.tone-ink` and `.tone-signal` redefine
`--paper`, `--ink`, `--ink-muted`, `--ink-a`, `--rule` and `--btn-*` inside
the block. Inside `.tone-signal` muted text is solid ink: any tint of ink on
orange drops under 4.5:1.

---

## Components

- **`.btn`**: ink pill, turns signal orange with ink text on hover/focus.
  Stone pill on ink; ink pill on orange.
- **`.btn-ghost`**: outlined pill.
- **`.stage-tag`**: the section marker, a small orange dot and a plain
  label. `display: flex; width: fit-content`, so it never runs onto the
  line of a link above it.
- **`.work-card` / `.post-card`**: 1px border, 14px radius, border firms on
  hover. One column on a phone.
- **`.tool-panel`**: a sheet of lighter stock (white mixed into stone), 1px
  border, 16px radius.
- **`.fp`**: the funnel's progress bar, four segment buttons and a pause
  control. 2px bars, orange fill.
- **`.hl`**: the orange underline. Verification only.

Panel padding is in **px**, not rem: rem padding doubled with 200% text and
pushed panels past a phone screen. `.label` breaks anywhere for the same
reason.

---

## The 3D funnel

Linework, unlit, flat colour. Five ink rings at the stage boundaries (thin
tubes, since WebGL lines are always one pixel), eighteen faint profile lines
down the wall so the shape reads as it turns, ink dots for leads, an orange
sphere for YOU. The rings either side of the live stage turn orange and
heavier, with a faint orange wash between them. The band surfaces are otherwise
invisible pick targets.

**It runs itself.** `FunnelHero` drives the stages from a rAF clock that
writes the progress bar straight to the DOM. Elapsed time is real time
capped at one second. The run holds while off screen, while the tab is
hidden, while the pointer is on the stage card and while focus is in the
controls; the pause button is the WCAG 2.2.2 control. With reduced motion
it never starts.

`src/components/funnel/`: `scene.ts` is plain three.js with no React in it;
`Funnel3D.tsx` loads three.js by dynamic import after paint;
`FlatFunnel.tsx` is the SVG it crossfades over, and what stays if WebGL is
missing, the import fails, or nothing is ready in eight seconds.

- three.js is a lazy chunk. The homepage's first load is ~100 kB.
- The loop runs only while the canvas is on screen and the tab is visible.
- Labels are HTML projected from 3D, anchored off each band's top rim,
  clamped inside the box, hidden below 640px.
- Touch scrolls the page; only a tap picks a band. Mouse can drag to spin.

---

## Still banned

- Primary blue with primary yellow; glossy or lit 3D; stickers and bubbles.
- A joke headline.
- Monospace, terminal prompts, bracketed citations, blueprint grids,
  box-and-arrow decoration.
- Tilt or bounce on hover; filled pills above sections.
- Gradient text, glassmorphism, shadows for hierarchy.
- A dark mode. Typing or rotating word animations.
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
