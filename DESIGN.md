# Design direction — two inks, out of register

Portfolio for Shivam Goel. Audience: hiring managers and founders at startups
recruiting for GTM Engineer / Growth Engineer / Founding GTM roles.

The job of this site is to make someone believe **"this person builds systems,"**
not **"this person writes strategy decks."** Every decision below serves that.

This replaced a near-monochrome technical dossier — cream paper, one orange
accent, hairlines instead of containers, a serif/mono pair. That system was
correct and competent and read as a template, which is a direction problem
rather than a polish problem. The old banned list is retired with it; the
constraints below are the live ones.

---

## The world

**Two spot inks on uncoated stock, printed slightly out of register.**

The thesis is one sentence: *the third colour is not chosen, it is what the two
plates do where they overlap.* So the overlap means something, and it means the
same thing everywhere it appears.

Why this world and not another: the strongest single fact on this site is that
a page built here became the answer Google's AI Overview gives, with a citation
pointing back. The site is therefore built out of **citation** — the superscript
bracket, the numbered source, the mark for "you can check this from outside."
A printed page is the only material where a citation is native rather than
borrowed, and where two overlapping inks can carry an argument. Tube maps,
terminal output and dashboards were all considered and are all either saturated
in this category or, in the case of a dashboard, require invented data.

---

## Colour

Edited in **`scripts/tokens.mjs` only**. `npm run tokens` writes it into
`globals.css` (between sentinels) and into every figure SVG; `npm run
tokens:check` runs in prebuild and fails the build if a consumer drifted. There
is no second place to change a colour. There used to be three, and two of them
had already drifted.

| Token | Light | Dark | What it is for |
|---|---|---|---|
| `--paper` | `#efe9dd` | `#15131a` | the stock |
| `--ink` | `#16161a` | `#f0ecf5` | soot; body and display |
| `--ink-muted` | `#5a5460` | `#9a93a8` | soot, let down |
| `--rule` | `#cdc4b2` | `#2e2838` | a pressed hairline |
| `--ink-a` | `#1b30f0` | `#6b78ff` | **plate A.** Structure |
| `--ink-b` | `#ff3d8f` | `#ff5fa2` | **plate B.** Never small text in light |
| `--accent` | `#6b1f9e` | `#b47de8` | **the overlap.** Verification only |
| `--grid` | blue 5% | pink 4.5% | the dot screen |

### The two rules that matter

**1. `--accent` marks a claim a stranger can confirm from outside this site.**
Nothing else. Not a hover, not a focus ring, not a separator, not a section
number, not an error. It was spent 92 times across the codebase before this
redesign, which made it a brand colour and put the AI Overview citation at
exactly the weight of a conversion lift `PRODUCT.md` records as unconfirmed.
It now appears at seven sites: the verified source in the hero, the Verifiable
tag and verified value in the work index, and the live links.

Everything structural — links, focus rings, hovers, citations, diagram
connectors, carets, section indices, the OG grid — is **`--ink-a`**.

**2. `--ink-b` is 2.8:1 on light stock.** That is a real fluorescent ink and it
is genuinely unreadable at text sizes on cream, exactly as it would be on
press. It is a plate, a fill and a rule colour. It is never small text in light
mode, and `npm run tokens:check` greps for `text-ink-b` outside a `dark:`
prefix and fails the build.

Measured contrasts, light stock: ink 14.6, muted 6.1, ink-a 6.4, accent 7.6,
ink-b **2.8**. Dark stock: ink 16.9, muted 6.3, ink-a 5.1, ink-b 6.6,
accent 6.3.

---

## Type

| Face | Role | Notes |
|---|---|---|
| **Anton** | display, and every figure | one weight, on purpose |
| **Archivo** | body, UI | 400/500/600/700 |
| **IBM Plex Mono** | labels, diagram labels, citations | |

Anton has one weight by design. A condensed poster face with a weight axis
invites a hierarchy built from weight, and this system builds hierarchy from
size and from **which plate a thing is printed on**.

A figure on this site is a solid area of ink, so the whole metric scale is
Anton, not the mono. Size may vary across the metric classes; face may not —
the index once reached for the display face on long values and the mono on
short ones, so the typeface changed with the length of the string.

**Anton stops at Latin-1.** It has no U+2192, and the `0→1` metric would fall
through to a system face mid-number, so the `display` stack names the mono
second. Per-glyph fallback keeps the digits either side in Anton.

The `.t-*` classes live in `globals.css` rather than Tailwind `fontSize`
tokens because a token cannot carry a breakpoint.

---

## The signature moves

**The two plates.** Display type is printed twice: the soot plate, and a second
plate in `--ink-b` a hair off register. The offset is in `em` so it scales with
the headline — at 52px a fixed 5px offset is twice the misregistration it is at
88px and stops reading as printing. Light overprints with `multiply`; dark puts
the plate behind, because multiply against a dark ground turns pink to mud.

Both plates must render from **one source**. The ghost is `aria-hidden`,
unselectable and pointer-none, and its own citations are hidden with
`visibility`, never `display` — it exists to break lines in exactly the same
places as the live headline, and removing a bracket from the flow changes where
it breaks.

**The citation.** `[1]` in mono on plate A, as a real anchor into the source it
names. Pointing at one lights its source. This is the site's one notation for
"a thing you can go to", which is why section indices are bracketed too.

**The registration crosshair.** A printer's alignment mark, used only beside a
claim that can be checked from outside, always in `--accent`.

**The register shift.** A control that responds moves a plate rather than
changing colour — see `.btn`. Every colour a button could swap to fails
somewhere; moving a plate leaves the text on its own background, so contrast
never changes.

---

## Still banned

The old list is retired, but these are not tells of a style, they are tells of
not having decided:

- A gradient on text, or a gradient used to make a flat thing look dimensional
- `glass-card`, `backdrop-blur`, translucent floating panels
- Shadows used for hierarchy (a flat offset plate is not a shadow)
- Typing or rotating word animations, pulsing status dots
- Three feature cards in a row with an icon on top of each
- Vague verbs with no object: "Let's Build Something"
- Inter

If a section feels like it needs a card, it needs a **rule**.

---

## What must survive any future change

Each of these is a paid-for production failure. See the same list in
`PRODUCT.md`.

1. **Motion fails open.** Transform-only, never opacity, on anything carrying
   content. The hidden state is added by JS *after* mount, never rendered.
   Unconditional failsafe timers are set *before* the observer. React must
   never re-render an inlined SVG subtree.
2. **`CountUp` does not count.** It renders the authored string. Interpolating
   digits once put "3+" on screen where the figure is 100+.
3. **Accessibility.** `.label-tap`'s dual-axis 44px fix; a `:focus-visible`
   twin for every `:hover`, with hover halves inside `@media (hover: hover)`;
   every animation name in `globals.css` has a `prefers-reduced-motion`
   override; reflow holds at 375px and 200% text zoom.
4. **The diagram step parser.** `Specimen.tsx` and `SpecimenFlow.tsx` read the
   step list out of the SVG by coordinate proximity, depending on exact class
   names, attribute order and 30px/50px constants. There is no generator.
   Do not reformat those files; verify 7 step buttons and 21 tagged nodes after
   any change near them.
5. **Static export.** No `next/image`; `basePath` threaded by hand through
   `lib/basePath.ts`; no `useSearchParams`.
